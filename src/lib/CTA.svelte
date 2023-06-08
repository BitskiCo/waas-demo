<script lang="ts">
  import logo from '$lib/images/shadow-logo.png';
  import bitski from '$lib/images/bitski.svg';

  export let heading: string;
  export let description: string;
  export let cta: string | undefined = undefined;
  export let showBitskiLogo = false;
</script>

<div class="flex flex-col text-center">
  <div class="flex justify-center items-center m-4">
    <img src={logo} alt="" />
    {#if showBitskiLogo}
      <span class="text-grey ml-3">x</span>
      <img src={bitski} alt="" />
    {/if}
  </div>

  <h1 class="heading-3">{heading}</h1>
  <p class="text-grey text-center">{description}</p>

  {#if cta}
    <div class="flex justify-center m-4">
      <button on:click class="btn btn-primary">{cta}</button>
    </div>
  {/if}
</div>
