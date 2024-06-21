import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
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
            userBaseURL: env.VITE_APP_USER_BASE_URL,
            stocksBaseURL: env.VITE_APP_STOCKS_BASE_URL,
            estateBaseURL: env.VITE_APP_ESTATE_BASE_URL,
            energyBaseURL: env.VITE_APP_ENERGY_BASE_URL,
            holdingBaseURL: env.VITE_APP_HOLDING_BASE_URL,
          },
        },
      }),
    ],
    server: {
      proxy: {
        '/api/user': {
          target: env.VITE_APP_USER_BASE_URL,
          changeOrigin: true,
        },
        '/api/stocks': {
          target: env.VITE_APP_STOCKS_BASE_URL,
          changeOrigin: true,
        },
        '/api/estates': {
          target: env.VITE_APP_ESTATE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/estates/, ''),
        },
        '/api/energy': {
          target: env.VITE_APP_ENERGY_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/energy/, ''),
        },
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/api/holding': {
          target: env.VITE_APP_HOLDING_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
