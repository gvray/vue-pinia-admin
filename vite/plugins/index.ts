import vue from '@vitejs/plugin-vue'
import createSvgIcon from './svg-icon'
import createAutoImport from './auto-import'
import createComponents from './components'
import createMockServer from './mock'
import createSetupExtend from './setup-extend'
import createCompression from './compression'
import createVisualizer from './visualizer'
import type { PluginOption } from 'vite'

export interface ViteEnv {
  VITE_PORT?: number
  VITE_USE_MOCK?: boolean
  VITE_USE_PWA?: boolean
  VITE_PUBLIC_PATH?: string
  VITE_PROXY?: [string, string][]
  VITE_GLOB_APP_TITLE?: string
  VITE_GLOB_APP_SHORT_NAME?: string
  VITE_USE_CDN?: boolean
  VITE_DROP_CONSOLE?: boolean
  VITE_BUILD_COMPRESS?: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE?: boolean
  VITE_LEGACY?: boolean
  VITE_USE_IMAGEMIN?: boolean
  VITE_GENERATE_UI?: string
  [key: string]: any
}

export default function createVitePlugins(
  viteEnv: ViteEnv,
  isBuild = false,
): PluginOption[] {
  const vitePlugins: PluginOption[] = [vue()]

  // 添加 AutoImport 插件
  vitePlugins.push(createAutoImport())

  // 添加 SvgIcon 插件
  vitePlugins.push(createSvgIcon(isBuild))

  // 添加 Components 插件
  vitePlugins.push(createComponents())

  // 添加 Mock 服务插件
  vitePlugins.push(createMockServer())

  // 添加 Setup 插件
  vitePlugins.push(createSetupExtend())

  isBuild && vitePlugins.push(...createCompression(viteEnv))

  isBuild && vitePlugins.push(createVisualizer())

  return vitePlugins
}
