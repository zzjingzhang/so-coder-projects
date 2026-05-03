import { createRouter, createWebHistory } from 'vue-router'
import ParticleFountain from '../views/ParticleFountain.vue'

const routes = [
  {
    path: '/',
    name: 'ParticleFountain',
    component: ParticleFountain
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
