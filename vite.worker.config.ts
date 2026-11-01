import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: 'dist/server',
    lib: {
      entry: 'worker.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
  },
});
