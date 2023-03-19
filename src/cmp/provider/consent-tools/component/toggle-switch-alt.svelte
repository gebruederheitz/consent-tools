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
        class:checked
        {disabled}
        on:click={onChange}
        {style}
    >
        <span class="axis" />
    </button>
{:else}
    <label
        class="switch-input"
        for={name}
        on:click={onChange}
        on:keydown={onKeypress}
        class:checked
        class:disabled
        tabindex="0"
    >
        <input type="checkbox" {disabled} {name} bind:checked role="switch" />
        <span class="axis" aria-hidden="true" />
        {#if label}
            <span class="sr-only">
                {label}
            </span>
        {/if}
    </label>
{/if}

<style lang="scss">
    @use 'scss/lib/util';

    .switch-input {
        align-items: center;
        background: none;
        border: 0;
        cursor: pointer;
        display: flex;
        flex: 0 0 auto;
        font-size: var(--ghct-switch-scale, 1.25rem);
        justify-content: center;
        min-height: 1em;
        padding: 0.25em 0;
        width: 2.25em;

        --ghct-switch-active-color: var(--ghct-success-20, rgba(0 187 0 / 80%));
        --ghct-switch-active-left: calc(100% - 1.5em - 5px);
        --ghct-switch-inactive-color: var(--ghct-danger-20, rgba(240 120 100 / 80%));

        input[type='checkbox'] {
            @include util.visually-hidden;
        }

        .axis {
            background-color: var(--ghct-switch-background, var(--ghct-switch-inactive-color));
            border: 1px solid var(--ghct-switch-border-color, #aaa);
            border-radius: 1.5em;
            font-size: .7em;
            height: calc(1.5em + 10px);
            position: relative;
            transition: background-color 200ms ease;
            width: 100%;

            &::before {
                align-items: center;
                background: var(--ghct-switch-handle-color, #eee);
                border-radius: 50%;
                box-shadow: var(--ghct-switch-handle-shadow, 1px) 2px 5px 1px var(--ghct-switch-handle-shadow-color, rgba(0 0 0 / 40%));
                content: var(--ghct-switch-content, '×');
                color: #333;;
                display: flex;
                font-family: sans-serif;
                justify-content: center;
                position: absolute;
                height: 1.5em;
                left: var(--ghct-switch-left, 5px);
                top: calc(50% - 0.75em);
                text-shadow: 0 0 2px var(--ghct-switch-background, var(--ghct-switch-inactive-color));
                transition: left 200ms ease, background 200ms ease, content 200ms ease;
                width: 1.5em;
            }
        }

        &.checked {
            --ghct-switch-background: var(--ghct-switch-active-color);
            --ghct-switch-left: var(--ghct-switch-active-left);
            --ghct-switch-handle-shadow: -1px;
            --ghct-switch-content: '✔';
        }

        &.disabled,
        &:disabled {
            --ghct-switch-handle-color: #aaa;
            --ghct-switch-handle-shadow-color: transparent;
            --ghct-switch-active-color: var(--ghct-success-5, rgba(0 187 0 / 5%));
            --ghct-switch-inactive-color: var(--ghct-danger-5, rgba(240 120 100 / 5%));
        }
    }
</style>
