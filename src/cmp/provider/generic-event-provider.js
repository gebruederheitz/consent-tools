import EventEmitter from 'mitt';
import { createDomElement } from '@gebruederheitz/wp-frontend-utils';
import { Modal } from '../../util/modal.js';
import { AbstractCmpServiceProvider } from '../abstract-provider.js';

/**
 * A generic (CMP-independent) provider based on simple transient events. No
 * consent information is persisted beyond the current page.
 *
 * @implements CmpServiceProvider
 */
export class GenericEventProvider extends AbstractCmpServiceProvider {
    constructor({ isFallbackProvider = false } = {}) {
        super('GenericEventProvider CmpService');
        this.eventProxy = EventEmitter();
        this.isFallbackProvider = isFallbackProvider;
        this.modal = null;

        this._onClickSettingsOpener = this._onClickSettingsOpener.bind(this);
    }

    acceptService(serviceId) {
        this.eventProxy.emit(serviceId, true);
    }

    async getConsentStatusForService() {
        return false;
    }

    isPresent() {
        return true;
    }

    showSettingsMenu() {
        if (!this.modal) {
            this._createModal();
        }
        this.modal.show();
    }

    async onConsentUpdate(serviceId, callback) {
        this.debug.log('Registering callback for service', serviceId);
        this.eventProxy.on(serviceId, callback);
    }

    _createModal() {
        this.modal = new Modal(
            createDomElement({
                innerText: this.isFallbackProvider
                    ? 'As the main consent management script was unable to load (maybe you have blocked it through an AdBlocker or browser-settings?) consent is managed by GenericEventProvider. No preferences will be saved, only those third-party services will be loaded that you give explicit consent to.'
                    : 'Consent managed by GenericEventProvider. No preferences will be saved, only those third-party services will be loaded that you give explicit consent to.',
            })
        );
    }
}
