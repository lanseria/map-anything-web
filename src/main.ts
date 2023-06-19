import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import baiduAnalytics from 'vue-baidu-analytics'
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
  app
  // 启动插件
    .use(baiduAnalytics, {
      router,
      siteIdList: [
        '48f69cc7e08b3b8a1bc58d8103ecfcc2',
      ],
      isDebug: false,
    })
}
app.use(ArcoVue, {})
app.use(ArcoVueIcon)
app.use(router)
app.mount('#app')
