import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: './packages/demo/index.html',
      },
    },
  },
});
