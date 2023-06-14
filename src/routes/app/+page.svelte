<script lang="ts">
  import './styles.css';
  import logo from '$lib/images/shadow-logo.png';
  import Explainer from '$lib/Explainer.svelte';
  import Location from '$lib/Location.svelte';

  import type { PageData } from './$types';
  import { createBitskiProvider } from 'bitski-provider';
  import { BITSKI_APP_ID } from '$lib/constants';
  import { EthMethod } from 'eth-provider-types';

  export let data: PageData;

  let signTypedDataV4Result = data.result;

  const signTypedDataV4 = async () => {
    const provider = createBitskiProvider({
      appId: BITSKI_APP_ID,
      signerBaseUrl: 'https://sign-next.bitski.com',
      apiBaseUrl: 'http://127.0.0.1:5173/api',
      transactionCallbackUrl: window.location.origin + '/app',
      waas: {
        userId: data.userId,
      },
    });

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
        chainId: '0x13881',
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
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
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

  <button
    class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
    on:click={signTypedDataV4}
  >
    Sign Typed Data
  </button>

  <div>
    Result: {signTypedDataV4Result}
  </div>

  <Explainer
    text="Users can now easily interact with your product's experiences e.g. viewing NFTs, tokens, and activity. If users want to self custody their wallet to use on external products, they'll need to claim their wallet on Bitski (view claim flow)"
  />
</main>
