<script lang="ts">
  import NavLink from './NavLink.svelte';
  import auth0 from '$lib/images/twitter.svg';
</script>

<nav class="flex items-center justify-between border-b border-solid border-grey-aux pb-4 mb-6">
  <div class="hidden md:flex">
    <NavLink active className="btn btn-text">
      <i class="icon-box-chonk" />
      NFTs
    </NavLink>

    <NavLink className="btn btn-text">
      <i class="icon-wallet" />
      Tokens
    </NavLink>
  </div>

  <div class="flex md:w-auto w-full">
    <!-- TODO: Auth0 account switcher -->
    <div type="button" class="flex-1 md:flex-auto min-w-min btn btn-sm btn-grey pl-1 pr-1 mr-2">
      <button class="body-bold flex flex-row items-center">
        <img src={auth0} alt="" class="mr-2" />
        Auth0
        <i class="text-grey icon-chevron-down" />
      </button>
    </div>
    <button type="button" class="flex-1 md:flex-auto min-w-min btn btn-sm btn-pink">Send</button>
    <button type="button" class="flex-1 md:flex-auto min-w-min btn btn-sm btn-blue mx-2">
      Receive
    </button>
    <button type="button" class="flex-1 md:flex-auto min-w-min btn btn-sm btn-green">Buy</button>
  </div>
</nav>

<nav
  class="md:hidden flex flex-fill justify-around items-center p-4 bg-white dark:bg-obsidian fixed left-0 bottom-0 w-full border-t border-solid border-grey-aux pb-6 shadow z-20"
>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="" class="flex flex-column">
    <i class="heading-3 icon-only icon-box-chonk-filled text-pink" />
  </a>

  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="" class="flex flex-column">
    <i class="heading-3 icon-only icon-wallet-chonk text-grey" />
  </a>

  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="" class="flex flex-column">
    <i class="heading-3 icon-only icon-clock-chonk text-grey" />
  </a>
</nav>
