import type { App } from 'vue'
import * as components from '@element-plus/icons-vue'

export default {
  install(app: App) {
    for (const key in components) {
      const component = components[key as keyof typeof components]
      app.component(component.name as string, component)
    }
  },
}
