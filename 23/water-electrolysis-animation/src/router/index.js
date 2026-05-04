import { createRouter, createWebHistory } from 'vue-router'
import WaterElectrolysis from '../views/WaterElectrolysis.vue'

const routes = [
  {
    path: '/',
    name: 'WaterElectrolysis',
    component: WaterElectrolysis
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
