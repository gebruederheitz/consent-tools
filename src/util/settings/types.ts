import type { LightboxFactoryInterface } from '../lightbox-factory-interface';
import type { Value } from 'classnames';

export enum PermanentConsentType {
    CHECKBOX = 'checkbox',
    BUTTON = 'button',
    NONE = 'none',
}

export enum Tier {
    ESSENTIAL,
    MODERATE,
    FULL,
}

export const DefaultTierLabels: Record<Tier, TranslatableSetting> = {
    [Tier.ESSENTIAL]: {
        en: 'Essentials (Red)',
    },
    [Tier.MODERATE]: {
        en: 'Moderate (Amber)',
    },
    [Tier.FULL]: {
        en: 'Full (Green)',
    },
};

export type TranslatableSetting = {
    [locale: string]: string;
};

export interface ConsentToolsSettings {
    additionalServices?: Array<string>;
    buttonText?: TranslatableSetting;
    checkboxLabel?: TranslatableSetting; // @TODO: Change to permanentConsentLabel
    checkboxProviderName?: TranslatableSetting; // @TODO Change to permanentConsentProviderName
    clickOnConsent?: boolean;
    cmpServiceId?: string | null;
    defaultLoadAll?: boolean;
    modalOpenerButton?: boolean;
    modalOpenerButtonText?: TranslatableSetting;
    permanentConsentType?: PermanentConsentType;
    privacyPolicySection?: string;
    placeholderBody?: TranslatableSetting;
    reloadOnConsent?: boolean;
    serviceDescription?: TranslatableSetting;
    servicePrettyName?: TranslatableSetting;
    titleText?: TranslatableSetting;
}

export interface ConsentToolsProviderService extends ConsentToolsSettings {
    tier?: Tier;
    category?: string;
}

export type CategoryRecord = Record<
    string,
    { label: TranslatableSetting; color?: string }
>;

export type ConsentToolsAppSettings = {
    attributesPrefix: string;
    autoloadOnButtonClick: boolean;
    debug: boolean;
    lightboxFactory: LightboxFactoryInterface | null;
    privacyPolicyUrl: string;
    categories: CategoryRecord;
    tiers: Record<Tier, TranslatableSetting>;
};

export type Setting = Record<
    string,
    Value | TranslatableSetting | PermanentConsentType
>;

export type TranslatableRecord = Record<string, TranslatableSetting>;
