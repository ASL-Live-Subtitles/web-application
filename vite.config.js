import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    build: { assetsDir: 'assets' },
    server: {
      proxy: {
        '/api': {
          target: 'https://composite1-592550011076.us-central1.run.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/asl-pipeline'),
        },
      },
    },
  });