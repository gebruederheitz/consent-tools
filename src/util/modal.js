import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

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
                'ghct-modal',
                'ghct-modal--with-backdrop',
                'ghct-hide',
            ],
        });
        this.closeButton = createDomElement({
            type: 'BUTTON',
            classNames: ['ghct-modal__close'],
            parent: this.root,
            attributes: {
                type: 'button',
            },
        });
        this.container = createDomElement({
            classNames: ['ghct-modal__inner'],
            parent: this.root,
            innerHtml: typeof content === 'string' ? content : '',
        });

        if (content && content.outerHTML) {
            this.container.appendChild(content);
        }

        document.body.appendChild(this.root);
        this._listen();
    }

    _clearContent() {
        this.container.innerHTML = '';
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
        this.root.classList.remove('ghct-hide');
        document.body.classList.add('modal-active');

        window.addEventListener('keydown', this._onKeyDown);
    }

    hide() {
        this.root.classList.add('ghct-hide');
        document.body.classList.remove('modal-active');

        window.removeEventListener('keydown', this._onKeyDown);
    }

    destroy() {
        this.root.remove();
    }
}
