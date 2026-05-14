import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/proxy': {
          target: env.VITE_PROXY_TARGET, 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
        },
      },
    },
  }
})