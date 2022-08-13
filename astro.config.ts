import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://utf9k.net',
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'entry.[hash].js',
          chunkFileNames: 'chunks/chunk.[hash].js',
          assetFileNames: 'assets/asset.[hash][extname]',
        },
      },
    },
  },
});