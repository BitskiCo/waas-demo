import { dev } from '$app/environment';

export const AUTH_DOMAIN = 'https://dev-gwnw10q0.us.auth0.com';
export const REDIRECT_URI = dev
  ? 'http://127.0.0.1:5173/auth0-callback'
  : 'https://waas-demo.pages.dev/auth0-callback';

export const STATE = 'state';
export const CODE_CHALLENGE = 'code_challenge';
export const SCOPES = ['openid', 'profile', 'email'];
