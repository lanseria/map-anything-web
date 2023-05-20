import { createApp } from 'vue'
import matomo from 'vue-matomo'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import './worker'

import '@arco-design/web-vue/dist/arco.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
if (import.meta.env.PROD) {
  // eslint-disable-next-line no-console
  app.use(matomo, {
    host: 'https://matomo.vip.cpolar.top',
    siteId: 3,
    router,
  })
}
app.use(ArcoVue, {})
app.use(ArcoVueIcon)
app.use(router)
app.mount('#app')
