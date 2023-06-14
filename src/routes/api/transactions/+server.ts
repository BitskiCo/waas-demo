import { BITSKI_CLIENT_ID } from '$lib/constants';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  const { BITSKI_CLIENT_SECRET } = platform?.env ?? {};

  const body = await request.text();

  return fetch('https://api.bitski.com/v1/transactions', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${BITSKI_CLIENT_ID}:${BITSKI_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/json',
      'User-Agent': 'waas-demo/0.0.1',
      'x-client-id': BITSKI_CLIENT_ID,
    },
    body,
  });
};
