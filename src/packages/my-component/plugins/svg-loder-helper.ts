import type { Plugin } from 'vite'

// vite-svg-loader 编译 ?component 时，compileTemplate 会为纯静态模板导入
// 实际未被引用的 vue helper（如 createElementVNode）。vue 是 external 时
// Rollup 会因此报 UNUSED_EXTERNAL_IMPORT，这里在交给 Rollup 前删掉未使用的导入。
const VUE_IMPORT_RE = /^import\s*\{([^}]*)\}\s*from\s*['"]vue['"];?[ \t]*$/m

function stripUnusedVueHelpers(code: string): string {
  const match = code.match(VUE_IMPORT_RE)
  if (!match) return code
  const body = code.replace(VUE_IMPORT_RE, '')
  const padded = ` ${body} `
  const kept = match[1]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((specifier) => {
      const local = (specifier.split(/\s+as\s+/)[1] ?? specifier).trim()
      return new RegExp(`[^A-Za-z0-9_$]${local}[^A-Za-z0-9_$]`).test(padded)
    })
  const importStatement = kept.length ? `import { ${kept.join(', ')} } from 'vue'\n` : ''
  return importStatement + body.replace(/^\n+/, '')
}

export const svgLoaderHelper = (): Plugin => {
  return {
    name: 'my-component:strip-svg-helper-imports',
    enforce: 'post', // 跑在 vite-svg-loader(load) 和 plugin-vue 之后
    transform(code, id) {
      if (!id.includes('.svg?component')) return null
      return { code: stripUnusedVueHelpers(code), map: null }
    },
  }
}
