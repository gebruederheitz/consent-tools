<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let visible = false;
    export let closable = false;

    function onClose(): void {
        dispatch('close');
    }

    function onKeydown(e: KeyboardEvent): void {
        if (!closable) return;
        if (e.key === 'Escape') {
            onClose();
        }
    }

    function setBodyOverflow(isVisible: boolean): void {
        if (isVisible) {
            document.body.classList.add('modal-active');
        } else {
            document.body.classList.remove('modal-active');
        }
    }

    $: setBodyOverflow(visible);
</script>

<svelte:window on:keydown={onKeydown} />
<div class="ghct-modal ghct-modal--with-backdrop" class:ghct-hide={!visible}>
    {#if closable}
        <button class="ghct-modal__close" on:click={onClose} type="button" />
    {/if}
    <div class="ghct-modal__content">
        <slot />
        <div class="ghct-modal__actions">
            <slot name="actions" />
        </div>
    </div>
</div>
