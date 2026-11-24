import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [vue(), {
    name: 'copy-404',
    closeBundle() {
      const src = path.resolve(__dirname, 'dist/index.html')
      const dest = path.resolve(__dirname, 'dist/404.html')
      fs.copyFileSync(src, dest)
    }
  }],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
    hmr: {
      overlay: true,
    },
  },
})
