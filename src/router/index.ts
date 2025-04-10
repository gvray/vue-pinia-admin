import { createWebHistory, createRouter } from 'vue-router'
import Layout from '@/layout'

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },
    // 👇 最后一项放通配符路由（务必放在最后）
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/error/404'),
      meta: {
        title: '404'
      }
    },
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
  }, //定义了路由跳转时页面滚动的行为
});

export default router;
