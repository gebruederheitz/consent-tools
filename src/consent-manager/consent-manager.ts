import type { CmpServiceProvider } from '../cmp/cmp-service-provider';
import type { ConsentSettings } from '../util/settings/consent-settings';

import _merge from 'lodash-es/merge';
import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

interface ConsentManagerOptions {
    debug?: boolean;
}

type Args = Array<unknown>;

const DEFAULT_OPTIONS: ConsentManagerOptions = {
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
    protected _cmpService;
    protected _options;
    protected _settings;

    constructor(
        cmpService: CmpServiceProvider,
        consentSettings: ConsentSettings,
        userOptions: ConsentManagerOptions = {}
    ) {
        super('ConsentManager');

        this._cmpService = cmpService;
        this._settings = consentSettings;
        this._options = _merge(DEFAULT_OPTIONS, userOptions);
    }

    /**
     * Signal to the CMP that the given service now has user consent.
     */
    public acceptService(serviceId: string): void {
        this.debug.log('Accept service', serviceId);
        const cmpServiceId = this._settings.cmpServiceId.get(serviceId);
        this.debug.log('Accepting service with CMP service Id', cmpServiceId);
        this._cmpService.acceptService(cmpServiceId);
    }

    /**
     * Get the current status of the specified status. Returns `true` if the user
     * has given their consent, `false` otherwise.
     */
    public async getServiceConsentStatus(serviceId: string): Promise<boolean> {
        const cmpServiceId = this._settings.cmpServiceId.get(serviceId);
        return await this._cmpService.getConsentStatusForService(cmpServiceId);
    }

    /**
     * Open the CMP's settings menu / modal.
     */
    public showSettings(): void {
        this._cmpService.showSettingsMenu();
    }

    /**
     * Open the CMP's settings menu (modal) at a specific service's description.
     */
    public showSettingsAtService(serviceId: string): void {
        const cmpServiceId = this._settings.cmpServiceId.get(serviceId);
        this._cmpService.showSettingsMenuAtService(cmpServiceId);
    }

    /**
     * Executes the given {callback} with {args} if and when there is user consent
     * for service {serviceId}.
     *
     * @param {string}   serviceId   Name of the service that requires consent
     * @param {function} callback    A function to execute once consent is given
     * @param {*}        args        Arguments to the callback
     */
    public withConsent = async <A extends Args>(
        serviceId: string,
        callback: (...args: A) => void,
        ...args: A
    ): Promise<void> => {
        this.debug.log('Init with consent', {
            options: this._options,
            serviceName: serviceId,
        });
        const hasConsent = await this.getServiceConsentStatus(serviceId);

        this.debug.log(`Service ${serviceId} has consent:`, hasConsent);

        if (hasConsent) {
            return callback(...args);
        } else {
            const onConsentUpdate = this._getOnConsentUpdate(callback, ...args);

            const cmpServiceId = this._settings.cmpServiceId.get(
                serviceId
            ) as string;
            await this._cmpService.onConsentUpdate(
                cmpServiceId,
                onConsentUpdate
            );
        }
    };

    /**
     * Executes the given {callback} with {args} if and when the user consent
     * for service {serviceId} changes. The callback will receive the updated
     * consent status as a boolean as its first argument.
     *
     * @param {string}   serviceId   Name of the service that requires consent
     * @param {function} callback    A function to execute once consent is given
     * @param {*}        args        Arguments to the callback
     */
    public async withConsentOrDenial<A extends Args>(
        serviceId: string,
        callback: (status: boolean, ...args: A) => void,
        ...args: A
    ): Promise<void> {
        this.debug.log('Init with consent or denial', {
            options: this._options,
            serviceId,
        });

        const hasConsent = await this.getServiceConsentStatus(serviceId);

        this.debug.log(`Service ${serviceId} has consent:`, hasConsent);

        callback(hasConsent, ...args);

        const onUpdate = this._getOnUpdate(serviceId, callback, ...args);
        const cmpServiceId = this._settings.cmpServiceId.get(
            serviceId
        ) as string;
        await this._cmpService.onConsentUpdate(cmpServiceId, onUpdate);
    }

    private _getOnConsentUpdate<A extends Args>(
        callback: (...args: A) => void,
        ...args: A
    ): (status: boolean) => void {
        return (hasConsent) => {
            if (hasConsent) {
                callback(...args);
            }
        };
    }

    private _getOnUpdate<A extends Args>(
        serviceId: string,
        callback: (status: boolean, ...args: A) => void,
        ...args: A
    ): (status: boolean) => void {
        return (hasConsent) => {
            this.debug.log('consent update!', {
                hasConsent,
                serviceName: serviceId,
            });

            callback(hasConsent, ...args);
        };
    }
}
