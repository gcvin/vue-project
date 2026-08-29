import { kebabCase } from 'lodash-es'
import type { Plugin } from 'vite'

interface ImportStylePluginOptions {
  pkgName: string
}

export default ({ pkgName }: ImportStylePluginOptions): Plugin => {
  const regStr = `(?<!\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/\\s*)import\\s*{\\s*([^{}]+)\\s*}\\s*from\\s*['"]${pkgName}['"]`
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
              const componentName = item
                .slice(2)
                .trim()
                .split(/\s+as\s+/)[0]
              const name = kebabCase(componentName)
              return `import ${item} from '${pkgName}/es/components/${name}/index';
                      import '${pkgName}/es/components/${name}/${componentName}.css'`
            })
            .join(';')
        })
      }
      return code
    },
  }
}
