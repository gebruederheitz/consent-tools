import type { AbstractEmbedConstructorArgs } from './abstract-embed';

import { createDomElement, $ } from '@gebruederheitz/wp-frontend-utils';

import { AbstractEmbed } from './abstract-embed';

export class ScriptEmbed extends AbstractEmbed {
    protected script: HTMLScriptElement | null = null;

    constructor(...args: AbstractEmbedConstructorArgs) {
        super('ScriptEmbed', ...args);

        if (this.container.matches('script')) {
            this.script = this.container as HTMLScriptElement;
        }

        const containerSelect = this.script?.dataset['ghctPlaceholder'];

        if (containerSelect) {
            this.container = $()(containerSelect);

            if (!this.container) {
                this.container = createDomElement({
                    classNames: ['ghct-placeholder-container'],
                }) as HTMLElement;
                this.script?.parentElement?.insertBefore(
                    this.container,
                    this.script
                );
            }
        }

        this.onScriptLoaded = this.onScriptLoaded.bind(this);
    }

    public override loadEmbed() {
        super.loadEmbed();
        this.debug.log('load script', {
            container: this.container,
            script: this.script,
        });

        if (this.script) {
            this.script.addEventListener('load', this.onScriptLoaded);
            this.script.src = this.url;
        }
    }

    public unloadEmbed() {
        this.debug.log('unload embed');
        if (this.script) {
            this.script.src = '';
        }
        this.createPlaceholder();
        this.attachPlaceholder();
    }

    protected override createPlaceholder() {
        if (this.container) {
            return super.createPlaceholder();
        } else {
            return null;
        }
    }

    protected onScriptLoaded() {
        this.debug.log('Script has finished loading');
        this.script?.removeEventListener('load', this.onScriptLoaded);
        this.hideAndRemovePlaceholder();
    }
}
