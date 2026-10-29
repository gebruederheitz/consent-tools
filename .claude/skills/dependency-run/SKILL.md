---
name: dependency-run
description: Full dependency maintenance pass — safely update all npm dependencies with regression checks, triage & merge the Dependabot PR queue (npm security updates) in verified chunks, flag risky PRs for humans, and finish with the full test suite plus browser-based visual verification.
---

# Dependency Run

A complete, safe dependency maintenance pass for this repository (a
single-package npm library: JavaScript in `src/`, SCSS in `scss/`, built by
Rollup and Gulp into `dist/` and published to npm). Run it on a clean-ish
working tree; never touch or commit unrelated uncommitted changes. Risky PRs
are labeled `needs confirmation` and handed to `/dependency-deep-dive`.

## 0. Orientation & baseline

1. `git status` — note any pre-existing modifications; they must survive the
   pass untouched and must never be committed by this workflow.
2. Start the environment if needed: there are no services. asdf takes Node
   from `.tool-versions`; if `node` reports "No version is set", run
   `asdf install nodejs` first. Run `npm ci` if `node_modules` is missing or
   older than the lockfile.
3. Dependency surfaces in this repo:
   - **npm**: `package-lock.json`; version ranges live in `package.json`
     (`dependencies`, `devDependencies`).
   - **Docker**: none.
   - **Other**: Node in `.tool-versions` (asdf; Dependabot can't track it).
     No GitHub Actions workflows yet (#20).
4. Record a **baseline**: run the full suite (the "everything" row in §4)
   *before* changing anything, so pre-existing failures aren't blamed on
   updates later. Save the output.

## 1. Local dependency update (conservative)

Work on a dedicated branch (`chore/dependency-run-YYYY-MM`).

1. `npm update`. This respects semver ranges — the "safe" mode; do **not**
   bump the ranges themselves here. (npm doesn't write ranges back to
   `package.json` on `npm update` unless `--save` is given.)
2. Review the lockfile diff — major jumps, deprecation warnings, abandoned
   packages. Run the audit command (`npm audit`) for awareness.
   npm lists packages whose install scripts it didn't run
   (`npm warn install-scripts`, review with `npm install-scripts ls`).
   core-js's postinstall is only a funding banner and can stay unapproved; a
   new entry needs a look before `npm install-scripts approve <pkg>`.
3. Run the checks per surface (§4) in dependency order (libraries before
   apps), so a regression is attributable. This is a single package with no
   dependents to rebuild. The demo pages load `dist/` and the dev bundles, so
   rebuild before any visual check.
4. If a check breaks: restore the lockfile and update in smaller groups;
   pin or exclude the offending package and document why.
5. Commit only the files this workflow changed.

## 2. Dependabot PR triage

1. `gh pr list --author app/dependabot --state open --json number,title,url,headRefName`.
2. After the §1 update lands on main, verify each open PR against the new
   lockfile: if the target version is already satisfied, close it with
   "superseded by <update PR>" instead of merging.
3. Ecosystem-specific rules: there is no `.github/dependabot.yml`, so only
   npm **security updates** arrive. They usually carry the labels
   `dependencies` and `javascript`, but not always. Several of them often
   touch the same `package-lock.json` and conflict after the first merge.
   A security PR can bump a direct dependency across a major to reach the
   fixed transitive version (e.g. `@rollup/plugin-terser` 0.4 → 1.0 for
   `serialize-javascript`); that makes it a toolchain major, not a lockfile
   bump. Keep the `@babel/*` packages on the same minor, and a `core-js`
   major has to match `corejs: 3` in `.rollup.config.mjs` and `.babelrc`.
4. **Delegate risk assessment to cheap sub-agents** (haiku/sonnet), one per
   PR or small batch, each returning a structured verdict:
   - dev-only vs. production; direct vs. transitive (lockfile-only)
   - semver distance (patch/minor/major)
   - security fix (Dependabot body says so)?
   - breaking changes from changelog/release notes
   - CI status (`gh pr checks`; no CI exists until #20, so "none" is the
     norm and the local checks in §4 stand in for it)
   - verdict `safe` / `risky` with reasons and a concrete test plan
5. Classification:
   - **safe**: patch/minor of dev dependencies, lockfile-only transitive
     bumps whose local checks pass.
   - **risky**: majors, build-toolchain changes (Rollup and its plugins,
     Babel, Gulp/gulp-dart-sass/Sass, PostCSS with autoprefixer and cssnano,
     ESLint/Prettier/Stylelint, Vitest/jsdom), runtime changes in
     `dependencies` (bundled into `dist/index.mjs` and `dist/bundle.js`, so
     they reach consumers with the next release) without test coverage.

## 3. Chunked merging

1. Merge **safe** PRs in chunks of 3–5. PRs sharing a lockfile conflict with
   each other: merge one, then let Dependabot rebase the next (it does so on
   its own when main moves; `@dependabot rebase` forces it), or resolve
   locally.
2. After each chunk: pull main, `npm ci`, run the affected surfaces' checks
   (§4). If a chunk breaks, narrow it down to the offending PR and revert it.
3. For **risky** PRs:
   - comment where the risk lies (breaking changes, affected code here), how
     to test it, and what success looks like;
   - `gh pr edit N --add-label "needs confirmation"`;
   - do **not** merge.

## 4. Check matrix

Use the npm scripts, not `task`: the tasks' `install` dependency runs
`npm i`, which can rewrite the lockfile, and `task build`/`task lint` are
skipped when only files outside `src/` changed (#42).

| Surface | Checks |
| --- | --- |
| install | `npm ci` |
| scripts (`src/`, `test/`) | `npm run lint:scripts`, `npm run test:unit`, `npm run build:rollup` |
| styles (`scss/`) | `npm run lint:styles`, `npm run lint:prettier`, `npm run build:styles` |
| package contents | `npm pack --dry-run` (when `files`, `.npmignore` or entry points could be affected) |
| demo pages | `task dev`, then the pages in §5.2 |
| everything | `npm run lint:scripts && npm run lint:styles && npm run lint:prettier && npm run test:unit && npm run build:rollup && npm run build:styles` — use at chunk boundaries, per-surface rows when bisecting |

## 5. Final verification

1. Full suite + full build on the final state of main.
2. Visual check in the browser where sensible: start `task dev` (Rollup and
   Gulp in watch mode, sirv on <http://localhost:8080/> with live reload) and
   open `/` (dev bundle, `GenericLocalStorageProvider`), `/lightbox/`,
   `/onetrust/` (OneTrust with fallback), `/iframe/` and `/bundle/` (UMD
   `dist/bundle.js`). Stop `task dev` afterwards. Check console errors,
   failed requests, visual breakage. Without connected browser tooling, use
   a Playwright script in the scratchpad (`ignoreHTTPSErrors: true` for
   local certs; collect `console`/`pageerror`/`requestfailed`; full-page
   screenshots).
3. Compare against the §0 baseline: only *new* failures are regressions.

## 6. Summary

- what was updated locally (notable version jumps);
- which PRs were merged, by chunk, with check results;
- which PRs need human attention, **with links** and one-line reasons;
- regressions found and how they were resolved;
- final suite and visual check status;
- whether bundled runtime dependencies changed, i.e. whether the next
  release ships different bundles.

## Principles

- Delegate parallel read/assess work to weaker-model sub-agents; keep merge
  decisions and regression debugging in the main loop.
- Never force-push, never merge failing checks, never bump ranges in safe
  mode, never commit unrelated working-tree changes.
- Chunks small enough that a failure is cheaply attributable.
