import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import HealthBalance from '../views/HealthBalance.vue'
import StudentRecipes from '../views/StudentRecipes.vue'
import Community from '../views/Community.vue'
import Store from '../views/Store.vue'
import ZenStudio from '../views/ZenStudio.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/health-balance',
    name: 'HealthBalance',
    component: HealthBalance
  },
  {
    path: '/student-recipes',
    name: 'StudentRecipes',
    component: StudentRecipes
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/zen-studio',
    name: 'ZenStudio',
    component: ZenStudio
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
