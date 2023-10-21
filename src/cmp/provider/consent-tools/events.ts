import type { Emitter, EventType } from 'mitt';

export enum Event {
    // MODAL_CHANGE_SERVICE = 'modal-change-service',
    SHOW_MODAL = 'show-modal',
    HIDE_MODAL = 'hide-modal',
    MODAL_CONFIRMED = 'modal-confirmed',
}

export interface ConsentToolsEvents extends Record<EventType, string | null> {
    // [Event.MODAL_CHANGE_SERVICE]: any
    [Event.SHOW_MODAL]: string | null;
    // [Event.HIDE_MODAL]: string | null;
}

export type ConsentToolsProviderEmitter = Emitter<ConsentToolsEvents | Record<string, boolean>>;
