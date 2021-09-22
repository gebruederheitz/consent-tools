import { createDomElement, Debuggable } from '@gebruederheitz/wp-frontend-utils';
import _merge from 'lodash-es/merge';

import { GdprEmbedCheckbox } from './gdpr-embed-checkbox';
import {Usercentrics} from '../usercentrics';

const DEFAULT_OPTIONS = {
    skipCheckbox: false,
    text: {
        button: '',
        description: '',
        checkbox: '',
        title: '',
    },
    providerDisplayName: '',
    checkboxProviderName: '',
    providerPrivacyPolicySection: '',
    privacyPolicyUrl: '',
    modalOpenerButton: false,
};

export class GdprConsentPlaceholder extends Debuggable {
    constructor(type = 'generic', classnames, options) {
        super('GdprConsentPlaceholder');

        this.placeholder = null;
        this.button = null;
        this.modalOpenerButton = null;
        this.type = type;
        this.classnames = classnames;
        this.options = _merge(DEFAULT_OPTIONS, options);

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
        const placeHolderContentInnerHtml = this._getPlaceholderTextContent();

        this.placeholder = createDomElement({
            classNames: this.classnames,
        });

        const placeholderContent = createDomElement({
            classNames: [
                'ghwp-embed-placeholder__content',
                'ghwp-busy-button-wrap',
            ],
            parent: this.placeholder,
        });

        if (this.options.text.title) {
            createDomElement({
                type: 'H2',
                classNames: ['ghwp-embed-placeholder__title'],
                innerText: this.options.text.title,
                parent: placeholderContent,
            });
        }

        createDomElement({
            innerHtml: placeHolderContentInnerHtml,
            parent: placeholderContent,
        });

        if (this.type !== 'generic' && this.options.skipCheckbox !== true) {
            this.checkbox = new GdprEmbedCheckbox(
                placeholderContent,
                this._getCheckboxLabel(),
                this.options
            );
        }

        const buttonContainer = createDomElement({
            classNames: [
                'ghwp-embed-placeholder__buttons',
            ],
            parent: placeholderContent,
        });

        if (this.options.modalOpenerButton) {
            this.modalOpenerButton = createDomElement({
                type: 'BUTTON',
                classNames: [
                    'ghwp-embed-placeholder__button',
                    'ghwp-embed-placeholder__button--secondary',
                    'button',
                    'is-style-secondary',
                ],
                attributes: {
                    type: 'button',
                },
                innerText: 'Mehr Informationen',
                parent: buttonContainer,
            });

            this.modalOpenerButton.addEventListener('click', this._showModalForService);
        }

        this.button = createDomElement({
            type: 'BUTTON',
            classNames: [
                'ghwp-embed-placeholder__button',
                'button',
                'is-style-primary',
            ],
            innerText: this._getButtonTextContent(),
            parent: buttonContainer,
            attributes: {
                type: 'button',
            },
        });
    }

    _getButtonTextContent() {
        return this._parsePlaceholdersIntoTemplateString(
            this.options.text.button
        );
    }

    _getCheckboxLabel() {
        return this._parsePlaceholdersIntoTemplateString(
            this.options.text.checkbox
        );
    }

    _getPlaceholderTextContent() {
        return this._parsePlaceholdersIntoTemplateString(
            this.options.text.description
        );
    }

    _onPlaceholderHidden() {
        this.placeholder.removeEventListener(
            'transitionend',
            this._onPlaceholderHidden
        );
        this.placeholder.remove();
    }

    /**
     * @param {string} template
     */
    _parsePlaceholdersIntoTemplateString(template) {
        let parsed = '';

        parsed = template.replace(
            '%privacyPolicyUrl%',
            this.options.privacyPolicyUrl
        );

        let privacyPolicySection = '';
        if (this.options.providerPrivacyPolicySection !== '') {
            privacyPolicySection = `#${this.options.providerPrivacyPolicySection}`;
        }
        parsed = parsed.replace('%privacyPolicySection%', privacyPolicySection);

        parsed = parsed.replace(
            '%checkboxContentProvider%',
            this.options.checkboxProviderName
        );

        let customProviderName = '';
        if (this.options.providerDisplayName !== '') {
            customProviderName += ` ${this.options.providerDisplayName}`;
        }
        parsed = parsed.replace('%contentProvider%', customProviderName);

        return parsed;
    }

    _showModalForService(e) {
        e.preventDefault();
        Usercentrics.showModalAtService(this.type, this.options.embeds);
    }
}
