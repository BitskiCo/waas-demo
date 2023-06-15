<script lang="ts">
  import './styles.css';
  import logo from '$lib/images/shadow-logo.png';
  import Explainer from '$lib/Explainer.svelte';
  import Location from '$lib/Location.svelte';

  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  export let data: PageData;

  let balances: any;

  onMount(() => {
    pollForNfts();
  });

  const claimNFT = async () => {
    const response = await fetch('/api/send-nft', {
      method: 'POST',
      body: JSON.stringify({
        account: data.account,
      }),
    });

    if (response.ok) {
      pollForNfts();
    }
  };

  const pollForNfts = async () => {
    const response = await fetch(
      `https://api.bitski.com/v2/balances?address=${data.account}&chainIds=80001&nfts=true`,
    );
    ({ balances } = await response.json());

    if (!balances || balances.length === 0) {
      setTimeout(pollForNfts, 1000);
    }
  };
</script>

<!-- app header -->
<nav class="bg-white shadow fixed top-0 left-0 w-full h-14 flex items-center justify-center z-10">
  <img src={logo} style="height: 40px" alt="" />
  <span class="text-black ml-1">@{data.username}</span>
</nav>

<main class="container mx-auto py-20 px-8">
  <div class="text-center mb-4">
    Current address: <a href="https://polygonscan.com/address/{data.account}">{data.account}</a>
  </div>

  <Location text="WaaS Host App (Demo)" class="top-2" />

  <button
    class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
    on:click={claimNFT}
  >
    Claim NFT
  </button>

  {balances}

  <Explainer
    text="Users can now easily interact with your product's experiences e.g. viewing NFTs, tokens, and activity. If users want to self custody their wallet to use on external products, they'll need to claim their wallet on Bitski (view claim flow)"
  />
</main>
