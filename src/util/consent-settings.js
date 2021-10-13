import _omit from 'lodash-es/omit';
import _pickBy from 'lodash-es/pickBy';
import _toPairs from 'lodash-es/toPairs';

export class ConsentSettings {
    /**
     * @type {boolean}
     */
    debug = false;

    /**
     * @type {LightboxFactory|function|null}
     */
    lightboxFactory = null;

    /**
     * @type {{[{string}]: boolean}}
     */
    reloadOnConsent = {
        default: false,
    };

    /**
     * @type {{[{string}]: boolean}}
     */
    clickOnConsent = {
        default: false,
    };

    /**
     * @type {{[{string}]: string}}
     */
    servicePrettyName = {
        default: '',
    };

    /**
     * @type {string}
     */
    privacyPolicyUrl = '/legal/datenschutzerklaerung';

    /**
     * @type {{[{string}]: boolean}}
     */
    defaultLoadAll = {
        default: true,
    };

    /**
     * @type {{[{string}]: string[]}}
     */
    additionalServices = {
        default: [],
    };

    // PLACEHOLDER SETTINGS

    /**
     * @type {{[{string}]: string}}
     */
    titleText = {
        default: '',
    };

    /**
     * Display an additional CMP modal opener button in the placeholder
     * @type {{[{string}]: boolean}}
     */
    modalOpenerButton = {
        default: false,
    };

    /**
     * @type {{[{string}]: string}}
     */
    privacyPolicySection = {
        default: '',
    };

    /**
     * @type {{[{string}]: boolean}}
     */
    skipCheckbox = { default: false };

    /**
     * @type {{[{string}]: string}}
     */
    checkboxProviderName = {
        default: 'dieses Anbieters',
    };

    /**
     * @type {{[{string}]: string}}
     */
    checkboxLabel = { default: 'Für alle Inhalte dieser Art übernehmen' };

    /**
     * @type {{[{string}]: string}}
     */
    description = {
        default:
            'Um diesen Inhalt anzuzeigen, müssen Sie ihn durch Klick auf den Button aktivieren. Dadurch werden Informationen an den Diensteanbieter übermittelt und dort gespeichert.',
    };

    /**
     * @type {{[{string}]: string}}
     */
    buttonText = {
        default: 'Inhalt laden',
    };

    /**
     * @param {{[{string}]: any}} defaults
     * @param {{[services]: any}} services
     */
    constructor(defaults = {}, services = {}) {
        this._parseDefaultOptions(defaults);

        _toPairs(services).forEach(([serviceId, serviceOptions]) => {
            this.addService(serviceId, serviceOptions);
        });
    }

    addService(serviceId, options = {}) {
        const allowedOptions = this._getCleanOptions(options);

        Object.keys(allowedOptions).forEach((key) => {
            this[key][serviceId] = allowedOptions[key];
        });
    }

    /**
     * @param serviceId
     * @return {string[]}
     */
    getAdditionalServices(serviceId = 'default') {
        return this._get('additionalServices', serviceId);
    }

    /**
     * @param serviceId
     * @return {string}
     */
    getButtonText(serviceId = 'default') {
        return this._get('buttonText', serviceId);
    }

    /**
     * @param serviceId
     * @return {string}
     */
    getCheckboxLabel(serviceId = 'default') {
        const baseLabel = this._get('checkboxLabel', serviceId);
        const providerName = this.getCheckboxProviderName(serviceId);

        return this._parsePlaceholdersIntoTemplateString(
            baseLabel,
            '%checkboxProviderName%',
            providerName
        );
    }

    /**
     * @param serviceId
     * @return {string}
     */
    getCheckboxProviderName(serviceId = 'default') {
        return this._get('checkboxProviderName', serviceId);
    }

    /**
     * @param serviceId
     * @return {string}
     */
    getDescription(serviceId = 'default') {
        const template = this._get('description', serviceId);
        const servicePrettyName = this._get('servicePrettyName', serviceId);

        return this._parsePlaceholdersIntoTemplateString(
            template,
            '%servicePrettyName%',
            servicePrettyName
        );
    }

    getLightboxFactory() {
        return this.lightboxFactory;
    }

    /**
     * @return {string}
     */
    getPrivacyPolicyUrl() {
        return this.privacyPolicyUrl;
    }

    /**
     * @param serviceId
     * @return {string}
     */
    getPrivacyPolicySection(serviceId = 'default') {
        return this._get('privacyPolicySection', serviceId);
    }

    /**
     * @param serviceId
     * @return {string}
     */
    getPrivacyPolicyUrlWithSection(serviceId = 'default') {
        const url = this.getPrivacyPolicyUrl();
        const section = this.getPrivacyPolicySection(serviceId);

        return `${url}${(section.length && '#') || ''}${section}`;
    }

    /**
     * @param serviceId
     * @return {string}
     */
    getTitleText(serviceId = 'default') {
        return this._get('titleText', serviceId);
    }

    /**
     * @param serviceId
     * @return {boolean}
     */
    hasModalOpenerButton(serviceId = 'default') {
        return this._get('modalOpenerButton', serviceId);
    }

    /**
     * @param serviceId
     * @return {boolean}
     */
    isClickOnConsent(serviceId = 'default') {
        return this._get('clickOnConsent', serviceId);
    }

    /**
     * @return {boolean}
     */
    isDebug() {
        return this.debug;
    }

    /**
     * @param serviceId
     * @return {boolean}
     */
    isDefaultLoadAll(serviceId = 'default') {
        return this._get('defaultLoadAll', serviceId);
    }

    /**
     * @param serviceId
     * @return {boolean}
     */
    isReloadOnConsent(serviceId = 'default') {
        return this._get('reloadOnConsent', serviceId);
    }

    /**
     * @param serviceId
     * @return {boolean}
     */
    isSkipCheckbox(serviceId = 'default') {
        return this._get('skipCheckbox', serviceId);
    }

    _getCleanOptions(userOptions = {}) {
        let cleanOptions = _pickBy(userOptions, (value, key) =>
            // eslint-disable-next-line no-prototype-builtins
            this.hasOwnProperty(key)
        );

        return _omit(cleanOptions, [
            'lightboxFactory',
            'debug',
            'privacyPolicyUrl',
        ]);
    }

    /**
     * @param {string} property
     * @param {string} key
     * @return {*}
     * @private
     */
    _get(property, key) {
        let value = this[property][key];
        if (typeof value === 'undefined') {
            value = this[property].default;
        }

        return value;
    }

    /**
     * Parses the provided settings to defaults.
     *
     * @param {{[string]: any}} options
     * @private
     */
    _parseDefaultOptions(options) {
        const cleanDefaults = this._getCleanOptions(options);
        _toPairs(cleanDefaults).forEach(([property, value]) => {
            if (property === 'debug') {
                this.debug = value;
                return;
            }

            if (property === 'privacyPolicyUrl') {
                this.privacyPolicyUrl = value;
                return;
            }

            if (property === 'lightboxFactory') {
                this.lightboxFactory = value;
                return;
            }

            this[property].default = value;
        });
    }

    /**
     * @param {string} template
     * @param {string} search
     * @param {string} replacement
     * @return {string}
     */
    _parsePlaceholdersIntoTemplateString(template, search, replacement) {
        if (typeof replacement === 'undefined' || replacement === null) {
            replacement = '';
        }

        return template.replace(search, replacement);
    }
}
