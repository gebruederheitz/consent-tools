<script lang="ts">
    import { debug as d } from '../../../../../util/debuggable';
    import { Tier } from '../../../../../util/settings/types';

    const debug = d.spawn('WithTierColorComponent').disable();
    export let tier: Tier;
    export let className;
    let color: string | null;

    $: {
        debug.log('Setting tier color for', tier, typeof tier);
        switch(tier) {
            case Tier.ESSENTIAL:
                debug.log('its red');
                color = 'var(--ghct-tier-red, #b00)';
                break;
            case Tier.MODERATE:
                debug.log('its amber');
                color = 'var(--ghct-tier-amber, #bb0)';
                break;
            case Tier.FULL:
                debug.log('its green');
                color = 'var(--ghct-tier-green, #0b0)';
                break;
            default:
                debug.log('its nothing, not tier here my dear');
                color = null;
        }
    }
</script>

<div class={className} style="--tier-color: {color};">
    <slot />
</div>
