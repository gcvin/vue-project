import type { App, Component, Plugin } from 'vue'
import { html, render } from 'lit-html'
import { reactive, isReactive, effect } from 'vue'

export const withInstall = <T extends Component>(component: T): T & Plugin => {
  ;(component as Plugin).install = (app: App) => {
    if (component.name) {
      app.component(component.name, component)
    }
  }
  return component as T & Plugin
}

export abstract class MyComponent extends HTMLElement {
  html = html
  state = {}
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    if (!isReactive(this.state)) {
      this.state = reactive(this.state)
    }
    effect(() => {
      const content = this.render()
      render(content, this.shadowRoot as ShadowRoot)
    })
  }
  abstract render(): ReturnType<typeof html>
}
