import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PinballGame from '../views/PinballGame.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'PinballGame',
    component: PinballGame
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
