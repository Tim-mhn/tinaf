import { defineConfig } from 'vite';
import path, { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'src/render.ts'),
        resolve(__dirname, 'src/dom/dom.exports.ts'),
        resolve(__dirname, 'src/component/component.exports.ts'),
        resolve(__dirname, 'src/reactive/reactive.exports.ts'),
        resolve(__dirname, 'src/router/router.exports.ts'),
      ],
      fileName: (_format, entryName) => {
        console.log({ entryName });
        const fileName = entryName.split('.exports')[0];
        return `${fileName}.js`;
      },
      formats: ['es'],
    },
  },
  plugins: [
    dts({
      tsconfigPath: resolve(__dirname, './tsconfig.json'),
    }),
  ],
});
