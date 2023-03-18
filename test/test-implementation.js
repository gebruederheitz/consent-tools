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
        consenttools: {
            servicePrettyName: {
                en: 'Consent Tools',
            },
            tier: 0,
            serviceDescription: {
                en: "The tool that manages your consent (and creates this banner). Your choices are written to your browser's local storage so you don't have to choose every time you visit the site.",
            },
            category: 'essential',
        },
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
        },
        Econda: {
            servicePrettyName: {
                en: 'Econda',
            },
            placeholderBody: {
                en: 'Knausgaard actually live-edge, air plant vexillologist aliqua scenester letterpress master cleanse stumptown sustainable. Mollit wayfarers sartorial aute nisi af art party humblebrag lyft dolore enamel pin activated charcoal ut. +1 occaecat lyft try-hard tacos vegan in palo santo hexagon fixie cray. Ugh chambray trust fund normcore crucifix franzen. Paleo sunt tumblr, lo-fi iPhone portland truffaut ethical slow-carb distillery try-hard. Crucifix migas commodo, mollit forage sartorial glossier distillery. Celiac kickstarter meh lomo magna qui locavore post-ironic austin typewriter narwhal in.',
            },
            titleText: {
                en: 'We need your consento',
            },
            tier: 1,
        },
        test: {
            servicePrettyName: {
                en: 'Test Service Tracking',
            },
            // cmpServiceId: 'Test Service',
            modalOpenerButton: false,
            permanentConsentType: 'button',
            // permanentConsentType: 'none',
            defaultLoadAll: false,
            tier: 1,
            category: 'marketing',
        },
    };

    const defaults = {
        placeholderBody: {
            en: 'In oder to view this content from, you will need to activate it by clicking the button below. This may cause data to be transmitted to the service provider %servicePrettyName%. You can find more information in our <a href="%privacyPolicyUrl%%privacyPolicySection%">privacy policy declaration</a>.',
        },
        privacyPolicyUrl: '/privacy',
        titleText: {
            en: 'We need your consent!',
        },
        modalOpenerButton: true,
        // permanentConsentType: 'button',
        debug: true,
        categories: {
            essential: {
                label: {
                    en: 'Essssentials',
                },
                color: 'hotpink',
            },
        },
    };

    const settings = new ConsentSettings(defaults, types);

    // const cmpService = await new UsercentricsProvider({
    //     fallbackServiceProvider: GenericLocalStorageProvider,
    // });
    // const cmpService = new GenericLocalStorageProvider({ types, settings });
    const cmpService = new ConsentToolsProvider(settings, types, {
        modalComponent: SvelteModal,
    });
    cmpService.attachSettingsOpener('[href="#modal-opener"]');

    const consentManager = new ConsentManager(cmpService, settings);

    new ElementsConsentManager(consentManager, settings, { debug: true });

    new EmbedFactory(consentManager, settings, { debug: true });

    function onConsentForService() {
        console.log('User has given their consent for this service!');
    }

    console.log({ settings });

    consentManager.withConsent('Foobar', onConsentForService).then();
    consentManager
        .withConsent('test', () => {
            console.log('Test Service accepted!');
        })
        .then();

    window.__debug = window.__debug || {};
    window.__debug = {
        ...window.__debug,
        cmpService,
        consentManager,
        settings,
    };
});
