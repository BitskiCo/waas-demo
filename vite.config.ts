import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import houdini from 'houdini/vite';

const config: UserConfig = {
  plugins: [houdini(), sveltekit()],

  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rollupNodePolyFill({}) as any,
      ],
    },
  },

  resolve: {
    alias: {
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
    },
  },
};

export default config;
