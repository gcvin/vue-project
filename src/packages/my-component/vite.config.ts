import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'
import { peerDependencies, dependencies } from './package.json'

const external = [...Object.keys(peerDependencies || {}), ...Object.keys(dependencies || {})].map(
  (dep) => new RegExp(`^${dep}`),
)

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../../', import.meta.url)),
    },
  },
  build: {
    outDir: resolve(__dirname, './'),
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      external,
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          exports: 'named',
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
      entry: [
        resolve(__dirname, './index.ts'),
        resolve(__dirname, './web-comp.ts'),
        resolve(__dirname, './plugin.ts'),
      ],
    },
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'url',
      svgo: false,
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
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
