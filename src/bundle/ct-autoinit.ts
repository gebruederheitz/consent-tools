import whenDomReady from 'when-dom-ready';
import type { ConsentManager } from '../consent-manager/consent-manager';
import type { FactorySettings } from '../factory';
import { ConsentTools } from '../factory';

declare const window: Window & {
    ghconsent?: ConsentManager;
    ghConsentSettings?: FactorySettings;
};

whenDomReady().then(async () => {
    let settings = {};

    const settingsObject = window['ghConsentSettings'];

    if (settingsObject) {
        settings = settingsObject;
    } else {
        const settingsElement: HTMLElement | null = document.querySelector(
            '[data-ghct-settings]'
        );
        if (settingsElement) {
            const settingsUrl = settingsElement.dataset['ghctSettings'];
            if (settingsUrl) {
                const res = await fetch(settingsUrl, {
                    referrerPolicy: 'same-origin',
                });
                if (res.ok) {
                    settings = await res.json();
                }
            }
        }
    }

    window.ghconsent = ConsentTools.factory(settings);
});
