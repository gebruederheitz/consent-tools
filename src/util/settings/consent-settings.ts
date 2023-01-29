import _get from 'lodash-es/get';
import _pick from 'lodash-es/pick';
import _toPairs from 'lodash-es/toPairs';
import _omit from 'lodash-es/omit';
import _merge from 'lodash-es/merge';

import { DEFAULT_APP_SETTINGS, DEFAULT_SETTINGS } from '../defaults';
import type {
    ConsentToolsAppSettings,
    ConsentToolsSettings,
    PermanentConsentType,
    TranslatableRecord,
} from './types';
import type { DebugLog } from '../debuggable';
import { DefaultableMap } from '../defaultable-map';
import { debug } from '../debuggable';

const FALLBACK_LOCALE = 'en';

export class ConsentSettings {
    public readonly appSettings: ConsentToolsAppSettings = DEFAULT_APP_SETTINGS;
    public locale: string;
    protected debug: DebugLog = debug.spawn('ConsentSettings');
    protected defaults: ConsentToolsSettings = DEFAULT_SETTINGS;
    protected services: Record<string, ConsentToolsSettings> = {};

    constructor(
        defaults: ConsentToolsSettings = {},
        services: Record<string, ConsentToolsSettings> = {},
        locale: string | null = null
    ) {
        const appSettingsKeys = Object.keys(DEFAULT_APP_SETTINGS);

        this.appSettings = _merge(
            {},
            this.appSettings,
            _pick(defaults, appSettingsKeys)
        );
        this.defaults = {
            ...this.defaults,
            ..._omit(defaults, appSettingsKeys),
        };
        this.services = services;
        this.locale = locale || this.getDefaultLocale();

        this.debug.log('defaults & services', this.defaults, this.services);
    }

    get additionalServices(): DefaultableMap<string, string[]> {
        return this.get('additionalServices');
    }

    get buttonText(): DefaultableMap<string, string> {
        return this.getTranslated('buttonText');
    }

    get checkboxLabel(): DefaultableMap<string, string> {
        return this.getTranslated('checkboxLabel');
    }

    get checkboxProviderName(): DefaultableMap<string, string> {
        return this.getTranslated('checkboxProviderName');
    }

    get clickOnConsent(): DefaultableMap<string, boolean> {
        return this.get('clickOnConsent');
    }

    get cmpServiceId(): { get: (serviceId: string) => string } {
        const ids: DefaultableMap<string, string> = this.get('cmpServiceId');
        return {
            get: (serviceId: string) => {
                return ids.get(serviceId) || serviceId;
            },
        };
    }

    get defaultLoadAll(): DefaultableMap<string, boolean> {
        return this.get('defaultLoadAll');
    }

    get modalOpenerButton(): DefaultableMap<string, boolean> {
        return this.get('modalOpenerButton');
    }

    get modalOpenerButtonText(): DefaultableMap<string, string> {
        return this.getTranslated('modalOpenerButtonText');
    }

    get permanentConsentType(): DefaultableMap<string, PermanentConsentType> {
        return this.get('permanentConsentType');
    }

    get placeholderBody(): DefaultableMap<string, string> {
        const bodies = this.getTranslated('placeholderBody');
        return this.parsePlaceholders(bodies, {
            '%servicePrettyName%': (service: string) =>
                this.servicePrettyName.get(service) as string,
            '%privacyPolicyUrl%': () => this.appSettings.privacyPolicyUrl,
        });
    }

    get privacyPolicySection(): DefaultableMap<string, string> {
        return this.get('privacyPolicySection');
    }

    get privacyPolicyUrlWithSection(): DefaultableMap<string, string> {
        const url = this.appSettings.privacyPolicyUrl;
        const sections = this.privacyPolicySection;
        const out: DefaultableMap<string, string> = new DefaultableMap(
            sections
        );

        for (const [service, section] of sections.entries()) {
            out.set(
                service,
                `${url}${(section.length && '#') || ''}${section}`
            );
        }

        return out;
    }

    get reloadOnConsent(): DefaultableMap<string, boolean> {
        return this.get('reloadOnConsent');
    }

    get serviceDescription(): DefaultableMap<string, string> {
        return this.getTranslated('serviceDescription');
    }

    get servicePrettyName(): DefaultableMap<string, string> {
        return this.getTranslated('servicePrettyName');
    }

    get titleText(): DefaultableMap<string, string> {
        const titles = this.getTranslated('titleText');
        return this.parsePlaceholders(titles, {
            '%servicePrettyName%': (service: string) =>
                this.servicePrettyName.get(service) as string,
        });
    }

    public setLocale(locale: string) {
        this.locale = locale;
    }

    public hasService(serviceId: string): boolean {
        return typeof this.services[serviceId] !== 'undefined';
    }

    public addService(
        serviceId: string,
        settings: Partial<ConsentToolsSettings>
    ): void {
        if (!this.services[serviceId]) {
            this.services[serviceId] = settings;
        }
    }

    public getPrivacyPolicySection(
        setDefault = true
    ): DefaultableMap<string, string> {
        return this.get('privacyPolicySection', setDefault);
    }

    protected getDefaultLocale(): string {
        return (
            document.documentElement.lang ||
            window.navigator.language ||
            FALLBACK_LOCALE
        );
    }

    protected get<T>(
        setting: string,
        setDefault = true
    ): DefaultableMap<string, T> {
        const result: DefaultableMap<string, T> = new DefaultableMap();
        const defaultValue = _get(this.defaults, setting);
        result.setDefault(defaultValue);

        _toPairs(this.services).forEach(
            ([serviceId, serviceSettings]: [string, ConsentToolsSettings]) => {
                let settingValue = _get(serviceSettings, setting, null) as T;
                if (settingValue === null) {
                    if (setDefault) {
                        settingValue = defaultValue;
                    } else {
                        return;
                    }
                }
                result.set(serviceId, settingValue);
            }
        );

        return result;
    }

    protected getTranslated(setting: string): DefaultableMap<string, string> {
        const result: DefaultableMap<string, string> = new DefaultableMap();
        const settingDefaults = _get(this.defaults, setting);

        let defaultValue;
        if (settingDefaults[this.locale]) {
            defaultValue = settingDefaults[this.locale];
        } else {
            defaultValue = settingDefaults[FALLBACK_LOCALE];
        }
        result.setDefault(defaultValue);

        _toPairs(this.services).forEach(
            ([serviceId, serviceSettings]: [string, ConsentToolsSettings]) => {
                const settingValues: TranslatableRecord = _get(
                    serviceSettings,
                    setting,
                    {}
                );
                const values = _merge({}, settingDefaults, settingValues);
                let value;
                if (values[this.locale]) {
                    value = values[this.locale];
                } else {
                    value = values[FALLBACK_LOCALE];
                }
                result.set(serviceId, value);
            }
        );

        return result;
    }

    protected parsePlaceholders(
        baseStrings: DefaultableMap<string, string>,
        placeholders: Record<string, (service: string) => string>
    ): DefaultableMap<string, string> {
        const parsedStrings: DefaultableMap<string, string> =
            new DefaultableMap(baseStrings);
        for (const [service, baseString] of baseStrings.entries()) {
            let result = baseString;
            _toPairs(placeholders).forEach(
                ([placeholder, valueGetter]: [
                    placeholder: string,
                    valueGetter: (service: string) => string
                ]) => {
                    result = this.parsePlaceholdersIntoTemplateString(
                        result,
                        placeholder,
                        valueGetter(service)
                    );
                }
            );
            parsedStrings.set(service, result);
        }

        return parsedStrings;
    }

    protected parsePlaceholdersIntoTemplateString(
        template: string,
        search: string,
        replacement: string
    ) {
        if (typeof replacement === 'undefined' || replacement === null) {
            replacement = '';
        }

        return template.replace(search, replacement);
    }
}
