import { EventEmitter2 } from 'eventemitter2';
import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

export class WrappedGtmFactory extends Debuggable {
    constructor(debug = false) {
        super('gtmFactory');
        this.options = {
            debug,
        };
        this.debug.log('Constructing');
        this.tries = 0;
    }

    tryInit(resolve, reject, options) {
        this.debug.log('Try init', { tries: this.tries, dl: window.dataLayer });
        if (!window.dataLayer && this.tries < 10) {
            this.debug.log('Setting timeout');
            setTimeout(() => {
                this.debug.log('Time is up!');
                ++this.tries;
                this.tryInit(resolve, reject, options);
            }, 500);
        } else if (window.dataLayer) {
            this.debug.log('DL found. Resolving.');
            resolve(new WrappedGtm(options));
        } else {
            this.debug.warn('Datalayer not found after waiting. Aborting');
            reject('GTM data layer not found');
        }
    }

    getWrappedGtm(userOptions = {}) {
        this.debug.log('Get wrapped GTM...');
        return new Promise((res, rej) => {
            this.debug.log('Trying first init');
            this.tryInit(res, rej, userOptions);
        }).catch(this.debug.error);
    }
}

export class WrappedGtm extends Debuggable {
    constructor(userOptions = {}) {
        super('wrappedGtm');
        if (!window.dataLayer) return;

        this.originalPushFunction = null;
        this.options = userOptions;

        this.onPush = this.onPush.bind(this);

        this.eventProxy = new EventEmitter2();
        this.dataLayerClone = [];
        this.wrapDataLayer();
    }

    /**
     * @param {string|RegExp} eventName
     * @return {*}
     */
    getEventData(eventName) {
        this.debug.log(`getting event data for ${eventName}`, {
            dataLayer: this.dataLayerClone,
        });
        return this.dataLayerClone.filter((item) => {
            return item.event && item.event.match(eventName) !== null;
        });
    }

    onPush(...args) {
        this.debug.log('Data layer push event!', ...args);
        this.eventProxy.emit('push', ...args);

        if (args[0].event) {
            this.eventProxy.emit(args[0].event, ...args);
        }

        this.dataLayerClone.push(...args);
        this.originalPushFunction(...args);
    }

    subscribeAll(callback) {
        this.eventProxy.on('push', callback);
    }

    subscribe(eventName, callback, options) {
        this.eventProxy.on(eventName, callback, options);
    }

    wrapDataLayer() {
        this.debug.log('Wrapping data layer push function');
        this.originalPushFunction = window.dataLayer.push;
        window.dataLayer.push = this.onPush;
        this.dataLayerClone = [...window.dataLayer];
    }
}
