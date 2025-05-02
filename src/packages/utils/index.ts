import type { App, Component, Plugin } from 'vue'

export const withInstall = <T extends Component>(component: T): T & Plugin => {
  ;(component as Plugin).install = (app: App) => {
    if (component.name) {
      app.component(component.name, component)
    }
  }
  return component as T & Plugin
}
