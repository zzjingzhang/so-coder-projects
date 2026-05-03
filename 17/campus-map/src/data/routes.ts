import type { Route } from '@/types'

export const routes: Route[] = [
  {
    id: 'route-lib-gym',
    name: '图书馆 → 体育馆',
    from: 'lib',
    to: 'gym',
    path: [
      { x: 460, y: 240 },
      { x: 520, y: 240 },
      { x: 520, y: 200 },
      { x: 675, y: 200 },
    ],
    color: '#10b981',
  },
  {
    id: 'route-dorm-canteen',
    name: '宿舍 → 食堂',
    from: 'dorm-1',
    to: 'canteen-1',
    path: [
      { x: 145, y: 430 },
      { x: 145, y: 475 },
      { x: 200, y: 475 },
      { x: 250, y: 482 },
      { x: 300, y: 482 },
    ],
    color: '#f59e0b',
  },
  {
    id: 'route-teaching-playground',
    name: '教学楼 → 操场',
    from: 'teaching-a',
    to: 'playground',
    path: [
      { x: 250, y: 155 },
      { x: 300, y: 155 },
      { x: 300, y: 250 },
      { x: 400, y: 250 },
      { x: 500, y: 250 },
      { x: 600, y: 250 },
      { x: 600, y: 365 },
      { x: 670, y: 365 },
    ],
    color: '#ef4444',
  },
  {
    id: 'route-lib-canteen',
    name: '图书馆 → 食堂',
    from: 'lib',
    to: 'canteen-2',
    path: [
      { x: 460, y: 280 },
      { x: 460, y: 380 },
      { x: 460, y: 480 },
      { x: 450, y: 512 },
    ],
    color: '#3b82f6',
  },
  {
    id: 'route-admin-teaching',
    name: '行政楼 → 教学楼',
    from: 'admin',
    to: 'teaching-c',
    path: [
      { x: 350, y: 387 },
      { x: 250, y: 387 },
      { x: 250, y: 355 },
    ],
    color: '#8b5cf6',
  },
]
