import type { ConsentSettings } from '../util/settings/consent-settings';
import { createDomElement } from '@gebruederheitz/wp-frontend-utils';
import { translator, Translatable} from '../util/i18n';

export class GdprEmbedCheckbox {
    protected checkboxElement: HTMLInputElement | null = null;

    /**
     * @param {Element}         parentElement   The element this checkbox will be attached to
     * @param {string}          type            Analogous to serviceId
     * @param {ConsentSettings} settings        A settings object.
     */
    constructor(
        parentElement: HTMLElement,
        protected readonly type: string,
        protected readonly settings: ConsentSettings
    ) {
        this.createElements(parentElement);
    }

    protected createElements(parentElement: HTMLElement): void {
        const checkboxWrapper = createDomElement({
            classNames: ['form-check', 'form-check--small'],
            parent: parentElement,
        });

        this.checkboxElement = createDomElement({
            type: 'INPUT',
            attributes: {
                type: 'checkbox',
                value: 'on',
            },
            parent: checkboxWrapper,
        }) as HTMLInputElement;

        if (this.settings.defaultLoadAll.get(this.type)) {
            this.checkboxElement.checked = true;
        }

        createDomElement({
            type: 'LABEL',
            innerText: translator.get(Translatable.ph_PermanentConsentLabel, this.type),
            parent: checkboxWrapper,
        });
    }

    public isChecked(): boolean {
        return this.checkboxElement?.checked || false;
    }
}
