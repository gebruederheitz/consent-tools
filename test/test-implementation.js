import whenDomReady from 'when-dom-ready';
import {
    ConsentManager,
    ElementsConsentManager,
    EmbedFactory,
    // LightboxEmbed,
    // IframeEmbed,
    // ModalConsentManager,
    UsercentricsProvider,
    // GenericEventProvider,
    GenericLocalStorageProvider,
    toggleDebugOutput,
    ConsentSettings,
} from '../dist/index.mjs';

toggleDebugOutput(true);

whenDomReady().then(async () => {
    const types = {
        Foobar: {
            servicePrettyName: 'Foobar Analytics Ltd.',
            titleText: 'We need your consent to use the service Foobar',
            modalOpenerButton: true,
            skipCheckbox: true,
            // defaultLoadAll: false,
            description:
                'Actually dolore small batch trust fund next level, hot chicken mustache single-origin coffee. Qui pop-up disrupt hammock intelligentsia master cleanse. Portland artisan kickstarter neutra, everyday carry consectetur est activated charcoal air plant lorem cupidatat scenester. Lorem subway tile exercitation pinterest veniam poke.',
            isEssential: true,
        },
        Econda: {
            servicePrettyName: 'Econda',
            description:
                'Knausgaard actually live-edge, air plant vexillologist aliqua scenester letterpress master cleanse stumptown sustainable. Mollit wayfarers sartorial aute nisi af art party humblebrag lyft dolore enamel pin activated charcoal ut. +1 occaecat lyft try-hard tacos vegan in palo santo hexagon fixie cray. Ugh chambray trust fund normcore crucifix franzen. Paleo sunt tumblr, lo-fi iPhone portland truffaut ethical slow-carb distillery try-hard. Crucifix migas commodo, mollit forage sartorial glossier distillery. Celiac kickstarter meh lomo magna qui locavore post-ironic austin typewriter narwhal in.',
        },
        test: {
            servicePrettyName: 'Test Service Tracking',
            cmpServiceId: 'Test Service',
        },
    };

    const settings = new ConsentSettings(
        {
            description:
                'In oder to view this content from, you will need to activate it by clicking the button below. This may cause data to be transmitted to the service provider %servicePrettyName%. You can find more information in our <a href="%privacyPolicyUrl%%privacyPolicySection%">privacy policy declaration</a>.',
            privacyPolicyUrl: '/privacy',
            titleText: 'We need your consent!',
            modalOpenerButton: true,
        },
        types
    );

    // const cmpService = await new UsercentricsProvider({
    //     fallbackServiceProvider: GenericLocalStorageProvider,
    // });
    const cmpService = new GenericLocalStorageProvider({ types });
    cmpService.attachSettingsOpener('[href="#modal-opener"]');

    const consentManager = new ConsentManager(cmpService, settings);

    new ElementsConsentManager(consentManager, settings);

    new EmbedFactory(consentManager, settings);

    function onConsentForService() {
        console.log('User has given their consent for this service!');
    }

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
