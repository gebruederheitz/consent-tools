import { afterEach, describe, expect, it } from 'vitest';

import { ConsentSettings } from '../../src/util/consent-settings.js';
import { GdprConsentPlaceholder } from '../../src/placeholder/gdpr-consent-placeholder.js';
import { LightboxEmbed } from '../../src/embed/lightbox-embed.js';
import { Modal } from '../../src/util/modal.js';
import {
    addNoopener,
    addNoopenerToBlankTargets,
} from '../../src/util/noopener.js';

function html(markup) {
    const root = document.createElement('div');
    root.innerHTML = markup;
    return root;
}

describe('addNoopener', () => {
    it('adds noopener to a link without rel', () => {
        const link = document.createElement('a');

        addNoopener(link);

        expect(link.rel).toBe('noopener');
    });

    it('keeps existing rel values', () => {
        const link = document.createElement('a');
        link.rel = 'nofollow';

        addNoopener(link);

        expect(link.rel).toBe('nofollow noopener');
    });

    it('does not duplicate noopener', () => {
        const link = document.createElement('a');
        link.rel = 'noopener noreferrer';

        addNoopener(link);

        expect(link.rel).toBe('noopener noreferrer');
    });
});

describe('addNoopenerToBlankTargets', () => {
    it('only changes links that open in a new browsing context', () => {
        const root = html(`
            <a id="blank" href="/a" target="_blank">a</a>
            <a id="upper" href="/b" target="_BLANK">b</a>
            <a id="self" href="/c" target="_self">c</a>
            <a id="none" href="/d">d</a>
        `);

        addNoopenerToBlankTargets(root);

        expect(root.querySelector('#blank').rel).toBe('noopener');
        expect(root.querySelector('#upper').rel).toBe('noopener');
        expect(root.querySelector('#self').hasAttribute('rel')).toBe(false);
        expect(root.querySelector('#none').hasAttribute('rel')).toBe(false);
    });
});

describe('GdprConsentPlaceholder', () => {
    it('adds noopener to target="_blank" links in the description', () => {
        const settings = new ConsentSettings({
            description:
                'See <a href="/privacy" target="_blank">privacy</a> and <a href="/imprint" target="_blank" rel="nofollow">imprint</a>.',
        });

        const { placeholder } = new GdprConsentPlaceholder(
            'youtube',
            ['ghct-embed-placeholder'],
            null,
            settings
        );
        const links = placeholder.querySelectorAll('a');

        expect(links[0].rel).toBe('noopener');
        expect(links[1].rel).toBe('nofollow noopener');
    });
});

describe('LightboxEmbed', () => {
    it('adds noopener when it falls back to opening the link in a new tab', () => {
        const container = document.createElement('a');
        container.dataset.ghctSrc = 'https://www.youtube.com/watch?v=x';
        container.dataset.ghctType = 'youtube';
        const settings = new ConsentSettings({
            lightboxFactory: { create: () => null },
        });

        const embed = new LightboxEmbed(container, null, settings);
        embed.unloadEmbed();

        expect(container.target).toBe('_blank');
        expect(container.rel).toBe('noopener');
    });
});

describe('Modal', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('adds noopener to target="_blank" links in string content', () => {
        const modal = new Modal('<a href="/x" target="_blank">x</a>');

        expect(modal.getContainer().querySelector('a').rel).toBe('noopener');
    });
});
