import type { AbstractEmbedConstructorArgs } from './abstract-embed';

import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

import { AbstractEmbed } from './abstract-embed';

export class IframeEmbed extends AbstractEmbed {
    protected iframe: HTMLIFrameElement | null = null;
    constructor(
        ...args: AbstractEmbedConstructorArgs
    ) {
        super('IframeEmbed', ...args);
    }

    public override attachPlaceholder(): void {
        this.debug.log('attaching placeholder', {
            container: this.container,
            iframe: this.iframe,
        });
        if (this.container.matches('iframe')) {
            if (this.placeholder && this.container?.parentElement) {
                this.placeholder.attach(this.container.parentElement);
                this.listenToPlaceholderButton();
            }
        } else {
            super.attachPlaceholder();
        }
    }

    public override loadEmbed(direct = false): void {
        super.loadEmbed(direct);
        this.debug.log('load embed for iframe', {
            container: this.container,
            match: this.container.matches('iframe'),
        });
        this.iframe = this.container.matches('iframe')
            ? this.container as HTMLIFrameElement
            : this.createIframe();

        this.iframe.addEventListener('load', this.onIframeLoaded);
        this.iframe.src = this.url;
    }

    public unloadEmbed(): void {
        this.debug.log('unload embed');
        if (this.iframe) {
            this.iframe.src = '';
        }
        this.placeholder = this.createPlaceholder();
        this.attachPlaceholder();
    }

    protected createIframe(): HTMLIFrameElement {
        const containerWidth = this.container.getBoundingClientRect().width;

        return createDomElement({
            type: 'IFRAME',
            classNames: ['ghct-embed-frame'],
            parent: this.container,
            attributes: {
                width: containerWidth + '',
                height: ((containerWidth * 9) / 16) + '',
            },
        }) as HTMLIFrameElement;
    }

    protected onIframeLoaded = (): void => {
        if (this.iframe) {
            this.iframe.removeEventListener('load', this.onIframeLoaded);
            this.hideAndRemovePlaceholder();
        }
    };
}
