import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const USER_COOKIE = 'waas-user';

export const GET: RequestHandler = async ({ cookies }) => {
  return json(JSON.parse(cookies.get(USER_COOKIE) || '{}'));
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { username, userId, account } = await request.json();

  cookies.set(USER_COOKIE, JSON.stringify({ username, userId, account }), {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: !dev,
    maxAge: 60 * 60 * 24 * 30,
  });

  return new Response(`Set`);
};
