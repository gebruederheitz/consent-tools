import type {
    ConsentToolsAppSettings,
    ConsentToolsProviderService,
    ConsentToolsSettings,
    PermanentConsentType,
} from './types';
import type { ServiceRecord } from '../../cmp/provider/consent-tools/store/services';

import _get from 'lodash-es/get';
import _pick from 'lodash-es/pick';
import _toPairs from 'lodash-es/toPairs';
import _omit from 'lodash-es/omit';
import _merge from 'lodash-es/merge';
import type { DebugLog } from '../debuggable';
import { debug } from '../debuggable';
import type { Dictionary, Translator } from '../i18n/translator';
import { translator } from '../i18n';

import { DEFAULT_APP_SETTINGS, DEFAULT_SETTINGS } from '../defaults';
import { DefaultableMap } from '../defaultable-map';

type Services =
    | Record<string, ConsentToolsProviderService>
    | Record<string, ConsentToolsSettings>;

export class ConsentSettings {
    public readonly appSettings: ConsentToolsAppSettings = DEFAULT_APP_SETTINGS;
    protected debug: DebugLog = debug.spawn('ConsentSettings');
    protected defaults: ConsentToolsSettings = DEFAULT_SETTINGS;
    protected services: Services = {};

    constructor(
        defaults: ConsentToolsSettings = {},
        services: Record<string, ConsentToolsSettings> = {},
        locale: string | null = ConsentSettings.getDefaultLocale(),
        dictionary: Dictionary | null = null
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

        if (dictionary && locale) {
            translator.load(dictionary, locale);
        }
        translator.setLocale(locale);

        this.debug.log('defaults & services', this.defaults, this.services);
    }

    get additionalServices(): DefaultableMap<string, string[]> {
        return this.get('additionalServices');
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

    get permanentConsentType(): DefaultableMap<string, PermanentConsentType> {
        return this.get('permanentConsentType');
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

    public getTranslator(): Translator {
        return translator;
    }

    public hasService(serviceId: string): boolean {
        return typeof this.services[serviceId] !== 'undefined';
    }

    public addService(
        serviceId: string,
        settings: Partial<ServiceRecord>
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

    public getServices(): Record<string, ConsentToolsSettings> {
        return this.services;
    }

    protected static getDefaultLocale(): string | null {
        return (
            document.documentElement.lang || window.navigator.language || null
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
}
