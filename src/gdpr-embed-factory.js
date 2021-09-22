import _merge from 'lodash-es/merge';
import _pick from 'lodash-es/pick';
import { $$, Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { GdprIframeEmbed } from './gdpr-iframe-embed';
import { GdprLightboxEmbed } from './gdpr-lightbox-embed';
import { GdprScriptEmbed } from './gdpr-script-embed';

const DEFAULT_OPTIONS = {
    selector: '[data-ghwp-src]',
    debug: false,
    embeds: {},
};

export class GdprEmbedFactory extends Debuggable {
    /**
     * @param {object}         useroptions
     * @param {ConsentManager} consentManager
     */
    constructor(useroptions = {}, consentManager) {
        super('gdprEmbedFactory');

        this.options = {};
        this.embeds = [];
        this.consentManager = consentManager;

        this.parseOptions(useroptions);
        this.debug.log('init', { options: this.options, consentManager });
        this.findAndParseEmbedBlocks();
    }

    findAndParseEmbedBlocks() {
        const embedElements = $$()(this.options.selector);
        embedElements.forEach((el) => {
            this.debug.log('Init: ', { el, isLB: el.matches('a') });

            const initialized = GdprEmbedFactory.initEmbedBlockContainer(
                el,
                this.getPassableOptions(),
                this.consentManager
            );
            if (initialized) {
                this.embeds.push(initialized);
            }
        });

        if (!window.ghwp?.ucEnabled) {
            this.listen();
        }
    }

    getPassableOptions() {
        return _pick(this.options, ['debug', 'embeds', 'lightboxFactory']);
    }

    /**
     * @param {Element}        container
     * @param {object}         passedOptions
     * @param {ConsentManager} consentManager
     */
    static initEmbedBlockContainer(
        container,
        passedOptions = {},
        consentManager
    ) {
        let GdprEmbedClass = null;

        const isLightboxTrigger = container.matches('a');
        const isScript = container.matches('script');

        if (isLightboxTrigger) GdprEmbedClass = GdprLightboxEmbed;
        else if (isScript) GdprEmbedClass = GdprScriptEmbed;
        else GdprEmbedClass = GdprIframeEmbed;

        const gdprEmbed = new GdprEmbedClass(
            container,
            passedOptions,
            consentManager
        );

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
    }
}
