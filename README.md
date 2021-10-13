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
    EmbedFactory,
    LightboxEmbed,
    IframeEmbed,

    ConsentManager,
    ElementsConsentManager,
    ModalConsentManager,

    UsercentricsProvider,
    GenericLocalStorageProvider,
    GenericEventProvider,
    CmpServiceProviderInterface,

    ConsentSettings,

    Debuggable,
} from '@gebruederheitz/consent-tools';

// Quickstart – set up a settings object
const settings = new ConsentSettings();

// Initialize the CMP service provider of your preference
const cmpService = await new UsercentricsProvider().init();

// Have the service listen to anchor clicks to open its settings menu / modal
cmpService.attachSettingsOpener('[href="#modal-opener"]');

// Instantiate a ConsentManager which acts as a bridge between your embeds and
// the CMP service provider
const consentManager = new ConsentManager(cmpService);

// That is the basic setup done. cmpService will now track changes to user
// consent, consentManager will expose these changes in a simple interface.

// You could now for instance execute some callback once the user has given
// their consent through the CMP:
consentManager.withConsent('Foobar Analytics', () => {
    // This will be called once the user has given their consent to 'Foobar Analytics'
    console.log('Letsa go!')
});

// Or react to any change of user consent:
consentManager.withConsentOrDenial('Foobar Analytics', hasConsent => {
    console.log(`The service Foobar Analytics has ${!hasConsent && 'no'} consent`);
});

// If we have UI elements (not embeds) on the page tied to a service, we can
// have their behaviour depend on user consent by overriding default behaviour
// and showing the user a modal explaining the need for the service and allowing
// them to accept to its use through their CMP:
new ElementsConsentManager(consentManager, settings);

// We can also use the EmbedFactory to automatically find all relevant third-party
// embeds that have their loading blocked, unblock them once user consent is
// assured by the CMP and display a placeholder in the meantime:
new EmbedFactory(consentManager, settings);

```

Adding the following attributes to a DOM element will then execute the callback
when consent is given, or show a modal asking for consent otherwise:

```html
<button
    type="button"
    data-ghct-service="Name/ID of the Service"
    data-ghct-modal="true"
>
    Use service
</button>
```


### Modules / API

#### Consent Settings

#### Consent Manager

#### Embed Factory

##### Iframe Embed

##### Lightbox Embed

##### ~~Script Embed~~

#### Elements Consent Manager

#### Modal Consent Manager

#### CMP Service Providers

##### Usercentrics Provider

##### Generic LocalStorage / SessionStorage Provider

##### Generic Event Provder

##### Implementing your own provider


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


Additionally, some modules can be passed a `debug` key with a boolean value in
their constructor options to toggle logging for just that module:

```js
new ConsentManager(cmpService, { debug: true });
```

Most modules will use the setting defined in the ConsentSettings instance
passed to them by default:
```js
cs = new ConsentSettings({ debug: true });
new EmbedFactory(consentManager, cs);
```


### Styling


## Development

Run `npm run watch` to start a development watch server using `./test/test-implementation`
(bundled to `./demo/demo-bundle.js`) and the files in `./demo` for an example
implementation.

`npm run lint` will lint all the source scripts and stylesheets.

`npm run build` will create production builds in ES module and UMD formats.

### To do

 - [ ] Extend documentation (usage, development)
 - [ ] Migrate default styles for all modules
 - [x] Make all modules use ConsentManager consistently
 - [x] Create interface for CMP services
 - [x] Implement service interface on Usercentrics service
 - [x] Pass CMP service to ConsentManager at init
 - [ ] Fix debug configuration (using the Debuggable.prototype?)
