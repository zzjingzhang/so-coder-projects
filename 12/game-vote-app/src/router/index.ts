import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/create-poll',
    name: 'CreatePoll',
    component: () => import('@/views/CreatePoll.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/poll/:id',
    name: 'PollDetail',
    component: () => import('@/views/PollDetail.vue')
  },
  {
    path: '/poll/:id/results',
    name: 'PollResults',
    component: () => import('@/views/PollResults.vue')
  },
  {
    path: '/my-votes',
    name: 'MyVotes',
    component: () => import('@/views/MyVotes.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
