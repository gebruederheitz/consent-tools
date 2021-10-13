export { EmbedFactory } from './embed/factory.js';
export { LightboxEmbed } from './embed/lightbox-embed.js';
export { IframeEmbed } from './embed/iframe-embed.js';

export { ConsentManager } from './consent-manager';
export { ElementsConsentManager } from './elements-consent-manager';
export { ModalConsentManager } from './modal-consent-manager.js';

export { UsercentricsProvider } from './cmp/provider/usercentrics-provider.js';
export { GenericLocalStorageProvider } from './cmp/provider/generic-localstorage-provider.js';
export { GenericEventProvider } from './cmp/provider/generic-event-provider.js';
export { CmpServiceProvider as CmpServiceProviderInterface } from './cmp/interface.js';

export { ConsentSettings } from './util/consent-settings.js';

import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

function toggleDebugOutput(toggle = true) {
    Debuggable.prototype.globalJsDebug = toggle;
}

export {
    Debuggable,
    toggleDebugOutput,
};
