import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local API target. In production the /api and /uploads paths are rewritten by
// Netlify (see netlify.toml), so this only affects local development.
const API_TARGET = process.env.VITE_API_PROXY_TARGET || 'http://localhost:5000'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
      },
      '/uploads': {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
})