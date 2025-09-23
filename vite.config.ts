import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      external: ['puppeteer'],
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['puppeteer'],
  },
  resolve: {
    alias: {
      // Provide browser-compatible alternatives for Node.js modules
      'node:url': 'url',
      'node:http': 'http-browserify',
      'node:https': 'https-browserify',
      'node:fs': 'browserify-fs',
      'node:path': 'path-browserify',
    },
  },
})