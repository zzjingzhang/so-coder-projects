import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Professionals from '../views/Professionals.vue'
import Tools from '../views/Tools.vue'
import Community from '../views/Community.vue'
import Parents from '../views/Parents.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页 - SafeHaven' }
  },
  {
    path: '/professionals',
    name: 'Professionals',
    component: Professionals,
    meta: { title: '专业指导 - SafeHaven' }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools,
    meta: { title: '自助工具 - SafeHaven' }
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
    meta: { title: '社区交流 - SafeHaven' }
  },
  {
    path: '/parents',
    name: 'Parents',
    component: Parents,
    meta: { title: '家长资源 - SafeHaven' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录 - SafeHaven' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'SafeHaven'
  next()
})

export default router
