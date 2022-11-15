/* eslint-disable */
import { $$, Debuggable } from '@gebruederheitz/wp-frontend-utils';

/**
 * @implements CmpServiceProvider
 * @abstract
 */
export class AbstractCmpServiceProvider extends Debuggable {
    constructor(namespace = 'AbstractCmpServiceProvider') {
        super(namespace);

        this._onClickSettingsOpener = this._onClickSettingsOpener.bind(this);
    }

    /**
     * @abstract
     * @inheritDoc
     */
    acceptService(serviceId) {}

    /**
     * @param {string|Element} domSelector
     */
    attachSettingsOpener(domSelector) {
        let elements = [];

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
     * @abstract
     * @inheritDoc
     */
    async getConsentStatusForService(serviceId) {}

    /**
     * @abstract
     * @inheritDoc
     */
    isPresent() {}

    /**
     * @abstract
     * @inheritDoc
     */
    async onConsentUpdate(serviceId, callback) {}

    /**
     * @abstract
     * @inheritDoc
     */
    showSettingsMenu() {}

    /**
     * @inheritDoc
     */
    showSettingsMenuAtService(serviceId) {
        this.showSettingsMenu();
    }

    /**
     * @protected
     *
     * @param {MouseEvent} e
     */
    _onClickSettingsOpener(e) {
        e.preventDefault();
        this.showSettingsMenu();
    }
}
