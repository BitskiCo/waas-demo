# WaaS Demo

Live example of the Bitski Wallet as a Service [account creation flow]. This
example uses [Auth0], but any [OIDC] provider will work.

[account creation flow]: https://docs.bitski.com/wallet-as-a-service/wallet-creation-apis/hosted-hardware-wallets
[Auth0]: https://auth0.com
[OIDC]: https://openid.net/

## Running Locally

start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Deployment

This example is running as a Cloudflare worker. See the [build and deploy] docs
for more examples.

[build and deploy]: https://kit.svelte.dev/docs/building-your-app
[Cloudflare worker]: https://workers.cloudflare.com
