import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { title: '仪表盘', icon: 'mdi-view-dashboard' }
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: () => import('@/views/Exercise.vue'),
    meta: { title: '运动记录', icon: 'mdi-run' }
  },
  {
    path: '/weight',
    name: 'Weight',
    component: () => import('@/views/Weight.vue'),
    meta: { title: '体重管理', icon: 'mdi-scale-bathroom' }
  },
  {
    path: '/nutrition',
    name: 'Nutrition',
    component: () => import('@/views/Nutrition.vue'),
    meta: { title: '饮食日志', icon: 'mdi-food' }
  },
  {
    path: '/training',
    name: 'Training',
    component: () => import('@/views/Training.vue'),
    meta: { title: '训练计划', icon: 'mdi-dumbbell' }
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('@/views/Achievements.vue'),
    meta: { title: '成就系统', icon: 'mdi-trophy' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || '健身追踪'} - Fitness Tracker`;
  next();
});

export default router;
