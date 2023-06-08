<script lang="ts">
  import './styles.css';
  import logo from '$lib/images/shadow-logo.png';

  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<!-- app header -->
<nav class="bg-white fixed top-0 left-0 w-full h-14 flex items-center justify-center z-10">
  <img src={logo} style="height: 40px" alt="" />
  <span class="text-black ml-1">@{data.username}</span>
</nav>

<main class="container mx-auto py-20 px-8">
  <div class="text-center mb-4">
    Current address: <a href="https://polygonscan.com/address/{data.account}">{data.account}</a>
  </div>

  <slot />
</main>

<nav
  class="h-12 flex flex-fill justify-center items-center p-4 bg-white dark:bg-obsidian fixed left-0 bottom-0 w-full border-t border-solid border-grey-aux  shadow z-20"
>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="" class="flex items-center px-4 md:px-6">
    <i class="heading-3 icon-only icon-box-chonk-filled text-pink mr-1" />
    <span class="hidden md:block">NFTs</span>
  </a>

  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="" class="flex items-center px-4 md:px-6">
    <i class="heading-3 icon-only icon-wallet-chonk text-grey mr-1" />
    <span class="hidden md:block">Tokens</span>
  </a>
</nav>
