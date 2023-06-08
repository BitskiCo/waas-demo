import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const resp = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  const account: string = (await resp.json()).account;

  return {
    account,
  };
};
