<script lang="ts">
    import { Tier } from '../../../../util/settings/types';

    import TierC from './tier.svelte';
    import Layer from './layer.svelte';
</script>

<Layer>
    <h1>Choose your preference</h1>
    <p>
        Consent managed by GenericLocalStorageProvider. Your preferences will only be saved to your browser session.
        Only those third-party services will be loaded that you give explicit consent to during this browsing session.
    </p>
    <TierC name="Only what's absolutely necessary!" tier="{Tier.ESSENTIAL}" />
    <TierC name="Anonymous data for statistics & comfortable page use" tier="{Tier.MODERATE}" />
    <TierC name="Do what you like." tier="{Tier.FULL}" />
</Layer>
