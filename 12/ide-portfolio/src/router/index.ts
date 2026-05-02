import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('@/views/ResumeView.vue')
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('@/views/SkillsView.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/ProjectsView.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/lag',
    name: 'LAG',
    component: () => import('@/views/LAGView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
