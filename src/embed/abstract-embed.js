import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { GdprConsentPlaceholder } from '../placeholder/gdpr-consent-placeholder.js';

/**
 * @abstract
 */
export class AbstractEmbed extends Debuggable {
    /**
     * @param {string} namespace
     * @param {Element} container
     * @param {ConsentManager} consentManager
     * @param {ConsentSettings} settings
     */
    constructor(
        namespace = 'AbstractEmbed',
        container,
        consentManager,
        settings
    ) {
        super(namespace);

        this.container = this.getContainer(container);
        this.consentManager = consentManager;
        this.settings = settings;

        this.url = this._getUrl();
        this.type = this.getType() || 'generic';

        /** @type GdprConsentPlaceholder | null */
        this.placeholder = null;
        this.options = {
            debug: settings.isDebug(),
        };
        this.hasLoaded = false;
        this.isInitialized = false;

        this.onEmbedPlaceholderButtonClicked =
            this.onEmbedPlaceholderButtonClicked.bind(this);
        this.onConsentChanged = this.onConsentChanged.bind(this);

        if (this.onModalOpenerClicked) {
            this.onModalOpenerClicked = this.onModalOpenerClicked.bind(this);
        }

        this.debug.log('Type', this.type);
    }

    /* Abstract methods demanding implementation by extending class */

    /**
     * @protected
     * @param {boolean} direct
     */
    // eslint-disable-next-line no-unused-vars
    loadEmbed(direct = false) {
        this.hasLoaded = true;
    }

    /**
     * @protected
     */
    onInit() {
        this.debug.log('Hide loader', this.container);
        let el;
        if (this.container.classList.contains('ghct-loader')) {
            el = this.container;
        } else if (
            this.container.parentElement.classList.contains('ghct-loader')
        ) {
            el = this.container.parentElement;
        }
        el?.classList.add('loaded');
    }

    /**
     * @protected
     */
    onBeforeInit() {}

    /**
     * @abstract
     * @public
     */
    unloadEmbed() {}

    /* "Concrete" methods */

    /**
     * @public
     * @return {?AbstractEmbed}
     */
    init() {
        this.onBeforeInit();
        if (!this.container || !this.url) return null;
        this.placeholder = this.createPlaceholder();
        this.listen().then();
        this.onInit();

        return this;
    }

    attachPlaceholder() {
        if (this.placeholder) {
            this.placeholder.attach(this.container);
            this.listenToPlaceholderButton();
        }
    }

    createPlaceholder() {
        return new GdprConsentPlaceholder(
            this.type,
            this.getPlaceholderClassNames(),
            this.consentManager,
            this.settings
        );
    }

    getContainer(container) {
        return container;
    }

    getPlaceholderClassNames() {
        return ['ghct-embed-placeholder'];
    }

    getType() {
        const prefix = this.settings.getAttributesPrefix();
        const attributeName = prefix + 'Type';
        return this.container.dataset[attributeName];
    }

    hideAndRemovePlaceholder() {
        this.debug.log('Hiding and removing placeholder', this.placeholder);
        this.placeholder?.hideAndRemove();
        this.placeholder = null;
    }

    async listen() {
        await this.consentManager.withConsentOrDenial(
            this.type,
            this.onConsentChanged
        );
    }

    listenToPlaceholderButton() {
        /* Listen for the integrated button in the placeholder */
        this.placeholder?.onButtonClick(this.onEmbedPlaceholderButtonClicked);
    }

    loadAll() {
        this.debug.log('Load all');

        this.consentManager.acceptService(this.type);
        if (this.settings.isAutoloadOnButtonClick()) {
            this.loadEmbed(true);
        }
    }

    onConsentChanged(hasConsent) {
        this.debug.log('UC consent changed', { hasConsent });
        if (hasConsent === true && !this.hasLoaded) {
            this.loadEmbed();
        } else if (hasConsent !== true && this.hasLoaded) {
            this.unloadEmbed();
        } else if (hasConsent !== true && !this.isInitialized) {
            this.attachPlaceholder();
            this.isInitialized = true;
        }
    }

    onEmbedPlaceholderButtonClicked(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.placeholder?.setBusy();

        if (this._shouldLoadAll()) {
            this.loadAll();
        } else {
            this.loadEmbed(true);
        }
    }

    _getUrl() {
        const prefix = this.settings.getAttributesPrefix();
        const attributeName = prefix + 'Src';
        return this.container.dataset[attributeName];
    }

    _shouldLoadAll() {
        const skipWithLoadAll =
            this.settings.isSkipCheckbox(this.type) &&
            this.settings.isDefaultLoadAll(this.type);

        return skipWithLoadAll || this.placeholder?.isCheckboxChecked();
    }
}
