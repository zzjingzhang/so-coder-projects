import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProblemDetailView from '../views/ProblemDetailView.vue'
import ProblemCreateView from '../views/ProblemCreateView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/problem/create',
    name: 'problem-create',
    component: ProblemCreateView
  },
  {
    path: '/problem/:id',
    name: 'problem-detail',
    component: ProblemDetailView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
