import { vitePlugin as remix } from "@remix-run/dev";
import tailwindcss from '@tailwindcss/vite';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: ['controller.tsx'],
        });
      }
    }),
    tsconfigPaths(),
    tailwindcss()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
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
