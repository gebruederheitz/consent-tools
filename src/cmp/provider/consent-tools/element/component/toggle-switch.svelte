<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let checked = false;
    export let name: string;
    export let size: string;
    export let disabled = false;
    export let formControl = false;
    export let controlled = true;
    export let label = '';
    export let labeled = false;

    function onKeypress(e: KeyboardEvent): void {
        if (e.key === ' ' || e.key === 'Enter') {
            onChange();
        }
    }

    function onChange() {
        if (disabled) return;

        if (controlled) {
            dispatch('change', !checked);
        } else {
            checked = !checked;
        }
    }

    $: style = size ? `--ghct-switch-scale: ${size};` : null;
</script>

{#if !formControl}
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        class="switch-input"
        {disabled}
        class:labeled
        on:click={onChange}
        {style}
    >
        <span class="axis" class:checked />
    </button>
{:else}
    <label
        class="switch-input"
        for={name}
        on:click={onChange}
        on:keydown={onKeypress}
        class:labeled
        class:disabled
        tabindex="0"
    >
        <input type="checkbox" {disabled} {name} bind:checked role="switch" />
        <span class="axis" class:checked aria-hidden="true" />
        {#if label}
            <span class="sr-only">
                {label}
            </span>
        {/if}
    </label>
{/if}

<style lang="scss">
    @use '../../../../../../scss/lib/util';

    .switch-input {
        align-items: center;
        background: none;
        border: 0;
        cursor: pointer;
        display: flex;
        font-size: var(--ghct-switch-scale, 1.25rem);
        justify-content: center;
        min-height: 1em;
        padding: 0.25em 0;
        width: 2.25em;

        input[type='checkbox'] {
            @include util.visually-hidden;
        }

        .axis {
            background-color: lightgrey;
            border-radius: 0.125em;
            height: 0.3em;
            position: relative;
            width: 80%;

            --active-color: var(--ghct-primary-20);
            --active-highlight: var(--ghct-primary-5);
            --active-left: calc(100% - 1.5em);
            --inactive-color: rgba(140 140 150 / 1);
            --inactive-highlight: rgba(170 170 182 / 1);
            --inactive-left: 0;
            --base: var(--inactive-color);
            --highlight: var(--inactive-highlight);
            --left: var(--inactive-left);
            --content: '';

            &::before {
                align-items: center;
                background: radial-gradient(
                    circle at 35% 45%,
                    var(--highlight) 0%,
                    var(--base) 100%
                );
                border-radius: 50%;
                box-shadow: 1px 2px 5px 1px rgba(0 0 0 / 15%);
                content: var(--content);
                color: #fff;
                display: flex;
                font-size: 0.7em;
                font-family: serif;
                justify-content: center;
                position: absolute;
                height: 1.5em;
                left: var(--left);
                top: calc(50% - 0.75em);
                transition: left 200ms ease, background 200ms ease;
                width: 1.5em;
            }

            &.checked {
                --base: var(--active-color);
                --highlight: var(--active-highlight);
                --left: var(--active-left);
            }
        }

        &.labeled .axis {
            --active-content: var(--ghct-toggle-active-content, 'I');
            --inactive-content: var(--ghct-toggle-inactive-content, '0');
            --content: var(--inactive-content);
            &.checked {
                --content: var(--active-content);
            }
        }

        &.disabled .axis,
        &:disabled .axis {
            --active-color: var(--ghct-secondary-50);
            --active-highlight: var(--ghct-secondary-20);
        }
    }
</style>
