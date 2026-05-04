import { createRouter, createWebHistory } from 'vue-router'
import RedoxReaction from '../views/RedoxReaction.vue'

const routes = [
  {
    path: '/',
    name: 'RedoxReaction',
    component: RedoxReaction
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router