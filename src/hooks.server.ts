import { dev } from '$app/environment';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://15722ccb9b9343b7b6b7a02d4975309a@o48269.ingest.sentry.io/4505467323351040',
});

const configHandle: Handle = async ({ event, resolve }) => {
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

export const handle: Handle = sequence(Sentry.sentryHandle(), configHandle);

export const debugErrors: HandleServerError = ({ error }) => {
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

export const handleError = Sentry.handleErrorWithSentry(debugErrors);
