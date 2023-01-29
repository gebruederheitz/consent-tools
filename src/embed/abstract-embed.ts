import type { DebugLog } from '../util/debuggable';
import { debug } from '../util/debuggable';
import { GdprConsentPlaceholder } from '../placeholder/gdpr-consent-placeholder';
import type { ConsentManager } from '../consent-manager/consent-manager';
import type { ConsentSettings } from '../util/settings/consent-settings';
import { PermanentConsentType } from '../util/settings/types';

export type AbstractEmbedConstructorArgs = [
    HTMLElement,
    ConsentManager,
    ConsentSettings
];

export abstract class AbstractEmbed {
    protected debug: DebugLog;
    protected container: HTMLElement;
    protected url: string;
    protected type: string;
    protected placeholder: GdprConsentPlaceholder | null = null;
    protected hasLoaded = false;

    protected constructor(
        namespace = 'AbstractEmbed',
        container: HTMLElement,
        protected readonly consentManager: ConsentManager,
        protected readonly settings: ConsentSettings
    ) {
        this.debug = debug.spawn(namespace);
        this.debug.toggle(settings.appSettings.debug);
        this.container = container;

        this.url = this._getUrl();
        this.type = this.getType() || 'generic';

        this.onEmbedPlaceholderButtonClicked =
            this.onEmbedPlaceholderButtonClicked.bind(this);
        this.onConsentChanged = this.onConsentChanged.bind(this);
        this.onEmbedPlaceholderPermanentButtonClicked =
            this.onEmbedPlaceholderPermanentButtonClicked.bind(this);

        // if (this.onModalOpenerClicked) {
        //     this.onModalOpenerClicked = this.onModalOpenerClicked.bind(this);
        // }

        this.debug.log('Type', this.type);
    }

    /* Abstract methods demanding implementation by extending class */

    public loadEmbed(direct = false) {
        this.debug.devnull(direct);
        this.hasLoaded = true;
    }

    public abstract unloadEmbed(): void;

    /* "Concrete" methods */

    public init(): AbstractEmbed | null {
        if (!this.container || !this.url) return null;
        this.placeholder = this.createPlaceholder();
        this.attachPlaceholder();
        this.listen().then();

        return this;
    }

    protected attachPlaceholder(): void {
        this.placeholder && this.placeholder.attach(this.container);
    }

    protected createPlaceholder(): GdprConsentPlaceholder | null {
        return new GdprConsentPlaceholder(
            this.type,
            this.getPlaceholderClassNames(),
            this.consentManager,
            this.settings
        );
    }

    protected getPlaceholderClassNames(): string[] {
        return ['ghct-embed-placeholder'];
    }

    protected getType(): string | null {
        const prefix = this.settings.appSettings.attributesPrefix;
        const attributeName = prefix + 'Type';
        return this.container.dataset[attributeName] || null;
    }

    protected hideAndRemovePlaceholder(): void {
        this.placeholder && this.placeholder.hideAndRemove();
    }

    protected async listen(): Promise<void> {
        /* Listen for the integrated button in the placeholder */
        if (this.placeholder) {
            this.placeholder.onButtonClick(
                this.onEmbedPlaceholderButtonClicked
            );

            if (this.placeholder.hasPermanentButton()) {
                this.placeholder.onPermanentButtonClick(
                    this.onEmbedPlaceholderPermanentButtonClicked
                );
            }
        }
        await this.consentManager.withConsentOrDenial(
            this.type,
            this.onConsentChanged
        );
    }

    protected loadAll(): void {
        this.debug.log('Load all');

        this.consentManager.acceptService(this.type);
        if (this.settings.appSettings.autoloadOnButtonClick) {
            this.loadEmbed(true);
        }
    }

    protected onConsentChanged(hasConsent: boolean): void {
        this.debug.log('UC consent changed', { hasConsent });
        if (hasConsent && !this.hasLoaded) {
            this.loadEmbed();
        } else if (!hasConsent && this.hasLoaded) {
            this.unloadEmbed();
        }
    }

    protected onEmbedPlaceholderButtonClicked(e: Event): void {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.placeholder?.setBusy();

        if (this._shouldLoadAll()) {
            this.loadAll();
        } else {
            this.loadEmbed(true);
        }
    }

    protected onEmbedPlaceholderPermanentButtonClicked(e: Event): void {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.placeholder?.setBusy();

        this.loadAll();
    }

    private _getUrl(): string {
        const prefix = this.settings.appSettings.attributesPrefix;
        const attributeName = prefix + 'Src';
        return this.container.dataset[attributeName] || '';
    }

    private _shouldLoadAll(): boolean {
        const skipWithLoadAll: boolean =
            (this.settings.permanentConsentType.get(this.type) !==
                PermanentConsentType.CHECKBOX &&
                this.settings.defaultLoadAll.get(this.type)) ||
            false;

        return (
            skipWithLoadAll || this.placeholder?.isCheckboxChecked() || false
        );
    }
}
