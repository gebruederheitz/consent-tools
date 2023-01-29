/* eslint-disable */
import type { CmpServiceProvider } from './cmp-service-provider';
import type { DebugLog } from '../util/debuggable';

import { $$ } from '@gebruederheitz/wp-frontend-utils';

import { debug } from '../util/debuggable';

export abstract class AbstractCmpServiceProvider implements CmpServiceProvider {
    debug: DebugLog;

    protected constructor(namespace = 'AbstractCmpServiceProvider') {
        this.debug = debug.spawn(namespace);

        this._onClickSettingsOpener = this._onClickSettingsOpener.bind(this);
    }

    /**
     * @inheritDoc
     */
    public abstract acceptService(serviceId: string): void;

    /**
     * @inheritDoc
     */
    public attachSettingsOpener(domSelector: string | Element): void {
        let elements: Element[] | NodeList = [];

        if (typeof domSelector === 'string') {
            elements = $$()(domSelector);
        } else if (domSelector instanceof Element) {
            elements = [domSelector];
        }

        elements.forEach((element) => {
            element.addEventListener('click', this._onClickSettingsOpener);
        });
    }

    /**
     * @inheritDoc
     */
    public abstract getConsentStatusForService(
        serviceId: string
    ): Promise<boolean>;

    /**
     * @inheritDoc
     */
    public abstract isPresent(): boolean;

    /**
     * @inheritDoc
     */
    public abstract onConsentUpdate(
        serviceId: string,
        callback: (status: boolean) => void
    ): Promise<void>;

    /**
     * @inheritDoc
     */
    public abstract showSettingsMenu(): void;

    /**
     * @inheritDoc
     */
    public showSettingsMenuAtService(serviceId: string): void {
        this.debug.devnull(serviceId);
        this.showSettingsMenu();
    }

    protected _onClickSettingsOpener(e: Event) {
        e.preventDefault();
        this.showSettingsMenu();
    }
}
