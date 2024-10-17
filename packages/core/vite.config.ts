import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'src/render/render.exports.ts'),
        resolve(__dirname, 'src/dom/dom.exports.ts'),
        resolve(__dirname, 'src/component/component.exports.ts'),
        resolve(__dirname, 'src/reactive/reactive.exports.ts'),
        resolve(__dirname, 'src/router/router.exports.ts'),
        resolve(__dirname, 'src/jsx-runtime/jsx-runtime.exports.ts'),
        resolve(__dirname, 'src/plugin/plugin.exports.ts'),
        resolve(__dirname, 'src/common-hooks/common-hooks.exports.ts'),
        resolve(__dirname, 'src/http/http.exports.ts'),
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

  esbuild: {
    jsx: 'transform',
    jsxDev: false,
    jsxImportSource: '@',
    jsxInject: `import { jsxComponent } from './src/jsx/runtime'`,
    jsxFactory: 'jsxComponent',
  },
});
