import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

import { debug } from '../util/debuggable';
import { GdprEmbedCheckbox } from './gdpr-embed-checkbox';
import { PermanentConsentType } from '../util/settings/types';
import type { ConsentManager } from '../consent-manager/consent-manager';
import type { ConsentSettings } from '../util/settings/consent-settings';
import { translator, Translatable } from '../util/i18n';

interface PlaceholderElements {
    button: Element;
    checkbox: GdprEmbedCheckbox | null;
    placeholder: Element;
    permanentButton: Element | null;
    modalOpenerButton: Element | null;
}

export class GdprConsentPlaceholder {
    button: Element;
    checkbox: GdprEmbedCheckbox | null = null;
    debug = debug.spawn('GdprConsentPlaceholder');
    modalOpenerButton: Element | null;
    permanentButton: Element | null;
    placeholder: Element;

    constructor(
        protected readonly type = 'generic',
        protected readonly classnames: string[] = [],
        protected readonly consentManager: ConsentManager,
        protected readonly settings: ConsentSettings
    ) {
        this.debug.toggle(settings.appSettings.debug);

        const {
            button,
            checkbox,
            placeholder,
            permanentButton,
            modalOpenerButton,
        } = this._createElements();
        this.button = button;
        this.checkbox = checkbox;
        this.placeholder = placeholder;
        this.permanentButton = permanentButton;
        this.modalOpenerButton = modalOpenerButton;
    }

    attach(container: Element) {
        this.debug.log('Attach placeholder', container, this.placeholder);
        if (this.placeholder) {
            container.appendChild(this.placeholder);
        }
    }

    hasPermanentButton() {
        return this.permanentButton !== null;
    }

    onButtonClick(callback: (e: Event) => void) {
        this.button.addEventListener('click', callback);
    }

    onPermanentButtonClick(callback: (e: Event) => void): void {
        if (this.permanentButton) {
            this.permanentButton.addEventListener('click', callback);
        }
    }

    onPlaceholderClick(callback: (e: Event) => void): void {
        this.placeholder.addEventListener('click', callback);
    }

    hideAndRemove(): void {
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

    protected _createElements(): PlaceholderElements {
        const placeholder = createDomElement({
            classNames: this.classnames,
        });

        const placeholderContent = createDomElement({
            classNames: [
                'ghct-embed-placeholder__content',
                'ghct-busy-button-wrap',
            ],
            parent: placeholder,
        });
        this._addTitle(placeholderContent);

        createDomElement({
            innerHtml: translator.withPlaceholders(
                Translatable.ph_Body,
                this.type,
                (placeholder) => {
                    if (placeholder === Translatable.servicePrettyName) {
                        return translator
                            .fallback(this.type)
                            .get(Translatable.servicePrettyName, this.type);
                    }
                    return undefined;
                }
            ),
            parent: placeholderContent,
        });

        let checkbox = null;
        if (
            this.type !== 'generic' &&
            this.settings.permanentConsentType.get(this.type) ===
                PermanentConsentType.CHECKBOX
        ) {
            checkbox = new GdprEmbedCheckbox(
                placeholderContent,
                this.type,
                this.settings
            );
        }

        const buttonContainer = createDomElement({
            classNames: ['ghct-embed-placeholder__buttons'],
            parent: placeholderContent,
        });

        const modalOpenerButton =
            this._createModalOpenerButton(buttonContainer);

        const button = createDomElement({
            type: 'BUTTON',
            classNames: [
                'ghct-embed-placeholder__button',
                'button',
                'is-style-primary',
            ],
            innerText: translator.get(Translatable.ph_ButtonText, this.type),
            parent: buttonContainer,
            attributes: {
                type: 'button',
            },
        });
        const permanentButton = this._createPermanentButton(buttonContainer);

        return {
            button,
            modalOpenerButton,
            permanentButton,
            placeholder,
            checkbox,
        };
    }

    private _addTitle(placeholderContent: Element): void {
        const titleText = translator.withPlaceholders(
            Translatable.ph_TitleText,
            this.type,
            (placeholder) => {
                if (placeholder === Translatable.servicePrettyName) {
                    // set a fallback for serviceprettyname
                    return translator
                        .fallback(this.type)
                        .get(Translatable.servicePrettyName, this.type);
                }

                return undefined;
            }
        );
        if (titleText) {
            createDomElement({
                type: 'H2',
                classNames: ['ghct-embed-placeholder__title'],
                innerText: titleText,
                parent: placeholderContent,
            });
        }
    }

    private _createModalOpenerButton(buttonContainer: Element): Element | null {
        let modalOpenerButton = null;
        if (this.settings.modalOpenerButton.get(this.type)) {
            modalOpenerButton = createDomElement({
                type: 'BUTTON',
                classNames: [
                    'ghct-embed-placeholder__button',
                    'ghct-embed-placeholder__button--secondary',
                    'button',
                    'is-style-secondary',
                ],
                attributes: {
                    type: 'button',
                },
                innerText: translator.get(
                    Translatable.ph_ModalOpenerButtonText,
                    this.type
                ),
                parent: buttonContainer,
            });

            modalOpenerButton.addEventListener(
                'click',
                this._showModalForService
            );
        }
        return modalOpenerButton;
    }

    private _createPermanentButton(buttonContainer: Element): Element | null {
        if (
            this.settings.permanentConsentType.get(this.type) ===
            PermanentConsentType.BUTTON
        ) {
            return createDomElement({
                type: 'BUTTON',
                classNames: [
                    'ghct-embed-placeholder__button',
                    'button',
                    'is-style-tertiary',
                    'ghct-embed-placeholder__button--permanent',
                ],
                innerText: translator.get(
                    Translatable.ph_PermanentConsentLabel,
                    this.type
                ),
                parent: buttonContainer,
                attributes: {
                    type: 'button',
                },
            });
        }
        return null;
    }

    private _onPlaceholderHidden = (): void => {
        this.placeholder.removeEventListener(
            'transitionend',
            this._onPlaceholderHidden
        );
        this.placeholder.remove();
    };

    private _showModalForService = (e: Event): void => {
        e.preventDefault();
        this.consentManager.showSettingsAtService(this.type);
    };
}
