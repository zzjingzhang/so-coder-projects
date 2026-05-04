import { createRouter, createWebHistory } from 'vue-router'
import SolutionDemo from '../views/SolutionDemo.vue'

const routes = [
  {
    path: '/',
    name: 'SolutionDemo',
    component: SolutionDemo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
