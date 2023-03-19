import _merge from 'lodash-es/merge';
import { $$ } from '@gebruederheitz/wp-frontend-utils';

import { IframeEmbed } from './iframe-embed';
import { LightboxEmbed } from './lightbox-embed';
import { ScriptEmbed } from './script-embed';
import { InlineScriptEmbed } from './inline-script-embed';
import { debug } from '../util/debuggable';
import type { DebugLog } from '../util/debuggable';
import type { AbstractEmbed } from './abstract-embed';
import type { ConsentManager } from '../consent-manager/consent-manager';
import type { ConsentSettings } from '../util/settings/consent-settings';

interface WithGhwpOptions {
    ghwp?: {
        ucEnabled?: boolean;
    };
    ghctEmbedsAllowed?: boolean | (() => void);
}

declare const window: Window & WithGhwpOptions;

interface EmbedFactoryOptions {
    selector: string;
    debug: boolean;
}

const DEFAULT_OPTIONS: EmbedFactoryOptions = {
    selector: '[data-ghct-src], [data-ghct-type]',
    debug: false,
};

export const EMBED_FACTORY_DEFAULT_OPTIONS = DEFAULT_OPTIONS;

export class EmbedFactory {
    protected debug: DebugLog = debug.spawn('GdprEmbedFactory');
    protected options: EmbedFactoryOptions = DEFAULT_OPTIONS;
    protected embeds: AbstractEmbed[] = [];

    protected static initEmbedBlockContainer(
        container: HTMLElement,
        consentManager: ConsentManager,
        settings: ConsentSettings
    ) {
        let EmbedClass;

        const isLightboxTrigger = container.matches('a');
        const isInlineScript = container.matches(
            'script[type="text/plain"]:not([src]):not([data-ghct-src])'
        );
        const isScript = container.matches('script[data-ghct-src]');

        if (isLightboxTrigger) EmbedClass = LightboxEmbed;
        else if (isInlineScript) EmbedClass = InlineScriptEmbed;
        else if (isScript) EmbedClass = ScriptEmbed;
        else EmbedClass = IframeEmbed;

        /** @type AbstractEmbed */
        const gdprEmbed = new EmbedClass(container, consentManager, settings);

        return gdprEmbed.init();
    }

    /**
     * @param {ConsentManager}  consentManager         An instance of ConsentManager with a CmpServiceProvider attached
     *                                                 to handle the user's consent status.
     * @param {ConsentSettings} settings               A ConsentSettings object, mainly for placeholder configuration.
     * @param {object}          userOptions
     * @param {boolean}         userOptions.debug      Toggle debug logging output on or off (default: false).
     * @param {string}          userOptions.selector   This selector will be used to find any elements that should have
     *                                                 one of the embed handlers attached to them (default
     *                                                 '[data-ghct-src]').
     */
    constructor(
        protected readonly consentManager: ConsentManager,
        protected readonly settings: ConsentSettings,
        userOptions: Partial<EmbedFactoryOptions> = {}
    ) {
        this.parseOptions(userOptions);
        this.debug.log('init', {
            options: this.options,
            consentManager,
            settings,
        });
        this.findAndParseEmbedBlocks();
    }

    public loadAllEmbeds() {
        this.embeds.forEach((embed) => {
            embed.loadEmbed();
        });
    }

    protected findAndParseEmbedBlocks() {
        const embedElements = $$()(this.options.selector);
        embedElements.forEach((el) => {
            this.debug.log('Init: ', { el });

            const initialized = EmbedFactory.initEmbedBlockContainer(
                el as HTMLElement,
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

    protected listen() {
        if (window.ghctEmbedsAllowed && window.ghctEmbedsAllowed === true) {
            /* GTM & Co were faster than us, so we should load right away */
            this.loadAllEmbeds();
        } else {
            /* Listen for GTM / Cookie banner via callback */
            window.ghctEmbedsAllowed = this.loadAllEmbeds.bind(this);
        }
    }

    protected parseOptions(userOptions: Partial<EmbedFactoryOptions>) {
        this.options = _merge(DEFAULT_OPTIONS, userOptions);

        const debug = this.settings.appSettings.debug || this.options.debug;
        this.debug.toggle(debug);

        if (this.options.selector === '[data-ghct-src]') {
            const prefix = this.settings.appSettings.attributesPrefix;
            if (prefix !== 'ghct') {
                this.options.selector = `[data-${prefix}-src]`;
            }
        }
    }
}
