import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'

export default defineConfig(() => {
  return {
    publicDir: false,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../', import.meta.url)),
      },
    },
    build: {
      outDir: resolve(__dirname, './'),
      cssCodeSplit: true,
      rollupOptions: {
        external: ['@element-plus/icons-vue', 'element-plus', 'vue'],
        output: [
          {
            format: 'es',
            entryFileNames: '[name].js',
            exports: 'named',
            name: 'MyComponent',
            dir: resolve(__dirname, './dist'),
          },
          {
            format: 'es',
            entryFileNames: '[name].mjs',
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'packages',
            dir: resolve(__dirname, './es'),
          },
          {
            format: 'cjs',
            entryFileNames: '[name].js',
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: 'packages',
            dir: resolve(__dirname, './lib'),
          },
        ],
      },
      lib: {
        entry: [resolve(__dirname, './index.ts'), resolve(__dirname, './plugin.ts')],
        name: 'MyComponent',
        fileName: (format) => `my-component.${format}.js`,
      },
    },
    plugins: [
      vue(),
      svgLoader({
        defaultImport: 'url',
      }),
      dts({
        tsconfigPath: resolve(__dirname, './tsconfig.declaration.json'),
        outDir: resolve(__dirname, './lib'),
      }),
      dts({
        tsconfigPath: resolve(__dirname, './tsconfig.declaration.json'),
        outDir: resolve(__dirname, './es'),
      }),
    ],
  }
})
