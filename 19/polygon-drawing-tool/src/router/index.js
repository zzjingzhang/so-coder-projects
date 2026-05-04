import { createRouter, createWebHistory } from 'vue-router'
import PolygonDrawing from '../views/PolygonDrawing.vue'

const routes = [
  {
    path: '/',
    name: 'PolygonDrawing',
    component: PolygonDrawing
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
