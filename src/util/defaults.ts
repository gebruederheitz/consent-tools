import type {
    CategoryRecord,
    ConsentToolsAppSettings,
    ConsentToolsSettings,
} from './settings/types';
import {
    Category,
    DefaultTierLabels,
    PermanentConsentType,
} from './settings/types';
import { Translatable } from './i18n';

export const DEFAULT_SETTINGS: ConsentToolsSettings = {
    permanentConsentType: PermanentConsentType.CHECKBOX,
    reloadOnConsent: false,
    clickOnConsent: false,
    defaultLoadAll: true,
    additionalServices: [],
    cmpServiceId: null,
    modalOpenerButton: true,
    privacyPolicySection: '',
};

const DefaultCategoryLabels: CategoryRecord = {
    [Category.UNKNOWN]: {
        label: Translatable.category_Unknown_Label,
        color: '#ccc',
    },
    [Category.FUNCTIONAL]: {
        label: Translatable.category_Functional_Label,
        color: '#0b0',
    },
    [Category.MARKETING]: {
        label: Translatable.category_Marketing_Label,
        color: '#d80',
    },
    [Category.ANALYTICS]: {
        label: Translatable.category_Analytics_Label,
        color: '#d59',
    },
    [Category.ESSENTIAL]: {
        label: Translatable.category_Essential_Label,
        color: '#0be',
    }
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
