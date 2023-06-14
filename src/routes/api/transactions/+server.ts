import { BITSKI_AUTH_SERVER, BITSKI_CLIENT_ID } from '$lib/constants';
import { clientCredentialsGrantRequest } from '@panva/oauth4webapi';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  const { BITSKI_CLIENT_SECRET } = platform?.env ?? {};

  const credentialResp = await clientCredentialsGrantRequest(
    BITSKI_AUTH_SERVER,
    {
      client_id: BITSKI_CLIENT_ID,
      client_secret: BITSKI_CLIENT_SECRET,
    },
    new URLSearchParams(),
  );

  const { access_token } = await credentialResp.json();

  const body = await request.text();

  return fetch('https://api.bitski.com/v1/transactions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'waas-demo/0.0.1',
      'x-client-id': BITSKI_CLIENT_ID,
    },
    body,
  });
};
