import { createRouter, createWebHistory } from 'vue-router'
import RollCallView from '../views/RollCallView.vue'

const routes = [
  {
    path: '/',
    name: 'RollCall',
    component: RollCallView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
