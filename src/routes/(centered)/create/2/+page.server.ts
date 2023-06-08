import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { clientCredentialsGrantRequest } from '@panva/oauth4webapi';
import { USER_COOKIE } from '../../../api/user/+server';
import { dev } from '$app/environment';
import { BITSKI_AUTH_SERVER } from '$lib/constants';

export const actions: Actions = {
  default: async ({ fetch, platform, cookies }) => {
    const userResp = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const { username, userId } = await userResp.json();

    const { BITSKI_CLIENT_ID, BITSKI_CLIENT_SECRET } = platform.env;

    const params = new URLSearchParams();
    params.set('scope', 'apps'); // required to mint tokens

    const credentialResp = await clientCredentialsGrantRequest(
      BITSKI_AUTH_SERVER,
      {
        client_id: BITSKI_CLIENT_ID,
        client_secret: BITSKI_CLIENT_SECRET,
      },
      params,
    );

    const { access_token } = await credentialResp.json();

    const accountResp = await fetch('https://account.bitski.com/v2/federated-accounts', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${access_token}`,
        'User-Agent': 'waas-demo/0.0.1',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const { account } = await accountResp.json();

    cookies.set(USER_COOKIE, JSON.stringify({ username, userId, account }), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 30,
    });

    throw redirect(302, `/app`);
  },
};
