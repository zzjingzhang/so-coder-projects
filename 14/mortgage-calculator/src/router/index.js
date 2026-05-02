import { createRouter, createWebHistory } from 'vue-router'
import MortgageCalculator from '../views/MortgageCalculator.vue'

const routes = [
  {
    path: '/',
    name: 'MortgageCalculator',
    component: MortgageCalculator
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
