<script lang="ts">
  import CTA from '$lib/CTA.svelte';
  import Explainer from '$lib/Explainer.svelte';
  import Location from '$lib/Location.svelte';
</script>

<Location text="WaaS Host App (Demo)" class="top-4" />

<form method="POST">
  <CTA
    heading="Great! Just one more step"
    description="Now that you're signed in, you need to generate a&nbsp;wallet"
    cta="Create your wallet"
  />
</form>

<Explainer
  text="Once your user has logged into your platform, they'll create their wallet with one click. Users don't need to worry about the hassle of seed phrase management, as their account will be connected to their existing customer credentials."
/>
