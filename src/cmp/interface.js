/* eslint-disable */
/**
 * @interface
 */
export class CmpServiceProvider {
    /**
     * @public
     * @abstract
     * @param {string} serviceId
     */
    acceptService(serviceId) {}

    /**
     * @public
     * @abstract
     * @param {string|Element} domSelector
     */
    attachSettingsOpener(domSelector) {}

    /**
     * @public
     * @abstract
     * @param {string} serviceId
     * @return Promise<boolean>
     */
    async getConsentStatusForService(serviceId) {}

    /**
     * @public
     * @abstract
     * @return boolean
     */
    isPresent() {}

    /**
     * @public
     * @abstract
     */
    showSettingsMenu() {}

    /**
     * @public
     * @abstract
     * @param {string} serviceId
     */
    showSettingsMenuAtService(serviceId) {}

    /**
     * @public
     * @abstract
     * @param {string} serviceId
     * @param {function} callback
     */
    onConsent(serviceId, callback) {}
}
