import { createRouter, createWebHistory } from 'vue-router'
import GreenhouseView from '../views/GreenhouseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'greenhouse',
      component: GreenhouseView
    }
  ]
})

export default router
