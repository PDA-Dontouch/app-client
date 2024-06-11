import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env)
  return {
    plugins: [
      react({
        babel: {
          plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
        }
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
  };
});