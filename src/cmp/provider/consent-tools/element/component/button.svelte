<script lang="ts">
    export let secondary: boolean = false;
    export let tertiary: boolean = false;
    export let active: boolean = false;
    export let radio: boolean = false;
    export let text: boolean = false;
</script>

<button
    class="button"
    type="button"
    role="{radio ? 'radio' : null}"
    class:button--secondary={secondary}
    class:button--tertiary={tertiary}
    class:button--active={active}
    class:button--text-link={text}
    on:click
>
    <slot />
</button>

<style lang="scss">
    @use 'scss/lib/button-var' as button;

    button.button {
        @include button.styles;

        &--active {
            &:not(.button--secondary, .button--tertiary) {
                background-color: var(--ghct-primary-20);
            }

            &.button--secondary {
                background-color: var(--ghct-secondary-20);
            }

            &.button--tertiary {
                background-color: var(--ghct-tertiary-20);
            }
        }

        &[role="radio"] {
            margin-left: 0;
            margin-right: 0;
            padding: .5em 1em;

            &:not(:last-child) {
                border-bottom-right-radius: 0;
                border-top-right-radius: 0;
                border-right-color: #fff;
            }

            &:not(:first-child) {
                border-bottom-left-radius: 0;
                border-top-left-radius: 0;
            }
        }
    }
</style>
