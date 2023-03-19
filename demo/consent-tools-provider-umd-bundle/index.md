---
layout: layout-base.njk
tags: demo
title: Consent-Tools Provider UMD Bundle Test Page
navOrder: 1100
script:
---

```html
<script src="/dist/consent-tools.umd.js" />
<style>
    .iframe-container {
        overflow: hidden;
        position: relative;
    }
</style>
<iframe
    data-ghct-src="/iframe"
    data-ghct-type="dummy"
    data-ghct-name="Dummy Service"
    data-ghct-tier="1"
    data-ghct-category="functional"
/>

<script>
    const {
        ConsentSettings,
        ConsentToolsProvider,
        ConsentManager,
        EmbedFactory,
        SvelteModal
    } = window.ghconsent;
    const settings = new ConsentSettings(
        {debug: true},
        {},
    );
    const provider = new ConsentToolsProvider(settings, {modalComponent: SvelteModal, useServiceDiscovery: true});
    const consentManager = new ConsentManager(provider, settings);
    new EmbedFactory(consentManager, settings);
    provider.attachSettingsOpener('[href="#modal-opener"]');
    window.debug = { SvelteModal, settings, provider, consentManager };
</script>
```

<div class="example">
<link rel="stylesheet" href="/dist/consent-tools-modal.css" />
<link rel="stylesheet" href="/dist/css/index.css" />
<style>
    .iframe-container {
        overflow: hidden;
        position: relative;
    }
</style>
<script src="/dist/consent-tools.umd.js"></script>

<div class="iframe-container">
  <iframe
   height="500"
   data-ghct-src="/iframe"
   data-ghct-type="dummy"
   data-ghct-name="Dummy Service"
   data-ghct-tier="1"
   data-ghct-category="functional"
  >
  </iframe>
</div>

<a href="#modal-opener">Consent Management</a>

<script>
    const {
        ConsentSettings,
        ConsentToolsProvider,
        ConsentManager,
        EmbedFactory,
        SvelteModal
    } = window.ghconsent;
    const settings = new ConsentSettings(
        {debug: true},
        {},
    );
    const provider = new ConsentToolsProvider(settings, {modalComponent: SvelteModal, useServiceDiscovery: true});
    const consentManager = new ConsentManager(provider, settings);
    new EmbedFactory(consentManager, settings);
    provider.attachSettingsOpener('[href="#modal-opener"]');
    window.debug = { SvelteModal, settings, provider, consentManager };
</script>
</div>
