import { createWebHistory, createRouter } from 'vue-router'

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = []

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
});

export default router;
