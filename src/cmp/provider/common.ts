import type { CmpServiceProviderImplementation } from '../cmp-service-provider';
import { GenericEventProvider } from './generic-event-provider';

export interface CommonProviderFactoryOptions {
    debug: boolean;
    fallbackServiceProvider: CmpServiceProviderImplementation;
    loadDelayLimit: number;
}

export const DEFAULT_FACTORY_OPTIONS: CommonProviderFactoryOptions = {
    debug: false,
    fallbackServiceProvider: GenericEventProvider,
    loadDelayLimit: 2000,
};
