import { createRouter, createWebHistory } from 'vue-router'
import GameMenu from '../components/GameMenu.vue'
import ShooterGame from '../components/ShooterGame.vue'
import LadderGame from '../components/LadderGame.vue'

const routes = [
  {
    path: '/',
    name: 'GameMenu',
    component: GameMenu
  },
  {
    path: '/shooter',
    name: 'ShooterGame',
    component: ShooterGame
  },
  {
    path: '/ladder',
    name: 'LadderGame',
    component: LadderGame
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
