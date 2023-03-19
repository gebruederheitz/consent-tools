import type { Emitter } from 'mitt';
import EventEmitter from 'mitt';
import _difference from 'lodash-es/difference';

import { AbstractCmpServiceProvider } from '../abstract-provider';
import type { CmpServiceProvider } from '../cmp-service-provider';
import type { CommonProviderFactoryOptions } from './common';
import { DEFAULT_FACTORY_OPTIONS } from './common';
import { debug } from '../../util/debuggable';

interface WithOneTrust {
    OneTrust?: OneTrustObject;
    Optanon?: OneTrustObject;
    OptanonActiveGroups?: string;
}

interface OneTrustVendor {
    VendorCustomId: string;
    Name: string;
}

interface OneTrustDomainData {
    Groups: {
        OptanonGroupId: string;
        CustomGroupId: string;
        GeneralVendorsIds: string[];
    }[];
    GeneralVendors: OneTrustVendor[];
}

type OneTrustConsentEventCallback = (event: {detail: string[]}) => void;

interface OneTrustObject {
    GetDomainData: () => OneTrustDomainData;
    ToggleInfoDisplay: () => void;
    OnConsentChanged: (callback: OneTrustConsentEventCallback) => void;
}

declare const window: Window & WithOneTrust;

export class OneTrustProvider
    extends AbstractCmpServiceProvider
    implements CmpServiceProvider
{
    /**
     * Wait for the underlying CMP service to initialize and return this
     * instance or an instance of the fallback provider.
     */
    public static async factory(
        userOptions: Partial<CommonProviderFactoryOptions> = {}
    ): Promise<CmpServiceProvider> {
        const options = {
            ...DEFAULT_FACTORY_OPTIONS,
            userOptions,
        };
        const _debug = debug.spawn('OneTrustProviderFactory');

        let optanonObject: OneTrustObject | null = null;

        _debug.log('OT not present – building proxy');

        const oneTrustHasLoaded = new Promise((res) => {
            const callback = (optanon: OneTrustObject) => {
                _debug.log('OT loaded', { optanon });
                optanonObject = optanon;
                res(true);
            };
            OneTrustProvider.dirtyObserveOptanonObject(
                options.loadDelayLimit,
                callback
            );
        });

        const deadline = new Promise((res) => {
            setTimeout(res, options.loadDelayLimit);
        });

        await Promise.race([oneTrustHasLoaded, deadline]);

        if (!optanonObject) {
            _debug.log('Still no OneTrust – using fallback service provider');
            return new options.fallbackServiceProvider({
                isFallbackProvider: true,
            });
        } else {
            _debug.log('Found OneTrust – constructing service provider.');
            return new OneTrustProvider({
                optanon: optanonObject,
                debug: options.debug,
            });
        }
    }

    /**
     * Wait for the Optanon / OneTrust global object to be available with
     * "dirty" observe via polling.
     *
     * @param {number} limit
     * @param {function} onChanged  Callback will be called once window.Optanon
     *                              or window.OneTrust is available. Will
     *                              receive the available object as the first
     *                              parameter.
     * @private
     */
    protected static dirtyObserveOptanonObject(
        limit: number,
        onChanged: (optanon: OneTrustObject) => void
    ) {
        let t = 0;
        let done = false;
        const timeout = 200;
        const maxTries = limit / timeout;

        const timer = () => {
            setTimeout(() => {
                const result = window.OneTrust || window.Optanon;
                if (result) {
                    done = true;
                    onChanged(result);
                } else if (!done && t < maxTries) {
                    ++t;
                    timer();
                }
            }, timeout);
        };

        timer();
    }

    protected eventProxy: Emitter<Record<string, boolean>> = EventEmitter();
    protected optanon: OneTrustObject;
    protected mutationObserver: MutationObserver | null = null;
    protected currentGroupId: string | null = null;
    protected vendorsAndGroups: string[] = [];

    constructor({
        debug = false,
        optanon,
    }: {
        debug: boolean;
        optanon: OneTrustObject;
    }) {
        super('OneTrustProvider');
        this.debug.toggle(debug);

        this.optanon = optanon;

        this.parseVendorsAndGroups();
        this._listen();
    }

    /**
     * OneTrust does not allow us to handle consent to individual services /
     * vendors / groups programmatically via their API, so all we can do is show
     * the user the OT settings menu / modal with the relevant service / vendor
     * selected for the user to confirm (again).
     */
    public override acceptService(serviceId: string): void {
        this.showSettingsMenuAtService(serviceId);
    }

    /**
     * @inheritDoc
     */
    public override attachSettingsOpener(domSelector: string | Element): void {
        if (typeof domSelector === 'string') {
            document.querySelectorAll(domSelector).forEach((e) => {
                e.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSettingsMenu();
                });
            });
        }
    }

    /**
     * Gets the consent status for the given service via
     * window.OptanonActiveGroups.
     */
    public override async getConsentStatusForService(
        serviceId: string
    ): Promise<boolean> {
        const { id, groupId } =
            this.getGroupAndVendorIdFromServiceId(serviceId);

        const status = this.isGroupOrVendorActive(groupId, id);
        this.debug.log('Consent status for ' + serviceId, status);
        return status;
    }

    /**
     * @inheritDoc
     */
    public override isPresent(): boolean {
        return !!this.optanon;
    }

    /**
     * @inheritDoc
     */
    public override async onConsentUpdate(
        serviceId: string,
        callback: (status: boolean) => void
    ) {
        this.eventProxy.on(serviceId, (status) => {
            callback(status);
        });
    }

    /**
     * @inheritDoc
     */
    public override showSettingsMenu = (): void => {
        this.optanon.ToggleInfoDisplay();
    };

    /**
     * @inheritDoc
     */
    public override showSettingsMenuAtService(serviceId: string) {
        const { groupId } = this.getGroupAndVendorIdFromServiceId(serviceId);
        const banner = document.querySelector('#onetrust-consent-sdk');

        this.currentGroupId = groupId;

        if (banner) {
            const mo = this.getMutationObserver();
            mo.observe(banner, {
                attributes: true,
                childList: true,
                subtree: true,
            });

            this.showSettingsMenu();
        }
    }

    protected getMutationObserver() {
        if (!this.mutationObserver) {
            this.mutationObserver = new MutationObserver(() => {
                document
                    .querySelectorAll('.ot-link-btn.category-host-list-handler')
                    .forEach((groupDetailsButton: Element) => {
                        const button = groupDetailsButton as HTMLElement;
                        if (
                            button.dataset['parentId'] === this.currentGroupId
                        ) {
                            button.click();
                        }
                    });
                this.mutationObserver?.disconnect();
            });
        }

        return this.mutationObserver;
    }

    /**
     * For a group ID, this will return an array of serviceIds that belong to
     * that group; for a vendor ID it will return the name of said vendor as
     * a single array item.
     *
     * @return {string[]} serviceIds
     */
    protected getServiceIdsFromGroupOrVendorId = (
        groupOrVendorId: string
    ): string[] => {
        const dd = this.optanon.GetDomainData();
        const serviceIdGetter = this.getServiceIdFromVendorIdGetter(dd);

        const vendor = serviceIdGetter(groupOrVendorId);
        if (vendor) {
            return [vendor.Name];
        }

        const group = dd.Groups.find(
            (e) => e.CustomGroupId === groupOrVendorId
        );

        if (group && group.GeneralVendorsIds) {
            return group.GeneralVendorsIds.map(serviceIdGetter)
                .map((v) => v?.Name)
                .filter(
                    (e) => typeof e !== 'undefined' && e?.length
                ) as string[];
        } else {
            return [];
        }
    };

    /**
     * Returns a function that will return the serviceId for any given vendor ID.
     *
     * @param {object} dd  The OT domain data object to work on.
     * @return {function(string): string}
     * @private
     */
    protected getServiceIdFromVendorIdGetter(
        dd: OneTrustDomainData
    ): (vendorId: string) => OneTrustVendor | null {
        return (vendorId: string): OneTrustVendor | null =>
            dd.GeneralVendors.find((e) => e.VendorCustomId === vendorId) ||
            null;
    }

    /**
     * For any given serviceId this will return the OT "custom vendor ID" and
     * the consent group it belongs to.
     */
    protected getGroupAndVendorIdFromServiceId(serviceId: string) {
        const dd = this.optanon.GetDomainData();
        const serviceDefinition = dd.GeneralVendors.find(
            (e) => e.Name === serviceId
        );
        let id = (serviceDefinition && serviceDefinition.VendorCustomId) || '';

        if (
            !id &&
            dd.GeneralVendors.findIndex((e) => e.VendorCustomId === serviceId) >
                -1
        ) {
            // fall back to using OT's vendor custom ID, which is a valid identifier
            id = serviceId;
        }

        const group =
            dd.Groups &&
            dd.Groups.find(
                (g) =>
                    g.GeneralVendorsIds && g.GeneralVendorsIds.indexOf(id) > -1
            );
        return { groupId: (group && group.OptanonGroupId) || '', id };
    }

    /**
     * Checks whether any of the Group- or Vendor-IDs passed is contained in
     * the global OptanonActiveGroups string.
     *
     * @param {string[]} groupOrVendorIds  An arbitrary number of groupIds and/or
     *                                   vendor IDs.
     * @return {boolean}  Returns true if any of the given IDs is found in
     *                    OneTrust's OptanonActiveGroups
     * @private
     */
    protected isGroupOrVendorActive(...groupOrVendorIds: string[]): boolean {
        const allowed = window.OptanonActiveGroups || '';
        return allowed
            .split(',')
            .map((e) => e.trim())
            .filter((e) => !!e)
            .some((allowed) =>
                groupOrVendorIds.some(
                    (groupOrVendorId) => groupOrVendorId === allowed
                )
            );
    }

    /**
     * Attach an event listener to forward consent change events through
     * this.eventProxy. The emitted events will have the serviceId as their
     * name and a boolean indicating consent status as their first argument..
     *
     * Events will be triggered for all group IDs, vendor IDs and service IDs.
     *
     * @emits ConsentChange<serviceId>
     * @private
     */
    _listen() {
        this.optanon.OnConsentChanged(
            ({ detail }): void => {
                this.debug.log(detail);
                const vendorsAndGroupsWithConsent = [...detail];

                detail.forEach((consentedGroupOrVendorId) => {
                    this.debug.log(consentedGroupOrVendorId);
                    const consentedServiceIds =
                        this.getServiceIdsFromGroupOrVendorId(
                            consentedGroupOrVendorId
                        );

                    if (consentedServiceIds) {
                        vendorsAndGroupsWithConsent.unshift(
                            ...consentedServiceIds
                        );
                    }
                });

                const noConsentIds = _difference(
                    this.vendorsAndGroups,
                    vendorsAndGroupsWithConsent
                );

                vendorsAndGroupsWithConsent
                    .filter((e) => e?.length)
                    .forEach((serviceId) => {
                        this.debug.log('consent given for', serviceId);
                        this.eventProxy.emit(serviceId, true);
                    });

                const mappedNoConsentIds = noConsentIds
                    .map(this.getServiceIdsFromGroupOrVendorId)
                    .flat();

                [...mappedNoConsentIds, ...noConsentIds]
                    .filter((e) => e?.length)
                    .forEach((serviceId) => {
                        this.debug.log('consent withheld for', serviceId);
                        this.eventProxy.emit(serviceId, false);
                    });
            }
        );
    }

    protected parseVendorsAndGroups() {
        const dd = this.optanon.GetDomainData();

        const groups = dd.Groups.map((g) => g.CustomGroupId);
        const vendors = dd.GeneralVendors.map((v) => v.VendorCustomId);

        this.vendorsAndGroups = [...groups, ...vendors];
    }
}
