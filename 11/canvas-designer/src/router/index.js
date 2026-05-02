import { createRouter, createWebHistory } from 'vue-router'
import CanvasEditor from '../views/CanvasEditor.vue'

const routes = [
  {
    path: '/',
    name: 'CanvasEditor',
    component: CanvasEditor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
