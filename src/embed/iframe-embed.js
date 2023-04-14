import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

import { AbstractEmbed } from './abstract-embed.js';

export class IframeEmbed extends AbstractEmbed {
    constructor(...args) {
        super('IframeEmbed', ...args);

        this.iframe = null;

        this.onIframeLoaded = this.onIframeLoaded.bind(this);
    }

    attachPlaceholder() {
        this.debug.log('attaching placeholder', {
            container: this.container,
            iframe: this.iframe,
        });
        if (this.placeholder && this.container.matches('iframe')) {
            this.placeholder.attach(this.container.parentNode);
            this.listenToPlaceholderButton();
        } else {
            super.attachPlaceholder();
        }
    }

    createIframe() {
        const containerWidth = this.container.getBoundingClientRect().width;

        return createDomElement({
            type: 'IFRAME',
            classNames: ['ghct-embed-frame'],
            parent: this.container,
            attributes: {
                width: containerWidth,
                height: (containerWidth * 9) / 16,
            },
        });
    }

    loadEmbed(direct = false) {
        super.loadEmbed(direct);
        this.debug.log('load embed for iframe', {
            container: this.container,
            match: this.container.matches('iframe'),
        });
        this.iframe = this.container.matches('iframe')
            ? this.container
            : this.createIframe();

        this.iframe.addEventListener('load', this.onIframeLoaded);
        this.iframe.src = this.url;
        this.debug.log('iframe setting complete', this.iframe, this.iframe.src);
    }

    onIframeLoaded() {
        this.debug.log('iframe loaded, removing placeholder');
        this.iframe.removeEventListener('load', this.onIframeLoaded);
        this.hideAndRemovePlaceholder();
    }

    unloadEmbed() {
        super.unloadEmbed();
        this.debug.log('unload embed');
        this.iframe.src = '';
        this.placeholder = this.createPlaceholder();
        this.attachPlaceholder();
    }
}
