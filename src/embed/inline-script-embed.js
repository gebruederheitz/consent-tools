import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

import { AbstractEmbed } from './abstract-embed.js';

export class InlineScriptEmbed extends AbstractEmbed {
    constructor(...args) {
        super('InlineScriptEmbed', ...args);

        this.script = this.container;
        this.url = 'not-a-url';
    }

    createPlaceholder() {
        return null;
    }

    loadEmbed(direct = false) {
        this.debug.log('Loading inline script...');

        super.loadEmbed(direct);

        const dummyScript = this.script;
        const newScript = createDomElement({
            type: 'SCRIPT',
            attributes: {
                type: 'text/javascript',
            },
            innerText: dummyScript.innerText,
            parent: document.head,
        });
        dummyScript.remove();
        this.script = newScript;
    }

    unloadEmbed() {
        super.unloadEmbed();
        this.debug.log('unload embed');
        this.script.remove();
    }
}
