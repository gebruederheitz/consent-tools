import _merge from 'lodash-es/merge';
import { $$, Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { IframeEmbed } from './iframe-embed.js';
import { LightboxEmbed } from './lightbox-embed.js';
import { ScriptEmbed } from './script-embed.js';

const DEFAULT_OPTIONS = {
    // @TODO: replace data attribute names
    selector: '[data-ghwp-src]',
};

/**
 * @TODO: document intention and usage:
 *        parse embed blocks like lightboxes or iframes with selector X etc.
 *        * document the flag/function `window.ghwpEmbedsAllowed` (discuss its usefulness first – shouldn't the providers do that?)
 */
export class EmbedFactory extends Debuggable {
    /**
     * @param {ConsentManager}  consentManager         An instance of ConsentManager with a CmpServiceProvider attached
     *                                                 to handle the user's consent status.
     * @param {ConsentSettings} settings               A ConsentSettings object, mainly for placeholder configuration.
     * @param {object}          useroptions
     * @param {boolean}         useroptions.debug      Toggle debug logging output on or off (default: false).
     * @param {string}          useroptions.selector   This selector will be used to find any elements that should have
     *                                                 one of the embed handlers attached to them (default
     *                                                 '[data-ghwp-src]').
     */
    constructor(consentManager, settings, useroptions = {}) {
        super('gdprEmbedFactory');

        this.options = {};
        this.embeds = [];
        this.consentManager = consentManager;
        this.settings = settings;

        this.parseOptions(useroptions);
        this.debug.log('init', {
            options: this.options,
            consentManager,
            settings,
        });
        this.findAndParseEmbedBlocks();
    }

    findAndParseEmbedBlocks() {
        const embedElements = $$()(this.options.selector);
        embedElements.forEach((el) => {
            this.debug.log('Init: ', { el, isLB: el.matches('a') });

            const initialized = EmbedFactory.initEmbedBlockContainer(
                el,
                this.consentManager,
                this.settings
            );
            if (initialized) {
                this.embeds.push(initialized);
            }
        });

        if (!window.ghwp?.ucEnabled) {
            this.listen();
        }
    }

    /**
     * @param {Element}         container
     * @param {ConsentManager}  consentManager
     * @param {ConsentSettings} settings
     */
    static initEmbedBlockContainer(container, consentManager, settings) {
        let EmbedClass = null;

        const isLightboxTrigger = container.matches('a');
        const isScript = container.matches('script');

        if (isLightboxTrigger) EmbedClass = LightboxEmbed;
        else if (isScript) EmbedClass = ScriptEmbed;
        else EmbedClass = IframeEmbed;

        const gdprEmbed = new EmbedClass(container, consentManager, settings);

        return gdprEmbed.init();
    }

    listen() {
        if (window.ghwpEmbedsAllowed && window.ghwpEmbedsAllowed === true) {
            /* GTM & Co were faster than us, so we should load right away */
            this.loadAllEmbeds();
        } else {
            /* Listen for GTM / Cookie banner via callback */
            window.ghwpEmbedsAllowed = this.loadAllEmbeds.bind(this);
        }
    }

    loadAllEmbeds() {
        this.embeds.forEach((embed) => {
            embed.loadEmbed();
        });
    }

    parseOptions(useroptions) {
        this.options = _merge(DEFAULT_OPTIONS, useroptions);
        this.options.debug = this.settings.isDebug();
    }
}
