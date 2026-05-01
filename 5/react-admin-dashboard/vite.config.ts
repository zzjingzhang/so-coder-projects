import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: './',
    define: {
      'process.env.VITE_BACKEND_ENV': JSON.stringify(env.VITE_BACKEND_ENV || 'development'),
    },
  }
})
