import { createRouter, createWebHistory } from 'vue-router'
import CityNightView from '../views/CityNightView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CityNightView
    }
  ]
})

export default router
