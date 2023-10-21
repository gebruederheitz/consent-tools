<script lang="ts">
    import type { ConsentToolsSettings } from '../../../../util/settings/types';
    import type { ConsentToolsProviderEmitter } from '../events';

    import { setContext } from 'svelte';

    import { ServiceStore } from '../store/services';
    import { ModalLayer, modalStore } from '../store/modal';
    import { ContextKey } from '../context/contexts';
    import { debug as d } from '../../../../util/debuggable';

    import Button from './component/button.svelte';
    import Modal from './component/modal.svelte';
    import ServicesLayer from './component/services-layer.svelte';

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

    export let provider: ConsentToolsProviderEmitter;
    export let settings: ConsentToolsSettings;
    export let store: ServiceStore;
    // export let layers: { id: ModalLayer; title: string, canSave?: boolean }[] = [];

    let modalVisible = false;
    let layerComponent;
    let currentLayerId: ModalLayer | null = null;
    let closable = false;
    let explicitShowFullModal: boolean = false;

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
        debug.log('state', state);
    });

    // $: debug.log(closable, explicitShowFullModal, {provider, settings, store, layers});
</script>

{#if closable || explicitShowFullModal}
    <Modal visible={modalVisible} on:close={onClose} {closable}>
        <ServicesLayer />
        <svelte:fragment slot="actions">
            <Button on:click={onSave}>Save</Button>
        </svelte:fragment>
    </Modal>
{:else}
    <Modal banner noBackdrop visible={modalVisible} on:close={onClose} {closable}>
        <div>
            <p>
                This site uses third-party services and/or cookies to provide essential features.
            </p>
            <p>
                More detail on our
                <a href="#">privacy policy page</a>
                and in the
                <Button text on:click={() => {explicitShowFullModal = true}}>cookie settings</Button>.
            </p>
        </div>
        <svelte:fragment slot="actions">
            <Button on:click={onSave}>Understood</Button>
        </svelte:fragment>
    </Modal>
{/if}

<style>
    p {
        padding: 0;
        margin: 0;
    }
</style>
