<script lang="ts">
  import './styles.css';
  import logo from '$lib/images/shadow-logo.png';
  import Explainer from '$lib/Explainer.svelte';
  import Location from '$lib/Location.svelte';

  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { BitskiProvider, createBitskiProvider } from 'bitski-provider';
  import { BITSKI_APP_ID } from '$lib/constants';
  import { EthMethod } from 'eth-provider-types';
  import { Interface } from '@ethersproject/abi';

  export let data: PageData;

  let signTypedDataV4Result = data.result;
  let signResult = data.result;
  let send1155Result = data.result;
  let claim1155Result = '';

  let balances: any;
  let provider: BitskiProvider;
  let recipient = '';

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

    provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: '0x89' }],
    });

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

  export const send1155Token = async (contractAddress: string, tokenId: string): Promise<void> => {
    const erc1155TxnData = create1155TransactionData(data.account, recipient, 1, tokenId);

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

  const signMessage = async () => {
    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [
        {
          chainId: '0x13881',
        },
      ],
    });

    try {
      const from = data.account;
      const signature = await provider.request({
        method: EthMethod.eth_sign,
        params: [
          from,
          '0x57656c636f6d6520746f204f70656e536561210a0a436c69636b20746f207369676e20696e20616e642061636365707420746865204f70656e536561205465726d73206f6620536572766963653a2068747470733a2f2f6f70656e7365612e696f2f746f730a0a5468697320726571756573742077696c6c206e6f742074726967676572206120626c6f636b636861696e207472616e73616374696f6e206f7220636f737420616e792067617320666565732e0a0a596f75722061757468656e7469636174696f6e207374617475732077696c6c20726573657420616674657220323420686f7572732e0a0a57616c6c657420616464726573733a0a3078376363376333393866636162666163643230366137336136333439346139636435306532363639370a0a4e6f6e63653a0a64656630313032642d343561652d346335622d626162652d343564663064333932646436',
        ],
      });
      signResult = signature;
    } catch (err) {
      console.error(err);
      signResult = `Error: ${(err as Error).message}`;
    }
  };

  const signTypedDataV4 = async () => {
    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [
        {
          chainId: '0x13881',
        },
      ],
    });

    const msgParams = {
      domain: {
        chainId: 80001,
        name: 'Ether Mail',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1',
      },
      message: {
        contents: 'Hello, Bob!',
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          ],
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000',
            ],
          },
        ],
      },
      primaryType: 'Mail',
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    };

    try {
      const from = data.account;
      const sign = await provider.request({
        method: EthMethod.eth_signTypedData_v4,
        params: [from, JSON.stringify(msgParams)],
      });
      signTypedDataV4Result = sign;
    } catch (err) {
      console.error(err);
      signTypedDataV4Result = `Error: ${(err as Error).message}`;
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

  <div class="mb-4">
    <button
      class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      on:click={signMessage}
    >
      Sign
    </button>

    <div>
      Result: {signResult}
    </div>
  </div>

  <div class="mb-4">
    <button
      class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      on:click={signTypedDataV4}
    >
      Sign Typed Data
    </button>

    <div>
      Result: {signTypedDataV4Result}
    </div>
  </div>

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
        <form
          on:submit|preventDefault={() => send1155Token(token.contractAddress, token.id)}
          class="mb-4"
        >
          <label for="recipient" class="font-bold uppercase">Recipient</label>
          <input id="recipient" class="mb-2" bind:value={recipient} placeholder="0x" />
          <button
            class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Send NFT
          </button>

          <div>
            Send Token Result: {send1155Result}
          </div>
        </form>
      </li>
    {/each}
  </ul>

  <Explainer
    text="Users can now easily interact with your product's experiences e.g. viewing NFTs, tokens, and activity. If users want to self custody their wallet to use on external products, they'll need to claim their wallet on Bitski (view claim flow)"
  />
</main>
