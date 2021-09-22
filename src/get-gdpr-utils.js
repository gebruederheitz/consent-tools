import { EventEmitter2 } from 'eventemitter2';
import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

import { WrappedGtmFactory } from './util/wrap-gtm';

const debug = Debuggable.prototype.globalJsDebug;

const gtmFactory = new WrappedGtmFactory(debug);
const gtm = gtmFactory.getWrappedGtm();
const eventProxy = new EventEmitter2();

export { gtm, eventProxy };
