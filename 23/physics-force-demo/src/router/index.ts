import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PhysicsForceDemo from '../views/PhysicsForceDemo.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'PhysicsForceDemo',
    component: PhysicsForceDemo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
