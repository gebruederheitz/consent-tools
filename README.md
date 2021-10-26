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
    ScriptEmbed,
    InlineScriptEmbed,

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

The EmbedFactory will parse the DOM looking for elements that qualify for one
of the embed types (below) and initialize each accordingly.

The instantiated embed objects will hook onto the ConsentManager and
automatically load their content once user consent is given through the
CMPServiceProvider used.

Vice versa the embed objects will show a placeholder element instead of their
content while no consent is given. This placeholder gives the user feedback
about why content is not being displayed and a chance to directly give their
consent to the affected service.

The factory must be passed an instance of `ConsentManager` and an instance of
`ConsentSettings` in its constructor.

Through the third constructor parameter you can pass a custom selector used
to find qualifying DOM elements:

```js
new EmbedFactory(
    consentManager,
    settings,
    {
        selector: '[data-ghct-src], [data-ghct-type]',
    }
)
```

This will only change which elements will enter the factory's type triage in the
first place, not how the appropriate embed class is selected. For information
on which elements will be assigned which class, see the descriptions of the
individual classes below.

As a fallback and for development & testing purposes, the factory has a way to
skip the consent manager and load all embeds on page:

```js
if (window.ghctEmbedsAllowed) {
    window.ghctEmbedsAllowed();
} else {
    window.ghctEmbedsAllowed = true;
}
```

```html
<script>
    window.ghctEmbedsAllowed = true;
</script>
<script src="/consent-tools-bundle.js"></script>
```


##### Usage without the factory

You don't have to use the factory; you can also take care of the instantiation
of the embed objects yourself.
Each of the embed classes expects the following constructor arguments:
 - container: A DOM element, usually decorated with certain data-attributes
 - consentManager: An instance of ConsentManager
 - settings: An instance of ConsentSettings, containing information about
   services, placeholder content etc.

After creating your instance, you will have to call the `init()` method.

```js
// Example
import {
    ConsentManager,
    ConsentSettings,
    IframeEmbed,
    GenericLocalStorageProvider,

} from '@gebruederheitz/consent-tools';

// Basic setup
const settings = new ConsentSettings();
const cmpService = new GenericLocalStorageProvider();
const cm = new ConsentManager(cmpService);

const container = document.querySelector('#my-iframe');
const embed = new IframeEmbed(container, cm, settings);
```


##### Iframe Embed

##### Lightbox Embed

##### Remote Script Embed

Manages execution of remote script elements based on user consent.

```html
<!-- BEFORE -->
<script src="https://example.com/script.js"></script>

<!-- AFTER -->
<script
    data-ghct-src="https://example.com/script.js"
    data-ghct-type="Foobar Analytics"
></script>
```

The factory will initialize any `<script>` element with a `data-ghct-src`
attribute as a consent-driven remote embed.
You can optionally have a placeholder element rendered somewhere, that will
allow your users to consent to the given service:

```html
<!-- With a custom container element for the placeholder -->
<div class="ghct-placeholder-container"></div>

<!-- ... -->

<script
    data-ghct-src="https://example.com/script.js"
    data-ghct-type="Foobar Analytics"
    data-ghct-placeholder=".ghct-placeholder-container"
></script>
```
```html
<!-- With an auto-generated container element for the placeholder right above the script element -->
<script
    data-ghct-src="https://example.com/script.js"
    data-ghct-type="Foobar Analytics"
    data-ghct-placeholder="true"
></script>
```

##### Inline Script Embed

Manages execution of inline script elements based on user consent.

```html
<!-- BEFORE -->
<script type="application/javascript">
    window.alert('Surprise!');
</script>

<!-- AFTER -->
<script type="text/plain" data-ghct-type="Foobar Analytics">
    window.alert('Only with Consent!');
</script>
```

The factory will initialize any `<script>` element with a `data-ghct-type`
attribute and without a `src` as a consent-driven inline script element. By
specifying the type as `text/plain` you make sure the browser won't automatically
execute the script.

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
