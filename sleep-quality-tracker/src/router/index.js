import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import RecordView from '../views/RecordView.vue'
import HistoryView from '../views/HistoryView.vue'
import GoalsView from '../views/GoalsView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/record',
    name: 'record',
    component: RecordView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/goals',
    name: 'goals',
    component: GoalsView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
