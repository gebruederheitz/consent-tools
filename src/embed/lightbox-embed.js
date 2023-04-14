import { AbstractEmbed } from './abstract-embed.js';

export class LightboxEmbed extends AbstractEmbed {
    constructor(...args) {
        super('LightboxEmbed', ...args);

        /** @type {LightboxFactory|function|null} */
        this.lightboxFactory = this.settings.getLightboxFactory();

        if (!this.lightboxFactory) {
            throw 'No lightbox factory supplied, can not create GDPR-compliant lightboxes.';
        }

        this.lightbox = null;

        this.onPlaceholderClick = this.onPlaceholderClick.bind(this);
    }

    getPlaceholderClassNames() {
        const defaultClassNames = super.getPlaceholderClassNames();
        return ['ghct-embed-placeholder--lightbox', ...defaultClassNames];
    }

    initLightbox() {
        this.debug.log('init lightbox', { container: this.container });
        const selector = `a[href="${this.container.href}"]`;
        const lightboxCreated = this.lightboxFactory.create(selector);
        this.debug.log({ lightboxCreated });
        this.lightbox = lightboxCreated;
    }

    async listen() {
        await super.listen();
    }

    listenToPlaceholderButton() {
        /* Listen for the integrated button in the placeholder */
        this.placeholder?.onButtonClick(this.onPlaceholderClick);
    }

    loadEmbed(direct = false) {
        super.loadEmbed();

        this.container.href = this.url;
        this.initLightbox();

        this.hideAndRemovePlaceholder();
        if (direct && this.lightbox) {
            this.lightbox.open();
        }
    }

    onPlaceholderClick(event) {
        event.stopImmediatePropagation();
    }

    unloadEmbed() {
        super.unloadEmbed();
        this.debug.log('unload embed');
        this.container.target = '_blank';
        if (this.lightbox) {
            this.lightbox.destroy();
        }
    }
}
