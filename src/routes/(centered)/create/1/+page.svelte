<script lang="ts">
  import CTA from '$lib/CTA.svelte';
  import Explainer from '$lib/Explainer.svelte';
  import Location from '$lib/Location.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Location text="WaaS Host App (Demo)" class="top-4" />

<CTA
  heading="Create a wallet"
  description="To create a wallet you need to sign into your&nbsp;account"
  cta="Sign in with Auth0"
  on:click={() => (window.location.href = data?.authUrl)}
/>

<Explainer
  text="Users can seamlessly start using your app by creating a wallet that is connected with their existing account on your platform. In this example, we’ll use Auth0 for authentication and wallet creation."
/>
