import { AbstractGdprEmbed } from './abstract-gdpr-embed';
import { Modal } from './util/modal';

export class ModalGdprManager extends AbstractGdprEmbed {
    /**
     * @param {Element} container
     * @param {object} userOptions
     * @param {ConsentManager} consentManager
     */
    constructor(container, userOptions = {}, consentManager) {
        super(container, userOptions, consentManager);

        this.onModalOpenerClicked = this.onModalOpenerClicked.bind(this);
        this.url = 'none';
    }

    getContainer(container) {
        this.trigger = container;
        this.modal = new Modal();
        return this.modal.getContainer();
    }

    getType(userOptions) {
        return userOptions.consentType || 'generic';
    }

    async listen() {
        await super.listen();

        this.trigger.addEventListener('click', this.onModalOpenerClicked);
    }

    loadEmbed(direct = false) {
        this.debug.log('Modal: load embed', this.options);
        super.loadEmbed(direct);
        this.modal.hide();
        if (direct) {
            this.debug.log(
                'Direct load: checking whether to reload page or simulate a click event on the trigger',
                this.options
            );
            if (this.options.reloadOnConsent) {
                window.history.go();
            }
            if (this.options.clickOnConsent) {
                this.trigger.click();
            }
        }
    }

    onModalOpenerClicked(e) {
        if (!this.hasLoaded) {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.modal.show();
        }
    }
}
