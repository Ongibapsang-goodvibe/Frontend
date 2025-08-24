// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Django API
      '/api': {
        target: 'https://ongibapsang.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
      },
      // media도 프록시
      '/media': {
        target: 'https://ongibapsang.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
