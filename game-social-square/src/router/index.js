import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import UserProfileView from '../views/UserProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '游戏社交广场' }
  },
  {
    path: '/post/:id',
    name: 'post-detail',
    component: PostDetailView,
    meta: { title: '动态详情' }
  },
  {
    path: '/user/:id',
    name: 'user-profile',
    component: UserProfileView,
    meta: { title: '用户主页' }
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
  document.title = to.meta.title ? `${to.meta.title} - 游戏社交广场` : '游戏社交广场'
  next()
})

export default router
