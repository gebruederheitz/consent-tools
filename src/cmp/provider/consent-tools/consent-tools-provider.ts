import type { ConsentSettings } from '../../../util/settings/consent-settings';
import type { ConsentToolsProviderService } from '../../../util/settings/types';
import type { CmpServiceProvider } from '../../cmp-service-provider';
import type { SvelteComponentDev } from 'svelte/types/runtime/internal/dev';

import 'svelte';
import EventEmitter from 'mitt';
import _merge from 'lodash-es/merge';
import _toPairs from 'lodash-es/toPairs';
import _uniqBy from 'lodash-es/uniqBy';
import { $$, createDomElement } from '@gebruederheitz/wp-frontend-utils';

import { Event } from './events';
import { Tier } from '../../../util/settings/types';
import { AbstractCmpServiceProvider } from '../../abstract-provider';
import { ServiceStore } from './store/services';
import type { ConsentToolsProviderEmitter } from './events';

// @TODO: programmatic access to consent/denial, global and per service

// @FIXME: when loading for the first time, do not load anything (not even
//         essentials) until the banner is confirmed

type Services = Record<string, ConsentToolsProviderService>;

interface ModalComponentConstructorArgs {
    target: Element;
    props: {
        provider: ConsentToolsProviderEmitter;
        store: ServiceStore;
        settings: ConsentSettings;
    };
}

interface CustomModalComponent {
    new (args: ModalComponentConstructorArgs): ModalComponent;
}

type CustomModalComponentInstance = InstanceType<CustomModalComponent>;

type ModalComponent = CustomModalComponent | typeof SvelteComponentDev;
type ModalComponentInstance = CustomModalComponentInstance | SvelteComponentDev;

interface ConsentToolsProviderOptions {
    useSessionStorage: boolean;
    useServiceDiscovery: boolean;
    modalComponent: ModalComponent | null;
}

const DEFAULT_OPTIONS: ConsentToolsProviderOptions = {
    useSessionStorage: false,
    useServiceDiscovery: true,
    modalComponent: null,
};

/**
 * A generic provider that stores consent information in session storage, so
 * no such information is persisted across browser sessions.
 */
export class ConsentToolsProvider
    extends AbstractCmpServiceProvider
    implements CmpServiceProvider
{
    protected readonly eventProxy: ConsentToolsProviderEmitter = EventEmitter();
    protected modal: ModalComponentInstance | null = null;
    protected options: ConsentToolsProviderOptions;
    protected store: ServiceStore;

    constructor(
        protected readonly settings: ConsentSettings,
        types: Services = {},
        options: Partial<ConsentToolsProviderOptions> = {}
    ) {
        super('ConsentToolsProvider CmpService');
        this.options = _merge(DEFAULT_OPTIONS, options);
        this.store = new ServiceStore(
            this.options.useSessionStorage,
            types,
            this.settings,
            this.eventProxy,
        );

        if (this.options.useServiceDiscovery) {
            this.discoverServices();
        }

        if (!this.options.modalComponent) {
            console.warn('ConsentToolsProvider needs a modal component to function properly, please make sure to provide one in the constructor!');
            return;
        }

        this.initModal();

        if (!this.store.userHasSeenModal) {
            this.eventProxy.emit(Event.SHOW_MODAL, 'initial');
        } else {
            this.processEssentials();
        }
    }

    public override acceptService(serviceId: string): void {
        this.store.changeService(serviceId, true);
    }

    public denyService(serviceId: string): void {
        this.store.changeService(serviceId, false);
    }

    public override async getConsentStatusForService(
        serviceId: string
    ): Promise<boolean> {
        return this.store.getService(serviceId)?.hasConsent || false;
    }

    public override isPresent(): boolean {
        return true;
    }

    public override showSettingsMenu(): void {
        this.eventProxy.emit(Event.SHOW_MODAL, null);
    }

    public override async onConsentUpdate(
        serviceId: string,
        callback: (status: boolean) => void
    ): Promise<void> {
        this.eventProxy.on(serviceId, (e) => callback(e as boolean));
        // @TODO: we should emit all sorts of events:
        //       publicly accessible ones by adding an event listener API
        //       (GTM) data layer events (generic and per-service)
        //       we also need to signal we've initialized (or failed)
    }

    public get on() {
        return this.eventProxy.on;
    }

    protected discoverServices(): void {
        const prefix = this.settings.appSettings.attributesPrefix;
        const selector = `[data-${prefix}-type`;
        const elements = $$()(selector);

        const services = Array.from(elements).map((el) => {
            const element = el as HTMLElement;
            const type = element.dataset[`${prefix}Type`] as string;
            const rawTier = element.dataset[`${prefix}Tier`];
            const tier =
                (rawTier && (parseInt(rawTier, 10) as Tier)) || Tier.FULL;
            const category = element.dataset[`${prefix}Category`] || '';
            const prettyName = element.dataset[`${prefix}Name`] || type;
            const description = element.dataset[`${prefix}Description`] || '';
            return {
                type,
                tier,
                category,
                prettyName,
                description,
            };
        });
        const uniqueServices = _uniqBy(services, 'type');
        for (const service of uniqueServices) {
            const serviceId = service.type;
            if (!this.settings.hasService(serviceId)) {
                const settings = {
                    category: service.category,
                    name: service.prettyName,
                    serviceDescription: {
                        [this.settings.locale]: service.description,
                    },
                };

                this.settings.addService(serviceId, settings);
                this.store.addService(serviceId, {
                    ...settings,
                    tier: service.tier,
                });
            }
        }
    }

    protected processEssentials() {
        const services = this.store.getServices();
        const essentials = _toPairs(services).filter(
            ([, t]) => t.tier === Tier.ESSENTIAL
        );
        if (essentials.length) {
            essentials.forEach(([k]) => {
                this.acceptService(k);
            });
        }
    }

    private initModal(): void {
        const modalContainer = createDomElement({
            parent: document.body,
        });

        const Modal = this.options.modalComponent as ModalComponent;

        this.modal = new Modal({
            target: modalContainer,
            props: {
                provider: this.eventProxy,
                store: this.store,
                settings: this.settings,
            },
        });
    }
}
