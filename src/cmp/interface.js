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
     * Attach a continuous listener to any consent updates for the service
     * identified by serviceId. The callback will receive a boolean first
     * argument indicating the updated consent status, as well as your custom
     * args provided on registration.
     *
     * @public
     * @abstract
     * @param {string} serviceId
     * @param {(status: boolean) => any} callback
     * @return Promise<void>
     */
    async onConsentUpdate(serviceId, callback) {}
}
