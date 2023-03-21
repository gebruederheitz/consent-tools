import { Translatable } from './translatables';
import type { Dictionary } from '../translator';

export const en: Dictionary = {
    [Translatable.ph_Body]: 'In order to view this content from a third-party provider, you will need to activate it by clicking the button below. Some personal information may be transferred and saved there as a result.',
    [Translatable.ph_ButtonText]: 'Load once',
    [Translatable.ph_PermanentConsentLabel]: 'Load & save preference',
    [Translatable.ph_ModalOpenerButtonText]: 'Details',
    [Translatable.ph_TitleText]: 'We need your consent for using %servicePrettyName%',

    [Translatable.serviceDescription]: '',
    [Translatable.servicePrettyName]: '',

    [Translatable.tier_Green_PrettyName]: 'MVP / Full (Green)',
    [Translatable.tier_Green_Tagline]: 'Do what you like.',
    [Translatable.tier_Green_Description]: 'Help us improve our website & monetise our content with marketing services',
    [Translatable.tier_Amber_PrettyName]: 'Best Experience / Moderate (Amber)',
    [Translatable.tier_Amber_Tagline]: 'Anonymous data for statistics & comfortable page use',
    [Translatable.tier_Amber_Description]: 'Anonymous analytics to improve our service and some third-party services to serve you content',
    [Translatable.tier_Red_PrettyName]: 'Highest Privacy / Essentials (Red)',
    [Translatable.tier_Red_Tagline]: 'Only what\'s absolutely necessary!',
    [Translatable.tier_Red_Description]: 'Only what\'s absolutely necessary from a technical perspective.',

    [Translatable.category_Unknown_Label]: 'Unknown',
    [Translatable.category_Marketing_Label]: 'Marketing',
    [Translatable.category_Analytics_Label]: 'Analytics',
    [Translatable.category_Functional_Label]: 'Functional',
    [Translatable.category_Essential_Label]: 'Essential',

    [Translatable.tab_Overview]: 'Overview',
    [Translatable.tab_Services]: 'Services & Cookies',
    [Translatable.overview_Title]: 'Choose your preference',
    [Translatable.overview_Subtitle]: 'Privacy Settings',
    [Translatable.overview_Intro]: '',
    [Translatable.overview_UseFleetingMode]: '',
    [Translatable.overview_ButtonServiceList]: 'Full list of services',
    [Translatable.overview_ButtonSelectTier]: 'Select &gt;',

    [Translatable.services_FilterByTier]: 'by colour tier',
    [Translatable.services_FilterByCategory]: 'by category',
    [Translatable.services_FilterAlpha]: 'alphabetically',
    [Translatable.services_PrivacyPolicyLinkText]: 'More information about this service on the privacy policy page &gt;',
};
