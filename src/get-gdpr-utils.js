import { EventEmitter2 } from 'eventemitter2';

import { WrappedGtmFactory } from './util/wrap-gtm';

const debug = true;

const gtmFactory = new WrappedGtmFactory(debug);
const gtm = gtmFactory.getWrappedGtm();
const eventProxy = new EventEmitter2();

export { gtm, eventProxy };
