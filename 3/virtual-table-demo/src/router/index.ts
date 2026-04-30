import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import VirtualTableDemo from '@/views/VirtualTableDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'demo',
          name: 'demo',
          component: VirtualTableDemo
        }
      ]
    }
  ]
})

export default router
