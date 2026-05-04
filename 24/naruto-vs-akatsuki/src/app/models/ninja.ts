export interface Ninja {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  health: number;
  maxHealth: number;
  damage: number;
  attackSpeed: number;
  range: number;
  specialAbility: string;
  color: string;
  row?: number;
  col?: number;
  isAttacking?: boolean;
  lastAttackTime?: number;
}

export const NINJA_TYPES: Omit<Ninja, 'id' | 'row' | 'col' | 'isAttacking' | 'lastAttackTime'>[] = [
  {
    name: '鸣人',
    emoji: '🍥',
    cost: 50,
    health: 100,
    maxHealth: 100,
    damage: 20,
    attackSpeed: 1500,
    range: 10,
    specialAbility: '螺旋丸',
    color: 'bg-orange-400'
  },
  {
    name: '佐助',
    emoji: '🔥',
    cost: 100,
    health: 80,
    maxHealth: 80,
    damage: 35,
    attackSpeed: 2000,
    range: 10,
    specialAbility: '火球术',
    color: 'bg-purple-500'
  },
  {
    name: '卡卡西',
    emoji: '💎',
    cost: 175,
    health: 120,
    maxHealth: 120,
    damage: 50,
    attackSpeed: 2500,
    range: 10,
    specialAbility: '写轮眼',
    color: 'bg-gray-500'
  },
  {
    name: '小樱',
    emoji: '🌸',
    cost: 75,
    health: 150,
    maxHealth: 150,
    damage: 10,
    attackSpeed: 3000,
    range: 2,
    specialAbility: '医疗忍术',
    color: 'bg-pink-400'
  },
  {
    name: '九尾',
    emoji: '🦊',
    cost: 50,
    health: 50,
    maxHealth: 50,
    damage: 0,
    attackSpeed: 5000,
    range: 0,
    specialAbility: '查克拉生产',
    color: 'bg-yellow-400'
  }
];
