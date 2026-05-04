import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MovieSeatBooking from '../views/MovieSeatBooking.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MovieSeatBooking',
    component: MovieSeatBooking
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
