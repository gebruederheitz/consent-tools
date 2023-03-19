import { AbstractEmbed } from '../embed/abstract-embed';
import { Modal } from '../util/modal';
import type { ConsentManager } from './consent-manager';
import type { ConsentSettings } from '../util/settings/consent-settings';

export class ModalConsentManager extends AbstractEmbed {
    protected trigger: HTMLElement | null = null;
    protected modal: Modal | null = null;
    protected meModal = 42;

    constructor(
        container: HTMLElement,
        consentManager: ConsentManager,
        protected readonly serviceId: string,
        settings: ConsentSettings
    ) {
        super('ModalConsentManager', container, consentManager, settings);

        this.trigger = container;
        this.modal = new Modal();
        const modalContainer = this.modal.getContainer();
        if (modalContainer) {
            this.container = modalContainer;
        }

        this.type = this.serviceId;
        this.url = 'none';
    }

    public override loadEmbed(direct = false): void {
        this.debug.log('Modal: load embed', this.settings);
        super.loadEmbed(direct);
        this.modal?.hide();
        if (direct) {
            this.debug.log(
                'Direct load: checking whether to reload page or simulate a click event on the trigger'
            );
            if (this.settings.reloadOnConsent.get(this.type)) {
                window.history.go();
            }
            if (this.settings.clickOnConsent.get(this.type)) {
                this.trigger?.click();
            }
        }

        this.modal?.destroy();
        this.trigger?.removeEventListener('click', this.onModalOpenerClicked);
    }

    public unloadEmbed(): void {
        return;
    }

    protected override async listen(): Promise<void> {
        await super.listen();

        this.debug.log('Setting listener on', this.trigger, this);

        this.trigger?.addEventListener('click', this.onModalOpenerClicked);
    }

    protected onModalOpenerClicked = (e: Event) => {
        this.debug.log('Clickety', this.hasLoaded, this.modal);
        if (!this.hasLoaded) {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.modal?.show();
        }
    };
}
