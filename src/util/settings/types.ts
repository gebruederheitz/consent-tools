import type { LightboxFactoryInterface } from '../lightbox-factory-interface';
import type { Value } from 'classnames';
import { Translatable } from '../i18n';

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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Tier {
    export function toString(tier: Tier) {
        switch (tier) {
            case Tier.ESSENTIAL:
                return 'Essentials';
            case Tier.FULL:
                return 'Everything';
            case Tier.MODERATE:
                return 'Moderate';
        }
    }
}

export const DefaultTierLabels: Record<Tier, Translatable> = {
    [Tier.ESSENTIAL]: Translatable.tier_Red_PrettyName,
    [Tier.MODERATE]: Translatable.tier_Amber_PrettyName,
    [Tier.FULL]: Translatable.tier_Green_PrettyName,
};

export enum Category {
    UNKNOWN = '',
    FUNCTIONAL = 'functional',
    ANALYTICS = 'analytics',
    MARKETING = 'marketing',
    ESSENTIAL = 'essential',
}

export const CategoryFrom = (c: Category | string): Category  => {
    if (!(c in Category)) {
        const entries = Object.entries(Category);
        const entry = entries.find(([v]) => {
            return v === c;
        });
        return (entry ? entry[0] : Category.UNKNOWN) as Category;
    } else {
        return c as Category;
    }
};

export interface ConsentToolsSettings {
    additionalServices?: Array<string>;
    clickOnConsent?: boolean;
    cmpServiceId?: string | null;
    defaultLoadAll?: boolean;
    modalOpenerButton?: boolean;
    permanentConsentType?: PermanentConsentType;
    privacyPolicySection?: string;
    reloadOnConsent?: boolean;
}

export interface ConsentToolsProviderService extends ConsentToolsSettings {
    tier?: Tier;
    category?: Category;
}

export type CategoryRecord = Record<
    Category,
    { label: Translatable; color?: string }
>;

export type ConsentToolsAppSettings = {
    attributesPrefix: string;
    autoloadOnButtonClick: boolean;
    debug: boolean;
    lightboxFactory: LightboxFactoryInterface | null;
    privacyPolicyUrl: string;
    categories: CategoryRecord;
    tiers: Record<Tier, Translatable>;
};

export type Setting = Record<
    string,
    Value | PermanentConsentType
>;
