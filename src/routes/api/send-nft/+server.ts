import { BITSKI_AUTH_SERVER, BITSKI_MINTING_CLIENT_ID } from '$lib/constants';
import { clientCredentialsGrantRequest } from '@panva/oauth4webapi';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  const { account } = await request.json();

  const { BITSKI_MINTING_CLIENT_SECRET } = platform?.env ?? {};

  const credentialResp = await clientCredentialsGrantRequest(
    BITSKI_AUTH_SERVER,
    {
      client_id: BITSKI_MINTING_CLIENT_ID,
      client_secret: BITSKI_MINTING_CLIENT_SECRET,
    },
    new URLSearchParams(),
  );

  const { access_token } = await credentialResp.json();

  return fetch(
    'https://api.bitski.com/v1/apps/f79ed63c-fec2-41c0-8c92-041d57f2152f/token-templates/066ff329-6423-4818-9428-3810dc2cfbf0/tokens',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'waas-demo/0.0.1',
        'x-client-id': BITSKI_MINTING_CLIENT_ID,
      },
      body: JSON.stringify({
        initialOwner: account,
        count: 1,
      }),
    },
  );
};
