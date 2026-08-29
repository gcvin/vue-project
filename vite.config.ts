import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import importStyle from '@gcvin/my-component/es/plugin'
// import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: [
        fileURLToPath(new URL('./src/assets/element.scss', import.meta.url)),
        fileURLToPath(new URL('./index.html', import.meta.url)),
      ],
      output: {
        manualChunks: {
          'vendor-element-plus': ['element-plus'],
          'vendor-fabric': ['fabric'],
          'vendor-qiankun': ['qiankun'],
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('my-'),
        },
      },
    }),
    vueDevTools(),
    svgLoader({
      defaultImport: 'url',
      svgo: false,
    }),
    importStyle({
      pkgName: '@gcvin/my-component',
    }),
    // ElementPlus({
    //   useSource: true,
    // }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/assets/element.scss" as *;`,
  //     },
  //   },
  // },
})
