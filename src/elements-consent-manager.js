import _merge from 'lodash-es/merge';
import { $$, Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { ModalConsentManager } from './modal-consent-manager.js';

const DEFAULT_OPTIONS = {
    debug: false,
    selector: '[data-ghct-service]',
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
            const serviceName = this._getServiceNameFromElementDataset(element);
            this.debug.log('Initializing element with service', {
                element,
                serviceName,
            });

            if (serviceName === null) return;

            this.consentManager
                .withConsent(serviceName, this.showElement, element)
                .then();

            if (this._elementWantsModal(element)) {
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

        if (this.options.selector === '[data-ghct-service]') {
            const prefix = this.settings.getAttributesPrefix();
            if (prefix !== 'ghct') {
                this.options.selector = `[data-${prefix}-service]`;
            }
        }
    }

    showElement(element) {
        element.classList.add(this.options.hasConsentClassName);
    }

    /**
     * @param {Element} element
     * @return {?string}
     * @private
     */
    _getServiceNameFromElementDataset(element) {
        const prefix = this.settings.getAttributesPrefix();
        const attributeName = prefix + 'Service';
        return (element.dataset && element.dataset[attributeName]) || null;
    }

    /**
     * @param {Element} element
     * @return {boolean}
     * @private
     */
    _elementWantsModal(element) {
        const prefix = this.settings.getAttributesPrefix();
        const attributeName = prefix + 'Modal';
        return (
            (element.dataset && element.dataset[attributeName] === 'true') ||
            false
        );
    }
}
