import { createRouter, createWebHistory } from 'vue-router'
import SimulationView from '@/views/SimulationView.vue'
import QuizView from '@/views/QuizView.vue'

const routes = [
  {
    path: '/',
    redirect: '/simulation'
  },
  {
    path: '/simulation',
    name: 'Simulation',
    component: SimulationView,
    meta: { title: '电磁感应模拟' }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizView,
    meta: { title: '知识测验' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || '电磁感应模拟器'}`
  next()
})

export default router
