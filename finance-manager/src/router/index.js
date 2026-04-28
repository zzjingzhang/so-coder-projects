import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Transactions from '../views/Transactions.vue'
import Budget from '../views/Budget.vue'
import Investments from '../views/Investments.vue'
import Bills from '../views/Bills.vue'
import Reports from '../views/Reports.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: '仪表盘' }
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
    meta: { title: '收支记录' }
  },
  {
    path: '/budget',
    name: 'Budget',
    component: Budget,
    meta: { title: '预算控制' }
  },
  {
    path: '/investments',
    name: 'Investments',
    component: Investments,
    meta: { title: '投资跟踪' }
  },
  {
    path: '/bills',
    name: 'Bills',
    component: Bills,
    meta: { title: '账单提醒' }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { title: '财务报表' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - 理财管家'
  next()
})

export default router
