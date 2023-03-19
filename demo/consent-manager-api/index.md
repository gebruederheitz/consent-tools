---
layout: layout-base.njk
tags: demo
title: Consent-Manager API
heading: The public-facing API of consent-manager
navOrder: 50
---

The `ConsentManager` aims to be a universal interface to consent management,
unifying the diversity of differing implementations for the same basic
functionality used across various CM platforms, services and utilities. It's
the developer's friend by allowing them to separate their application's code
from the specifics of the consent management provider used.

It is initialised with an instance of `CmpServiceProvider`, which does all the
heavy lifting – `consent-tools` ships with a selection of such providers
(specifically for OneTrust, Usercentrics, and our very own ConsentToolsProvider),
but you can easily build your own by implementing `CmpServiceProvider` or by
extending the slightly opinionated `AbstractProvider`.


## new ConsentManager

```ts
new ConsentManager(
  cmpProvider: CmpServiceProvider,
  settings: ConsentSettings,
  userOptions: ConsentManagerOptions
): ConsentManager
```

The consent-manager's constructor accepts the following arguments:

| name  | type | default | description |
| --- | --- | --- | --- |
| cmpProvider | `CmpServiceProvider` | - | Your provider's implementation of the `CmpServiceProvider` interface, like `UsercentricsProvider` or our own `ConsentToolsProvider`.
| settings | `ConsentSettings` | - | An instance of `ConsentSettings`, which represents your application's global configuration and will be used by the provider instance, the embed modules etc.
| userOptions | `ConsentManagerOptions` | `{ debug: false }` | An object containing additional options – currently it only allows you enable debug output for this module.


## acceptService

```ts
acceptService(serviceId: string): void
```

Tells the provider that consent for the service identified by the given ID has
been granted by the user. This is used by the various embed modules to react to
a click of the "Load embed" button in the placeholders, for example.

## getServiceConsentStatus

```ts
async getServiceConsentStatus(serviceId: string): Promise<boolean>
```

For any given service identifier, this method will return a promise object
resolving to the service's current user consent status. Be aware, however, that
this value might change as the application initializes, users change their
preferences or other applications modify the status. If you need to be kept up
to date with the service's consent status, you should rather use
[`withConsentOrDenial()`](#withconsentordenial).

## showSettings

```ts
showSettings(): void
```

Tells the provider to display their settings – i.e. the consent modal or "cookie
banner".

## showSettingsAtService

```ts
showSettingsAtService(serviceId: string): void
```

Tells the provider to display their settings with details for a particular
service – if applicable, since not all CMPs offer a straightforward way for
this.

## withConsent

```ts
async withConsent<A extends unknown[]>(
  serviceId: string,
  callback: (...args: A) => void,
  ...args: A
): Promise<void>
```

The callback you provide will be called with `...args` once the service
identified by `serviceId` gets user consent; if it already exists it will be
called immediately. Your callback might be called multiple times.

This is especially handy for executing an optional script depending on the
consent status of a service:

```js
consentManager.withConsent(
    'matomo',
    () => {
        window.matomo.pageViewAnonymous();
    }
);
```


## withConsentOrDenial

```ts
async withConsentOrDenial<A extends Args>(
    serviceId: string,
    callback: (status: boolean, ...args: A) => void,
    ...args: A
): Promise<void>
```

Executes your callback everytime the given service's consent status changes,
with the new status as the first parameter followed by the `args` you provide.

### Example

```js
const services = [
    { id: 'matomo', name: 'Matomo' },
    { id: 'youtube', name: 'YouTube' }
];

services.forEach(({ id, name }) => {
  consentManager.withConsentOrDenial(
      id,
      (status, serviceName) => {
          console.log(`The service ${serviceName} now ${status ? 'has' : 'does not have'} user consent.`);
      },
      name
  );
});
```
