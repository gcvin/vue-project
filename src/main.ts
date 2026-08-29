import './assets/main.css'
import './assets/element.scss'
// import '@gcvin/my-component/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerMicroApps, start } from 'qiankun'
// import MyComponent from '@gcvin/my-component'
// import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(MyComponent)
// app.use(ElementPlus)

app.mount('#app')

registerMicroApps([
  {
    name: 'app-vue2',
    entry: '//localhost:5174',
    container: '#app-vue2',
    activeRule: '/app-vue2',
  },
  {
    name: 'app-vue3',
    entry: '//localhost:5175',
    container: '#app-vue3',
    activeRule: '/app-vue3',
  },
  {
    name: 'app-vite3',
    entry: '//localhost:5176',
    container: '#app-vite3',
    activeRule: '/app-vite3',
  },
])

start({
  prefetch: false,
  fetch: async (url) => {
    if (typeof url === 'string' && url.endsWith('.css')) {
      return fetch(url).then((response) => {
        if (!response.ok) {
          return response
        }
        const origin = new URL(url, window.location.href).origin
        let textPromise: Promise<string> | null = null
        return {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          url: response.url,
          redirected: response.redirected,
          type: response.type,
          text: () => {
            textPromise ??= response
              .text()
              .then((text) =>
                text.replace(
                  /url\((['"]?)(\/(?!\/)[^'")]+)\1\)/g,
                  (_, quote, path) => `url(${quote}${origin}${path}${quote})`,
                ),
              )
            return textPromise
          },
        } as unknown as Response
      })
    }
    return fetch(url)
  },
})
