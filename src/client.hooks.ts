import type { HandleClientError } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://15722ccb9b9343b7b6b7a02d4975309a@o48269.ingest.sentry.io/4505467323351040',
});

const logClientErrors: HandleClientError = ({ error, event }) => {
  console.error('An error occurred:', error, event);
};

export const handleError = Sentry.handleErrorWithSentry(logClientErrors);
