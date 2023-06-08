const { config, theme, variants, plugin } = require('@bitskico/tailwind');

module.exports = {
  ...config,
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@bitskico/svelte-components/**/*.{html,js,svelte,ts}',
  ],
  safelist: [],
  theme,
  variants,
  plugins: [plugin(), require('@tailwindcss/line-clamp')],
};
