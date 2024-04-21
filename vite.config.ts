import { vitePlugin as remix } from "@remix-run/dev";
import autoprefixer from 'autoprefixer'
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      ignoredRouteFiles: ['**/*'],
      routes: (defineRoutes) => {
        return flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: ['controller.tsx', 'api.ts', 'utils.ts'],
        });
      },
    }),
    tsconfigPaths(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer({})]
    }
  },
  server: {
    port: 9981,
    open: true,
    proxy: {
      '/prod-api/': {
        target: 'https://vue.ruoyi.vip/',
        changeOrigin: true
      }
    }
  }
});
