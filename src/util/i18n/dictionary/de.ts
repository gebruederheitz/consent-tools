import type { Dictionary } from '../translator';
import { Translatable } from './translatables';

export const de: Dictionary = {
    [Translatable.ph_Body]: 'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch können Informationen an den Diensteanbieter übermittelt und dort gespeichert werden.',
    [Translatable.ph_ButtonText]: 'Inhalt einmal laden',
    [Translatable.ph_PermanentConsentLabel]: 'Immer laden',
    [Translatable.ph_ModalOpenerButtonText]: 'Mehr Informationen',
    [Translatable.ph_TitleText]: '',

    [Translatable.serviceDescription]: '',
    [Translatable.servicePrettyName]: '',

    [Translatable.tier_Green_PrettyName]: 'Macht was ihr wollt',
    [Translatable.tier_Green_Tagline]: '',
    [Translatable.tier_Green_Description]: '',
    [Translatable.tier_Amber_PrettyName]: 'Ausgewogen / Beste Nutzererfahrung',
    [Translatable.tier_Amber_Tagline]: 'Anonymisierte Analysen und Drittanbieterdienste für externe Inhalte',
    [Translatable.tier_Amber_Description]: '',
    [Translatable.tier_Red_PrettyName]: 'Nur das technisch nötige!',
    [Translatable.tier_Red_Tagline]: '',
    [Translatable.tier_Red_Description]: '',

    [Translatable.category_Unknown_Label]: 'Unbekannt',
    [Translatable.category_Marketing_Label]: 'Marketing',
    [Translatable.category_Analytics_Label]: 'Analyse',
    [Translatable.category_Functional_Label]: 'Funktional',
    [Translatable.category_Essential_Label]: 'Essentiell',

    [Translatable.tab_Overview]: 'Übersicht',
    [Translatable.tab_Services]: 'Dienste & Cookies',
    [Translatable.overview_Title]: 'Wähle deinen Privatsphärelevel',
    [Translatable.overview_Subtitle]: 'Datenschutzeinstellungen',
    [Translatable.overview_Intro]: '',
    [Translatable.overview_UseFleetingMode]: '',
    [Translatable.overview_ButtonServiceList]: 'Vollständige Liste der Dienste',
    [Translatable.overview_ButtonSelectTier]: 'Wählen & Merken',

    [Translatable.services_FilterByTier]: 'nach Ampelfarbgruppe',
    [Translatable.services_FilterByCategory]: 'nach Kategorie',
    [Translatable.services_FilterAlpha]: 'alphabethisch',
    [Translatable.services_PrivacyPolicyLinkText]: 'Mehr Informationen zu diesem Dienst auf der Datenschutzseite &gt;',
};
