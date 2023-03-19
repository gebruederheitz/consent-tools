import type { AbstractEmbedConstructorArgs } from './abstract-embed';
import { AbstractEmbed } from './abstract-embed';
import type {
    Lightbox,
    LightboxFactoryInterface,
} from '../util/lightbox-factory-interface';

export class LightboxEmbed extends AbstractEmbed {
    protected lightboxFactory: LightboxFactoryInterface | null = null;
    protected lightbox: Lightbox | null = null;

    // @TODO Move lightboxFactory back to settings or have it fetched from ConsentManager

    constructor(...args: AbstractEmbedConstructorArgs) {
        super('LightboxEmbed', ...args);

        this.lightboxFactory = this.settings.appSettings.lightboxFactory;
        if (!this.lightboxFactory) {
            throw 'No lightbox factory supplied, can not create GDPR-compliant lightboxes.';
        }
    }

    public override loadEmbed(direct = false): void {
        super.loadEmbed();

        const linkContainer: HTMLAnchorElement = this
            .container as HTMLAnchorElement;
        if (linkContainer) {
            linkContainer.href = this.url;
            this.initLightbox();

            this.hideAndRemovePlaceholder();
            if (direct && this.lightbox) {
                this.lightbox?.open();
            }
        }
    }

    public unloadEmbed() {
        this.debug.log('unload embed');
        const linkContainer: HTMLAnchorElement = this
            .container as HTMLAnchorElement;
        linkContainer.target = '_blank';
        if (this.lightbox) {
            this.lightbox?.destroy();
        }
    }

    protected override getPlaceholderClassNames(): string[] {
        const defaultClassNames = super.getPlaceholderClassNames();
        return ['ghct-embed-placeholder--lightbox', ...defaultClassNames];
    }

    protected initLightbox() {
        this.debug.log('init lightbox', { container: this.container });
        const linkContainer = this.container as HTMLAnchorElement;
        const selector = `a[href="${linkContainer.href}"]`;
        const lightboxCreated = this.lightboxFactory?.create(selector);
        this.debug.log({ lightboxCreated });
        this.lightbox = lightboxCreated || null;
    }
}
