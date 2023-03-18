import { LightboxFactory } from '@gebruederheitz/wp-block-video-overlay/dist/frontend.js';

import whenDomReady from 'when-dom-ready';
import {
    ConsentManager,
    ElementsConsentManager,
    EmbedFactory,
    // LightboxEmbed,
    // IframeEmbed,
    // ModalConsentManager,
    // UsercentricsProvider,
    // GenericEventProvider,
    // GenericLocalStorageProvider,
    debug,
    ConsentSettings,
} from '../dist/index.mjs';

import { ConsentToolsProvider } from '../dist/provider/consent-tools.mjs';
import SvelteModal from '../dist/modal.mjs';

debug.toggle(true);

whenDomReady().then(async () => {
    const types = {
        Foobar: {
            servicePrettyName: {
                en: 'Foobar Analytics Ltd.',
            },
            titleText: {
                en: 'We need your consent to use the service Foobar',
            },
            // defaultLoadAll: false,
            placeholderBody: {
                en: 'Actually dolore small batch trust fund next level, hot chicken mustache single-origin coffee. Qui pop-up disrupt hammock intelligentsia master cleanse. Portland artisan kickstarter neutra, everyday carry consectetur est activated charcoal air plant lorem cupidatat scenester. Lorem subway tile exercitation pinterest veniam poke.',
            },
            tier: 1,
            privacyPolicySection: 'foobar',
            serviceDescription: {
                en: 'Used to track anonymous usage data in order to improve our services.',
            },
            permanentConsentType: 'button',
            defaultLoadAll: false,
        },
    };

    const settings = new ConsentSettings(
        {
            debug: true,
            placeholderBody: {
                en: 'In oder to view this content, you will need to activate it by clicking the button below. This may cause data to be transmitted to the service provider %servicePrettyName%. You can find more information in our <a href="%privacyPolicyUrl%%privacyPolicySection%">privacy policy declaration</a>.',
            },
            privacyPolicyUrl: '/privacy',
            titleText: { en: 'We need your consent!' },
            modalOpenerButton: true,
            lightboxFactory: new LightboxFactory(false),
        },
        types
    );

    const cmpService = await new ConsentToolsProvider(settings, types, {
        modalComponent: SvelteModal,
    });
    cmpService.attachSettingsOpener('[href="#modal-opener"]');

    const consentManager = new ConsentManager(cmpService, settings);

    new ElementsConsentManager(consentManager, settings);

    new EmbedFactory(consentManager, settings);

    window.__debug = window.__debug || {};
    window.__debug = {
        ...window.__debug,
        cmpService,
        consentManager,
        settings,
    };
});
