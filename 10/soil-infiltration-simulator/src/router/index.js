import { createRouter, createWebHistory } from 'vue-router'
import ExperimentView from '../views/ExperimentView.vue'

const routes = [
  {
    path: '/',
    name: 'experiment',
    component: ExperimentView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
