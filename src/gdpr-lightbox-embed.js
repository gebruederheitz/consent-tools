import { AbstractGdprEmbed } from './abstract-gdpr-embed';

export class GdprLightboxEmbed extends AbstractGdprEmbed {
    constructor(...args) {
        super(...args);

        /** @type {LightboxFactory} */
        this.lightboxFactory = this.options.lightboxFactory;
        this.lightbox = null;

        this.onPlaceholderClick = this.onPlaceholderClick.bind(this);
    }

    getPlaceholderClassNames() {
        const defaultClassNames = super.getPlaceholderClassNames();
        return ['ghwp-embed-placeholder--lightbox', ...defaultClassNames];
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
        this.placeholder.addEventListener('click', this.onPlaceholderClick);
    }

    loadAll() {
        super.loadAll();
    }

    loadEmbed(direct = false) {
        super.loadEmbed();

        if (
            direct &&
            !(this.checkbox && this.checkbox.isChecked()) &&
            !this.options.skipCheckbox &&
            this.options.ucTemplateId
        ) {
            window.uc?.deactivateBlocking &&
                window.uc.deactivateBlocking([this.options.ucTemplateId]);
        }

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
