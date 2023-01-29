import type {
    ConsentToolsAppSettings,
    ConsentToolsSettings,
} from './settings/types';
import type  { CategoryRecord } from './settings/types';

import { DefaultTierLabels, PermanentConsentType } from './settings/types';

export const DEFAULT_SETTINGS: ConsentToolsSettings = {
    permanentConsentType: PermanentConsentType.CHECKBOX,
    reloadOnConsent: false,
    clickOnConsent: false,
    defaultLoadAll: true,
    additionalServices: [],
    cmpServiceId: null,
    modalOpenerButton: true,
    privacyPolicySection: '',
    buttonText: {
        en: 'Load this content once',
        de: 'Inhalt einmal laden',
    },
    checkboxLabel: {
        en: 'Apply to all content of this type',
        de: 'Für alle Inhalte dieser Art übernehmen',
    },
    checkboxProviderName: {
        en: 'by this provider',
        de: 'dieses Anbieters',
    },
    modalOpenerButtonText: {
        en: 'More information',
        de: 'Mehr Informationen',
    },
    placeholderBody: {
        en: 'In order to view this content from a third-party provider, you will need to activate it by clicking the button below. Some personal information may be transferred and saved there as a result.',
        de: 'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch werden Informationen an den Diensteanbieter übermittelt und dort gespeichert.',
    },
    serviceDescription: { en: '', de: '' },
    servicePrettyName: { en: '', de: '' },
    titleText: { en: '', de: '' },
};

const DefaultCategoryLabels: CategoryRecord = {
    functional: {
        label: {
            en: 'Functional',
        },
        color: '#0b0',
    },
    marketing: {
        label: {
            en: 'Marketing',
        },
    },
};

export const DEFAULT_APP_SETTINGS: ConsentToolsAppSettings = {
    attributesPrefix: 'ghct',
    autoloadOnButtonClick: true,
    debug: false,
    lightboxFactory: null,
    privacyPolicyUrl: '/legal',
    categories: DefaultCategoryLabels,
    tiers: DefaultTierLabels,
};
