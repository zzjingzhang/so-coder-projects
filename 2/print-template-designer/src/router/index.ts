import { createRouter, createWebHistory } from 'vue-router'
import PrintDesigner from '../views/PrintDesigner.vue'
import Examples from '../views/Examples.vue'

const routes = [
  {
    path: '/',
    name: 'designer',
    component: PrintDesigner
  },
  {
    path: '/examples',
    name: 'examples',
    component: Examples
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
