import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/App'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import storetify from 'storetify'

// svg图标
import elementIcons from '@/components/SvgIcon/svgicon'

// 路由守卫
import './permission'

import {resetForm, addDateRange} from '@/utils/globalMethods'

const app = createApp(App)

// 挂载全局属性
app.config.globalProperties.$resetForm = resetForm
app.config.globalProperties.$addDateRange = addDateRange

app.use(router)
app.use(store)
app.use(elementIcons)
// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: storetify('size') as any || 'default'
  })
app.mount('#app')