import _merge from 'lodash-es/merge';
import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

const DEFAULT_OPTIONS = {
    debug: false,
};

/**
 * @class ConsentManager
 *
 * Acts as a thin layer around implementations of CmpServiceProvider and exposes
 * a public API for consumers.
 *
 */
export class ConsentManager extends Debuggable {
    /**
     * @param {CmpServiceProvider} cmpService
     * @param {object} userOptions
     */
    constructor(cmpService, userOptions = {}) {
        super('ConsentManager');

        this.cmpService = cmpService;
        this.options = _merge(DEFAULT_OPTIONS, userOptions);

        this.withConsent = this.withConsent.bind(this);
    }

    /**
     * Signal to the CMP that the given service now has user consent.
     *
     * @param {string} serviceId
     */
    acceptService(serviceId) {
        this.debug.log('Accept service', serviceId);
        this.cmpService.acceptService(serviceId);
    }

    /**
     * Get the current status of the specified status. Returns `true` if the user
     * has given their consent, `false` otherwise.
     *
     * @param {string} serviceName
     * @return {Promise<boolean>}
     */
    async getServiceConsentStatus(serviceName) {
        return await this.cmpService.getConsentStatusForService(serviceName);
    }

    /**
     * Open the CMP's settings menu / modal.
     */
    showSettings() {
        this.cmpService.showSettingsMenu();
    }

    /**
     * Open the CMP's settings menu (modal) at a specific service's description.
     *
     * @param {string} serviceId
     */
    showSettingsAtService(serviceId) {
        this.cmpService.showSettingsMenuAtService(serviceId);
    }

    /**
     * @deprecated
     *
     * @param {string} serviceId
     */
    usercentricsUnblock(serviceId) {
        if (window.uc) {
            const templateId =
                window.uc?.localProviders?.find((e) => e.title === serviceId)[
                    'pid'
                ] || null;

            if (templateId) {
                window.uc.deactivateBlocking &&
                    window.uc.deactivateBlocking([templateId]);
            }
        }
    }

    /**
     * Executes the given {callback} with {args} if and when there is user consent
     * for service {serviceId}.
     *
     * @param {string}   serviceId   Name of the service that requires consent
     * @param {function} callback    A function to execute once consent is given
     * @param {*}        args        Arguments to the callback
     *
     * @return {Promise<void>}
     */
    async withConsent(serviceId, callback, ...args) {
        this.debug.log('Init with consent', {
            options: this.options,
            serviceName: serviceId,
        });
        const hasConsent = await this.getServiceConsentStatus(serviceId);

        this.debug.log(`Service ${serviceId} has consent:`, hasConsent);

        if (hasConsent) {
            return callback(...args);
        } else {
            const onConsentUpdate = this._getOnConsentUpdate(
                serviceId,
                callback,
                ...args
            );

            this.cmpService.onConsent(serviceId, onConsentUpdate);
        }
    }

    /**
     * Executes the given {callback} with {args} if and when the user consent
     * for service {serviceId} changes. The callback will receive the updated
     * consent status as a boolean as its first argument.
     *
     * @param {string}   serviceId   Name of the service that requires consent
     * @param {function} callback    A function to execute once consent is given
     * @param {*}        args        Arguments to the callback
     *
     * @return {Promise<void>}
     */
    async withConsentOrDenial(serviceId, callback, ...args) {
        this.debug.log('Init with consent or denial', {
            options: this.options,
            serviceId,
        });

        const hasConsent = await this.getServiceConsentStatus(serviceId);

        this.debug.log(`Service ${serviceId} has consent:`, hasConsent);

        callback(hasConsent, ...args);

        const onUpdate = this._getOnUpdate(serviceId, callback);
        this.cmpService.onConsent(serviceId, onUpdate);
    }

    /**
     * @param {string}   serviceName
     * @param {function} callback
     * @param {*}        args
     * @return {(function(boolean): void)|*}
     * @private
     */
    _getOnConsentUpdate(serviceName, callback, ...args) {
        return (hasConsent) => {
            if (hasConsent) {
                callback(...args);
            }
        };
    }

    /**
     * @param {string}   serviceName
     * @param {function} callback
     * @param {*}        args
     * @return {(function(*): void)|*}
     * @private
     */
    _getOnUpdate(serviceName, callback, ...args) {
        return (hasConsent) => {
            this.debug.log('consent update!', { hasConsent, serviceName });

            callback(hasConsent, ...args);
        };
    }
}
