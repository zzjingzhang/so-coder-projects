import { createRouter, createWebHistory } from 'vue-router'
import DataDisplay from '../views/DataDisplay.vue'

const routes = [
  {
    path: '/',
    name: 'DataDisplay',
    component: DataDisplay
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
