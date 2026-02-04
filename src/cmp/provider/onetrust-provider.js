import EventEmitter from 'mitt';
import _merge from 'lodash-es/merge';
import _difference from 'lodash-es/difference';
import _uniq from 'lodash-es/uniq';

import { GenericEventProvider } from './generic-event-provider.js';
import { AbstractCmpServiceProvider } from '../abstract-provider.js';

const DEFAULT_OPTIONS = {
    debug: false,
    fallbackServiceProvider: GenericEventProvider,
    loadDelayLimit: 2000,
};

const UPDATE_CONSENT_TYPE = {
    GeneralVendor: 'General Vendor',
    Group: 'Category',
};

/**
 * @implements CmpServiceProvider
 */
export class OneTrustProvider extends AbstractCmpServiceProvider {
    /**
     * Constructor for the OneTrust CMP service provider with a fallback to
     * `fallbackServiceProvider`.
     *
     * @param {object}                      userOptions
     * @param {boolean}                     userOptions.debug                   Toggles debug output (default false)
     * @param {CmpServiceProviderInterface} userOptions.fallbackServiceProvider A fallback provider that will be used if
     *                                                                          the CMP service can not be loaded on the
     *                                                                          current page (default
     *                                                                          GenericEventProvider)
     * @param {number}                      userOptions.loadDelayLimit          How long (in ms) to wait for OneTrust to
     *                                                                          loaded on the page (default 2000)
     * @return {Promise<CmpServiceProviderInterface>}
     */
    constructor(userOptions = {}) {
        super('OneTrustProvider');

        this.options = _merge(DEFAULT_OPTIONS, userOptions);
        this.eventProxy = EventEmitter();
        this.optanon = null;
        this.mutationObserver = null;
        this.currentGroupId = null;
        this.vendorsAndGroups = [];
        this.vendorAndGroupToServiceIdsCache = new Map();
        this.serviceIdToVendorIdAndGroupIdCache = new Map();
        this.showSettingsMenu = this.showSettingsMenu.bind(this);
        this._getServiceIdsFromGroupOrVendorId =
            this._getServiceIdsFromGroupOrVendorId.bind(this);

        return this.init();
    }

    /**
     * Wait for the underlying CMP service to initialize and return this
     * instance or an instance of the fallback provider.
     *
     * @return {Promise<CmpServiceProviderInterface>}
     */
    async init() {
        let cmpServiceProvider = this;

        if (!this.isPresent()) {
            this.debug.log('OT not present – building proxy');

            const oneTrustHasLoaded = new Promise((res) => {
                const callback = (optanon) => {
                    this.debug.log('OT loaded', { optanon });
                    this.optanon = optanon;
                    res();
                };
                this._dirtyObserveOptanonObject(callback);
            });

            const deadline = new Promise((res) => {
                setTimeout(res, this.options.loadDelayLimit);
            });

            await Promise.race([oneTrustHasLoaded, deadline]);

            if (!this.isPresent()) {
                this.debug.log(
                    'Still no OneTrust – using fallback service provider'
                );
                cmpServiceProvider = new this.options.fallbackServiceProvider({
                    isFallbackProvider: true,
                });
            } else {
                this.debug.log('Found OneTrust – attaching event listeners.');
                this._parseVendorsAndGroups();
                this._listen();
            }
        }

        return cmpServiceProvider;
    }

    /**
     * @param {string} serviceId
     */
    acceptService(serviceId) {
        const { id: vendorId, groupId } =
            this._getGroupAndVendorIdFromServiceId(serviceId);

        this.debug.log('accepting service', {
            serviceId,
            vendorId,
            groupId,
        });

        if (!vendorId) {
            if (groupId) {
                this.optanon.UpdateConsent(
                    UPDATE_CONSENT_TYPE.Group,
                    `${groupId}:1`
                );
                requestAnimationFrame(() => {
                    this.optanon.Close();
                });
            } else {
                this.showSettingsMenuAtService(serviceId);
            }

            return;
        }

        this.debug.log('Have vendor ID, updating consent');

        this.optanon.UpdateConsent(
            UPDATE_CONSENT_TYPE.GeneralVendor,
            `${vendorId}:1`
        );
    }

    /**
     * @inheritDoc
     */
    attachSettingsOpener(domSelector) {
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
     *
     * @param {string} serviceId
     * @return {Promise<boolean>}
     */
    async getConsentStatusForService(serviceId) {
        const { id, groupId } =
            this._getGroupAndVendorIdFromServiceId(serviceId);

        const status = this._isGroupOrVendorActive(groupId, id);
        this.debug.log('Consent status for ' + serviceId, status);
        return status;
    }

    /**
     * @inheritDoc
     */
    isPresent() {
        return !!this.optanon;
    }

    /**
     * @inheritDoc
     */
    async onConsentUpdate(serviceId, callback) {
        this.eventProxy.on(serviceId, (status) => {
            callback(status);
        });
    }

    /**
     * @inheritDoc
     */
    showSettingsMenu() {
        this.optanon.ToggleInfoDisplay();
    }

    /**
     * @inheritDoc
     */
    showSettingsMenuAtService(serviceId) {
        const { groupId } = this._getGroupAndVendorIdFromServiceId(serviceId);
        const banner = document.querySelector('#onetrust-consent-sdk');

        this.currentGroupId = groupId;
        const mo = this._getMutationObserver();
        mo.observe(banner, {
            attributes: true,
            childList: true,
            subtree: true,
        });

        this.showSettingsMenu();
    }

    /**
     * Wait for the Optanon / OneTrust global object to be available with
     * "dirty" observe via polling.
     *
     * @param {function} onChanged  Callback will be called once window.Optanon
     *                              or window.OneTrust is available. Will
     *                              receive the available object as the first
     *                              parameter.
     * @private
     */
    _dirtyObserveOptanonObject(onChanged) {
        let t = 0;
        let done = false;
        const timeout = 200;
        const maxTries = this.options.loadDelayLimit / timeout;

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

    _getMutationObserver() {
        if (!this.mutationObserver) {
            this.mutationObserver = new MutationObserver(() => {
                const className = '.ot-link-btn.category-host-list-handler';
                const selector = `${className}[data-parent-id="${this.currentGroupId}"]`;
                const groupOpener = document.querySelector(selector);

                if (groupOpener) {
                    groupOpener.click();
                }

                this.mutationObserver.disconnect();
            });
        }

        return this.mutationObserver;
    }

    /**
     * For a group ID, this will return an array of serviceIds that belong to
     * that group; for a vendor ID it will return the name of said vendor as
     * a single array item.
     *
     * @param {string} groupOrVendorId
     * @return {string[]} serviceIds
     * @private
     */
    _getServiceIdsFromGroupOrVendorId(groupOrVendorId) {
        if (this.vendorAndGroupToServiceIdsCache.has(groupOrVendorId)) {
            return this.vendorAndGroupToServiceIdsCache.get(groupOrVendorId);
        }

        const dd = this.optanon.GetDomainData();
        const serviceIdGetter = this._getVendorFromVendorIdGetter(dd);

        const vendor = serviceIdGetter(groupOrVendorId);
        if (vendor) {
            const result = [vendor.Name];
            this.vendorAndGroupToServiceIdsCache.set(groupOrVendorId, result);

            return result;
        }

        const group = dd.Groups.find(
            (e) => e.CustomGroupId === groupOrVendorId
        );

        let result = [];

        if (group && group.GeneralVendorsIds) {
            result = group.GeneralVendorsIds.map(serviceIdGetter)
                .map((v) => v?.Name)
                .filter((e) => e?.length);
        }

        this.vendorAndGroupToServiceIdsCache.set(groupOrVendorId, result);

        return result;
    }

    /**
     * Returns a function that will return the vendor object for any given vendor ID.
     *
     * @param {object} dd  The OT domain data object to work on.
     * @return {function(string): string}
     * @private
     */
    _getVendorFromVendorIdGetter(dd) {
        return (vendorId) =>
            dd.GeneralVendors.find((e) => e.VendorCustomId === vendorId);
    }

    /**
     * For any given serviceId this will return the OT "custom vendor ID" and
     * the consent group it belongs to.
     *
     * @param {string} serviceId
     * @return {{groupId: string, id: string}}
     * @private
     */
    _getGroupAndVendorIdFromServiceId(serviceId) {
        if (this.serviceIdToVendorIdAndGroupIdCache.has(serviceId)) {
            return this.serviceIdToVendorIdAndGroupIdCache.get(serviceId);
        }

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

        let group =
            dd.Groups &&
            dd.Groups.find(
                (g) =>
                    g.GeneralVendorsIds && g.GeneralVendorsIds.indexOf(id) > -1
            );

        if (!group) {
            const customIdIndex = dd.Groups.findIndex(
                (e) => e.CustomGroupId === serviceId
            );
            const otIdIndex = dd.Groups.findIndex(
                (e) => e.OptanonGroupId === serviceId
            );
            if (customIdIndex > -1) {
                // this serviceId references a group via its CustomGroupId
                group = dd.Groups[customIdIndex];
            } else if (otIdIndex > -1) {
                group = dd.Groups[otIdIndex];
            }
        }

        const result = { groupId: (group && group.OptanonGroupId) || '', id };
        this.serviceIdToVendorIdAndGroupIdCache.set(serviceId, result);

        return result;
    }

    /**
     * Checks whether any of the Group- or Vendor-IDs passed is contained in
     * the global OptanonActiveGroups string.
     *
     * @param {string} groupOrVendorIds  An arbitrary number of groupIds and/or
     *                                   vendor IDs.
     * @return {boolean}  Returns true if any of the given IDs is found in
     *                    OneTrust's OptanonActiveGroups
     * @private
     */
    _isGroupOrVendorActive(...groupOrVendorIds) {
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
        this.optanon.OnConsentChanged(({ detail }) => {
            this.debug.log(detail);
            const vendorsAndGroupsWithConsent = [...detail];

            detail.forEach((consentedGroupOrVendorId) => {
                this.debug.log(consentedGroupOrVendorId);
                const consentedServiceIds =
                    this._getServiceIdsFromGroupOrVendorId(
                        consentedGroupOrVendorId
                    );

                if (consentedServiceIds) {
                    vendorsAndGroupsWithConsent.unshift(...consentedServiceIds);
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

            let mappedNoConsentIds = noConsentIds
                .map(this._getServiceIdsFromGroupOrVendorId)
                .flat();

            // remove any services that might have been explicitly allowed, but
            // ended up in mappedNoConsentIds due to their group not having
            // consent
            mappedNoConsentIds = _difference(
                mappedNoConsentIds,
                vendorsAndGroupsWithConsent
            );

            const deniedServicesVendorsAndGroups = _uniq([
                ...mappedNoConsentIds,
                ...noConsentIds,
            ]);

            deniedServicesVendorsAndGroups
                .filter((e) => e?.length)
                .forEach((serviceId) => {
                    this.debug.log('consent withheld for', serviceId);
                    this.eventProxy.emit(serviceId, false);
                });
        });
    }

    _parseVendorsAndGroups() {
        const dd = this.optanon.GetDomainData();

        const groups = dd.Groups.map((g) => g.CustomGroupId);
        const vendors = dd.GeneralVendors.map((v) => v.VendorCustomId);

        this.vendorsAndGroups = [...groups, ...vendors];
    }
}
