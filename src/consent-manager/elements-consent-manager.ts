import type { DebugLog } from '../util/debuggable';
import type { ConsentManager } from './consent-manager';
import type { ConsentSettings } from '../util/settings/consent-settings';

import { $$ } from '@gebruederheitz/wp-frontend-utils';

import { debug } from '../util/debuggable';
import { ModalConsentManager } from './modal-consent-manager';

interface ElementsConsentManagerOptions {
    debug: boolean;
    selector: string;
    hasConsentClassName: string;
}

const DEFAULT_OPTIONS: ElementsConsentManagerOptions = {
    debug: false,
    selector: '[data-ghct-service]',
    hasConsentClassName: 'has-consent',
};

/**
 * Show / hide elements based on user consent to a service
 *   and/or trigger certain actions only with user consent.
 */
export class ElementsConsentManager {
    protected debug: DebugLog = debug.spawn('ElementsConsentManager');
    protected options: ElementsConsentManagerOptions = DEFAULT_OPTIONS;
    protected elements: HTMLElement[] = [];

    /**
     * @param {ConsentManager}  consentManager
     * @param {ConsentSettings} settings
     * @param {object}          userOptions
     */
    constructor(
        protected readonly consentManager: ConsentManager,
        protected readonly settings: ConsentSettings,
        userOptions: Partial<ElementsConsentManagerOptions> = {}) {

        this.parseOptions(userOptions);

        this.elements = Array.from($$()(this.options.selector)) as HTMLElement[];
        this.debug.log('Init:', this.elements);
        this.initElements();
    }

    protected initElements(): void {
        if (!(this.elements && this.elements.length)) return;

        this.elements.forEach((element) => {
            const serviceName = this.getServiceNameFromElementDataset(element);
            this.debug.log('Initializing element with service', {
                element,
                serviceName,
            });

            if (serviceName === null) return;

            this.consentManager
                .withConsent(serviceName, this.showElement, element)
                .then();

            if (this.elementWantsModal(element)) {
                this.consentManager
                    .getServiceConsentStatus(serviceName)
                    .then((hasConsent) => {
                        this.debug.log(
                            `Maybe init modal, service ${serviceName} has ${
                                hasConsent ? '' : 'no'
                            } consent.`
                        );
                        if (!hasConsent)
                            this.initModalManager(element, serviceName);
                    });
            }
        });
    }

    protected initModalManager(element: HTMLElement, serviceName: string): void {
        const modalManager = new ModalConsentManager(
            element,
            this.consentManager,
            serviceName,
            this.settings
        );
        modalManager.init();
    }

    protected parseOptions(userOptions: Partial<ElementsConsentManagerOptions>): void {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...userOptions,
        };

        if (this.options.selector === '[data-ghct-service]') {
            const prefix = this.settings.appSettings.attributesPrefix;
            if (prefix !== 'ghct') {
                this.options.selector = `[data-${prefix}-service]`;
            }
        }
    }

    protected showElement = (element: HTMLElement): void => {
        element.classList.add(this.options.hasConsentClassName);
    };

    protected getServiceNameFromElementDataset(element: HTMLElement): string | null {
        const prefix = this.settings.appSettings.attributesPrefix;
        const attributeName = prefix + 'Service';
        return (element.dataset && element.dataset[attributeName]) || null;
    }

    protected elementWantsModal(element: HTMLElement): boolean {
        const prefix = this.settings.appSettings.attributesPrefix;
        const attributeName = prefix + 'Modal';
        return (
            (element.dataset && element.dataset[attributeName] === 'true') ||
            false
        );
    }
}
