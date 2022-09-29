import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    proxy: {
      "/insight": {
        target: "https://insight.dash.org",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/insight/, ""),
      },
      "/crowdnode": {
        target: "https://app.crowdnode.io",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/crowdnode/, ""),
      },
      "/knowledge": {
        target: "https://knowledge.crowdnode.io",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/knowledge/, ""),
      },
    },
  },
  plugins: [
    basicSsl(),
    vue(),
  ],
  optimizeDeps: {
    force: true,
  },
  define: {
    "global": {},
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: false,
      esmExternals: true,
    },
  },
})
