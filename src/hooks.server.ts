import { dev } from '$app/environment';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { Toucan } from 'toucan-js';

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

export const handleError: HandleServerError = ({ error, event }) => {
  // Use `toucan-js` until sentry supports non-node environments
  // see issue <https://github.com/getsentry/sentry-javascript/issues/8291>
  const sentry = new Toucan({
    dsn: 'https://15722ccb9b9343b7b6b7a02d4975309a@o48269.ingest.sentry.io/4505467323351040',
    request: event.request,
  });

  sentry.captureException(error);

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
