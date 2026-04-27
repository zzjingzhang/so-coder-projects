import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Devices from '../views/Devices.vue'
import Scenes from '../views/Scenes.vue'
import Automation from '../views/Automation.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: '仪表板' }
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Devices,
    meta: { title: '设备控制' }
  },
  {
    path: '/scenes',
    name: 'Scenes',
    component: Scenes,
    meta: { title: '场景设置' }
  },
  {
    path: '/automation',
    name: 'Automation',
    component: Automation,
    meta: { title: '自动化规则' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { title: '设置' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '智能家居控制面板'
  next()
})

export default router
