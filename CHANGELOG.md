# @TODO:

 - SCSS styles reorganisation & cleanup
 - tier descriptions and translated names
 - bundle organization:
   - exports for developers (in semi-separate builds)
   - bundles for implementers
 - ~~separate build for modal~~ test separated modal build
 - auto-factory for consent-tools-provider with settings fetcher
 - auto-factory for embeds only (toolkit)
 - emit events as planned
 - finish rewriting "permanent consent" option
 - DOCUMENTATION DOCUMENTATION
   - finish GitHub-Pages setup for 11ty
 - Clean up tooling config: remove unused rules for JS/MJS files, revise TS
   bundler configuration
 - Replace factories with static factory methods on embed classes?
 - Banner Mode


# v3.x

## Breaking changes

 - removed deprecated method `ConsentManager.usercentricsUnblock()`
 - Introduced internationalization features, which required us to change the
   structure of various settings to be translatable values. In general, these
   settings' types have changed from `string` to `TranslatableSetting`, which
   is simply an object mapping a locale to a translation:
   ```typescript
   type TranslatableSetting = {
       [locale: string]: string;
   };
   ```
   As we've also added
   a full-featured provider that will eventually fulfil the function of a CMP,
   some of the settings' names have also changed in order to provide more
   clarity.
   | previous name | new name | previous type | new type |
   | --- | --- | --- | --- |
   | buttonText | buttonText | string | TranslatableSetting |

 - changed the signature of `ConsentSettings`

## Features


## Maintenance

 - moved to TypeScript
