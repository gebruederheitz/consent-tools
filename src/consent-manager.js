import _merge from 'lodash-es/merge';
import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { WrappedGtm } from './util/wrap-gtm';

const DEFAULT_OPTIONS = {
    embeds: {
        useUC: false,
    },
    debug: false,
};

export class ConsentManager extends Debuggable {
    /**
     * @param {object} userOptions
     * @param {WrappedGtm} gtm
     * @param {EventEmitter2} eventProxy
     */
    constructor(userOptions, gtm, eventProxy) {
        super('ConsentManager');

        this.gtm = gtm;
        this.eventProxy = eventProxy;
        this.options = {};

        this._parseOptions(userOptions);

        this.withConsent = this.withConsent.bind(this);
    }

    /**
     * @param {WrappedGtm} gtm
     * @param {string} serviceName
     *
     * @todo: move to uc class in new cmp interface along with the GTM instance
     *        and the service- / cmp- specific parts of withConsent()
     */
    async getExistingUcConsentStatus(serviceName, gtm = null) {
        if (!gtm) {
            gtm = await this.gtm;
        }

        let relevantEvent = null;
        let hasConsent = false;

        const genericEvents = gtm.getEventData('consent_status');
        const specificEvents = gtm.getEventData(
            new RegExp(`${serviceName} .*`)
        );

        this.debug.log(`checking events for ${serviceName}`, {
            genericEvents,
            specificEvents,
        });

        if (specificEvents.length) {
            relevantEvent = specificEvents.pop();
        } else if (genericEvents.length) {
            relevantEvent = genericEvents.pop();
        }

        if (relevantEvent) {
            hasConsent = relevantEvent[serviceName] || false;
        }

        return hasConsent;
    }

    /**
     * @return {EventEmitter2}
     */
    getEventProxy() {
        return this.eventProxy;
    }

    /**
     * @return {WrappedGtm}
     */
    getGtm() {
        return this.gtm;
    }

    /**
     * Executes the given {callback} with {args} if and when there is user consent
     * for service {serviceName}.
     *
     * @param {string} serviceName
     * @param {function} callback
     * @param args
     *
     * @return {Promise<void>}
     */
    async withConsent(serviceName, callback, ...args) {
        this.debug.log('Init with consent', {
            options: this.options,
            serviceName,
        });
        if (this.options.embeds.useUC && serviceName) {
            const gtm = await this.gtm;
            if (gtm && gtm instanceof WrappedGtm) {
                const hasConsent = await this.getExistingUcConsentStatus(
                    serviceName,
                    gtm
                );

                this.debug.log(
                    `UC mode: service ${serviceName} has consent:`,
                    hasConsent
                );

                if (hasConsent) {
                    return callback(...args);
                } else {
                    const onConsentUpdate = this._getOnConsentUpdate(
                        serviceName,
                        callback,
                        ...args
                    );
                    gtm.subscribe('consent_status', onConsentUpdate);
                    gtm.subscribe(`${serviceName}`, onConsentUpdate);
                }
            } else {
                this.debug.error(
                    'No GTM data layer found for consent management!'
                );
            }
        } else {
            this.eventProxy.on(serviceName, () => {
                callback(...args);
            });
        }
    }

    async withConsentOrDenial(serviceName, callback, ...args) {
        this.debug.log('Init with consent or denial', {
            options: this.options,
            serviceName,
        });

        if (this.options.embeds.useUC && serviceName) {
            const gtm = await this.gtm;
            if (gtm && gtm instanceof WrappedGtm) {
                const hasConsent = await this.getExistingUcConsentStatus(
                    serviceName,
                    gtm
                );

                this.debug.log(
                    `UC mode: service ${serviceName} has consent:`,
                    hasConsent
                );

                callback(hasConsent, ...args);

                const onUpdate = this._getOnUpdate(serviceName, callback);
                gtm.subscribe('consent_status', onUpdate);
                gtm.subscribe(`${serviceName}`, onUpdate);
            } else {
                this.debug.error(
                    'No GTM data layer found for consent management!'
                );
            }
        } else {
            this.eventProxy.on(serviceName, () => {
                callback(true, ...args);
            });
        }
    }

    _getOnConsentUpdate(serviceName, callback, ...args) {
        return (event) => {
            if (event[serviceName]) {
                callback(...args);
            }
        };
    }

    _getOnUpdate(serviceName, callback, ...args) {
        return (event) => {
            this.debug.log('consent update!', { event, serviceName });
            const hasConsent = !!event[serviceName];
            callback(hasConsent, ...args);
        };
    }

    _parseOptions(userOptions) {
        this.options = _merge(DEFAULT_OPTIONS, userOptions);
    }
}
