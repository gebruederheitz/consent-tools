import EventEmitter from 'mitt';
import _merge from 'lodash-es/merge';

import { GenericEventProvider } from './generic-event-provider.js';
import { AbstractCmpServiceProvider } from '../abstract-provider.js';

const DEFAULT_OPTIONS = {
    debug: false,
    fallbackServiceProvider: GenericEventProvider,
    loadDelayLimit: 2000,
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
        super();

        this.options = _merge(DEFAULT_OPTIONS, userOptions);
        this.eventProxy = EventEmitter();
        this.optanon = null;
        this.mutationObserver = null;
        this.currentGroupId = null;
        this.showSettingsMenu = this.showSettingsMenu.bind(this);

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
                this._listen();
            }
        }

        return cmpServiceProvider;
    }

    /**
     * OneTrust does not allow us to handle consent to individual services /
     * vendors / groups programmatically via their API, so all we can do is show
     * the user the OT settings menu / modal with the relevant service / vendor
     * selected for the user to confirm (again).
     *
     * @param {string} serviceId
     */
    acceptService(serviceId) {
        this.showSettingsMenuAtService(serviceId);
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

        const status = this._isGroupActive(groupId) || this._isVendorActive(id);
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
    onConsent(serviceId, callback) {
        this.getConsentStatusForService(serviceId).then(
            (currentlyHasConsent) => {
                if (!currentlyHasConsent) {
                    this.eventProxy.on(serviceId, () => {
                        callback(true);
                    });
                } else {
                    callback(true);
                }
            }
        );
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
                document
                    .querySelectorAll('.ot-link-btn.category-host-list-handler')
                    .forEach((groupDetailsButton) => {
                        if (
                            groupDetailsButton.dataset.parentId ===
                            this.currentGroupId
                        ) {
                            groupDetailsButton.click();
                        }
                    });
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
        const dd = this.optanon.GetDomainData();
        const serviceIdGetter = this._getServiceIdFromVendorIdGetter(dd);

        const vendor = serviceIdGetter(groupOrVendorId);
        if (vendor) {
            return [vendor.Name];
        }

        const group = dd.Groups.find(
            (e) => e.CustomGroupId === groupOrVendorId
        );

        if (group && group.GeneralVendorsIds) {
            return group.GeneralVendorsIds.map(serviceIdGetter);
        } else {
            return [];
        }
    }

    /**
     * Returns a function that will return the serviceId for any given vendor ID.
     *
     * @param {object} dd  The OT domain data object to work on.
     * @return {function(string): string}
     * @private
     */
    _getServiceIdFromVendorIdGetter(dd) {
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
        const dd = this.optanon.GetDomainData();
        const serviceDefinition = dd.GeneralVendors.find(
            (e) => e.Name === serviceId
        );
        const id =
            (serviceDefinition && serviceDefinition.VendorCustomId) || '';

        const group =
            dd.Groups &&
            dd.Groups.find(
                (g) =>
                    g.GeneralVendorsIds && g.GeneralVendorsIds.indexOf(id) > -1
            );
        return { groupId: (group && group.OptanonGroupId) || '', id };
    }

    _isGroupActive(groupId) {
        const groupMarkedActiveInGlobalObject =
            window.OptanonActiveGroups.split(',')
                .filter((e) => !!e)
                .some((allowed) => allowed === groupId);

        if (groupMarkedActiveInGlobalObject) return true;

        const groups = this.optanon.GetDomainData().Groups;
        const group = groups.find((g) => g.OptanonGroupId === groupId);
        return group && group.Status === 'active';
    }

    _isVendorActive(vendorId) {
        return window.OptanonActiveGroups.split(',')
            .filter((e) => !!e)
            .some((allowed) => allowed === vendorId);
    }

    /**
     * Attach an event listener to forward consent change events through
     * this.eventProxy. The emitted events will have the serviceId as their
     * name.
     *
     * @emits ConsentChange<serviceId>
     * @private
     */
    _listen() {
        this.optanon.OnConsentChanged(({ detail }) => {
            this.debug.log(detail);
            detail.forEach((groupOrVendorId) => {
                this.debug.log(groupOrVendorId);
                const serviceIds =
                    this._getServiceIdsFromGroupOrVendorId(groupOrVendorId);
                serviceIds &&
                    serviceIds.forEach((serviceId) => {
                        this.debug.log('consent for', serviceId);
                        this.eventProxy.emit(serviceId, true);
                    });
            });
        });
    }
}
