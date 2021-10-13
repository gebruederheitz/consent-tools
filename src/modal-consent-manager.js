import { AbstractEmbed } from './embed/abstract-embed.js';
import { Modal } from './util/modal';

export class ModalConsentManager extends AbstractEmbed {
    /**
     * @param {Element} container
     * @param {ConsentManager} consentManager
     * @param {string} serviceId
     * @param {ConsentSettings} settings
     */
    constructor(container, consentManager, serviceId, settings) {
        super('ModalConsentManager', container, consentManager, settings);

        this.serviceId = serviceId;
        this.onModalOpenerClicked = this.onModalOpenerClicked.bind(this);
        this.url = 'none';
    }

    getContainer(container) {
        this.trigger = container;
        this.modal = new Modal();
        return this.modal.getContainer();
    }

    getType() {
        return this.serviceId || 'generic';
    }

    async listen() {
        await super.listen();

        this.trigger.addEventListener('click', this.onModalOpenerClicked);
    }

    loadEmbed(direct = false) {
        this.debug.log('Modal: load embed', this.settings);
        super.loadEmbed(direct);
        this.modal.hide();
        if (direct) {
            this.debug.log(
                'Direct load: checking whether to reload page or simulate a click event on the trigger'
            );
            if (this.settings.isReloadOnConsent(this.type)) {
                window.history.go();
            }
            if (this.settings.isClickOnConsent(this.type)) {
                this.trigger.click();
            }
        }

        this.modal.destroy();
        this.trigger.removeEventListener('click', this.onModalOpenerClicked);
    }

    onModalOpenerClicked(e) {
        if (!this.hasLoaded) {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.modal.show();
        }
    }

    unloadEmbed() {
        super.unloadEmbed();
    }
}
