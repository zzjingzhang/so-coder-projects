import { createRouter, createWebHistory } from 'vue-router'
import FlowerGarden from '../views/FlowerGarden.vue'

const routes = [
  {
    path: '/',
    name: 'FlowerGarden',
    component: FlowerGarden
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
