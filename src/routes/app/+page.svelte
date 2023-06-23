<script lang="ts">
  import './styles.css';
  import logo from '$lib/images/shadow-logo.png';
  import Explainer from '$lib/Explainer.svelte';
  import Location from '$lib/Location.svelte';

  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { createBitskiProvider } from 'bitski-provider';
  import { BITSKI_APP_ID } from '$lib/constants';
  import { EthMethod } from 'eth-provider-types';
  import { Interface } from '@ethersproject/abi';

  export let data: PageData;

  let balances: any;
  let provider: any;

  onMount(() => {
    provider = createBitskiProvider({
      appId: BITSKI_APP_ID,
      signerBaseUrl: 'https://sign-next.bitski.com',
      apiBaseUrl: 'http://127.0.0.1:5173/api',
      transactionCallbackUrl: window.location.origin + '/app',
      waas: {
        userId: data.userId,
      },
    });

    pollForNfts();

    if (data.result) {
      const { result } = JSON.parse(atob(data.result));

      provider.request({
        method: EthMethod.eth_sendRawTransaction,
        params: [result],
      });
    }
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

  const iface1155 = new Interface([
    {
      name: 'safeTransferFrom',
      inputs: [
        {
          name: 'from',
          type: 'address',
        },
        {
          name: 'to',
          type: 'address',
        },
        {
          name: 'id',
          type: 'uint256',
        },
        {
          name: 'amount',
          type: 'uint256',
        },
        {
          name: 'data',
          type: 'bytes',
        },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]);

  function create1155TransactionData(
    address: string,
    recipient: string,
    quantity: number,
    tokenId: string,
  ) {
    return iface1155.encodeFunctionData('safeTransferFrom', [
      address,
      recipient,
      tokenId,
      quantity,
      '0x',
    ]);
  }

  export const burnToken = async (contractAddress: string, tokenId: string): Promise<void> => {
    const provider = createBitskiProvider({
      appId: BITSKI_APP_ID,
      signerBaseUrl: 'https://sign-next.bitski.com',
      apiBaseUrl: 'http://127.0.0.1:5173/api',
      transactionCallbackUrl: window.location.origin + '/app',
      waas: {
        userId: data.userId,
      },
    });

    const erc1155TxnData = create1155TransactionData(
      data.account,
      '0x0000000000000000000000000000000000000000',
      1,
      tokenId,
    );

    const transaction = {
      from: data.account,
      to: contractAddress,
      data: erc1155TxnData,
      type: 2,
    };

    provider.request({
      method: EthMethod.eth_sendTransaction,
      params: [transaction],
    });
  };

  const pollForNfts = async () => {
    const response = await fetch(
      `https://api.bitski.com/v2/balances?address=${data.account}&chainIds=137&nfts=true`,
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

  <ul>
    {#each balances || [] as token}
      <li class="pb-4">
        {token.id}
        {token.contractAddress}
        <!-- {JSON.stringify(token)} -->
        <button
          class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          on:click={() => burnToken(token.contractAddress, token.id)}
        >
          Burn Token
        </button>
      </li>
    {/each}
  </ul>

  <Explainer
    text="Users can now easily interact with your product's experiences e.g. viewing NFTs, tokens, and activity. If users want to self custody their wallet to use on external products, they'll need to claim their wallet on Bitski (view claim flow)"
  />
</main>
