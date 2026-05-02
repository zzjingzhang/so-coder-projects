import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import TimelineStory from '../views/TimelineStory.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TimelineStory',
    component: TimelineStory
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
