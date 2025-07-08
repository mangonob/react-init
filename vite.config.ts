import path from 'path';

import ViteYaml from '@modyfi/vite-plugin-yaml';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), ViteYaml()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: path.resolve(__dirname, 'dist/stats.html'),
        }),
      ],
    },
  },
});
