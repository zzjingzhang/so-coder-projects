import { createRouter, createWebHistory } from 'vue-router'
import ElectricFieldSimulator from '../views/ElectricFieldSimulator.vue'

const routes = [
  {
    path: '/',
    name: 'ElectricFieldSimulator',
    component: ElectricFieldSimulator
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
