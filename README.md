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
    OneTrustProvider,
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
const consentManager = new ConsentManager(cmpService, settings);

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

The `ConsentSettings` object exists to provide a unified configuration interface
to the other components.

The constructor accepts two object parameters:
 - one for setting
   - global configuration options (like whether to enable
     debug logging output)
   - and default or fallback options that may be overridden by individual
     services
 - one for setting overrides on certain services.

Both parameters are optional; a set of sensible default values are applied if
you omit them.


```js
new ConsentSettings(defaults, services);
```


| key | type | default | used by | description |
| --- | ---  | ---     | ---     | ---         |
| **Globals**
| debug                 | boolean                   | false                          | *             | Enable debug output to the console. |
| attributesPrefix      | string                    | 'ghct'                         | *             | DOM-Attributes are read with this prefix (e.g. `data-ghct-src`). |
| lightboxFactory       | LightboxFactory function  | null                           | LightboxEmbed | A function that will create (video) lightboxes when the relevant service has consent. Recommendation: [wp-block-video-overlay](https://www.npmjs.com/package/@gebruederheitz/wp-block-video-overlay). |
| autoloadOnButtonClick | boolean                   | true                           | *Embed        | Whether to start loading an embed element as soon as the button was clicked. Will need to be disabled for certain CMP service providers (like OneTrust) where consent for a single service can not be granted programmatically. |
| privacyPolicyUrl      | string                    | '/legal/datenschutzerklaerung' | *Embed        | URL to the site's privacy policy page. Can be used in template strings as `%privacyPolicyUrl%`. |
| **Defaults And Service-Specific Settings**
| cmpServiceId          | string         | null                 | *                   | You can override the serviceId used when calling the CmpServiceProdiver by setting a custom ID here. Example: If your embeds use `data-ghct-type="youtube"`, but your CMP expects the ID `'YouTube Video'`, you can set the cmpServiceId `'YouTube Video'`. |
| reloadOnConsent       | boolean        | false                | *Embed              | Whether to force a page reload when the associated consent is granted. Some services may require a full page reload to initialize properly. |
| clickOnConsent        | boolean        | false                | ModalConsentManager | If true, a click event on the trigger element will be simulated once consent to the service is granted. |
| servicePrettyName     | string         | ''                   | *Embed              | This string will be used in template strings instead of the service's ID as `%servicePrettyName%`. |
| defaultLoadAll        | boolean        | true                 | *Embed              | Whether all embeds of the given service should be loaded on consent by default, as opposed to only the specific embed whose button was clicked. If `skipCheckbox` is set to `false`, this will mean that the checkbox is pre-checked. |
| additionalServices    | string[]       | []                   | *Embed              | An array of IDs of services that need to be consented and loaded in addition to the specified one. Useful when you need to handle interdependencies or multi-service triggers. |
| titleText             | string         | ''                   | *Embed              | Text content of the `<h2>` element inside the embed placeholder..
| modalOpenerButton     | boolean        | false                | *Embed              | If set to true, an additional button will be rendered in the placeholder next to the "accept" button that will trigger the CMP service's administration interface to show. |
| modalOpenerButtonText | string         | 'Mehr Informationen' | *Embed              | The text content of the additional button to open the CMP service's administration interface. |
| privacyPolicySection  | string         | ''                   | *Embed              | An optional setting you can use to extend the `%privacyPolicyUrl%` template placeholder's value in text fragments (see examples below). |
| skipCheckbox          | boolean        | false                | *Embed              | When set to `true` the checkbox allowing the user to select whether to load just a single embed or save consent and load all embeds from that provider will not be rendered. In that case, `defaultLoadAll` decides on which of the two options will be applied. |
| checkboxProviderName  | string         | 'dieses Anbieters'   | *Embed              | An optional template placeholder you can use as `%checkboxProviderName%** in the text fragments (see examples below). |
| checkboxLabel         | string         | 'Für alle Inhalte dieser Art übernehmen' | *Embed | The label to the "load all"/"load single" checkbox shown when `skipCheckbox` is false. You can use the template placeholder string `%checkboxProviderName%`. |
| description           | string         | 'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch werden Informationen an den Diensteanbieter übermittelt und dort gespeichert.' | *Embed | The main text content of the placeholder element. May contain basic HTML markup and the template placeholders `%servicePrettyName%` and `%privacyPolicyUrl%`. |
| buttonText            | string         | 'Inhalt laden'       | *Embed              | The main (accept action) button's text content. |


You can use this setup to provide generic text fragments that can be used with
any service, and override these for specific services.




#### Consent Manager

The ConsentManager acts as a thin layer around implementations of
CmpServiceProvider and exposes a public API for consumers you can use for more
specific use cases.

##### API

| method | description |
| ---  | --- |
| `new ConsentManager(cmpService: CmpServiceProviderInterface, consentSettings: ConsentSettings, userOptions: object) |
| `acceptService(serviceId: string)` | Signal to the provider, that the user has given their consent to the service with the given `serviceId`. |
| `async getServiceConsentStatus(serviceId)` | Get the current consent status for the given service from the provider. |
| `showSettings()` | Trigger the provider to show the administration interface (usually a modal). |
| `showSettingsAtService(serviceId: string)` | Open the CMP's settings menu (modal) at a specific service's description.
| `async withConsent(serviceId: string, callback: function, ...args)` | Executes the given {callback} with {args} if and when there is user consent for the service specified by {serviceId}.
| `async withConsentOrDenial(serviceId: string, callback: function, ...args)` | Executes the given {callback} with {args} if and when the user consent for service {serviceId} changes. The callback will receive the updated consent status as a boolean as its first argument.


##### Example

```js
const cmpService = new UsercentricsProvider();
const cm = new ConsentManager(cmpService, new ConsentSettings());

function onConsent(serviceId, prettyName) {
    console.log(`User has given their consent to loading "${serviceId}"!`);
    window.alert(`Thanks for allowing us to load ${prettyName}!`);
}

cm.withConsent('my-service', onConsent, 'my-service', 'My Awesome Web Service');
```



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
skip the consent manager and load all embeds on a page.

Inserting the following snippet anywhere on the page (could even be through
injection by a Tag Manager service etc.) will bypass consent-tools altogether:

```js
if (window.ghctEmbedsAllowed) {
    window.ghctEmbedsAllowed();
} else {
    window.ghctEmbedsAllowed = true;
}
```

Alternatively if you can make sure that the window property is set before your
consent-tools scripts initialize you can simplify things a little:

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
 - settings: An instance of [ConsentSettings](#consent-settings), containing
   information about services, placeholder content etc.

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
const cm = new ConsentManager(cmpService, settings);

const container = document.querySelector('#my-iframe');
const embed = new IframeEmbed(container, cm, settings);
```


##### The Placeholder

The basic principle is quite simple: As your embed elements don't contain the
regular attributes that the browser would use to load any external content, no
external content is loaded without the user's consent:

```html
<!-- A regular inline frame element and a regular external script -->
<iframe src="http://example.com"></iframe>

<!-- An iframe element that does not contain anything -->
<iframe></iframe>
<script></script>

<!-- An iframe that still doesn't contain anything, but can be retroactively loaded -->
<iframe data-ghct-src="http://example.com"></iframe>


<!-- The same iframe, but with a service ID specified – allowing us to query and
     modify that service's consent status through ConsentManager,
     CmpServiceProviderInterface and the actual CMP scripts                  -->
<iframe data-ghct-src="http://example.com" data-ghct-type="example"></iframe>
```

Once the consent manager has made sure that the user has given their consent to
the service `example` by querying the CmpServiceProvider, the actual `src`
attribute is added to the embed:

```html
<iframe
    data-ghct-src="http://example.com"
    data-ghct-type="example"
    src="http://example.com"
></iframe>
```

This triggers the browser to make the external request and load the third-party
content.

In order to not present users with a blank iframe element, the various embed
objects will render a placeholder element while the service associated with the
embed does not have consent. This placeholder will display some information
to the user about what they're currently missing out on, why this piece of
content is not being displayed to them and what they need to do to have this
content shown to them – as well as a direct call to action allowing them to
consent to the affected service and load the embed's content.

You can customize the look & feel of these placeholders in three ways. You can:
 - change the (text) content rendered into it through the
   ConsentSettings object – in general and per service,
 - change the styling for all placeholders using (S)CSS,
 - modify the behaviour – in general and per service – through a number of flags
   in ConsentSettings.


###### Changing the text content: Template strings & i18n

Functionality to provide native l10n / i18n is on the roadmap, but currently
implemented yet. In the meantime, you will have to pre-select translations for
your text fragments before initializing consent-tools and pass the localized
strings to the ConsentSettings constructor.

```js
const currentLocale = await getCurrentLocale();
const { defaultStrings, stringsByService } = await getConsentManagementStrings(currentLocale);

new ConsentSettings(
    {...defaults, ...defaultStrings},
    {...services, ...stringsByService},
);

// ...where `getConsentManagementStrings()` might be a function reading from
// a YAML object, or from your application's backend...
import strings from './strings.yaml';
async function getConsentManagementStrings(locale = 'en') {
    const localizedStrings = {};

    Object.keys(strings).forEach(key => {
        localizedStrings[key] = strings[key][locale];
    });

    return localizedStrings;
}

async function getConsentManangementStrings(locale = 'en') {
    const res = await fetch(`/wp-json/ghwp/v1/cm/strings?lang=${locale}`);
    return await res.json();
}
```


Using the ConsentSettings, you can display different text content in the
placeholders depending on which service is used:

```js
new ConsentSettings(
    {
        description: 'We can only load this external service if you allow us to by clicking the button below.',
    },
    {
        exampleKittenService: {
            description: 'Example Kitten Service requires your explicit consent so we can use it to show you kittens.',
        }
    },
)
```

This setup will display the first string in all placeholders except those
associated with the serviceId `exampleKittenService`.

In certain text fragments, you can use specific template placeholders to modify
the output depending on other settings:

```js
new ConsentSettings(
    {
        description: 'We can only load %servicePrettyName% if you allow us to by clicking the button below.',
        servicePrettyName: 'this service',
    },
    {
        examplePuppyService: {
            servicePrettyName: 'Example Puppy Service',
        },
        exampleKittenService: {
            description: 'Example Kitten Service requires your explicit consent so we can use it to show you kittens.',
        }
    },
)
```

This setup would produce the following descriptions:

| service | description |
| --- | --- |
| exampleKittenService | Example Kitten Service requires your explicit consent so we can use it to show you kittens.
| examplePuppyService | We can only load Example Puppy Service if you allow us to by clicking the button below.
| exampleRandomService | We can only load this external service if you allow us to by clicking the button below.


Another special template placeholder concerns the URL to your privacy policy
page. You can define the base URL to the page and then additionally link to
specific sections / subpages depending on the service:

```js
new ConsentSettings(
    {
        description: `We can only load %servicePrettyName% if you allow us to by
clicking the button below. Read more in <a href="%privacyPolicyUrl%">our privacy
policy statement</a>.`,
        servicePrettyName: 'this service',
        privacyPolicyUrl: '/legal/privacy',
    },
    {
        examplePuppyService: {
            servicePrettyName: 'Example Puppy Service',
            privacyPolicySection: '#puppies',
        },
        exampleKittenService: {
            description: 'Example Kitten Service requires your explicit consent so we can use it to show you kittens.',
        }
    },
)
```


This setup would produce the following links in the descriptions:

| service | link target |
| --- | --- |
| exampleKittenService | <none>
| examplePuppyService | /legal/privacy#puppies
| exampleRandomService | /legal/privacy



###### Changing the design: Placeholder Styling

###### Changing the behaviour

##### Iframe Embed

##### Lightbox Embed

##### Remote Script Embed

Manages execution of remote script elements based on user consent.

You will have to modify the attributes of your script element(s) for this to
work:

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
specifying the type as `text/plain` you make sure the browser won't
automatically execute the script.

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
new ConsentManager(cmpService, settings, { debug: true });
```

Most modules will use the setting defined in the ConsentSettings instance
passed to them by default:
```js
cs = new ConsentSettings({ debug: true });
new EmbedFactory(consentManager, cs);
```

### Styling

You can use the bundled CSS files for some default styling at `/dist/css/`.
Alternatively you can compile your own "theme" using the SCSS modules in `/scss/`,
overriding the default variables as you see fit.

```scss
@use '@gebruederheitz/consent-tools/scss' with (
    $button-color: hotpink,
    $button-text-color: #b00,
);
```


#### Loading spinner

An optional feature is the loading spinner provided through the (S)CSS and
scripts. By adding the class `ghct-loader` to your embed or its container,
that element will automatically display a simple loading spinner element which
fades out as soon as the consent status is determined and either the placeholder
is shown or the embed is loaded. You only need to make certain you're including
the `/scss/module/loader.scss` on way or another.



## Development

Run `make`, `make dev` or `npm run watch` to start a development watch server
using `./test/test-implementation` (bundled to `./demo/demo-bundle.js`) and the
files in `./demo` for an example implementation.

`make test` or `npm run lint` will lint all the source scripts and stylesheets.

`make build` or `npm run build` will create production builds in ES module and
UMD formats.


### To do

 - [ ] Extend documentation (usage, development)
 - [ ] Migrate default styles for all modules
 - [x] Make all modules use ConsentManager consistently
 - [x] Create interface for CMP services
 - [x] Implement service interface on Usercentrics service
 - [x] Pass CMP service to ConsentManager at init
 - [ ] Fix debug configuration (use ConsentSettings consistently)
 - [ ] Add i10n/i18n


## Migrating

### 2.x to 3.x

You will only have to change anything if you have implemented a custom
`CmpServiceProvider` or have used the `onConsent()` method of a provider
directly (i.e. not through the `wtihConsent*()` methods of `ConsentManager`).

To clarify the intentions, that method has been renamed to `onConsentUpdate()`,
as it should trigger on any consent change and call the callback with a boolean
indicating the new status.
