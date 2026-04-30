import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/tasks'
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/views/TaskView.vue'),
    meta: {
      title: '任务管理',
      icon: 'mdi-format-list-checks'
    }
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/views/TableView.vue'),
    meta: {
      title: '数据表格',
      icon: 'mdi-table'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: '关于',
      icon: 'mdi-information'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
