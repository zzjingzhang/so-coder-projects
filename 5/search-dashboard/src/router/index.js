import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '../pages/SearchPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/post'
    },
    {
      path: '/post',
      name: 'post',
      component: SearchPage,
      props: { tab: 'post' }
    },
    {
      path: '/img',
      name: 'img',
      component: SearchPage,
      props: { tab: 'img' }
    },
    {
      path: '/user',
      name: 'user',
      component: SearchPage,
      props: { tab: 'user' }
    }
  ]
})

export default router