import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
  const resp = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  const { username, account } = await resp.json();

  return {
    username,
    account,
  };
};
