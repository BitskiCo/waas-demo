import { dev } from '$app/environment';
import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  if (dev) {
    await import('dotenv/config');

    event.platform = {
      env: {
        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
        BITSKI_CLIENT_SECRET: process.env.BITSKI_CLIENT_SECRET,
      },
    } as any;
  }

  return await resolve(event);
};

export const handleError: HandleServerError = ({ error }) => {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: 'Internal error',
  };
};
