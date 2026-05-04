import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import TeamScore from '../views/TeamScore.vue'
import StudentScore from '../views/StudentScore.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/team'
  },
  {
    path: '/team',
    name: 'TeamScore',
    component: TeamScore,
    meta: { title: '小组积分' }
  },
  {
    path: '/student',
    name: 'StudentScore',
    component: StudentScore,
    meta: { title: '学生积分' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string || '班级积分系统'
  next()
})

export default router
