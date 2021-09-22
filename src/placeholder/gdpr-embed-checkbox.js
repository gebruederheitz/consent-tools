import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

export class GdprEmbedCheckbox {
    constructor(parentElement, labelText, options) {
        this.checkboxElement = null;
        this.options = options;

        this.createElements(parentElement, labelText);
    }

    createElements(parentElement, labelText) {
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

        if (this.options.defaultLoadAll) {
            this.checkboxElement.checked = true;
        }

        createDomElement({
            type: 'LABEL',
            innerText: labelText,
            parent: checkboxWrapper,
        });
    }

    isChecked() {
        return this.checkboxElement.checked;
    }
}
