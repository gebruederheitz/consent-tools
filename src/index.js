import { GdprEmbedFactory } from './gdpr-embed-factory';
import { GdprLightboxEmbed } from './gdpr-lightbox-embed';
import { GdprIframeEmbed } from './gdpr-iframe-embed';
import { ModalGdprManager } from './modal-gdpr-manager';
import { ConsentManager } from './consent-manager';
import { ElementsConsentManager } from './elements-consent-manager';
import { Usercentrics } from './usercentrics';
import { Debuggable } from '@gebruederheitz/wp-frontend-utils';

function toggleDebugOutput(toggle = true) {
    Debuggable.prototype.globalJsDebug = toggle;
}

export {
    ConsentManager,
    ElementsConsentManager,
    GdprEmbedFactory,
    GdprLightboxEmbed,
    GdprIframeEmbed,
    ModalGdprManager,
    Usercentrics,
    toggleDebugOutput,
};
