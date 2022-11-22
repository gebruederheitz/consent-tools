import whenDomReady from 'when-dom-ready';
import {
    ConsentManager,
    ElementsConsentManager,
    EmbedFactory,
    UsercentricsProvider,
    GenericLocalStorageProvider,
    toggleDebugOutput,
    ConsentSettings,
} from '../dist/index.mjs';

import { LightboxFactory } from '@gebruederheitz/wp-block-video-overlay/dist/frontend.js';

toggleDebugOutput(true);

whenDomReady().then(async () => {
    const types = {
        Foobar: {
            servicePrettyName: 'Foobar Analytics Ltd.',
            titleText: 'We need your consent to use the service Foobar',
            modalOpenerButton: true,
            skipCheckbox: true,
        },
    };

    const settings = new ConsentSettings(
        {
            description:
                'In oder to view this content, you will need to activate it by clicking the button below. This may cause data to be transmitted to the service provider %servicePrettyName%. You can find more information in our <a href="%privacyPolicyUrl%%privacyPolicySection%">privacy policy declaration</a>.',
            privacyPolicyUrl: '/privacy',
            titleText: 'We need your consent!',
            modalOpenerButton: true,
            lightboxFactory: new LightboxFactory(false),
        },
        types
    );

    const cmpService = await new UsercentricsProvider({
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

    window.__debug = window.__debug || {};
    window.__debug = {
        ...window.__debug,
        cmpService,
        consentManager,
        settings,
    };
});
