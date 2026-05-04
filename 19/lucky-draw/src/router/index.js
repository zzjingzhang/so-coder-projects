import { createRouter, createWebHistory } from 'vue-router'
import LuckyDraw from '../components/LuckyDraw.vue'

const routes = [
  {
    path: '/',
    name: 'LuckyDraw',
    component: LuckyDraw
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
