import { CODE_CHALLENGE, REDIRECT_URI, AUTH_DOMAIN } from '$lib/authClient';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AUTH0_CLIENT_ID } from '$lib/constants';

export const load: PageServerLoad = async ({ url, fetch, platform }) => {
  const code = url.searchParams.get('code') ?? '';
  const { AUTH0_CLIENT_SECRET } = platform?.env ?? {};

  const bearerTokenCredentials = `${AUTH0_CLIENT_ID}:${AUTH0_CLIENT_SECRET}`;
  const base64BearerTokenCredentials = btoa(bearerTokenCredentials);

  const resp = await fetch(`${AUTH_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64BearerTokenCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: AUTH0_CLIENT_ID,
      code_verifier: CODE_CHALLENGE,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const json = await resp.json();

  if (json.error) {
    throw new Error(JSON.stringify(json));
  }

  const { id_token } = json;

  // this is just a demo, but you should validate the JWT
  const userJson = JSON.parse(atob(id_token.replace(/_/g, '/').replace(/-/g, '+').split('.')[1]));

  await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({ username: userJson.nickname || userJson.email, userId: userJson.sub }),
    headers: {
      'content-type': 'application/json',
    },
  });

  throw redirect(302, `/create/2`);
};
