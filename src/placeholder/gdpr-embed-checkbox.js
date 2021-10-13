import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

export class GdprEmbedCheckbox {
    /**
     * @param {Element}         parentElement   The element this checkbox will be attached to
     * @param {string}          type            Analogous to serviceId
     * @param {ConsentSettings} settings        A settings object.
     */
    constructor(parentElement, type, settings) {
        this.checkboxElement = null;
        this.settings = settings;
        this.type = type;

        this.createElements(parentElement);
    }

    createElements(parentElement) {
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
        });

        if (this.settings.isDefaultLoadAll(this.type)) {
            this.checkboxElement.checked = true;
        }

        createDomElement({
            type: 'LABEL',
            innerText: this.settings.getCheckboxLabel(this.type),
            parent: checkboxWrapper,
        });
    }

    isChecked() {
        return this.checkboxElement.checked;
    }
}
