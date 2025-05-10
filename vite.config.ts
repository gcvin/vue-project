import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import importStyle from '@gcvin/my-component/es/plugin'
// import ElementPlus from 'unplugin-element-plus/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader({
      defaultImport: 'url',
    }),
    importStyle({
      pkgName: '@gcvin/my-component',
    }),
    // ElementPlus({
    //   useSource: true,
    // }),
    // Components({
    //   dirs: [],
    //   resolvers: [
    //     ElementPlusResolver({
    //       importStyle: 'sass',
    //     }),
    //   ],
    // }),
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
