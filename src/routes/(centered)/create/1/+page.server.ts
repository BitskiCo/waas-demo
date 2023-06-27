import { REDIRECT_URI, SCOPES, STATE, AUTH_DOMAIN } from '$lib/authClient';
import { AUTH0_CLIENT_ID } from '$lib/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const scopes = SCOPES.join('%20');
  const authUrl = `${AUTH_DOMAIN}/authorize?response_type=code&client_id=${AUTH0_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&state=${STATE}`;

  return {
    authUrl,
  };
};
