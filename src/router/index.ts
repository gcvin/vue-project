import { createRouter, createWebHistory } from 'vue-router'
import { loadMicroApp, type MicroApp } from 'qiankun'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(app-.*)',
      name: 'subapp',
      component: () => import('../views/SubApp.vue'),
    },
  ],
})

const apps = [
  {
    name: 'app-vue2',
    entry: '//localhost:5174',
    container: '#app-vue2',
    activeRule: '/app-vue2',
    microApp: null as MicroApp | null,
  },
  {
    name: 'app-vue3',
    entry: '//localhost:5175',
    container: '#app-vue3',
    activeRule: '/app-vue3',
    microApp: null as MicroApp | null,
  },
]

router.beforeEach(async (to, from, next) => {
  const app = apps.find((app) => to.path.startsWith(app.activeRule)) || null
  if (!app) {
    return next()
  }
  if (app.microApp?.getStatus() === 'NOT_MOUNTED') {
    app.microApp.mount()
    return next()
  }
  app.microApp = loadMicroApp({ ...app, props: { topRouter: router } }, { autoStart: false })
  next()
})

export default router
