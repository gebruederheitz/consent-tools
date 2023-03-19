import { CustomStore } from './custom-store';

export enum ModalLayer {
    INITIAL,
    SERVICES,
}

interface ModalState {
    currentLayer: ModalLayer | null;
}

const DEFAULT_STATE: ModalState = {
    currentLayer: null,
};

class ModalStore extends CustomStore<ModalState> {
    constructor() {
        super(DEFAULT_STATE);
    }

    get layer(): ModalLayer | null {
        return this.state.currentLayer;
    }

    public setLayer(layer: ModalLayer): void {
        this.store.update((state) => ({
            ...state,
            currentLayer: layer,
        }));
    }
}

export const modalStore = new ModalStore();
