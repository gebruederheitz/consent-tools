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
    }

    getPlaceholderClassNames() {
        const defaultClassNames = super.getPlaceholderClassNames();
        return ['ghct-embed-placeholder--lightbox', ...defaultClassNames];
    }

    initLightbox() {
        this.debug.log('init lightbox', { container: this.container });
        let lightboxCreated;

        if (this.lightboxFactory.createFromElement) {
            lightboxCreated = this.lightboxFactory.createFromElement(
                this.container
            );
        } else {
            const selector = `a[href="${this.container.href}"]`;
            lightboxCreated = this.lightboxFactory.create(selector);
        }

        this.debug.log({ lightboxCreated });
        this.lightbox = lightboxCreated;
    }

    async listen() {
        await super.listen();
    }

    loadEmbed(direct = false) {
        super.loadEmbed(direct);

        this.container.href = this.url;
        this.initLightbox();

        this.hideAndRemovePlaceholder();
        if (direct && this.lightbox) {
            this.lightbox.open();
        }
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
