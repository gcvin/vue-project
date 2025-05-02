import type { App } from 'vue'
import * as myComponents from './components'

export * from './components'
export default (app: App) => {
  for (const i in myComponents) {
    app.use(myComponents[i as keyof typeof myComponents])
  }
}
