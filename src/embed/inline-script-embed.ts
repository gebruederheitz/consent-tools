import type { AbstractEmbedConstructorArgs } from './abstract-embed';

import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

import { AbstractEmbed } from './abstract-embed';

export class InlineScriptEmbed extends AbstractEmbed {
    protected script: HTMLScriptElement | null = null;

    constructor(...args: AbstractEmbedConstructorArgs) {
        super('InlineScriptEmbed', ...args);

        if (this.container.matches('script')) {
            this.script = this.container as HTMLScriptElement;
        }
        this.url = 'not-a-url';
    }

    public override loadEmbed() {
        this.debug.log('Loading inline script...');

        super.loadEmbed();

        const dummyScript = this.script;
        const newScript = createDomElement({
            type: 'SCRIPT',
            attributes: {
                type: 'text/javascript',
            },
            innerText: dummyScript?.innerText || '',
            parent: document.head,
        }) as HTMLScriptElement;
        dummyScript?.remove();
        this.script = newScript;
    }

    public unloadEmbed() {
        this.debug.log('unload embed');
        this.script?.remove();
    }

    protected override createPlaceholder(): null {
        return null;
    }
}
