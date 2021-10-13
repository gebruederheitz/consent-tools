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
    document.querySelector('#eloqua-button').addEventListener('click', () => {
        console.log('blargo eloqua!');
    });

    const types = {
        Econda: {
            prettyName: 'Test Service',
            checkboxProviderName: 'Salesforce Live Agent',
            // skipCheckbox: true,
            // modalOpenerButton: true,
            titleText: 'Bitte stimmen sie der Nutzung des Test Service zu!',
        },
    };

    const settings = new ConsentSettings(
        {
            description:
                'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch werden Informationen an den Diensteanbieter übermittelt und dort gespeichert. Mehr Informationen finden in der <a href="%privacyPolicyUrl%%privacyPolicySection%">Datenschutzerklärung</a>',
            privacyPolicyUrl: '/privacy',
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

    consentManager.withConsent('Econda', onConsentForService).then();

    window.__debug = {
        cmpService,
        consentManager,
        settings: new ConsentSettings({ debug: true, nonsense: 'haxxorz' }),
    };
});
