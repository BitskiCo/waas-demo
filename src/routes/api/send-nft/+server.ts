import { BITSKI_AUTH_SERVER, BITSKI_CLIENT_ID } from '$lib/constants';
import { clientCredentialsGrantRequest } from '@panva/oauth4webapi';
import type { RequestHandler } from './$types';
import { v4 as uuid } from 'uuid';

export const POST: RequestHandler = async ({ request, platform }) => {
  const { account } = await request.json();

  const { BITSKI_CLIENT_SECRET } = platform?.env ?? {};

  return fetch('https://api.bitski.com/v1/apps/f79ed63c-fec2-41c0-8c92-041d57f2152f/tokens', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${BITSKI_CLIENT_ID}:${BITSKI_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/json',
      'User-Agent': 'waas-demo/0.0.1',
      'x-client-id': BITSKI_CLIENT_ID,
    },
    body: JSON.stringify({
      initialOwner: account,
      token: {
        contractId: '78410954-881c-46e8-8842-89379aa38318',
        state: 'AVAILABLE',
        tokenId: uuid(),
        tokenTemplateId: '066ff329-6423-4818-9428-3810dc2cfbf0',
      },
    }),
  });
};
