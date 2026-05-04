import { createRouter, createWebHistory } from 'vue-router'
import QuoteGenerator from '../views/QuoteGenerator.vue'

const routes = [
  {
    path: '/',
    name: 'QuoteGenerator',
    component: QuoteGenerator
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
