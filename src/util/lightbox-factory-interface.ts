export interface Lightbox {
    open: () => unknown;
    destroy: () => unknown;
}
export interface LightboxFactoryInterface {
    create: (selector: string) => Lightbox;
}
