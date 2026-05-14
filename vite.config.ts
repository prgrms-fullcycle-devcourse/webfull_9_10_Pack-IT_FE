import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api/proxy'로 시작하는 요청을 백엔드로 전달
      '/api/proxy': {
        target: 'http://54.180.159.211:8080',
        changeOrigin: true,
        // 경로에서 '/api/proxy' 문자열을 제거하고 백엔드에 전달
        rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
      },
    },
  },
});