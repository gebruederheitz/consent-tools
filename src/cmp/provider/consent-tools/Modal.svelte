<script lang="ts">
    import type { ConsentToolsSettings } from '../../../util/settings/types';

    import { setContext } from 'svelte';

    import { ServiceStore } from './store/services';
    import { ModalLayer, modalStore } from './store/modal';
    import { ContextKey } from './context/contexts';
    import { debug as d } from '../../../util/debuggable';

    import Button from './component/button.svelte';
    import InitialLayer from './component/initial-layer.svelte';
    import Modal from './component/modal.svelte';
    import ServicesLayer from './component/services-layer.svelte';
    import type { ConsentToolsProviderEmitter } from './events';

    const debug = d.spawn('ModalComponent');

    function onClose() {
        modalVisible = false;
    }

    function onSave() {
        if (!closable) {
            store.setModalSeen();
        }
        onClose();
    }

    function onSelectLayer(id: string): void {
        modalStore.setLayer(id);
    }

    function setLayerComponent(layerId) {
        switch (layerId) {
            case ModalLayer.SERVICES:
                layerComponent = ServicesLayer;
                break;
            case ModalLayer.INITIAL:
            default:
                layerComponent = InitialLayer;
        }
    }

    export let provider: ConsentToolsProviderEmitter;
    export let settings: ConsentToolsSettings;
    export let store: ServiceStore;
    export let layers: { id: ModalLayer; title: string, canSave?: boolean }[] = [
        { id: ModalLayer.INITIAL, title: 'Overview' },
        { id: ModalLayer.SERVICES, title: 'Services & Cookies' },
    ];

    let modalVisible = false;
    let layerComponent;
    let currentLayerId: ModalLayer | null = null;
    let closable = false;

    setContext(ContextKey.SETTINGS, settings);
    setContext(ContextKey.SERVICES, store);
    setContext(ContextKey.EVENTS, provider);

    provider?.on('show-modal', () => {
        modalVisible = true;
    });
    provider?.on('hide-modal', () => {
        modalVisible = false;
    });

    store?.subscribe((state) => {
        closable = state.modalSeen;
        debug.log(state);
        if (!currentLayerId) {
            const layer = state.modalSeen ? ModalLayer.SERVICES : ModalLayer.INITIAL;
            modalStore.setLayer(layer);
        }
    });

    modalStore.subscribe((state) => {
        currentLayerId = state.currentLayer;
    });

    $: setLayerComponent(currentLayerId);
</script>

<Modal visible={modalVisible} on:close={onClose} {closable}>
    <ul class="tabs" role="tablist">
        {#each layers as { id, title }}
            <li class="tab">
                <button
                    class="tab__button"
                    type="button"
                    class:is-active={id === currentLayerId}
                    role="tab"
                    on:click={() => onSelectLayer(id)}
                >
                    {title}
                </button>
            </li>
        {/each}
    </ul>
    <svelte:component this={layerComponent} />
    <svelte:fragment slot="actions">
        {#if closable}
            <Button on:click={onClose}>Done</Button>
        {/if}
    </svelte:fragment>
</Modal>

<style lang="scss">
    .tabs {
        display: flex;
        list-style-type: none;
        margin: -2rem -1rem 1em -1rem;
        padding: 0;
        width: 100%;

        .tab {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: stretch;

            &__button {
                align-items: center;
                background-color: var(--ghct-secondary-10);
                border: 2px solid var(--ghct-secondary-50);
                border-top: none;
                cursor: pointer;
                display: flex;
                flex: 1;
                justify-content: center;
                padding: .75em 1em .5em 1em;
                transition: background-color 200ms ease;

                &:hover {
                    background-color: var(--ghct-secondary-5);
                }

                &.is-active {
                    background-color: transparent;
                    border-bottom: none;
                    color: var(--ghct-tertiary-50);
                    font-weight: 700;

                    &:first-child {
                        border-left: none;
                    }

                    &:last-child {
                        border-right: none;
                    }
                }

                &:not(:last-child) {
                    border-right-width: 0;
                }
            }
        }
    }
</style>
