import { kebabCase } from 'lodash-es'
import type { Plugin } from 'vite'

interface ImportStylePluginOptions {
  pkgName: string
}

export default ({ pkgName }: ImportStylePluginOptions): Plugin => {
  const regStr = `(?<!\\/\\/.*|\\/\\*[\s\S]*?\\*\\/\\s*)import\\s*{\\s*([^{}]+)\\s*}\\s*from\\s*['"]${pkgName}['"]`
  return {
    name: 'vite-plugin-import-style',
    enforce: 'pre',
    transform: (code: string, id: string) => {
      if (id.endsWith('.vue')) {
        return code.replace(new RegExp(regStr, 'g'), (_, imports) => {
          return imports
            .split(',')
            .map((item: string) => {
              item = item.trim()
              const name = kebabCase(item.slice(2).trim())
              return `import ${item} from '${pkgName}/es/components/${name}/index';
                      import '${pkgName}/es/components/${name}/${item.slice(2)}.css'`
            })
            .join(';')
        })
      }
      return code
    },
  }
}
