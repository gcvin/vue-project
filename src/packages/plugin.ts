import { Plugin } from 'vite'

export default ({ pkgName }): Plugin => {
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
              const name = item.slice(2).charAt(0).toLowerCase() + item.slice(3)
              return `import ${item} from '${pkgName}/es/components/${name.trim()}';
                      import '${pkgName}/es/components/${name.trim()}/${item.slice(2)}.css'`
            })
            .join(';')
        })
      }
      return code
    },
  }
}
