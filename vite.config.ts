import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': decodeURIComponent(
        (import.meta as unknown as { url: string }).url
          .replace(/^file:\/\//, '')
          .replace(/\/[^/]*$/, '/src')
      ).replace(/^\/([A-Za-z]:)/, '$1'),
    },
  },
})
