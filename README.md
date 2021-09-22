# /gh Consent Tools

_Extended pluggable tooling for consent management services._

---

## Installation

```shell
npm i @gebruederheitz/consent-tools
```



## Usage

### Quickstart

```js
import {
    ConsentManager,
    ElementsConsentManager,
    GdprEmbedFactory,
    GdprLightboxEmbed,
    GdprIframeEmbed,
    ModalGdprManager,
    Usercentrics,
} from '@gebruederheitz/consent-tools';

// Quickstart – get an instance each of the event proxy and a wrapped GTM dataLayer
import { eventProxy, gtm } from '@gebruederheitz/consent-tools/src/get-gdpr-utils';

// See configuration example below
import { embedsConfig } from './config';

// Get detailed debugging output from the various modules
const debug = true;

// Conditionally execute scripts based on user consent to services
const consentManager = new ConsentManager(
    { embeds: embedsConfig, debug },
    gtm,
    eventProxy
);
new ElementsConsentManager(consentManager, {
    embeds: embedsConfig,
    debug,
    reloadOnConsent: false,
    clickOnConsent: true,
});

function onConsentForService() {
    console.log('User has given their consent for this service!');
}

consentManager.withConsent('Name/ID of the Service', onConsentForService);
```

Adding the following attributes to a DOM element will then execute the callback
when consent is given, or show a modal asking for consent otherwise:

```html
<button
    type="button"
    data-ghwp-uc-service="Name/ID of the Service"
    data-ghwp-uc-modal="true"
>
    Use service
</button>
```


#### Example configuration file

```js
//# config.js

export const embedsConfig = {};
```



### Modules

#### Consent Manager

#### Elements Consent Manager

#### GDPR Embed Factory

##### Iframe Embed

##### Lightbox Embed

##### Script Embed

#### Modal GDPR Manager

#### Usercentrics


### Debugging

This library uses the `Debuggable` base class from [`@gebruederheitz/wp-frontend-utils`](https://www.npmjs.com/package/@gebruederheitz/wp-frontend-utils)
to provide debug logging. Output is disabled by default, you can easily switch
on logging detailed information to the browser console by using the provided
toggle function:

```js
import { toggleDebugOutput } from '@gebruederheitz/consent-tools';

// Logging for all modules on:
toggleDebugOutput(true);

// ...and off again
toggleDebugOutput(false);
```


Additionally, most modules can be passed a `debug` key with a boolean value in
their constructor options to toggle logging for just that module:

```js
new ElementsConsentManager(consentManager, {
    debug: true,
    // ...
    embeds: embedsConfig,
    reloadOnConsent: false,
    clickOnConsent: true,
});
```


### Styling


## Development

### To do

 - [ ] Extend documentation
 - [ ] Migrate default styles for all modules
 - [ ] Make all modules use ConsentManager consistently
 - [ ] Create interface for CMP services
 - [ ] Implement service interface on Usercentrics service
 - [ ] Pass CMP service to ConsentManager at init
 - [ ] Fix debug configuration (using the Debuggable.prototpye?)
