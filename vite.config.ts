import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        dynamicImportVars({
          include: path.resolve(__dirname, 'src'),
          exclude: 'node_modules',
          errorWhenNoFilesFound: true,
          warnOnError: true,
        }),
      ],
    },
  },
});
