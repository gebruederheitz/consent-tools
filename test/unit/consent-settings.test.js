import { describe, expect, it } from 'vitest';

import { ConsentSettings } from '../../src/util/consent-settings.js';

describe('ConsentSettings', () => {
    it('falls back to the default value for services without an override', () => {
        const settings = new ConsentSettings(
            { buttonText: 'Load' },
            { youtube: { buttonText: 'Load video' } }
        );

        expect(settings.getButtonText('youtube')).toBe('Load video');
        expect(settings.getButtonText('vimeo')).toBe('Load');
        expect(settings.getButtonText()).toBe('Load');
    });

    it('ignores global options in service overrides', () => {
        const settings = new ConsentSettings(
            { privacyPolicyUrl: '/privacy' },
            { youtube: { privacyPolicyUrl: '/elsewhere', debug: true } }
        );

        expect(settings.getPrivacyPolicyUrl()).toBe('/privacy');
        expect(settings.isDebug()).toBe(false);
    });

    it('ignores unknown options', () => {
        const settings = new ConsentSettings({ unknownOption: true });

        expect(settings).not.toHaveProperty('unknownOption');
    });

    it('returns the service ID itself when no CMP service ID is configured', () => {
        const settings = new ConsentSettings(
            {},
            { youtube: { cmpServiceId: 'YouTube Video' } }
        );

        expect(settings.getCmpServiceId('youtube')).toBe('YouTube Video');
        expect(settings.getCmpServiceId('vimeo')).toBe('vimeo');
    });

    it('fills the template placeholders in the description', () => {
        const settings = new ConsentSettings(
            {
                description:
                    'Load %servicePrettyName%? See <a href="%privacyPolicyUrl%">privacy</a>.',
                privacyPolicyUrl: '/privacy',
            },
            {
                youtube: {
                    servicePrettyName: 'YouTube',
                    privacyPolicySection: 'youtube',
                },
            }
        );

        expect(settings.getDescription('youtube')).toBe(
            'Load YouTube? See <a href="/privacy#youtube">privacy</a>.'
        );
        expect(settings.getDescription('vimeo')).toBe(
            'Load vimeo? See <a href="/privacy">privacy</a>.'
        );
    });

    it('fills the provider name into the checkbox label', () => {
        const settings = new ConsentSettings(
            {
                checkboxLabel:
                    'Always load content from %checkboxProviderName%',
            },
            { youtube: { checkboxProviderName: 'YouTube' } }
        );

        expect(settings.getCheckboxLabel('youtube')).toBe(
            'Always load content from YouTube'
        );
    });
});
