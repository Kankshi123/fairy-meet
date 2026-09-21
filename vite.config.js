import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    https: false,
    // Increase max header size to 64KB to handle large Supabase JWT tokens
    // passed through the proxy
    hmr: true,
    proxy: {
      '/supabase-api': {
        target: 'https://jprsfmdbwsfikmosvtqn.supabase.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supabase-api/, ''),
        secure: true,
        headers: {
          // Remove X-Forwarded-For etc to reduce header size
        }
      }
    }
  }
})


