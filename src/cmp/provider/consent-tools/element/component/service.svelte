<script lang="ts">
    import type { DisplayedService } from '../../store/services';

    import { getContext } from 'svelte';

    import { Tier } from '../../../../../util/settings/types';
    import {
        ServiceStore,
        SortMode,
    } from '../../store/services';
    import { ConsentSettings } from '../../../../../util/settings/consent-settings';
    import { ContextKey } from '../../context/contexts';
    import { debug as d } from '../../../../../util/debuggable';

    import ToggleSwitch from './toggle-switch-alt.svelte';
    import WithTierColor from './with-tier-color.svelte';

    const serviceStore: ServiceStore = getContext(ContextKey.SERVICES);
    const settings: ConsentSettings = getContext(ContextKey.SETTINGS);
    const debug = d.spawn('ServiceComponent');

    function getPrivacyPolicyUrl(serviceId: string): string | null {
        debug.log(settings.getPrivacyPolicySection(false));
        return settings.getPrivacyPolicySection(false).has(serviceId)
            ? (settings.privacyPolicyUrlWithSection.get(serviceId) as string)
            : null;
    }

    function onServiceChanged(serviceId: string, status: boolean): void {
        debug.log('service changed', serviceId, status);
        serviceStore.changeService(serviceId, status);
    }

    export let service: DisplayedService;
    export let sortMode: SortMode;

    let privacyPolicyUrl: string | null;

    $: privacyPolicyUrl = getPrivacyPolicyUrl(service.id);
</script>

<li class="ghct-service">
    <div class="ghct-service__text">
        <h4 class="ghct-service__name">
            {service.name}
        </h4>
        {#if sortMode !== SortMode.CATEGORY && service.categoryLabel}
            <div class="ghct-pill">
                <span
                    class="ghct-service__category"
                    style={`background-color: ${service.categoryColor || ''};`}
                >
                    {service.categoryLabel}
                </span>
            </div>
        {/if}
        {#if sortMode !== SortMode.TIER}
            <WithTierColor className="ghct-pill" tier={service.tier}>
                <span
                    class="ghct-service__tier"
                >
                    {Tier.toString(service.tier)}
                </span>
            </WithTierColor>
        {/if}
        <div class="ghct-service__description">
            {#if service.description.length}
                {service.description}
            {/if}
        </div>
        {#if privacyPolicyUrl !== null}
            <a class="ghct-service__privacy-link" href={privacyPolicyUrl}>
                More information about this service on the privacy policy page
                &gt;
            </a>
        {/if}
    </div>
    <ToggleSwitch
        name={service.id}
        checked={service.tier === Tier.ESSENTIAL || service.hasConsent}
        disabled={service.tier === Tier.ESSENTIAL}
        size="1.5rem"
        on:change={({ detail: checked }) => {
            onServiceChanged(service.id, checked);
        }}
    />
</li>

<style lang="scss">
    :global .ghct-pill {
        margin-bottom: 0.5em;
        font-weight: 700;
        color: #fff;
        border-radius: 1em;
        background-color: #555;
        align-self: flex-start;
        font-size: 0.825em;
        text-transform: uppercase;
        line-height: 1;
        display: inline-flex;
        overflow: hidden;
        justify-content: stretch;
        align-items: stretch;

        span {
            padding: 2px 9px;
        }
    }

    .ghct-service {
        display: flex;
        flex-flow: row nowrap;
        padding: 1rem 0;

        &:not(:last-child) {
            border-bottom: 1px solid #ddd;
        }

        &__text {
            flex: 1 1 300px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            padding-right: 2em;
        }

        &__name,
        h4 {
            font-family: sans-serif;
            font-size: 1em;
            font-weight: 700;
            margin-bottom: 0.5rem;
            margin-top: 0;
        }

        &__category,
        &__tier {
            display: block;
            //margin-bottom: 0.5em;
            //font-weight: 700;
            //color: #fff;
            //padding: 2px 9px;
            //border-radius: 1em;
            //background-color: #555;
            //align-self: flex-start;
            //font-size: 0.825em;
            //text-transform: uppercase;
            //line-height: 1;
        }

        &__tier {
            background-color: var(--tier-color);
        }

        &__description {
            //word-wrap: anywhere;
            //word-break: break-all;
            max-width: 80ch;
        }

        &__privacy-link {
            margin-top: 0.5em;
        }
    }
</style>
