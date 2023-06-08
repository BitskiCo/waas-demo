<script lang="ts">
  import NFTsGrid from '@bitskico/svelte-components/NFTsGrid.svelte';
  import NFTGridItem from '@bitskico/svelte-components/NFTGridItem.svelte';
  import Explainer from '$lib/Explainer.svelte';
  import Location from '$lib/Location.svelte';
  import { onMount } from 'svelte';
  import { GQL_NFTs } from '$houdini';
  import type { PageData } from './$types';

  export let data: PageData;

  let isCreatingNFT = false;
  let createdNFT = false;
  let nftCreateError = false;

  onMount(async () => {
    createdNFT = !!localStorage.getItem('createdNFT');
    GQL_NFTs.fetch({
      variables: {
        address: data.account,
      },
    });
  });

  const claimNFT = async () => {
    nftCreateError = false;
    isCreatingNFT = true;
    let resp = await fetch('/api/send-nft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: data.account,
      }),
    });

    isCreatingNFT = false;

    if (resp.ok) {
      createdNFT = true;
      localStorage.setItem('createdNFT', 'true');
    } else {
      nftCreateError = true;
    }
  };
</script>

<Location text="WaaS Host App (Demo)" class="top-2" />

{#if ($GQL_NFTs.data?.balances ?? []).length > 0}
  <NFTsGrid>
    {#each $GQL_NFTs.data?.balances ?? [] as balance}
      {#if balance?.token.__typename === 'NFT'}
        <NFTGridItem
          id={balance.token.id ?? ''}
          chainId={balance.token.chainId}
          name={balance?.token.metadata?.name ?? ''}
          image={balance?.token.metadata?.image?.url ?? ''}
          collectionName={balance?.token.collection?.name ?? ''}
        />
      {/if}
    {/each}
  </NFTsGrid>
{:else}
  <div class="flex items-center justify-center">
    <div class="text-center max-w-xs my-20">
      {#if $GQL_NFTs.isFetching}
        <i class="text-6xl icon-spinner" />
      {:else if !createdNFT}
        <p class="mb-4">Looks like you don't have any NFTs yet, click here to get your first!</p>

        {#if nftCreateError}
          <p class="mb-4 text-red">Something went wrong, please try again</p>
        {/if}

        <button disabled={isCreatingNFT} class="btn btn-primary" on:click={claimNFT}>
          {#if isCreatingNFT}
            <i class="icon-loading" />
          {:else}
            Get an NFT
          {/if}
        </button>
      {:else}
        <p class="mb-4">
          Ok, we've created your NFT. It may take a few minutes to appear, try refreshing in 5
          minutes. You can also check for activity on <a
            href="https://polygonscan.com/address/{data.account}">Polygonscan</a
          >
        </p>
      {/if}
    </div>
  </div>
{/if}

<Explainer
  class="!bottom-20"
  text="Users can now easily interact with your product's experiences e.g. viewing NFTs, tokens, and activity. If users want to self custody their wallet to use on external products, they'll need to claim their wallet on Bitski (view claim flow)"
/>
