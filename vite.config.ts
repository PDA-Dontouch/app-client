import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  return {
    plugins: [
      react({
        babel: {
          plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
        },
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoAppKey: env.VITE_APP_KAKAO_APP_KEY,
          },
        },
      }),
    ],
    server: {
      proxy: {
        '/api/user': {
          target: 'http://localhost:8081',
          changeOrigin: true,
        },
        '/api/stocks': {
          target: 'http://localhost:8082',
          changeOrigin: true,
        },
        '/api/estates': {
          target: 'http://localhost:8083',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/estates/, ''),
        },
        '/api/energy': {
          target: 'http://localhost:8084',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/energy/, ''),
        },
<<<<<<< HEAD
        '/api': {
          target: 'http://localhost:3000',
=======
        '/api/holding': {
          target: 'http://localhost:8085',
>>>>>>> b1e153e6f3bd64cd11e1e0143c3ad1713f5f74ed
          changeOrigin: true,
        },
        '/api/exchangeRate': {
          target:
            'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON',
          changeOrigin: true,
          rewrite: (path) => path.replace('/api/exchangeRate', ''),
        },
      },
    },
  };
});