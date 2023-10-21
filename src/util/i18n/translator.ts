import { Translatable } from './dictionary/translatables';

import _mergeWith from 'lodash-es/mergeWith';
import _isString from 'lodash-es/isString';
import _isPlainObject from 'lodash-es/isPlainObject';

import { de } from './dictionary/de';
import { en } from './dictionary/en';

enum Locale {
    EN = 'en',
    DE = 'de',
}

const DEFAULT_LOCALE = Locale.EN;

const DICTIONARIES: Record<Locale, Dictionary> = {
    [Locale.DE]: de,
    [Locale.EN]: en,
};

export type DictionaryEntry = string | Record<string, string>;
export type Dictionary = Record<Translatable, DictionaryEntry>;
export interface Translator {
    locale: string;
    load(dictionary: Dictionary, locale: string | Locale): Translator;
    setLocale(locale: string | Locale | null): Translator;
    get(key: Translatable, service?: string | null): string;
    try(service: string, ...keys: Translatable[]): string;
    fallback(fallback: string): Translator;
    withPlaceholders(key: Translatable, service?: string | null): string;
}

class SimpleTranslator implements Translator {
    protected defaultLocale: Locale = DEFAULT_LOCALE;
    protected currentLocale: Locale = DEFAULT_LOCALE;
    protected fallbackString = '';
    protected dicts: Record<string, Dictionary> = DICTIONARIES;

    get locale(): string {
        return this.currentLocale;
    }

    public load(dictionary: Dictionary, locale: string = DEFAULT_LOCALE): this {
        this.dicts[locale] = _mergeWith(
            this.dicts[locale] || {},
            dictionary,
            (originalV, newV) => {
                if (_isString(originalV) && _isPlainObject(newV)) {
                    if (!newV['default']) {
                        newV['default'] = originalV;
                        return newV;
                    }
                }
                return undefined;
            }
        );
        return this;
    }

    public setLocale(locale: string | null = null): this {
        if (!locale) {
            locale = DEFAULT_LOCALE;
        }
        if (this.dicts[locale]) {
            this.currentLocale = locale as Locale;
        } else {
            console.warn(
                '[consent-tools] Attempt to set locale where no dictionary exists.'
            );
        }
        return this;
    }

    /**
     * For any given Translatable, attempts to return, in the given order:
     *  - the string value of the dictionary entry for the current locale
     *  - the value under the key $service of the dictionary entry for the current locale
     *  - the value under the key "default" of the dictionary entry for the current locale
     *  - the string value of the dictionary entry for the default locale
     *  - the value under the key $service of the dictionary entry for the default locale
     *  - the value under the key "default" of the dictionary entry for the default locale
     */
    public get(key: Translatable, service: string | null = null): string {
        let result = this.fallbackString;

        const currentDict = this.dicts[this.currentLocale] as Dictionary;
        const dictsToTry = [currentDict];

        if (this.currentLocale !== this.defaultLocale) {
            const fallbackDict = this.dicts[this.defaultLocale] as Dictionary;
            dictsToTry.push(fallbackDict);
        }

        for (const dict of dictsToTry) {
            const found = this.tryDictionary(dict, key, service);
            if (found) {
                result = found;
                break;
            }
        }

        return result;
    }

    /**
     * Similar to Translator.get(), but before going down the path of defaults,
     * in each step it will first check the most specific values for all the
     * $keys provided in order.
     */
    public try(service: string, ...keys: Translatable[]): string {
        let result = this.fallbackString;

        const currentDict = this.dicts[this.currentLocale] as Dictionary;

        const tries: [Dictionary, Translatable, string][] = [
            ...keys.map((key): [Dictionary, Translatable, string] => {
                return [currentDict, key, service];
            }),
            ...keys.map((key): [Dictionary, Translatable, string] => {
                return [currentDict, key, 'default'];
            }),
        ];

        if (this.currentLocale !== this.defaultLocale) {
            const fallbackDict = this.dicts[this.defaultLocale] as Dictionary;

            tries.push(
                ...keys.map((key): [Dictionary, Translatable, string] => {
                    return [fallbackDict, key, service];
                }),
                ...keys.map((key): [Dictionary, Translatable, string] => {
                    return [fallbackDict, key, 'default'];
                })
            );
        }

        for (const args of tries) {
            const found = this.tryValue(...args);
            if (found) {
                result = found;
                break;
            }
        }

        if (this.fallbackString && !result.length) {
            result = this.fallbackString;
        }

        this.resetFallback();
        return result;
    }

    public fallback(fallback: string): this {
        this.fallbackString = fallback;
        return this;
    }

    /**
     * @TODO document customreplacer
     */
    public withPlaceholders(
        key: Translatable,
        service: string | null = null,
        customReplacer?: (
            placeholder: string,
            service: string | null
        ) => string | undefined
    ): string {
        let result = this.fallbackString;

        const translatedString = this.get(key, service);
        translatedString.replace(
            /%([a-zA-Z_]+)%/,
            (_placeholder, placeholderContent) => {
                if (customReplacer) {
                    const customReplacerResult = customReplacer(
                        placeholderContent,
                        service
                    );
                    if (typeof customReplacerResult !== 'undefined') {
                        return customReplacerResult;
                    }
                }

                return placeholderContent in Translatable
                    ? this.get(placeholderContent as Translatable, service)
                    : '';
            }
        );
        result = translatedString;

        return result;
    }

    protected resetFallback() {
        this.fallbackString = '';
    }

    protected tryValue(dict: Dictionary, key: Translatable, field: string) {
        const entry = dict[key];
        if (typeof entry === 'string') {
            return entry;
        }

        if (entry[field]) {
            return entry[field];
        }

        return null;
    }

    protected tryDictionary(
        dict: Dictionary,
        key: Translatable,
        service: string | null = null
    ): string | null {
        const firstPreference = dict[key];

        if (typeof firstPreference === 'string') {
            return firstPreference;
        } else if (service) {
            const r = firstPreference[service];
            if (r) {
                return r;
            } else if (firstPreference['default']) {
                return firstPreference['default'];
            }
        }

        return null;
    }
}

export const translator = new SimpleTranslator();
