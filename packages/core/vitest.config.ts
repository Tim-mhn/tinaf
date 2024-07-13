import { defineConfig } from 'vitest/config';
import { tinaf } from './src/plugin/plugin';
export default defineConfig({
  plugins: [tinaf()],
});
