import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
  const resp = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  const { username, account, userId } = await resp.json();

  const result = url.searchParams.get('result');

  return {
    username,
    account,
    userId,
    result,
  };
};
