export default {
  // 网页标题
  title: (import.meta as any).env.VITE_APP_TITLE,
  // 主题颜色
  theme: '#409eff',
  // 主题模式，可选值为：light | dark 暂时使用的系统默认偏好设置
  themeMode: 'light',
  // 侧边栏主题 theme-dark 或 theme-light
  sidebarTheme: 'theme-dark',
  // 布局模式，可选值为：vertical | horizontal
  layoutMode: 'vertical',
  // 布局切换时是否显示切换动画
  transition: true,
  // 头部固定
  headerFixed: true,
  // 侧边栏固定
  sidebarFixed: true,
  // 侧边栏折叠
  sidebarCollapsed: false,
  // 面包屑导航
  breadcrumb: true,
  // 面包屑导航图标
  breadcrumbIcon: true,
  // 标签页
  tabs: true,
  // 标签页图标
  tabsIcon: true,
  // 页脚
  footer: false,
  // 页脚版权信息
  footerCopyright: 'Copyright © 2023-present 前端开发',
}
