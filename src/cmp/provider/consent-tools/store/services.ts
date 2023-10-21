import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { StoreBase } from 'store2';
import storage from 'store2';
import type {
    CategoryRecord,
    ConsentToolsProviderService,
} from '../../../../util/settings/types';
import type { ConsentToolsProviderEmitter } from '../events';
import type { ConsentSettings } from '../../../../util/settings/consent-settings';

import {
    Category, CategoryFrom,
    DefaultTierLabels,
    Tier,
} from '../../../../util/settings/types';
import type { DebugLog } from '../../../../util/debuggable';
import { debug } from '../../../../util/debuggable';

import _groupBy from 'lodash-es/groupBy';
import _toPairs from 'lodash-es/toPairs';
import _sortBy from 'lodash-es/sortBy';
import { Translatable, translator } from '../../../../util/i18n';

export enum SortMode {
    ALPHA,
    TIER,
    CATEGORY,
}

export interface ServiceRecord {
    name: string;
    tier: Tier;
    hasConsent: boolean;
    description: string;
    category: Category;
}

export interface DisplayedService extends ServiceRecord {
    id: string;
    categoryLabel: string | null;
}

export type SortedServiceGroup = {
    caption: string | null;
    services: DisplayedService[];
    tier?: Tier;
};

/**
 * @TODO:
 *     Currently upon tier selection we mark all existing services within that
 *     tier as having consent. This is as problematic as its counterpart:
 *        If a new service is added by the website owner, this service will not
 *        have consent by existing users, even those that have clicked "do
 *        whatever you want".
 *     One alternative is to mark the entire _tier_ as having consent, and
 *     applying that consent to any new services within that tier. This is why
 *     most existing CM solutions deal in categories.
 *     -
 *     Re-opening the "cookie banner" every time the service configuration
 *     changes feels like harassment, so it's especially out for RED tier
 *     users, while GREEN tier users probably don't care either way.
 *
 *  @TODO: Add a button "Use these settings" to the services layer for initial run
 */

export type ServicesState = {
    filter: [SortMode, string | Tier] | null;
    modalSeen: boolean;
    services: Record<string, ServiceRecord>;
    sortMode: SortMode;
};

const DEFAULT_STATE: ServicesState = {
    filter: null,
    modalSeen: false,
    services: {},
    sortMode: SortMode.TIER,
};

export class ServiceStore {
    protected debug: DebugLog = debug.spawn('ServiceStore');
    protected localStorage: StoreBase;
    protected store: Writable<ServicesState>;
    protected state: ServicesState = DEFAULT_STATE;
    protected tiers: Record<Tier, Translatable>;

    protected readonly categories: CategoryRecord;

    constructor(
        useSessionStorage: boolean,
        services: Record<string, ConsentToolsProviderService>,
        protected readonly settings: ConsentSettings,
        protected readonly eventProxy: ConsentToolsProviderEmitter
    ) {
        this.store = writable(DEFAULT_STATE);
        this.store.subscribe((state) => {
            this.state = state;
        });
        const store = storage.namespace('gh-consent-tools');
        this.localStorage = useSessionStorage ? store.session : store.local;
        this.setServices(services);
        this.categories = this.settings.appSettings.categories;
        this.tiers = {
            ...DefaultTierLabels,
            ...this.settings.appSettings.tiers,
        };
    }

    get subscribe() {
        return this.store.subscribe;
    }

    get userHasSeenModal(): boolean {
        const raw = this.localStorage.get('confirmed');
        if (!raw || raw === '') return false;
        if (raw === 'true') return true;
        return raw;
    }

    public addService(
        serviceId: string,
        settings: Partial<ServiceRecord>
    ): void {
        this.store.update((state) => ({
            ...state,
            services: {
                ...state.services,
                [serviceId]: {
                    name: serviceId,
                    tier: Tier.FULL,
                    hasConsent: false,
                    category: Category.UNKNOWN,
                    description: '',
                    ...settings,
                },
            },
        }));
    }

    public changeService(serviceId: string, hasConsent: boolean): void {
        this.localStorage.transact('consents', (consents) => {
            return {
                ...consents,
                [serviceId]: hasConsent,
            };
        });

        this.store.update((state) => {
            let service = state.services[serviceId];
            if (!service) {
                service = {
                    name: serviceId,
                    tier: Tier.FULL,
                    hasConsent: hasConsent,
                    description: '',
                    category: Category.UNKNOWN,
                };
            }

            service.hasConsent = hasConsent;

            return {
                ...state,
                services: {
                    ...state.services,
                    [serviceId]: service,
                },
            };
        });

        this.eventProxy.emit(serviceId, hasConsent);
    }

    public getService(serviceId: string): ServiceRecord | null {
        return this.state.services[serviceId] || null;
    }

    public getServices(): Record<string, ServiceRecord> {
        return this.state.services;
    }

    public getServicesShown(
        state: ServicesState = this.state
    ): DisplayedService[] {
        return _toPairs(state.services).map(([id, config]) => {
            return {
                id,
                ...this.mapCategory(config.category),
                ...config,
            };
        });
    }

    protected mapCategory(cat: Category | string): {
        categoryLabel: string | null;
        categoryColor: string | null;
    } {
        const category = CategoryFrom(cat);

        return {
            categoryLabel: translator.get(this.categories[category].label),
            categoryColor: this.categories[category]?.color || null,
        };
    }

    public getSortedServices(
        state: ServicesState = this.state
    ): SortedServiceGroup[] {
        const services = _toPairs(state.services).map(([id, config]) => {
            return {
                id,
                ...this.mapCategory(config.category),
                ...config,
            };
        });
        const sortedAlphabetically = _sortBy(services, 'name');

        let sortMode: SortMode;
        if (state.filter) {
            sortMode = state.filter[0];
        } else {
            sortMode = state.sortMode;
        }

        let serviceGroups: SortedServiceGroup[];
        switch (sortMode) {
            case SortMode.TIER:
                serviceGroups = this.groupByTier(sortedAlphabetically);
                break;
            case SortMode.CATEGORY:
                serviceGroups = this.groupByCategory(sortedAlphabetically);
                break;
            case SortMode.ALPHA:
            default:
                serviceGroups = [
                    {
                        caption: null,
                        services: sortedAlphabetically,
                    },
                ];
        }

        if (state.filter) {
            const id = state.filter[1];
            this.debug.log('filtering', id, serviceGroups);
            const group = serviceGroups.find((g) => {
                return g.caption === id || g.tier === id;
            });
            return typeof group !== 'undefined' ? [group] : [];
        } else {
            return serviceGroups;
        }
    }

    public resetFilter(): void {
        this.store.update((state) => ({
            ...state,
            filter: null,
        }));
    }

    public selectTier(tier: Tier): void {
        _toPairs({
            ...this.state.services,
        }).forEach(([serviceId, settings]: [string, ServiceRecord]) => {
            if (settings.tier <= tier) {
                this.changeService(serviceId, true);
            }
        });
    }

    public setFilter(type: SortMode, id: string | Tier): void {
        this.store.update((state) => ({
            ...state,
            filter: [type, id],
        }));
    }

    protected groupByCategory(
        services: DisplayedService[]
    ): SortedServiceGroup[] {
        const groups = _groupBy(services, 'category');
        return _toPairs(groups).map(
            ([group, services]: [string, DisplayedService[]]) => {
                return {
                    caption:
                        this.mapCategory(group)?.categoryLabel || 'Unknown',
                    services,
                };
            }
        );
    }

    protected groupByTier(services: DisplayedService[]): SortedServiceGroup[] {
        const groups = _groupBy(services, 'tier');
        return _toPairs(groups).map(
            ([stringTier, services]: [string, DisplayedService[]]) => {
                const tier = parseInt(stringTier, 10) as Tier;
                return {
                    caption: translator.get(this.tiers[tier]),
                    services,
                    tier: tier,
                };
            }
        );
    }

    public setModalSeen(): void {
        this.store.update((state) => ({
            ...state,
            modalSeen: true,
        }));
        this.localStorage.set('confirmed', true);
    }

    protected setServices(
        services: Record<string, ConsentToolsProviderService>
    ): void {
        const initialState: Record<string, ServiceRecord> = {};

        const servicesConsented = this.localStorage.get('consents', {});

        _toPairs(services).forEach(([id, config]) => {
            initialState[id] = {
                name: translator
                    .fallback(id)
                    .get(Translatable.servicePrettyName, id),
                tier:
                    typeof config.tier !== 'undefined' && config.tier in Tier
                        ? config.tier
                        : Tier.FULL,
                hasConsent: servicesConsented[id] === true,
                description: translator.get(
                    Translatable.serviceDescription,
                    id
                ),
                category: config.category || Category.UNKNOWN,
            };
        });

        const modalSeen = this.localStorage.get('confirmed', false);

        this.store.update((state) => ({
            ...state,
            services: initialState,
            modalSeen,
        }));
    }

    public sort(sortMode: SortMode): void {
        this.store.update((state) => ({
            ...state,
            sortMode: sortMode,
        }));
    }

    public sortAlpha = () => {
        this.sort(SortMode.ALPHA);
    };

    public sortTier = () => {
        this.sort(SortMode.TIER);
    };

    public sortCategory = () => {
        this.sort(SortMode.CATEGORY);
    };
}

export const SortModes = [
    {
        mode: SortMode.TIER,
        label: 'by colour tier',
        action: (store: ServiceStore) => store.sortTier,
    },
    {
        mode: SortMode.ALPHA,
        label: 'alphabetically',
        action: (store: ServiceStore) => store.sortAlpha,
    },
    {
        mode: SortMode.CATEGORY,
        label: 'by category',
        action: (store: ServiceStore) => store.sortCategory,
    },
];
