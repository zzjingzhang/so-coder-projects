import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { title: '仪表盘', icon: 'DataAnalysis' }
  },
  {
    path: '/tricks',
    name: 'Tricks',
    component: () => import('@/views/Tricks.vue'),
    meta: { title: '技巧档案', icon: 'Collection' }
  },
  {
    path: '/practice',
    name: 'Practice',
    component: () => import('@/views/Practice.vue'),
    meta: { title: '练习记录', icon: 'EditPen' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 滑板运动管理系统` : '滑板运动管理系统'
  next()
})

export default router
