import type { CommonProviderFactoryOptions } from './common';
import type { CmpServiceProvider } from '../cmp-service-provider';
import type { WindowWithDataLayer } from '../../util/wrap-gtm';

import { gtm, WrappedGtm } from '../../util/wrap-gtm';
import { AbstractCmpServiceProvider } from '../abstract-provider';
import { debug } from '../../util/debuggable';
import { DEFAULT_FACTORY_OPTIONS } from './common';

interface WithUsercentrics {
    UC_UI?: {
        acceptService: (templateId: string) => void;
        getServicesBaseInfo: () => { name: string; id: string }[];
        isInitialized: () => boolean;
        showSecondLayer: (templateId?: string) => void;
    };
}

declare const window: WindowWithDataLayer & WithUsercentrics;

export class UsercentricsProvider extends AbstractCmpServiceProvider {
    protected gtm: Promise<WrappedGtm>;

    static async factory(
        options: Partial<CommonProviderFactoryOptions> = {}
    ): Promise<CmpServiceProvider> {
        // let cmpServiceProvider = this;
        const _debug = debug.spawn('UsercentricsProviderFactory');
        const parsedOptions: CommonProviderFactoryOptions = {
            ...DEFAULT_FACTORY_OPTIONS,
            ...options,
        };

        if (!UsercentricsProvider.ucPresent()) {
            _debug.log('UC not present – building proxy');

            const usercentricsHasLoaded = new Promise((res) => {
                UsercentricsProvider.dirtyObserveUcUiObject(res, parsedOptions);
            });

            const deadline = new Promise((res) => {
                setTimeout(res, parsedOptions.loadDelayLimit);
            });

            await Promise.race([usercentricsHasLoaded, deadline]);

            if (!UsercentricsProvider.ucPresent()) {
                _debug.log('Still no UC – using fallback service provider');
                return new parsedOptions.fallbackServiceProvider({
                    isFallbackProvider: true,
                });
            }
        }

        return new UsercentricsProvider({debug: parsedOptions.debug});
    }

    protected static dirtyObserveUcUiObject(
        onChanged: (value?: unknown) => void,
        options: CommonProviderFactoryOptions
    ) {
        let t = 0;
        let done = false;
        const timeout = 200;
        const maxTries = options.loadDelayLimit / timeout;

        const timer = () => {
            setTimeout(() => {
                if (UsercentricsProvider.ucPresent()) {
                    done = true;
                    onChanged();
                } else if (!done && t < maxTries) {
                    ++t;
                    timer();
                }
            }, timeout);
        };

        timer();
    }

    protected static ucPresent(): boolean {
        return (
            (window.UC_UI &&
                window.UC_UI.isInitialized &&
                window.UC_UI.isInitialized()) ||
            false
        );
    }

    protected constructor(
        { debug = false }: { debug: boolean } = { debug: false }
    ) {
        super('Usercentrics CmpService');
        this.debug.toggle(debug);

        window.dataLayer = window.dataLayer || [];
        this.gtm = gtm;
    }

    public override acceptService(serviceId: string): void {
        this.debug.log('Loading service in UC', serviceId);
        if (this.isPresent()) {
            const templateId = this.getTemplateIdByServiceName(serviceId);
            if (templateId) {
                window.UC_UI?.acceptService(templateId);
            }
        }
    }

    public override async getConsentStatusForService(
        serviceId: string
    ): Promise<boolean> {
        let relevantEvent = null;
        let hasConsent = false;

        const gtm = await this.gtm;

        const genericEvents = gtm.getEventData('consent_status');
        const specificEvents = gtm.getEventData(new RegExp(`${serviceId} .*`));

        this.debug.log(`checking events for ${serviceId}`, {
            genericEvents,
            specificEvents,
        });

        if (specificEvents.length) {
            relevantEvent = specificEvents.pop();
        } else if (genericEvents.length) {
            relevantEvent = genericEvents.pop();
        }

        if (relevantEvent) {
            hasConsent = !!relevantEvent[serviceId] || false;
        }

        return hasConsent;
    }

    public override isPresent(): boolean {
        return UsercentricsProvider.ucPresent();
    }

    public override showSettingsMenu(): void {
        this.isPresent() && window.UC_UI?.showSecondLayer();
    }

    public override showSettingsMenuAtService(serviceId: string): void {
        const templateId = this.getTemplateIdByServiceName(serviceId);
        if (templateId && this.isPresent()) {
            window.UC_UI?.showSecondLayer(templateId);
        }
    }

    public override async onConsentUpdate(
        serviceId: string,
        callback: (status: boolean) => void
    ) {
        const gtm = await this.gtm;

        const onGenericConsentEvent = (
            event: Record<string, string | boolean>
        ) => {
            callback(event[serviceId] === true);
        };

        gtm.subscribe('consent_status', onGenericConsentEvent);
        gtm.subscribe(`${serviceId}`, () => {
            callback(false);
        });
    }

    protected getTemplateIdByServiceName(serviceName: string) {
        const services = window.UC_UI?.getServicesBaseInfo() || [];
        const service = services.find((e) => e.name === serviceName);
        if (service) {
            return service.id;
        } else {
            return null;
        }
    }
}
