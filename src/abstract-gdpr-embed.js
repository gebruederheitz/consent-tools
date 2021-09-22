import _merge from 'lodash-es/merge';
import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { Usercentrics } from './usercentrics';
import { GdprConsentPlaceholder } from './placeholder/gdpr-consent-placeholder';

export const DEFAULT_EMBED_OPTIONS = {
    debug: false,
    embeds: {
        defaultTextContent:
            'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch werden Informationen an den Diensteanbieter übermittelt und dort gespeichert.',
        defaultButtonText: 'Inhalt laden',
        defaultCheckboxLabel: 'Für alle Inhalte dieser Art übernehmen',
        useUC: false,
        skipCheckbox: false,
        modalOpenerButton: false,
        additionalServices: [],
    },
    defaultLoadAll: true,
    // Mostly only relevant for ModalGdprManager (so far)
    privacyPolicyUrl: '',
    reloadOnConsent: false,
    clickOnConsent: false
};

export class AbstractGdprEmbed extends Debuggable {
    /**
     * @param {Element} container
     * @param {object} userOptions
     * @param {ConsentManager} consentManager
     */
    constructor(container, userOptions = {}, consentManager) {
        super('abstractGdprEmbed');

        this.container = this.getContainer(container);
        this.consentManager = consentManager;

        this.url = this.container.dataset.ghwpSrc;
        this.type = this.getType(userOptions) || 'generic';

        /** @type GdprConsentPlaceholder | null */
        this.placeholder = null;
        this.options = {};
        this.hasLoaded = false;

        this.onEmbedPlaceholderButtonClicked =
            this.onEmbedPlaceholderButtonClicked.bind(this);
        this.onConsentChanged = this.onConsentChanged.bind(this);

        if (this.onModalOpenerClicked) {
            this.onModalOpenerClicked = this.onModalOpenerClicked.bind(this);
        }

        this.parseOptions(userOptions);
        this.debug.log('Type', this.type);
    }

    /* Abstract methods demanding implementation by extending class */

    // eslint-disable-next-line no-unused-vars
    loadEmbed(direct = false) {
        this.hasLoaded = true;
    }

    onInit() {}

    unloadEmbed() {}

    /* "Concrete" methods */

    init() {
        if (!this.container || !this.url) return false;
        this.placeholder = new GdprConsentPlaceholder(
            this.type,
            this.getPlaceholderClassNames(),
            this.options
        );
        this.attachPlaceholder();
        this.listen().then();
        this.onInit();
        return this;
    }

    attachPlaceholder() {
        this.placeholder.attach(this.container);
    }

    getContainer(container) {
        return container;
    }

    getPlaceholderClassNames() {
        return ['ghwp-embed-placeholder'];
    }

    getType() {
        return this.container.dataset.ghwpType;
    }

    hideAndRemovePlaceholder() {
        this.placeholder.hideAndRemove();
    }

    async listen() {
        /* Listen for the integrated button in the placeholder */
        this.placeholder.onButtonClick(this.onEmbedPlaceholderButtonClicked);
        await this.consentManager.withConsentOrDenial(
            this.options.ucConsentName,
            this.onConsentChanged
        );
    }

    loadAll() {
        this.debug.log('Load all');

        if (this.options.embeds.useUC && this.options.ucConsentName) {
            this.debug.log('UC load all');
            Usercentrics.load(this.type, this.options.embeds);
            if (this.options.additionalServices?.length) {
                this.options.additionalServices.forEach((service) => {
                    Usercentrics.load(service, this.options.embeds);
                });
            }
        } else {
            const eventProxy = this.consentManager.getEventProxy();
            eventProxy.emit(this.type);
            if (this.options.additionalServices?.length) {
                this.options.additionalServices.forEach((service) => {
                    eventProxy.emit(service);
                });
            }
        }
        this.loadEmbed(true);
    }

    onConsentChanged(hasConsent) {
        this.debug.log('UC consent changed', { hasConsent });
        if (hasConsent === true && !this.hasLoaded) {
            this.loadEmbed();
        } else if (hasConsent !== true && this.hasLoaded) {
            this.unloadEmbed();
        }
    }

    onEmbedPlaceholderButtonClicked(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.placeholder.setBusy();
        if (this.options.skipCheckbox || this.placeholder.isCheckboxChecked()) {
            this.loadAll();
        } else {
            this.loadEmbed(true);
        }
    }

    parseOptions(userOptions) {
        const defaultOptions = Object.assign({}, DEFAULT_EMBED_OPTIONS);
        let options = _merge(defaultOptions, userOptions);

        let typeConfig = false;
        if (
            this.type &&
            options.embeds?.types &&
            options.embeds.types[this.type]
        ) {
            typeConfig = options.embeds.types[this.type];
        }

        const text = {};

        text.description =
            (typeConfig && typeConfig.customMessage) ||
            options.embeds.defaultTextContent;

        text.button =
            (typeConfig && typeConfig.customButtonText) ||
            options.embeds.defaultButtonText;

        text.checkbox =
            (typeConfig && typeConfig.customCheckboxLabel) ||
            options.embeds.defaultCheckboxLabel;

        text.title = (typeConfig && typeConfig.titleText) || '';

        options.text = text;

        options.defaultLoadAll =
            typeConfig && typeof typeConfig.defaultLoadAll !== 'undefined'
                ? typeConfig.defaultLoadAll
                : true;

        options.providerDisplayName =
            (typeConfig && typeConfig.providerDisplayName) || '';

        options.checkboxProviderName =
            (typeConfig && typeConfig.checkboxProviderName) ||
            'dieses Anbieters';

        options.ucConsentName = (typeConfig && typeConfig.ucConsentName) || '';

        options.ucTemplateId = (typeConfig && typeConfig.ucTemplateId) || '';

        options.modalOpenerButton = typeConfig  && typeConfig.modalOpenerButton || options.embeds.modalOpenerButton;

        options.providerPrivacyPolicySection =
            (typeConfig && typeConfig.privacyPolicySection) || '';

        options.skipCheckbox =
            (typeConfig && typeConfig.skipCheckbox) ||
            options.embeds.skipCheckbox;

        if (window?.ghwp?.ppurl) {
            options.privacyPolicyUrl = window.ghwp.ppurl;
        } else if (options.embeds.privacyPolicyUrl) {
            options.privacyPolicyUrl = options.embeds.privacyPolicyUrl;
        }

        options.additionalServices =
            typeConfig?.additionalServices || options.additionalServices;

        this.options = options;
        this.debug.log('Instance options parsed', {
            options,
            defaults: DEFAULT_EMBED_OPTIONS,
            userOptions,
        });
    }
}
