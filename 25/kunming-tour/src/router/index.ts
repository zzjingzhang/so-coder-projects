import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '这座城 - 昆明' }
  },
  {
    path: '/tourism',
    name: 'Tourism',
    component: () => import('@/views/Tourism.vue'),
    meta: { title: '旅游 - 昆明' }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History.vue'),
    meta: { title: '历史 - 昆明' }
  },
  {
    path: '/economy',
    name: 'Economy',
    component: () => import('@/views/Economy.vue'),
    meta: { title: '经济 - 昆明' }
  },
  {
    path: '/culture',
    name: 'Culture',
    component: () => import('@/views/Culture.vue'),
    meta: { title: '文化 - 昆明' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
