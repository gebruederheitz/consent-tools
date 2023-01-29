import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export abstract class CustomStore<S> {
    protected state: S;
    protected store: Writable<S>;

    protected constructor(defaultState: S) {
        this.state = defaultState;
        this.store = writable(defaultState);
        this.store.subscribe((state) => {
            this.state = state;
        });
    }

    get subscribe() {
        return this.store.subscribe;
    }
}
