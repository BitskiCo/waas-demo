import { dev } from '$app/environment';

export const AUTH_DOMAIN = 'https://dev-gwnw10q0.us.auth0.com';
export const REDIRECT_URI = dev
  ? 'http://127.0.0.1:5173/auth0-callback'
  : 'https://waas-demo.bitski.com/auth0-callback';

export const STATE = 'CHANGE_ME';
export const CODE_CHALLENGE = 'CHANGE_ME';
export const SCOPES = ['openid', 'profile', 'email'];
