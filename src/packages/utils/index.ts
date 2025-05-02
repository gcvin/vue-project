import type { App, Component, Plugin } from 'vue'

export const withInstall = (component: Component): Component & Plugin => {
  ;(component as Plugin).install = (app: App) => {
    if (component.name) {
      app.component(component.name, component)
    }
  }
  return component as Component & Plugin
}
