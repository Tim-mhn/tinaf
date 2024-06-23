import type { Plugin } from 'vite';

export const tinaf = (): Plugin => {
  return {
    name: 'vite:tinaf',
    config() {
      return {
        esbuild: {
          jsx: 'transform',
          jsxDev: false,
          jsxImportSource: 'tinaf',
          jsxInject: `import { jsxComponent } from 'tinaf/jsx-runtime'`,
          jsxFactory: 'jsxComponent',
        },
      };
    },
  };
};
