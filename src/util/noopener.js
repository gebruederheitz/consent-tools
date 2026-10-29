/**
 * Adds `noopener` to the link's `rel` attribute, keeping any existing values.
 *
 * @param {HTMLAnchorElement} link
 */
export function addNoopener(link) {
    // Not relList: the build has no browser target yet (#37), and an old
    // browser without it would throw and break the placeholder.
    const rel = (link.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
    if (rel.indexOf('noopener') === -1) {
        link.setAttribute('rel', [...rel, 'noopener'].join(' '));
    }
}

/**
 * Adds `noopener` to every link inside {root} that opens in a new browsing
 * context (`target="_blank"`), so markup from settings or other HTML strings
 * can't be used for reverse tabnabbing.
 *
 * @param {Element} root
 */
export function addNoopenerToBlankTargets(root) {
    // Filtered here rather than with the selector's `i` flag, which old
    // browsers reject (see above).
    Array.prototype.filter
        .call(
            root.querySelectorAll('a[target]'),
            (link) => link.getAttribute('target').toLowerCase() === '_blank'
        )
        .forEach(addNoopener);
}
