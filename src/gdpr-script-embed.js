import { createDomElement, $, $$ } from '@gebruederheitz/wp-frontend-utils';

import { AbstractGdprEmbed } from './abstract-gdpr-embed';

// 1s should be enough to allow the race result base script to init
const POST_LOAD_TIMEOUT = 2000;

export class GdprScriptEmbed extends AbstractGdprEmbed {
    constructor(...args) {
        super(...args);

        this.script = this.container;

        const containerSelect = this.script.dataset.ghwpPlaceholder;
        this.container = $()(containerSelect);

        if (!this.container) {
            this.container = createDomElement({
                classNames: ['ghwp-placeholder-container'],
            });
            this.script.parentElement.insertBefore(this.container, this.script);
        }

        this.onScriptLoaded = this.onScriptLoaded.bind(this);
    }

    loadEmbed() {
        super.loadEmbed();
        this.debug.log('load script', {
            container: this.container,
            script: this.script,
        });

        this.script.addEventListener('load', this.onScriptLoaded);
        this.script.src = this.url;
    }

    loadRaceResult() {
        this.debug.log('Loading inline scripts...');

        const inlineScripts = $$()('[data-ghwp-type="raceresult"]:not([src])');
        inlineScripts.forEach((scriptElement) => {
            createDomElement({
                type: 'SCRIPT',
                attributes: {
                    type: 'text/javascript',
                },
                innerText: scriptElement.innerText,
                parent: document.head,
            });
            scriptElement.remove();
            // document.head.appendChild(scriptElement);
        });
    }

    onScriptLoaded() {
        this.debug.log('Script has finished loading');
        this.script.removeEventListener('load', this.onScriptLoaded);
        this.hideAndRemovePlaceholder();
        if (this.type === 'raceresult') {
            setTimeout(this.loadRaceResult.bind(this), POST_LOAD_TIMEOUT);
        }
    }

    unloadEmbed() {
        super.unloadEmbed();
        this.debug.log('unload embed');
        this.script.src = '';
        this.createPlaceholder();
        this.attachPlaceholder();
    }
}
