import { createRouter, createWebHistory } from 'vue-router'
import WaterWave from '../views/WaterWave.vue'

const routes = [
  {
    path: '/',
    name: 'WaterWave',
    component: WaterWave
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
