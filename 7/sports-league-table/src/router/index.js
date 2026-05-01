import { createRouter, createWebHistory } from 'vue-router'
import LeagueTable from '../views/LeagueTable.vue'

const routes = [
  {
    path: '/',
    name: 'LeagueTable',
    component: LeagueTable
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
