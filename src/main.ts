import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/App'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import storetify from 'storetify'
import './permission'

const app = createApp(App)

app.use(router)
app.use(store)
// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: storetify('size') as any || 'default'
  })
app.mount('#app')