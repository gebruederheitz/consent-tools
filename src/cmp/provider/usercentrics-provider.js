import _merge from 'lodash-es/merge';

import { gtm } from '../../util/wrap-gtm.js';
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
export class UsercentricsProvider extends AbstractCmpServiceProvider {
    /**
     * @param options
     * @param {boolean}            options.debug                     Toggle debug logging output (default false)
     * @param {CmpServiceProvider} options.fallbackServiceProvider   The fallback generic provider to use should the
     *                                                               specific service not be present on the page
     *                                                               (default GenericEventProvider).
     * @param {number}             options.loadDelayLimit            Time in ms to wait for the service (Usercentrics)
     *                                                               before falling back to the fallbackServiceProvider
     *                                                               (default 2000).
     */
    constructor(options = {}) {
        super('Usercentrics CmpService');
        this.options = _merge(DEFAULT_OPTIONS, options);

        this._onClick = this._onClick.bind(this);

        window.dataLayer = window.dataLayer || [];
        this.gtm = gtm;
    }

    async init() {
        let cmpServiceProvider = this;

        if (!this.isPresent()) {
            this.debug.log('UC not present – building proxy');

            const usercentricsHasLoaded = new Promise((res) => {
                this._dirtyObserveUcUiObject(res);
            });

            const deadline = new Promise((res) => {
                setTimeout(res, this.options.loadDelayLimit);
            });

            await Promise.race([usercentricsHasLoaded, deadline]);

            if (!this.isPresent()) {
                this.debug.log('Still no UC – using fallback service provider');
                cmpServiceProvider = new this.options.fallbackServiceProvider({
                    isFallbackProvider: true,
                });
            }
        }

        return cmpServiceProvider;
    }

    acceptService(serviceId) {
        this.debug.log('Loading service in UC', serviceId);
        if (this.isPresent()) {
            const templateId = this._getTemplateIdByServiceName(serviceId);
            if (templateId) {
                window.UC_UI.acceptService(templateId);
            }
        }
    }

    async getConsentStatusForService(serviceId) {
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
            hasConsent = relevantEvent[serviceId] || false;
        }

        return hasConsent;
    }

    isPresent() {
        return (
            window.UC_UI &&
            window.UC_UI.isInitialized &&
            window.UC_UI.isInitialized()
        );
    }

    showSettingsMenu() {
        this.isPresent() && window.UC_UI.showSecondLayer();
    }

    showSettingsMenuAtService(serviceId) {
        const templateId = this._getTemplateIdByServiceName(serviceId);
        if (templateId && this.isPresent()) {
            window.UC_UI.showSecondLayer(templateId);
        }
    }

    async onConsent(serviceId, callback) {
        const gtm = await this.gtm;

        const onGenericConsentEvent = (event) => {
            callback(event[serviceId] || false);
        };

        gtm.subscribe('consent_status', onGenericConsentEvent);
        gtm.subscribe(`${serviceId}`, () => {
            callback(false);
        });
    }

    _dirtyObserveUcUiObject(onChanged) {
        let t = 0;
        let done = false;
        const maxTries = 10;
        const timeout = 200;

        const timer = () => {
            setTimeout(() => {
                if (
                    window.UC_UI &&
                    window.UC_UI.isInitialized &&
                    window.UC_UI.isInitialized()
                ) {
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

    /**
     * @param {string} serviceName
     * @return {?string}
     * @private
     */
    _getTemplateIdByServiceName(serviceName) {
        const services = window.UC_UI.getServicesBaseInfo();
        const service = services.find((e) => e.name === serviceName);
        if (service) {
            return service.id;
        } else {
            return null;
        }
    }

    _onClick(e) {
        if (this.isPresent()) {
            e.preventDefault();
            this.showSettingsMenu();
        }
    }
}
