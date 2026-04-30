import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import DessertTable from '../views/DessertTable.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/dessert',
    name: 'DessertTable',
    component: DessertTable
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
