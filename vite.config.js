import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@images': '/images',
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    cssMinify: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
