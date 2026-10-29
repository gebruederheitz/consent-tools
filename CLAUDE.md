# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@gebruederheitz/consent-tools` is a browser library, published to npm, that connects third-party embeds (iframes, scripts, lightboxes) and UI elements on a page to a consent management platform (CMP). Until the CMP reports consent for a service, it shows a placeholder or modal in their place. Plain JavaScript (ES modules, JSDoc types, no TypeScript). The README documents the public API and `ConsentSettings` options.

## Consumers

Known consumers are /gebrüderheitz projects: f24 (gebruederheitz/fact24, WordPress), Haufe "Autor:in werden" (autor.haufe.de), and one private project. Third-party use is unknown and probably nil. Consumers presumably import the ESM build through their bundlers (Rollup, possibly Vite); the UMD bundle exists for standalone `<script>` use. The `window.ghwp?.ucEnabled` check in `EmbedFactory` probably comes from f24's theme (`ghwp` = /gebrüderheitz WordPress). In f24, the placeholder texts come from the theme's `ConsentToolsConfiguration` REST endpoint, not from this repo.

## Branches and direction

`main` is the released 3.x line and the base for all work. It is protected: changes go through a PR with a code-owner review. `v4` and `issue/localstorage-provider` (PR #12) hold a stalled TypeScript rewrite mixed with new features (Svelte "traffic light" modal, standalone storage provider) and doc rework; issues labelled `v4` belong to it. Don't build on those branches. The intended direction: a TypeScript migration as a pure port without feature or scope changes, doc improvements separately, and further work focused on what consumers actually use, with the moving parts decoupled.

## Workflow

Issues live in this repo and use the org's issue types (Bug, Task, Feature); there is no project board. Work that a consumer project needs is tracked as a sub-issue of that project's issue (e.g. a fact24 issue). New behaviour ships dark as a beta prerelease.

## Commands

Tasks run through [Task](https://taskfile.dev) (`Taskfile.yaml`). Node is pinned in `.tool-versions` (asdf), with the minimum in `package.json` `engines`.

- `task dev`: watch-builds the library and the demo bundles with Rollup, watches SCSS with Gulp, and serves `demo/` with sirv plus livereload.
- `task build`: production build to `dist/` (`dist/index.mjs` ESM, `dist/bundle.js` UMD global `ghconsent`, `dist/css/`).
- `task test`: runs `task lint`, then the unit tests (`npm run test:unit`, Vitest with jsdom, `vitest.config.mjs`). `task lint`: ESLint on `src/` and `test/`, Stylelint and Prettier on `scss/`. There is no CI yet (#20).
- Unit tests live in `test/unit/**/*.test.js` and import from `src/`. Single file: `npx vitest run test/unit/consent-settings.test.js`; by name: `npx vitest run -t 'checkbox label'`; watch mode: `npm run watch:test`. Coverage is still thin (#22).
- `task build` and `task lint` declare `sources` (`node_modules/**`, `src/**`) and are skipped when those are unchanged, even if `scss/` or `test/` changed. Run the npm scripts directly, or `task --force build`, after style-only changes.
- Single linters: `npm run lint:scripts`, `npm run lint:styles`, `npm run lint:prettier`. The repo has no fix scripts; `npx eslint --fix src/ test/` and `npx prettier -w scss/` work when run directly.
- `task release`: release-it on `main` only. It prompts for the version (`--only-version`); prereleases use a prerelease tag such as `3.4.2-beta.1`. It runs `task test` and `task build`, bumps the version, commits `[chore] Release v<version>`, tags, creates a GitHub release and publishes to npm (`.release-it.yaml`).

Style is 4-space indent, single quotes, semicolons, enforced by Prettier through ESLint.

## Demo / manual testing

`test/test-implementation*.js` are not tests. They are demo entry points that Rollup bundles (dev builds only) into `demo/demo-bundle.js`, `demo/lightbox/demo-bundle.js` and `demo/onetrust/demo-bundle.js`. They import from `../dist/index.mjs`, not from `src/`, so the library must be built (and `task dev` does this). `demo/build` is a symlink to `dist/`, used by the `demo/*/index.html` pages. For behaviour the unit tests don't cover (CMP integration, styling), run `task dev` and check the relevant demo page in a browser.

## Architecture

The layers, from the CMP outward:

1. **CMP service providers** (`src/cmp/`). `interface.js` defines the `CmpServiceProvider` contract (`acceptService`, `getConsentStatusForService`, `onConsentUpdate`, `showSettingsMenu[AtService]`, `isPresent`, `attachSettingsOpener`). `AbstractCmpServiceProvider` is the base class. The implementations:
   - `UsercentricsProvider` and `OneTrustProvider` poll for the CMP global (`UC_UI` / `OneTrust`/`Optanon`) up to `loadDelayLimit`, then fall back to `options.fallbackServiceProvider` (default `GenericEventProvider`). **Their constructors return `this.init()`, a Promise that resolves to either the provider or the fallback instance**, so callers must `await new OneTrustProvider()`.
   - `OneTrustProvider` maps service IDs to OneTrust General Vendor custom IDs and group IDs (`GetDomainData()`), caches the mapping both ways, and re-emits OneTrust's `OnConsentChanged` through a `mitt` emitter keyed by service ID (true for consented, false for everything else).
   - `GenericEventProvider` stores nothing: `getConsentStatusForService()` always returns `false`, and `acceptService` only emits an event to the listeners already registered, so asking for the status after acceptance still returns no consent. `GenericLocalStorageProvider` stores consent in session storage (`store2` namespace `gh-consent-tools`, despite the name).
2. **`ConsentManager`** (`src/consent-manager.js`) is a thin facade over one provider. Every call translates the service ID with `ConsentSettings.getCmpServiceId()` before it reaches the provider. Consumers use `withConsent` (fires once consent exists) and `withConsentOrDenial` (fires immediately and then on every change).
3. **`ConsentSettings`** (`src/util/consent-settings.js`) is the central configuration. Most properties are maps of `{ default: …, [serviceId]: … }`, read through `_get(property, serviceId)` with fallback to `default`. A few properties are globals and cannot be set per service: `debug`, `attributesPrefix`, `lightboxFactory`, `autoloadOnButtonClick`, `privacyPolicyUrl`. Adding a new setting means a class field, a getter, and (if global) entries in `_getCleanOptions` and `_parseDefaultOptions`. Text settings support `%servicePrettyName%`, `%privacyPolicyUrl%` and `%checkboxProviderName%` placeholders.
4. **Embeds** (`src/embed/`). `EmbedFactory` queries `[data-ghct-src], [data-ghct-type]` and picks a class per element: `<a>` → `LightboxEmbed`, `script[type="text/plain"]` without a src → `InlineScriptEmbed`, `script[data-ghct-src]` → `ScriptEmbed`, anything else → `IframeEmbed`. `AbstractEmbed` holds the life cycle: `init()` creates a `GdprConsentPlaceholder`, subscribes with `withConsentOrDenial(type)`, and `onConsentChanged` then calls `loadEmbed()`, `unloadEmbed()` or attaches the placeholder. Subclasses override `loadEmbed`/`unloadEmbed`/`getContainer`/`getType`. The factory also exposes the `window.ghctEmbedsAllowed` bypass, which loads every embed (see the README).
5. **Elements** (`ElementsConsentManager`): elements with `data-ghct-service` get the class `has-consent` once consented. With `data-ghct-modal="true"` and no consent yet, a `ModalConsentManager` is attached. That class is an `AbstractEmbed` subclass whose "container" is a `Modal` holding the placeholder. It intercepts clicks on the trigger until consent is given, and can then reload the page or replay the click (`reloadOnConsent` / `clickOnConsent`).

Data attributes are read through `dataset[prefix + 'Src'|'Type'|'Service'|'Modal']`, where `prefix` comes from `settings.getAttributesPrefix()` (default `ghct`). `ElementsConsentManager` swaps the prefix into its default selector. `EmbedFactory` only does so when its selector equals `[data-ghct-src]`, which never matches its own default (`[data-ghct-src], [data-ghct-type]`), and its class triage hard-codes `data-ghct-src`, so with a custom prefix the factory still uses `ghct` attributes (#35).

All runtime classes except `ConsentSettings` extend `Debuggable` from `@gebruederheitz/wp-frontend-utils` (`this.debug.log`, globally toggled by `toggleDebugOutput`). DOM helpers (`$$`, `createDomElement`) come from the same package.

Existing classes build their options with `_merge(DEFAULT_OPTIONS, userOptions)`. lodash `merge` mutates its first argument, so the module-level defaults leak between instances (#36).

There is no browserslist config, so Babel transpiles to ES5 and injects core-js polyfills by usage, and autoprefixer uses browserslist's `defaults` (#37).

Styles: `scss/index.scss` combines `scss/module/*` (placeholder, modal, loader) with overridable variables from `scss/lib/_variable-defaults.scss`. Gulp compiles every `scss/**/*.scss` to `dist/css/`. Consumers can also `@use` the SCSS directly.

## Public API

`src/index.mjs` is the only entry point, and everything it exports is public API (semver-relevant). New modules must be exported there. `.npmignore` keeps `demo/`, `test/` and the config files out of the package, but `src/` and `scss/` ship alongside `dist/`.
