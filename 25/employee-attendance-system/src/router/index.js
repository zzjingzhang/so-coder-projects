import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '员工签到系统' }
  },
  {
    path: '/employee-info',
    name: 'EmployeeInfo',
    component: () => import('@/views/EmployeeInfo.vue'),
    meta: { title: '员工信息管理' }
  },
  {
    path: '/leave-management',
    name: 'LeaveManagement',
    component: () => import('@/views/LeaveManagement.vue'),
    meta: { title: '请假人员管理' }
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: () => import('@/views/Attendance.vue'),
    meta: { title: '签到管理' }
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import('@/views/Summary.vue'),
    meta: { title: '数据汇总' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
