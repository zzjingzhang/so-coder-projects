import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MagazineView from '../views/MagazineView.vue'
import AboutView from '../views/AboutView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Digital Magazine - 首页'
    }
  },
  {
    path: '/magazine',
    name: 'magazine',
    component: MagazineView,
    meta: {
      title: 'Digital Magazine - 杂志'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'Digital Magazine - 关于'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
