import type { Emitter } from 'mitt';
import type { DebugLog } from './debuggable';

import EventEmitter from 'mitt';
import { debug } from './debuggable';

type DatalayerEntry = Record<string, string | boolean>;
type Datalayer = DatalayerEntry[];

export interface WithDataLayer {
    dataLayer?: Datalayer;
}

export type WindowWithDataLayer = Window & WithDataLayer;

declare const window: WindowWithDataLayer;

export class WrappedGtmFactory {
    protected debug: DebugLog = debug.spawn('gtmFactory');
    protected tries = 0;

    constructor() {
        this.debug.log('Constructing');
    }

    public getWrappedGtm(): Promise<WrappedGtm> {
        this.debug.log('Get wrapped GTM...');
        return new Promise((res, rej) => {
            this.debug.log('Trying first init');
            this.tryInit(res, rej);
        });
    }

    protected tryInit(
        resolve: (v: WrappedGtm) => void,
        reject: (v: unknown) => void
    ) {
        this.debug.log('Try init', {
            tries: this.tries,
            dl: window['dataLayer'],
        });
        if (!window['dataLayer'] && this.tries < 10) {
            this.debug.log('Setting timeout');
            setTimeout(() => {
                this.debug.log('Time is up!');
                ++this.tries;
                this.tryInit(resolve, reject);
            }, 500);
        } else if (window['dataLayer']) {
            this.debug.log('DL found. Resolving.');
            resolve(new WrappedGtm());
        } else {
            this.debug.warn('Datalayer not found after waiting. Aborting');
            reject('GTM data layer not found');
        }
    }
}

export class WrappedGtm {
    protected debug: DebugLog = debug.spawn('wrappedGtm');
    protected originalPushFunction:
        | ((...entries: DatalayerEntry[]) => number)
        | null = null;
    protected eventProxy: Emitter<Record<string, DatalayerEntry>> =
        EventEmitter();
    protected dataLayerClone: DatalayerEntry[] = [];

    constructor() {
        if (!window['dataLayer']) return;
        this.wrapDataLayer();
    }

    public getEventData(eventName: string | RegExp) {
        this.debug.log(`getting event data for ${eventName}`, {
            dataLayer: this.dataLayerClone,
        });
        return this.dataLayerClone.filter((item) => {
            if (item['event'] && typeof item['event'] === 'string') {
                return item['event'].match(eventName) !== null;
            }
            return false;
        });
    }

    public subscribeAll(callback: (entry: DatalayerEntry) => void) {
        this.eventProxy.on('push', callback);
    }

    public subscribe(
        eventName: string,
        callback: (entry: DatalayerEntry) => void
    ) {
        this.eventProxy.on(eventName, callback);
    }

    public unsubscribe(
        eventName: string,
        callback: (entry: DatalayerEntry) => void
    ) {
        this.eventProxy.off(eventName, callback);
    }

    protected onPush = (...entries: DatalayerEntry[]): number => {
        this.debug.log('Data layer push event!', entries);

        entries.forEach((entry) => {
            this.eventProxy.emit('push', entry);

            if (entry['event'] && typeof entry['event'] === 'string') {
                this.eventProxy.emit(entry['event'], entry);
            }
        });

        this.dataLayerClone.push(...entries);
        if (this.originalPushFunction) {
            this.originalPushFunction(...entries);
        }

        return this.dataLayerClone.length;
    };

    protected wrapDataLayer() {
        this.debug.log('Wrapping data layer push function');
        if (window.dataLayer) {
            this.originalPushFunction = window.dataLayer.push;
        }
        if (typeof window['dataLayer'] !== 'undefined') {
            window.dataLayer.push = this.onPush;
            this.dataLayerClone = [...window.dataLayer];
        }
    }
}

const gtmFactory = new WrappedGtmFactory();
export const gtm = gtmFactory.getWrappedGtm();
