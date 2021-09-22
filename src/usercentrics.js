import { $$ } from '@gebruederheitz/wp-frontend-utils';

const debug = true;

export class Usercentrics {
    static listen(selector = '') {
        if (selector) {
            const triggers = $$()(selector);
            triggers.forEach((trigger) => {
                trigger.addEventListener('click', Usercentrics.onClick, true);
            });
        }
    }

    static load(type, embedsConfig = {}) {
        if (debug) {
            console.log('Loading UC service', type);
        }
        const templateId = embedsConfig.types[type]?.ucTemplateId;
        if (templateId && window.UC_UI) {
            window.UC_UI.acceptService(templateId);
        }
    }

    static onClick(e) {
        e.preventDefault();
        window.UC_UI?.showSecondLayer();
    }

    static showModalAtService(serviceName, embedsConfig = {}) {
        if (debug) {
            console.log('Opening modal at service', serviceName);
        }
        const templateId = embedsConfig.types[serviceName]?.ucTemplateId;
        if (templateId && window.UC_UI) {
            window.UC_UI?.showSecondLayer(templateId);
        }
    }
}
