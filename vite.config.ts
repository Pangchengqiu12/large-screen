import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import cesium from 'vite-plugin-cesium';
import ViteAutoImport from 'unplugin-auto-import/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium(),
    ViteAutoImport({
      imports: ['vue', 'vue-router'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
