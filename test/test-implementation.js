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
            titleText: 'Bitte stimmen sie der Nutzung des Service Foobar zu!',
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
    };

    const settings = new ConsentSettings(
        {
            description:
                'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch werden Informationen an den Diensteanbieter %servicePrettyName% übermittelt und dort gespeichert. Mehr Informationen finden in der <a href="%privacyPolicyUrl%%privacyPolicySection%">Datenschutzerklärung</a>.',
            privacyPolicyUrl: '/privacy',
            titleText: 'Wir brauchen ihre Zustimmung!',
        },
        types
    );

    // const cmpService = await new UsercentricsProvider({
    //     fallbackServiceProvider: GenericLocalStorageProvider,
    // });
    const cmpService = new GenericLocalStorageProvider({ types });
    cmpService.attachSettingsOpener('[href="#modal-opener"]');

    const consentManager = new ConsentManager(cmpService);

    new ElementsConsentManager(consentManager, settings);

    new EmbedFactory(consentManager, settings);

    function onConsentForService() {
        console.log('User has given their consent for this service!');
    }

    consentManager.withConsent('Foobar', onConsentForService).then();

    window.__debug = window.__debug || {};
    window.__debug = {
        ...window.__debug,
        cmpService,
        consentManager,
        settings,
    };
});
