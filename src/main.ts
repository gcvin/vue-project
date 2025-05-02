import './assets/main.css'
import './assets/element.scss'
import './assets/element-overwrite.scss'
// import 'my-component/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import MyComponent from 'my-component'
// import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(MyComponent)
// app.use(ElementPlus)

app.mount('#app')
