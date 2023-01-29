import type { CmpServiceProvider as CmpServiceProviderInterface } from './cmp/cmp-service-provider';

import _merge from 'lodash-es/merge';

import { debug } from './util/debuggable';
import { GenericEventProvider } from './cmp/provider/generic-event-provider';
import { ConsentSettings } from './util/settings/consent-settings';
import { EMBED_FACTORY_DEFAULT_OPTIONS, EmbedFactory } from './embed/factory';
import { ConsentManager } from './consent-manager/consent-manager';
import { ElementsConsentManager } from './consent-manager/elements-consent-manager';
import type { ConsentToolsSettings } from './util/settings/types';

export interface FactorySettings {
    defaults: ConsentToolsSettings;
    locale: string | null;
    production: boolean;
    provider: CmpServiceProviderInterface;
    selector: string;
    types: Record<string, ConsentToolsSettings>;
}

const DEFAULT_FACTORY_SETTINGS: FactorySettings = {
    defaults: {},
    locale: null,
    production: false,
    provider: new GenericEventProvider(),
    selector: EMBED_FACTORY_DEFAULT_OPTIONS.selector,
    types: {},
};

export class ConsentTools {
    public static factory(
        userOptions: Partial<FactorySettings> = DEFAULT_FACTORY_SETTINGS
    ): ConsentManager {
        const options = _merge({}, DEFAULT_FACTORY_SETTINGS, userOptions);

        if (options.production) {
            debug.disable();
        }

        const settings = new ConsentSettings(
            options.defaults,
            options.types,
            options.locale
        );

        const manager = new ConsentManager(options.provider, settings, {
            debug: !options.production,
        });

        new EmbedFactory(manager, settings, {
            debug: !options.production,
            selector: options.selector,
        });
        new ElementsConsentManager(manager, settings, {
            debug: !options.production,
            selector: '[data-ghct-service]',
            hasConsentClassName: 'has-consent',
        });

        return manager;
    }
}
