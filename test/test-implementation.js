import whenDomReady from 'when-dom-ready';
import {
    ConsentManager,
    ElementsConsentManager,
    GdprEmbedFactory,
    // GdprLightboxEmbed,
    // GdprIframeEmbed,
    // ModalGdprManager,
    // Usercentrics,
} from '../dist/index.mjs';

import { eventProxy, gtm } from '../src/get-gdpr-utils';


const embedsConfig = {
    useUC: true,
    types: {
        'Test Service': {
            ucConsentName: 'Test Service',
            ucTemplateId: 'lgXw0VvDj',
            providerDisplayName: 'Test Service',
            checkboxProviderName: 'Salesforce Live Agent',
            // skipCheckbox: true,
            // modalOpenerButton: true,
            titleText: 'Bitte stimmen sie der Nutzung des Test Service zu!',
        },
    },
    defaultTextContent:
        'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch werden Informationen an den Diensteanbieter übermittelt und dort gespeichert. Mehr Informationen finden in der <a href="%privacyPolicyUrl%%privacyPolicySection%">Datenschutzerklärung</a>',
    privacyPolicyUrl: '/privacy',
};

// Get detailed debugging output from the various modules
const debug = true;

// Conditionally execute scripts based on user consent to services
const consentManager = new ConsentManager(
    { embeds: embedsConfig, debug },
    gtm,
    eventProxy
);
new ElementsConsentManager(consentManager, {
    embeds: embedsConfig,
    debug,
    reloadOnConsent: false,
    clickOnConsent: true,
});

new GdprEmbedFactory({}, consentManager);

function onConsentForService() {
    console.log('User has given their consent for this service!');
}

consentManager.withConsent('Test Service', onConsentForService).then();
