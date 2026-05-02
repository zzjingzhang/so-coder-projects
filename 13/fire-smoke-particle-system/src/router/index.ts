import { createRouter, createWebHistory } from 'vue-router'
import ParticleSystem from '../views/ParticleSystem.vue'

const routes = [
  {
    path: '/',
    name: 'ParticleSystem',
    component: ParticleSystem
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
