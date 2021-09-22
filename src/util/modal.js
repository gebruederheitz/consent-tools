import { createDomElement } from './create-element';
import { $$ } from './querySelector';

export class Modal {
    /**
     * @param {Element[]|null} content
     */
    constructor(content = null) {
        this.container = null;
        this.root = null;
        this.closeButton = null;

        this._onCloseClicked = this._onCloseClicked.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);

        this._createElements(content);
    }

    _createElements(content) {
        this.root = createDomElement({
            classNames: [
                'ghwp-modal',
                'ghwp-modal--with-backdrop',
                'ghwp-hide',
            ],
        });
        this.closeButton = createDomElement({
            type: 'BUTTON',
            classNames: ['ghwp-modal__close'],
            parent: this.root,
            attributes: {
                type: 'button',
            },
        });
        this.container = createDomElement({
            classNames: ['ghwp-modal__inner'],
            parent: this.root,
            innerHtml: (content && content.outerHTML) || '',
        });

        document.body.appendChild(this.root);
        this._listen();
    }

    _clearContent() {
        const children = $$(this.container)('*');
        children &&
            children.forEach((child) => {
                this.container.removeChild(child);
            });
    }

    _listen() {
        this.closeButton.addEventListener('click', this._onCloseClicked);
    }

    _onCloseClicked() {
        this.hide();
    }

    _onKeyDown(e) {
        if (e.key === 'Escape') {
            this.hide();
        }
    }

    appendElement(element) {
        this.container.appendChild(element);
    }

    replaceContent(element) {
        this._clearContent();
        this.appendElement(element);
    }

    getContainer() {
        return this.container;
    }

    show() {
        this.root.classList.remove('ghwp-hide');
        document.body.classList.add('modal-active');

        window.addEventListener('keydown', this._onKeyDown);
    }

    hide() {
        this.root.classList.add('ghwp-hide');
        document.body.classList.remove('modal-active');

        window.removeEventListener('keydown', this._onKeyDown);
    }
}
