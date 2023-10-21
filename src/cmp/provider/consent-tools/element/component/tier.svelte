<script lang="ts">
    import { getContext } from 'svelte';

    import { Tier } from '../../../../../util/settings/types';
    import { ModalLayer, modalStore } from '../../store/modal';
    import { ContextKey } from '../../context/contexts';
    import { ServiceStore, SortMode } from '../../store/services';

    import Button from './button.svelte';
    import WithTierColor from './with-tier-color.svelte';
    import type { ConsentToolsProviderEmitter } from '../../events';

    const servicesStore: ServiceStore = getContext(ContextKey.SERVICES);
    const events: ConsentToolsProviderEmitter = getContext(ContextKey.EVENTS);

    function showFilteredServices() {
        modalStore.setLayer(ModalLayer.SERVICES);
        servicesStore.setFilter(SortMode.TIER, tier);
    }

    async function selectTier() {
        servicesStore.selectTier(tier);
        events.emit('hide-modal');
        servicesStore.setModalSeen();
    }

    export let tier: Tier;
    export let name = 'Whatever';
</script>

<WithTierColor {tier}>
    <div class="ghct-tier">
        <h3>{name}</h3>
        <div class="ghct-tier__actions">
            <Button secondary on:click={showFilteredServices}>
                Full list of services
            </Button>
            <button type="button" class="tier-button" on:click={selectTier}> Select &gt; </button>
        </div>
    </div>
</WithTierColor>

<style lang="scss">
    @use '../../../../../../scss/lib/button-var' as button;

    .ghct-tier {
        border: 3px solid var(--tier-color);
        border-left-width: 1em;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        margin: 0.5em;
        overflow: hidden;
        padding: 1em 25% 1em 1em;
        position: relative;

        h3 {
            margin: 0;
        }

        .tier-button {
            background-color: var(--tier-color);
            border: 0;
            bottom: 0;
            color: #fff;
            cursor: pointer;
            font-size: 1.125em;
            font-weight: 700;
            margin: 0;
            padding: 1em 2em;
            position: absolute;
            right: 0;
            transition: opacity 200ms ease, transform 300ms ease-in-out;
            width: 25%;
        }

        &:hover .tier-button {
            opacity: 80%;
            transform: scale(1.05);
        }
    }

    .ghct-tier__actions {
        display: flex;
    }
</style>
