import type { App, Component, Plugin, ReactiveEffectRunner } from 'vue'
import { html, render } from 'lit-html'
import { reactive, isReactive, effect, stop } from 'vue'

export const withInstall = <T extends Component>(component: T): T & Plugin => {
  ;(component as Plugin).install = (app: App) => {
    if (component.name) {
      app.component(component.name, component)
    } else {
      console.warn('[my-component] 组件缺少 name，已跳过全局注册', component)
    }
  }
  return component as T & Plugin
}

export abstract class MyComponent extends HTMLElement {
  html = html
  state = {}
  private effectRunner: ReactiveEffectRunner | null = null
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }
    if (!isReactive(this.state)) {
      this.state = reactive(this.state)
    }
    if (this.effectRunner) {
      stop(this.effectRunner)
    }
    this.effectRunner = effect(() => {
      const content = this.render()
      render(content, this.shadowRoot as ShadowRoot)
    })
  }
  disconnectedCallback() {
    if (this.effectRunner) {
      stop(this.effectRunner)
      this.effectRunner = null
    }
  }
  abstract render(): ReturnType<typeof html>
}
