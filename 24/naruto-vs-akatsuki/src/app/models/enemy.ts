export interface Enemy {
  id: string;
  name: string;
  emoji: string;
  health: number;
  maxHealth: number;
  damage: number;
  speed: number;
  row: number;
  col: number;
  color: string;
  isMoving: boolean;
  isEating?: boolean;
  targetNinja?: string;
}

export const ENEMY_TYPES: Omit<Enemy, 'id' | 'row' | 'col' | 'isMoving' | 'isEating' | 'targetNinja'>[] = [
  {
    name: '晓成员',
    emoji: '🌑',
    health: 100,
    maxHealth: 100,
    damage: 20,
    speed: 0.5,
    color: 'bg-red-700'
  },
  {
    name: '佩恩',
    emoji: '💀',
    health: 250,
    maxHealth: 250,
    damage: 30,
    speed: 0.3,
    color: 'bg-purple-700'
  },
  {
    name: '大蛇丸',
    emoji: '🐍',
    health: 150,
    maxHealth: 150,
    damage: 25,
    speed: 0.8,
    color: 'bg-green-700'
  }
];
