import type { Emitter } from 'mitt';

export enum Event {
    MODAL_CHANGE_SERVICE = 'modal-change-service',
    SHOW_MODAL = 'show-modal',
    HIDE_MODAL = 'hide-modal',
    MODAL_CONFIRMED = 'modal-confirmed',
}

export type ConsentToolsProviderEmitter = Emitter<
    Record<string, object | boolean | string | null | never>
>;
