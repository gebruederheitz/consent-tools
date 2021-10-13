import {
    createDomElement,
    Debuggable,
} from '@gebruederheitz/wp-frontend-utils';

import { GdprEmbedCheckbox } from './gdpr-embed-checkbox';

export class GdprConsentPlaceholder extends Debuggable {
    /**
     * @param {string}          type
     * @param {string[]}        classnames
     * @param {ConsentManager}  consentManager
     * @param {ConsentSettings} settings
     */
    constructor(type = 'generic', classnames, consentManager, settings) {
        super('GdprConsentPlaceholder');

        this.placeholder = null;
        this.button = null;
        this.modalOpenerButton = null;
        this.type = type;
        this.classnames = classnames;
        this.consentManager = consentManager;
        this.settings = settings;
        this.options = {
            debug: settings.isDebug(),
        };

        this.debug.log('Init with options', this.options);

        this._onPlaceholderHidden = this._onPlaceholderHidden.bind(this);
        this._showModalForService = this._showModalForService.bind(this);

        this._createElements();
    }

    attach(container) {
        this.debug.log('Attach placeholder', container, this.placeholder);
        container.appendChild(this.placeholder);
    }

    onButtonClick(callback) {
        this.button.addEventListener('click', callback);
    }

    hideAndRemove() {
        this.placeholder.addEventListener(
            'transitionend',
            this._onPlaceholderHidden
        );
        this.placeholder.classList.add('hidden');
    }

    isCheckboxChecked() {
        return this.checkbox && this.checkbox.isChecked();
    }

    setBusy() {
        this.button.classList.add('busy');
    }

    _createElements() {
        const placeHolderContentInnerHtml = this.settings.getDescription(
            this.type
        );

        this.placeholder = createDomElement({
            classNames: this.classnames,
        });

        const placeholderContent = createDomElement({
            classNames: [
                /* @TODO: change classnames prefix */
                'ghwp-embed-placeholder__content',
                'ghwp-busy-button-wrap',
            ],
            parent: this.placeholder,
        });

        const titleText = this.settings.getTitleText(this.type);
        if (titleText) {
            createDomElement({
                type: 'H2',
                /* @TODO: change classnames prefix */
                classNames: ['ghwp-embed-placeholder__title'],
                innerText: titleText,
                parent: placeholderContent,
            });
        }

        createDomElement({
            innerHtml: placeHolderContentInnerHtml,
            parent: placeholderContent,
        });

        if (
            this.type !== 'generic' &&
            !this.settings.isSkipCheckbox(this.type)
        ) {
            this.checkbox = new GdprEmbedCheckbox(
                placeholderContent,
                this.type,
                this.settings
            );
        }

        const buttonContainer = createDomElement({
            /* @TODO: change classnames prefix */
            classNames: ['ghwp-embed-placeholder__buttons'],
            parent: placeholderContent,
        });

        if (this.settings.hasModalOpenerButton(this.type)) {
            this.modalOpenerButton = createDomElement({
                type: 'BUTTON',
                classNames: [
                    /* @TODO: change classnames prefix */
                    'ghwp-embed-placeholder__button',
                    'ghwp-embed-placeholder__button--secondary',
                    'button',
                    'is-style-secondary',
                ],
                attributes: {
                    type: 'button',
                },
                /* @TODO customization / i18n */
                innerText: 'Mehr Informationen',
                parent: buttonContainer,
            });

            this.modalOpenerButton.addEventListener(
                'click',
                this._showModalForService
            );
        }

        this.button = createDomElement({
            type: 'BUTTON',
            classNames: [
                /* @TODO: change classnames prefix */
                'ghwp-embed-placeholder__button',
                'button',
                'is-style-primary',
            ],
            innerText: this.settings.getButtonText(this.type),
            parent: buttonContainer,
            attributes: {
                type: 'button',
            },
        });
    }

    _onPlaceholderHidden() {
        this.placeholder.removeEventListener(
            'transitionend',
            this._onPlaceholderHidden
        );
        this.placeholder.remove();
    }

    _showModalForService(e) {
        e.preventDefault();
        this.consentManager.showSettingsAtService(this.type);
    }
}
