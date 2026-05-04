import { createRouter, createWebHistory } from 'vue-router'
import GasSimulator from '../views/GasSimulator.vue'

const routes = [
  { path: '/', component: GasSimulator },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
