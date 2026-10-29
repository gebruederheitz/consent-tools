---
name: dependency-deep-dive
description: Work through the Dependabot PRs labeled "needs confirmation" (the risky ones /dependency-run hands off) — apply each onto current main, test it with a playbook for its kind (runtime dependency major, build toolchain), report on every PR, then merge, consolidate into one bundle PR, or leave open with a reason.
---

# Dependency Deep Dive

`/dependency-run` merges the safe Dependabot PRs and labels the rest
`needs confirmation`. This skill tests each of those properly, with as
little input from the user as possible, so every PR ends in one state:

- **merge**: tested, checks pass, merged on its own;
- **bundle**: tested and folded into one consolidated PR (§6);
- **needs work**: the bump is fine but the repo needs a change first;
  open that PR or describe it;
- **leave open**: out of scope for this pass; say why.

The user decides anything that changes what consumers get (bundled runtime
dependencies, the Node minimum in `engines`) or that can't be undone, such as
a release. Surface those decisions, don't make them.

## Ground rules

- **Worktrees only**, under `../worktrees/` (next to this checkout). The
  main checkout may be shared with other sessions that switch branches under
  you.
- **Never read `.env` files.** Test around them.
- **Don't poll CI.** There is no CI yet (#20); the local matrix (§1) is the
  check. Once CI exists, check once after a push, or rely on notifications.
- **Never merge failing checks.** If a merge is refused (branch protection
  needs a code-owner review), hand it to the user; don't retry around it.
- **Every PR you open follows the board convention** (§8).

## 0. Intake

1. `gh pr list --label "needs confirmation" --state open --json number,title,headRefName,url`,
   plus every other open Dependabot PR — they share lockfiles, some are
   duplicates (§6).
2. For each PR read the Dependabot body and the triage comment
   `/dependency-run` left: it names the risk.
3. Group by kind; §3 has one playbook per kind.
4. Close PRs already superseded by main with a comment.

## 1. Baseline

Run the checks for every surface the queue touches on current main, in a
clean worktree, so pre-existing failures aren't blamed on a bump.

**Known noise on main** <!-- TODO first run: flaky/networked specs, env vars the runner needs, differences between main checkout and worktrees. -->
Seen so far:
- `/bundle/` throws `TypeError: Cannot read properties of undefined (reading 'getCmpServiceId')`: `demo/bundle/index.html` calls `new ConsentManager()` without the settings argument. This is a bug in the demo page, not in the bundle.
- `npm run build:styles` prints Dart Sass `legacy-js-api` deprecation warnings (from `gulp-dart-sass`).
- Builds print "Browserslist: browsers data (caniuse-lite) is … old".
- `npm install` warns that ESLint 9.39 is no longer supported and that `glob@7` is deprecated.

Compact matrix (`<wt>` = worktree path):

| Surface | Commands |
| --- | --- |
| install | `cd <wt> && npm ci` |
| scripts | `cd <wt> && npm run lint:scripts && npm run test:unit && npm run build:rollup` |
| styles | `cd <wt> && npm run lint:styles && npm run lint:prettier && npm run build:styles` |
| package contents | `cd <wt> && npm pack --dry-run` |
| demo pages | `cd <wt> && task dev`, pages as in `/dependency-run` §5.2 |

Use the npm scripts in worktrees, not `task`: the tasks' `install` dependency
runs `npm i` and can rewrite the lockfile, and `task build`/`task lint` skip
when only files outside `src/` changed (#42). Each worktree needs its own
`npm ci`. `task dev` binds port 8080, so run it from one checkout at a time.

## 2. Apply the bump onto current main

1. `git worktree add -b <branch> ../worktrees/<name> origin/main`
   (one per PR, or one for the pass if you expect to bundle).
2. Make the PR's change by hand: version ranges in `package.json`. Read the
   PR's diff for everything it touches and drop parts that don't belong (a
   version that must stay aligned: Node in `.tool-versions` for development
   versus `engines` in `package.json`, the consumer minimum, which is
   breaking to raise; the `core-js` major versus `corejs: 3` in
   `.rollup.config.mjs` and `.babelrc`; the `@babel/*` packages on one
   minor).
3. Regenerate the lockfile: `cd <wt> && npm install --package-lock-only`.
4. **Lockfile quirks after regeneration** <!-- TODO first run: packages that re-resolve on every regeneration and must be pinned back. -->
5. Review the rest of the lockfile diff: unexpected transitive jumps, new
   packages needing a postinstall build (`npm install-scripts ls`), peer
   warnings.
6. Install with the frozen lockfile and run the affected matrix rows.

If a companion package has to move with the bump (a plugin that marks the new
major as unsupported), bump it in the same change and say so in the report.

## 3. Test playbooks

Each ends in a pass criterion. Write down what you ran and saw; §4 is built
from it.

### 3.1 Runtime dependency, major

Runtime dependencies are the `dependencies` in `package.json`. Rollup
bundles them into `dist/index.mjs` (except `@babel/runtime` helpers, kept
external) and `dist/bundle.js`.

- Read the breaking changes, grep every import and call site. Usage is often
  tiny; say so.
- Module format: if the build output's format differs from the package's
  (ESM-only package, CommonJS build), run the built output, don't just
  type-check it.
- **Behaviour probe** where the API or defaults changed: exercise the call
  site the way the app does (a local stand-in service, rendering the same
  input with old and new version and diffing).
  **Probes that worked** <!-- TODO first run -->
  - Build diff: build main and the bump (two worktrees, or main with the old
    lockfile), then compare `dist/` file sizes, `diff -rq` on `dist/css`, and
    the list of injected polyfills
    (`grep -o "core-js/modules/[a-z0-9._-]*" dist/index.mjs | sort -u`) on
    both sides.
- Report peer warnings and whether they affect production or only tests.
- Native modules: none of the runtime dependencies has any, and the bundles
  run in the consumers' browsers. A new native or Node-only dependency in
  `dependencies` is a red flag.
- Pass: build, lint, tests match baseline; probe behaves as before.

### 3.2 Build toolchain (Rollup and its plugins, Babel, Gulp/gulp-dart-sass/Sass, PostCSS with autoprefixer and cssnano, ESLint/Prettier/Stylelint, Vitest/jsdom)

- Build, lint and test the package (all matrix rows).
- Check plugins' peer ranges; bump plugins that flag the new major.
- Browser smoke of the production build before and after: console errors,
  failed requests, full-page screenshot diff (goal: 0). Run `task dev` on
  main and on the bump in turn and open the demo pages. `/bundle/` and
  `/iframe/` load the production UMD `dist/bundle.js`; the other pages use
  the dev bundles built from `test/test-implementation*.js`. Add the §3.1
  build diff.
- A compiler major with failing checks is a migration, not a bump: report
  and leave open.
- Pass: builds, checks, tests match baseline; no visible difference.

## 4. Report on each PR

```
## Tested on current main (<short sha>)

**Change applied:** <what, including companion bumps or parts dropped>
**Tests:** <commands/probes run, one line each, with the result>
**Compared with baseline:** <same failures as main / new failures>
**Verdict:** merge | bundled in #N | needs work: <what> | leave open: <why>
```

Don't remove `needs confirmation` unless the PR is merged or closed.

## 5. Merge or bundle?

- **One or two pass:** merge individually.
- **Three or more pass, or the rebase chain keeps breaking:** bundle (§6).
- If a PR needed more than the version bump, bundle it or push the fix to the
  Dependabot branch (Dependabot stops managing a branch once someone else
  pushes to it; say so).

## 6. Bundle PR

1. One worktree off `origin/main`, branch `chore/dependency-bundle-YYYY-MM-DD`.
   Apply every passing bump, regenerate the lockfile once, apply §2.4,
   install frozen, run the full matrix plus the §3 probes.
2. PR body: **Supersedes** table (PR, old → new and where, notes); **Left out
   on purpose** (one line per open PR); **Testing**, including what only runs
   after merge. Label `dependencies`.
3. `gh pr close <n> --comment "Superseded by #<bundle>."` for each superseded
   PR.
4. **A Dependabot PR closed by hand makes Dependabot ignore that version.** If
   a bump has to leave the bundle later, reopen its PR.
5. Keep the worktree until the bundle PR is merged.

## 7. Cleanup

- `git worktree remove` every worktree you created (except those waiting on
  review); delete merged local branches.
- Stop every `task dev` you started.
- Leave the user's dev environment as you found it.

## 8. Board

There is no project board (CLAUDE.md, "Workflow"). PRs target `main`, which
is protected (code-owner review), and carry the "Definition of done" section
like the other PRs here. If bundled runtime dependencies change, say in the
PR that the next release ships different bundles; releases are the user's
call (`task release`, beta first when behaviour can change).

## 9. Summary

- merged PRs, and the bundle PR with what it supersedes;
- PRs closed and why;
- PRs left open, one line each with reason and what would unblock them;
- follow-up PRs opened;
- **decisions for the user**: changes that reach consumers, a release, merges
  you couldn't do, anything irreversible;
- tests run, and what only gets exercised after merge.
