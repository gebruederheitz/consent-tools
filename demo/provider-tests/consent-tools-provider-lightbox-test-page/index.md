---
layout: basic
tags: provider-tests
title: Consent-Tools Provider Lightbox Test Page
navOrder: 1050
---

This demo is using the lightbox factory from `@gebruederheitz/wp-block-video-overlay`
to generate a lightbox whose content will be conditionally loaded based on user
consent.

```js
whenDomReady().then(async () => {
    const types = {
        Foobar: {
            servicePrettyName: {
                en: 'Foobar Video Streaming',
            },
            tier: 1,
            permanentConsentType: 'button',
            defaultLoadAll: false,
        },
    };

    const settings = new ConsentSettings(
        {
            /* ... */
            lightboxFactory: new LightboxFactory(false),
        },
        types
    );

    const cmpService = await new ConsentToolsProvider(settings, types, {
        modalComponent: SvelteModal,
    });

    const consentManager = new ConsentManager(cmpService, settings);

    new ElementsConsentManager(consentManager, settings);

    new EmbedFactory(consentManager, settings);
});
```

```html
<div class="ghwp-video">
    <a
        class="ghwp-video-link"
        data-ghct-src="https://www.youtube.com/watch?v=mELJ1UMUzbM"
        data-ghct-type="Foobar"
    >
        <!-- This image is ideally cached and served from your server, so no
             request to YouTube's servers is made before consent is given -->
        <img
            loading="lazy"
            width="480"
            height="270"
            src="https://img.youtube.com/vi/DMfldXcCL8A/hqdefault.jpg"
            alt="Video thumbnail image from Youtube"
            class="ghwp-video__thumb"
        />
        <svg
            class="icon-play-circle"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
        >
            <path
                d="M50,100a50,50,0,1,1,50-50A50.0575,50.0575,0,0,1,50,100ZM50,6.7754A43.224,43.224,0,1,0,93.2235,50,43.2732,43.2732,0,0,0,50,6.7754Z"/>
            <polygon
                points="39.724 67.356 39.72 32.644 69.585 50 39.724 67.356"/>
        </svg>
    </a>
</div>
```

<div class="example">
<link rel="stylesheet" href="/assets/video-overlay.css" />
<link rel="stylesheet" href="/assets/glightbox.min.css" />
<link rel="stylesheet" href="/dist/consent-tools-modal.css" />
<link rel="stylesheet" href="/dist/css/index.css" />

<style>
    .button-container {
        display: flex;
        margin-bottom: 2rem;
        justify-content: center;
    }
</style>


<div class="ghwp-video">
    <a class="ghwp-video-link"
       data-ghct-src="https://www.youtube.com/watch?v=mELJ1UMUzbM"
       data-ghct-type="Foobar"
    >
        <img loading="lazy"
             width="480"
             height="270"
             src="https://img.youtube.com/vi/DMfldXcCL8A/hqdefault.jpg"
             alt="Video thumbnail image from Youtube"
             class="ghwp-video__thumb"
        />
        <svg
            class="icon-play-circle"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
        >
            <path
                d="M50,100a50,50,0,1,1,50-50A50.0575,50.0575,0,0,1,50,100ZM50,6.7754A43.224,43.224,0,1,0,93.2235,50,43.2732,43.2732,0,0,0,50,6.7754Z"/>
            <polygon
                points="39.724 67.356 39.72 32.644 69.585 50 39.724 67.356"/>
        </svg>
    </a>
</div>


<!-- The settings opener to administer the CMP -->
<div class="button-container">
    <a class="button" href="#modal-opener">Modal-Opener</a>
</div>


<!-- The actual consent-tools bundle -->
<script src="/assets/test-bundle-lightbox.js"></script>
</div>
