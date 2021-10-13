import _merge from 'lodash-es/merge';
import { $$, Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { ModalConsentManager } from './modal-consent-manager.js';

const DEFAULT_OPTIONS = {
    debug: false,
    // @TODO: rename data attribute
    selector: '[data-ghwp-uc-service]',
    hasConsentClassName: 'has-consent',
};

/**
 * Show / hide elements based on user consent to a service
 *   and/or trigger certain actions only with user consent.
 */
export class ElementsConsentManager extends Debuggable {
    /**
     * @param {ConsentManager}  consentManager
     * @param {ConsentSettings} settings
     * @param {object}          userOptions
     */
    constructor(consentManager, settings, userOptions = {}) {
        super('ElementsConsentManager');

        this.consentManager = consentManager;
        this.settings = settings;
        this.options = {};
        this.elements = [];

        this.showElement = this.showElement.bind(this);

        this.parseOptions(userOptions);

        this.elements = $$()(this.options.selector);
        this.debug.log('Init:', this.elements);
        this.initElements();
    }

    initElements() {
        if (!(this.elements && this.elements.length)) return;

        this.elements.forEach((element) => {
            // @TODO: rename data attribute
            const serviceName = element.dataset?.ghwpUcService || null;
            this.debug.log('Initializing element with service', {
                element,
                serviceName,
            });

            if (serviceName === null) return;

            this.consentManager
                .withConsent(serviceName, this.showElement, element)
                .then();

            // @TODO: rename data attribute
            if (element.dataset?.ghwpUcModal) {
                this.consentManager
                    .getServiceConsentStatus(serviceName)
                    .then((hasConsent) => {
                        this.debug.log(
                            `Maybe init modal, service ${serviceName} has ${
                                hasConsent ? '' : 'no'
                            } consent.`
                        );
                        if (!hasConsent)
                            this.initModalManager(element, serviceName);
                    });
            }
        });
    }

    initModalManager(element, serviceName) {
        const modalManager = new ModalConsentManager(
            element,
            this.consentManager,
            serviceName,
            this.settings
        );
        modalManager.init();
    }

    parseOptions(userOptions) {
        this.options = _merge(DEFAULT_OPTIONS, userOptions);
    }

    showElement(element) {
        element.classList.add(this.options.hasConsentClassName);
    }
}
