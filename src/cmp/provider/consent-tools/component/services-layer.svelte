<script lang="ts">
    import type { SortedServiceGroup } from '../store/services';

    import { getContext } from 'svelte';

    import { ServiceStore, SortMode, SortModes } from '../store/services';
    import { ContextKey } from '../context/contexts';
    import { debug as d } from '../../../../util/debuggable';

    import Button from './button.svelte';
    import Layer from './layer.svelte';
    import Service from './service.svelte';
    import WithTierColor from './with-tier-color.svelte';

    const serviceStore: ServiceStore = getContext(ContextKey.SERVICES);
    const debug = d.spawn('ServicesLayerComponent');

    function resetFilter(): void {
        serviceStore.resetFilter();
    }

    let serviceGroupsShown: SortedServiceGroup[] = [];
    let sortMode = SortMode.TIER;
    let isFiltered = false;

    serviceStore.subscribe((state) => {
        isFiltered = state.filter !== null;
        serviceGroupsShown = serviceStore.getSortedServices(state);
        debug.log('update', isFiltered, serviceGroupsShown);
        sortMode = state.sortMode;
    });
</script>

<Layer>
    <div class="radio-buttons" role="radiogroup">
        {#if isFiltered}
            <Button radio tertiary on:click={resetFilter}>
                (+) Show everything
            </Button>
        {:else}
            {#each SortModes as { mode, label, action }}
                <Button
                    radio
                    tertiary
                    active={sortMode === mode}
                    on:click={action(serviceStore)}
                >
                    {label}
                </Button>
            {/each}
        {/if}
    </div>
    <ul class="groups">
        {#each serviceGroupsShown as { caption, services, tier = null }}
            <li>
                <WithTierColor {tier}>
                    {#if caption !== null}
                        <h3>{caption}</h3>
                    {/if}
                    <ul
                        class="services"
                        class:is-tier={tier !== null}
                        class:is-group={sortMode === SortMode.CATEGORY}
                    >
                        {#each services as service}
                            <Service {service} {sortMode} />
                        {/each}
                    </ul>
                </WithTierColor>
            </li>
        {:else}
            <span>No matching services found.</span>
        {/each}
    </ul>
</Layer>

<style lang="scss">
    .radio-buttons {
        display: flex;
        justify-content: center;
        margin-bottom: 1em;
    }

    h3 {
        color: var(--tier-color, var(--ghct-primary-50));
        margin-bottom: 0.25em;
        margin-top: 2em;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        &.services {
            &.is-tier,
            &.is-group {
                padding: 0.5em 1em;
            }

            &.is-tier {
                border: 3px solid var(--tier-color);
            }

            &.is-group {
                border: 1px solid var(--ghct-primary-10);
            }
        }
    }
</style>
