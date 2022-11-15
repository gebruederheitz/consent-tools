import whenDomReady from 'when-dom-ready';
import {
    ConsentManager,
    ElementsConsentManager,
    EmbedFactory,
    // LightboxEmbed,
    // IframeEmbed,
    // ModalConsentManager,
    // UsercentricsProvider,
    OneTrustProvider,
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
            cmpServiceId: 'V1',
            // defaultLoadAll: false,
        },
        test: {
            servicePrettyName: 'Test Service Tracking',
            cmpServiceId: 'V3',
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

    const cmpService = await new OneTrustProvider({
        fallbackServiceProvider: GenericLocalStorageProvider,
    });
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
