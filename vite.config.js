import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [
    basicSsl(),
    vue(),
  ],
  optimizeDeps: {
    force: true,
  },
  define: {
    // adding global here breaks `npm run build`
    // "global": {},
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      esmExternals: true,
    },
  },
})
