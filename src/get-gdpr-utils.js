import { EventEmitter2 } from 'eventemitter2';

import { WrappedGtmFactory } from './util/wrap-gtm';
import { debug } from '../config/config';

const gtmFactory = new WrappedGtmFactory(debug);
const gtm = gtmFactory.getWrappedGtm();
const eventProxy = new EventEmitter2();

export { gtm, eventProxy };
