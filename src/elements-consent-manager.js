import _merge from 'lodash-es/merge';
import { $$, Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { ModalGdprManager } from './modal-gdpr-manager';
import { DEFAULT_EMBED_OPTIONS } from './abstract-gdpr-embed';

const DEFAULT_OPTIONS = {
    debug: false,
    selector: '[data-ghwp-uc-service]',
    hasConsentClassName: 'has-consent',
    embeds: DEFAULT_EMBED_OPTIONS.embeds,
    reloadOnConsent: false,
    clickOnConsent: false,
};

export class ElementsConsentManager extends Debuggable {
    /**
     * @param {ConsentManager} consentManager
     * @param {object}         userOptions
     */
    constructor(consentManager, userOptions = {}) {
        super('ElementsConsentManager');

        this.consentManager = consentManager;
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
            const serviceName = element.dataset?.ghwpUcService || null;
            this.debug.log('Initializing element with service', {
                element,
                serviceName,
            });

            if (serviceName === null) return;

            this.consentManager
                .withConsent(serviceName, this.showElement, element)
                .then();

            if (element.dataset?.ghwpUcModal) {
                const modalManager = new ModalGdprManager(
                    element,
                    {
                        embeds: this.options.embeds,
                        debug: this.options.debug,
                        reloadOnConsent: this.options.reloadOnConsent,
                        clickOnConsent: this.options.clickOnConsent,
                        consentType: serviceName,
                    },
                    this.consentManager
                );
                modalManager.init();
            }
        });
    }

    parseOptions(userOptions) {
        this.options = _merge(DEFAULT_OPTIONS, userOptions);
    }

    showElement(element) {
        element.classList.add(this.options.hasConsentClassName);
    }
}
