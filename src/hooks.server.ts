import type { HandleServerError } from '@sveltejs/kit';

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
