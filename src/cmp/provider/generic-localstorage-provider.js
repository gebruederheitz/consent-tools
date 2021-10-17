import storage from 'store2';
import EventEmitter from 'mitt';
import { createDomElement } from '@gebruederheitz/wp-frontend-utils';
import { Modal } from '../../util/modal.js';
import { AbstractCmpServiceProvider } from '../abstract-provider.js';
import _merge from 'lodash-es/merge';

/**
 * A generic provider that stores consent information in session storage, so
 * no such information is persisted across browser sessions.
 *
 * @TODO: add support for consent-driven localstorage support (i.e. consent for
 *        ls given? --> move everything from session storage to local storage
 *
 * @implements CmpServiceProvider
 */
export class GenericLocalStorageProvider extends AbstractCmpServiceProvider {
    constructor({ isFallbackProvider = false, types = {} } = {}) {
        super('GenericLocalStorageProvider CmpService');
        this.localStorage = storage.namespace('gh-consent-tools').session;
        this.eventProxy = EventEmitter();
        this.isFallbackProvider = isFallbackProvider;
        this.types = types;
        this.modal = null;

        this._onHideModal = this._onHideModal.bind(this);
    }

    acceptService(serviceId) {
        this.localStorage.transact('consents', (consents) => {
            return {
                ...consents,
                [serviceId]: true,
            };
        });

        this.eventProxy.emit(serviceId, true);
    }

    async getConsentStatusForService(serviceId) {
        return (
            this.localStorage.get('consents', { [serviceId]: false })[
                serviceId
            ] || false
        );
    }

    isPresent() {
        return true;
    }

    showSettingsMenu() {
        this._prepareModal();
        this.modal.show();
    }

    onConsent(serviceId, callback) {
        this.eventProxy.on(serviceId, callback);
    }

    _prepareModal() {
        if (!this.modal) {
            this._createModal();
        } else {
            this.modal.replaceContent(this._getModalContent());
        }
    }

    _createModal() {
        this.modal = new Modal(this._getModalContent());
    }

    /**
     * @return {HTMLElement}
     * @private
     */
    _getModalContent() {
        const wrapper = createDomElement({
            classNames: ['ghct-ls-provider-modal'],
        });

        createDomElement({
            type: 'P',
            innerText: this.isFallbackProvider
                ? 'As the main consent management script was unable to load (maybe you have blocked it through an AdBlocker or browser-settings?) consent is managed by GenericLocalStorageProvider. Your preferences will only be saved to your browser session. Only those third-party services will be loaded that you give explicit consent to during this browsing session.'
                : 'Consent managed by GenericLocalStorageProvider. Your preferences will only be saved to your browser session. Only those third-party services will be loaded that you give explicit consent to during this browsing session.',
            parent: wrapper,
        });

        const services = this._getServices();

        if (services.length) {
            createDomElement({
                type: 'P',
                innerText:
                    'In this session, you have accepted to load the following services. Any other third-party services are blocked.',
                parent: wrapper,
            });

            const ul = createDomElement({
                type: 'UL',
                parent: wrapper,
                classNames: ['ghct-services'],
            });

            services.forEach((serviceDefinition) => {
                const li = createDomElement({
                    type: 'LI',
                    classNames: ['ghct-service'],
                    parent: ul,
                });

                const textWrap = createDomElement({
                    classNames: ['ghct-service__text'],
                    parent: li,
                });

                createDomElement({
                    classNames: ['ghct-service__name'],
                    parent: textWrap,
                    innerText: serviceDefinition.name,
                });

                const inputWrap = createDomElement({
                    classNames: ['ghct-service__switch'],
                    parent: li,
                });

                const inputAttributes = {
                    type: 'checkbox',
                    name: serviceDefinition.name,
                };
                if (serviceDefinition.hasConsent) {
                    inputAttributes.checked = true;
                }
                if (serviceDefinition.isEssential) {
                    inputAttributes.disabled = true;
                }

                createDomElement({
                    type: 'INPUT',
                    attributes: inputAttributes,
                    parent: inputWrap,
                });

                if (serviceDefinition.description) {
                    createDomElement({
                        classNames: ['ghct-service__description'],
                        innerText: serviceDefinition.description,
                        parent: textWrap,
                    });
                }
            });

            createDomElement({
                type: 'P',
                innerText:
                    'You can find more information about these services, why they are being used and how they process your data on the privacy policy page. To revoke your consent, please restart your browser.',
                parent: wrapper,
            });
        } else {
            createDomElement({
                type: 'P',
                innerText:
                    'In this session, you have not accepted to load any services yet. All third-party services are blocked.',
                parent: wrapper,
            });
        }

        const button = createDomElement({
            parent: wrapper,
            type: 'BUTTON',
            attributes: { type: 'button' },
            classNames: ['btn', 'button', 'ghwp-embed-placeholder__button'],
            innerText: 'Got it.',
        });

        button.addEventListener('click', this._onHideModal);

        return wrapper;
    }

    /**
     *
     * @return {{}[]}
     * @private
     */
    _getServices() {
        let output = [];
        let types = _merge({}, this.types);

        const servicesConsented = this.localStorage.get('consents', {});

        Object.keys(types).forEach((serviceName) => {
            output.push({
                ...types[serviceName],
                name:
                    (types[serviceName] &&
                        types[serviceName].servicePrettyName) ||
                    serviceName,
                hasConsent: servicesConsented[serviceName] === true,
            });
        });

        this.debug.log(output);

        return output;
    }

    _onHideModal() {
        this.debug.log('clickety');
        this.modal && this.modal.hide();
    }
}
