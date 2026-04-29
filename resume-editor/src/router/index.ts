import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { authService } from '@/api/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '在线简历编辑器' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录', guest: true }
  },
  {
    path: '/optimize',
    name: 'Optimize',
    component: () => import('@/views/OptimizeView.vue'),
    meta: { title: '简历优化' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 在线简历编辑器`
  }

  const isAuthenticated = authService.isAuthenticated()
  
  if (to.meta.guest && isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
