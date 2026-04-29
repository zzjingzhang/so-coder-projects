import type { Building, Resource, Order } from '../types';

export const initialResources: Resource[] = [
  { id: 'wood', name: '木头', icon: '🪵', amount: 50 },
  { id: 'stone', name: '石头', icon: '🪨', amount: 30 },
  { id: 'food', name: '食物', icon: '🍎', amount: 40 },
  { id: 'gold', name: '金币', icon: '💰', amount: 100 },
];

export const initialBuildings: Building[] = [
  {
    id: 'sawmill',
    name: '锯木厂',
    description: '自动生产木头，每10秒产出5个木头',
    icon: '🏭',
    cost: [
      { resourceId: 'wood', amount: 20 },
      { resourceId: 'stone', amount: 10 },
    ],
    production: { resourceId: 'wood', amount: 5, interval: 10000 },
    unlocked: true,
  },
  {
    id: 'quarry',
    name: '采石场',
    description: '自动生产石头，每12秒产出4个石头',
    icon: '⛏️',
    cost: [
      { resourceId: 'wood', amount: 15 },
      { resourceId: 'stone', amount: 5 },
      { resourceId: 'gold', amount: 20 },
    ],
    production: { resourceId: 'stone', amount: 4, interval: 12000 },
    unlocked: true,
  },
  {
    id: 'farm',
    name: '农场',
    description: '自动生产食物，每8秒产出6个食物',
    icon: '🌾',
    cost: [
      { resourceId: 'wood', amount: 25 },
      { resourceId: 'food', amount: 10 },
    ],
    production: { resourceId: 'food', amount: 6, interval: 8000 },
    unlocked: true,
  },
  {
    id: 'warehouse',
    name: '仓库',
    description: '增加所有资源的存储上限 +100',
    icon: '🏪',
    cost: [
      { resourceId: 'wood', amount: 50 },
      { resourceId: 'stone', amount: 30 },
      { resourceId: 'gold', amount: 50 },
    ],
    storage: { resourceId: 'all', capacity: 100 },
    unlocked: true,
  },
  {
    id: 'research_hut',
    name: '研究小屋',
    description: '解锁高级建筑和科技，需要达到一定资源才能解锁',
    icon: '🏫',
    cost: [
      { resourceId: 'wood', amount: 100 },
      { resourceId: 'stone', amount: 80 },
      { resourceId: 'gold', amount: 200 },
    ],
    production: { resourceId: 'gold', amount: 2, interval: 20000 },
    unlockCondition: { resourceId: 'gold', amount: 150 },
    unlocked: false,
  },
  {
    id: 'market',
    name: '市场',
    description: '可以交易资源，每15秒产出3个金币',
    icon: '🏬',
    cost: [
      { resourceId: 'wood', amount: 60 },
      { resourceId: 'stone', amount: 40 },
      { resourceId: 'gold', amount: 100 },
    ],
    production: { resourceId: 'gold', amount: 3, interval: 15000 },
    unlockCondition: { resourceId: 'gold', amount: 80 },
    unlocked: false,
  },
  {
    id: 'village_hall',
    name: '村庄大厅',
    description: '吸引更多村民，增加资源产出效率10%',
    icon: '🏛️',
    cost: [
      { resourceId: 'wood', amount: 150 },
      { resourceId: 'stone', amount: 100 },
      { resourceId: 'gold', amount: 300 },
    ],
    unlockCondition: { resourceId: 'gold', amount: 250 },
    unlocked: false,
  },
  {
    id: 'garden',
    name: '花园',
    description: '美化岛屿，每20秒产出2个金币和1个食物',
    icon: '🌸',
    cost: [
      { resourceId: 'wood', amount: 40 },
      { resourceId: 'food', amount: 30 },
      { resourceId: 'gold', amount: 60 },
    ],
    production: { resourceId: 'gold', amount: 2, interval: 20000 },
    unlocked: true,
  },
];

export const initialOrders: Order[] = [
  {
    id: 'order_1',
    name: '新手任务',
    description: '收集50个木头，建造第一个锯木厂',
    requirements: [
      { resourceId: 'wood', amount: 50 },
    ],
    rewards: [
      { resourceId: 'gold', amount: 50 },
    ],
    completed: false,
  },
  {
    id: 'order_2',
    name: '基础建设',
    description: '拥有100个石头和50个金币',
    requirements: [
      { resourceId: 'stone', amount: 100 },
      { resourceId: 'gold', amount: 50 },
    ],
    rewards: [
      { resourceId: 'wood', amount: 100 },
      { resourceId: 'food', amount: 50 },
    ],
    completed: false,
  },
  {
    id: 'order_3',
    name: '食物储备',
    description: '拥有200个食物',
    requirements: [
      { resourceId: 'food', amount: 200 },
    ],
    rewards: [
      { resourceId: 'gold', amount: 100 },
    ],
    completed: false,
  },
  {
    id: 'order_4',
    name: '财富积累',
    description: '拥有500个金币',
    requirements: [
      { resourceId: 'gold', amount: 500 },
    ],
    rewards: [
      { resourceId: 'wood', amount: 200 },
      { resourceId: 'stone', amount: 150 },
      { resourceId: 'food', amount: 100 },
    ],
    completed: false,
  },
  {
    id: 'order_5',
    name: '岛屿繁荣',
    description: '拥有1000个各类资源',
    requirements: [
      { resourceId: 'wood', amount: 1000 },
      { resourceId: 'stone', amount: 1000 },
      { resourceId: 'food', amount: 1000 },
      { resourceId: 'gold', amount: 1000 },
    ],
    rewards: [
      { resourceId: 'gold', amount: 1000 },
    ],
    completed: false,
  },
];

export const GRID_SIZE = 6;
export const BASE_STORAGE_CAPACITY = 200;
