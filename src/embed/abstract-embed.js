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

        // @TODO: replace attribute names
        this.url = this.container.dataset.ghwpSrc;
        this.type = this.getType() || 'generic';

        /** @type GdprConsentPlaceholder | null */
        this.placeholder = null;
        this.options = {
            debug: settings.isDebug(),
        };
        this.hasLoaded = false;

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
    onInit() {}

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
        if (!this.container || !this.url) return null;
        this.placeholder = this.createPlaceholder();
        this.attachPlaceholder();
        this.listen().then();
        this.onInit();

        return this;
    }

    attachPlaceholder() {
        this.placeholder.attach(this.container);
    }

    createPlaceholder() {
        return new GdprConsentPlaceholder(
            this.type,
            this.getPlaceholderClassNames(),
            this.settings
        );
    }

    getContainer(container) {
        return container;
    }

    getPlaceholderClassNames() {
        // @TODO: replace classnames
        return ['ghwp-embed-placeholder'];
    }

    getType() {
        // @TODO: replace data attribute names
        return this.container.dataset.ghwpType;
    }

    hideAndRemovePlaceholder() {
        this.placeholder.hideAndRemove();
    }

    async listen() {
        /* Listen for the integrated button in the placeholder */
        this.placeholder.onButtonClick(this.onEmbedPlaceholderButtonClicked);
        await this.consentManager.withConsentOrDenial(
            this.type,
            this.onConsentChanged
        );
    }

    loadAll() {
        this.debug.log('Load all');

        this.consentManager.acceptService(this.type);
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
        if (
            this.settings.isSkipCheckbox(this.type) ||
            this.placeholder.isCheckboxChecked()
        ) {
            this.loadAll();
        } else {
            this.loadEmbed(true);
        }
    }
}
