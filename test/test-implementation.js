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

    const cmpService = await new UsercentricsProvider({
        fallbackServiceProvider: GenericLocalStorageProvider,
    }).init();
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
