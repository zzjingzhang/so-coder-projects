import { createRouter, createWebHistory } from 'vue-router'
import StaircaseView from '../views/StaircaseView.vue'

const routes = [
  {
    path: '/',
    name: 'Staircase',
    component: StaircaseView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
