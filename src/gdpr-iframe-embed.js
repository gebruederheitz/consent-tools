import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

import { AbstractGdprEmbed } from './abstract-gdpr-embed';

export class GdprIframeEmbed extends AbstractGdprEmbed {
    constructor(...args) {
        super(...args);

        this.iframe = null;

        this.onIframeLoaded = this.onIframeLoaded.bind(this);
    }

    attachPlaceholder() {
        this.debug.log('attaching placeholder', {
            container: this.container,
            iframe: this.iframe,
        });
        if (this.container.matches('iframe')) {
            this.placeholder.attach(this.container.parentNode);
        } else {
            super.attachPlaceholder();
        }
    }

    createIframe() {
        const containerWidth = this.container.getBoundingClientRect().width;

        return createDomElement({
            type: 'IFRAME',
            classNames: ['ghwp-embed-frame'],
            parent: this.container,
            attributes: {
                width: containerWidth,
                height: (containerWidth * 9) / 16,
            },
        });
    }

    loadEmbed() {
        super.loadEmbed();
        this.debug.log('load embed for iframe', {
            container: this.container,
            match: this.container.matches('iframe'),
        });
        this.iframe = this.container.matches('iframe')
            ? this.container
            : this.createIframe();

        this.iframe.addEventListener('load', this.onIframeLoaded);
        this.iframe.src = this.url;
    }

    onIframeLoaded() {
        this.iframe.removeEventListener('load', this.onIframeLoaded);
        this.hideAndRemovePlaceholder();
    }

    unloadEmbed() {
        super.unloadEmbed();
        this.debug.log('unload embed');
        this.iframe.src = '';
        this.createPlaceholder();
        this.attachPlaceholder();
    }
}
