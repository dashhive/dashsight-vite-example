import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    cors: {
      origin: '*',
    },
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
  preview: {
    https: true,
    cors: {
      origin: '*',
    },
  },
  plugins: [
    basicSsl(),
    vue(),
  ],
  optimizeDeps: {
    force: true,
    exclude: [
      // 'crowdnode',
      // '@dashevo/dashcore-lib',
    ],
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            }),
        ]
    },
  },
  // define: {
  //   "global": {},
  // },
})
