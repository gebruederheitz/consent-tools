import type { Emitter } from 'mitt';
import type { CmpServiceProvider } from '../cmp-service-provider';

import EventEmitter from 'mitt';
import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

import { Modal } from '../../util/modal';
import { AbstractCmpServiceProvider } from '../abstract-provider';

/**
 * A generic (CMP-independent) provider based on simple transient events. No
 * consent information is persisted beyond the current page.
 */
export class GenericEventProvider
    extends AbstractCmpServiceProvider
    implements CmpServiceProvider
{
    protected eventProxy: Emitter<Record<string, boolean>> = EventEmitter();
    protected isFallbackProvider = false;
    protected modal: Modal | null = null;

    constructor({ isFallbackProvider = false } = {}) {
        super('GenericEventProvider CmpService');
        this.isFallbackProvider = isFallbackProvider;
        this._onClickSettingsOpener = this._onClickSettingsOpener.bind(this);
    }

    public override acceptService(serviceId: string) {
        this.eventProxy.emit(serviceId, true);
    }

    async getConsentStatusForService() {
        return false;
    }

    public isPresent() {
        return true;
    }

    public showSettingsMenu() {
        if (!this.modal) {
            this.createModal();
        }
        this.modal?.show();
    }

    public async onConsentUpdate(
        serviceId: string,
        callback: (status: boolean) => void
    ): Promise<void> {
        this.debug.log('Registering callback for service', serviceId);
        this.eventProxy.on(serviceId, callback);
    }

    protected createModal() {
        this.modal = new Modal(
            createDomElement({
                innerText: this.isFallbackProvider
                    ? 'As the main consent management script was unable to load (maybe you have blocked it through an AdBlocker or browser-settings?) consent is managed by GenericEventProvider. No preferences will be saved, only those third-party services will be loaded that you give explicit consent to.'
                    : 'Consent managed by GenericEventProvider. No preferences will be saved, only those third-party services will be loaded that you give explicit consent to.',
            })
        );
    }
}
