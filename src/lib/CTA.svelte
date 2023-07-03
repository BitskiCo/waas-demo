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

  <h1 class="text-xl font-bold">{heading}</h1>
  <p class="text-stone-700 text-center">{description}</p>

  {#if cta}
    <div class="flex justify-center m-4">
      <button
        on:click
        class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
        >{cta}</button
      >
    </div>
  {/if}
</div>
