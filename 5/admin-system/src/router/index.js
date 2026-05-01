import { createRouter, createWebHistory } from 'vue-router'
import { setupPermissionGuard } from './permission'
import Login from '@/views/login/Login.vue'
import Layout from '@/layouts/Layout.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

setupPermissionGuard(router)

export default router