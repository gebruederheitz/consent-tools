import { createDomElement, $ } from '@gebruederheitz/wp-frontend-utils';

import { AbstractEmbed } from './abstract-embed.js';

export class ScriptEmbed extends AbstractEmbed {
    constructor(...args) {
        super('ScriptEmbed', ...args);

        this.script = this.container;

        const containerSelect = this.script.dataset.ghctPlaceholder;

        if (containerSelect) {
            this.container = $()(containerSelect);

            if (!this.container) {
                this.container = createDomElement({
                    classNames: ['ghct-placeholder-container'],
                });
                this.script.parentElement.insertBefore(
                    this.container,
                    this.script
                );
            }
        }

        this.onScriptLoaded = this.onScriptLoaded.bind(this);
    }

    createPlaceholder() {
        if (this.container) {
            return super.createPlaceholder();
        } else {
            return null;
        }
    }

    loadEmbed(direct = false) {
        super.loadEmbed(direct);
        this.debug.log('load script', {
            container: this.container,
            script: this.script,
        });

        this.script.addEventListener('load', this.onScriptLoaded);
        this.script.src = this.url;
    }

    onScriptLoaded() {
        this.debug.log('Script has finished loading');
        this.script.removeEventListener('load', this.onScriptLoaded);
        this.hideAndRemovePlaceholder();
    }

    unloadEmbed() {
        super.unloadEmbed();
        this.debug.log('unload embed');
        this.script.src = '';
        this.placeholder = this.createPlaceholder();
        this.attachPlaceholder();
    }
}
