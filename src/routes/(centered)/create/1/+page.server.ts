import { CLIENT_ID, REDIRECT_URI, SCOPES, STATE, AUTH_DOMAIN } from '$lib/authClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const scopes = SCOPES.join('%20');
  const authUrl = `${AUTH_DOMAIN}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&state=${STATE}`;

  return {
    authUrl,
  };
};
