import { createDomElement } from '@gebruederheitz/wp-frontend-utils';

type ModalContent = Element | Element[] | string | null;

export class Modal {
    protected container: HTMLElement | null = null;
    protected root: HTMLElement | null = null;
    protected closeButton: HTMLButtonElement | null = null;
    /**
     * @param {Element|Element[]|string|null} content
     */
    constructor(content: ModalContent = null) {
        this._createElements(content);
    }

    public appendElement(element: Element) {
        this.container?.appendChild(element);
    }

    public replaceContent(element: Element) {
        this._clearContent();
        this.appendElement(element);
    }

    public getContainer(): HTMLElement | null {
        return this.container;
    }

    public hide(): void {
        this.root?.classList.add('ghct-hide');
        document.body.classList.remove('modal-active');

        window.removeEventListener('keydown', this._onKeyDown);
    }

    public show(): void {
        this.root?.classList.remove('ghct-hide');
        document.body.classList.add('modal-active');

        window.addEventListener('keydown', this._onKeyDown);
    }

    public destroy(): void {
        this.root?.remove();
    }

    protected _createElements(content: ModalContent) {
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
        }) as HTMLButtonElement;
        this.container = createDomElement({
            classNames: ['ghct-modal__inner'],
            parent: this.root,
            innerHtml: typeof content === 'string' ? content : '',
        });

        if (content && content instanceof Element && content.outerHTML) {
            this.container.appendChild(content);
        }

        document.body.appendChild(this.root);
        this._listen();
    }

    protected _clearContent() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    protected _listen() {
        this.closeButton?.addEventListener('click', this._onCloseClicked);
    }

    protected _onCloseClicked = () => {
        this.hide();
    };

    protected _onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            this.hide();
        }
    };
}
