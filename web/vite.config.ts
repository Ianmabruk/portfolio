import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The public site reads content from the existing API that powers the admin
// dashboard, so dev requests are proxied instead of hitting a second backend.
const API_TARGET = 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: API_TARGET, changeOrigin: true },
      '/uploads': { target: API_TARGET, changeOrigin: true },
    },
  },
  preview: {
    proxy: {
      '/api': { target: API_TARGET, changeOrigin: true },
      '/uploads': { target: API_TARGET, changeOrigin: true },
    },
  },
});