import { defineConfig } from 'vite';
import { tinaf } from 'tinaf/plugin';

export default defineConfig({
  plugins: [tinaf()],
});
