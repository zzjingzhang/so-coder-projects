export type LineType = 'fire' | 'slime' | 'magnet' | 'wall';

export interface Point {
  x: number;
  y: number;
}

export interface Line {
  id: string;
  type: LineType;
  points: Point[];
  thickness: number;
  createdAt: number;
  duration: number;
  durability: number;
  maxDurability: number;
}

export type EnemyType = 'normal' | 'fast' | 'tank' | 'fire-resistant' | 'ice-resistant';

export interface Enemy {
  id: string;
  type: EnemyType;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  speed: number;
  baseSpeed: number;
  pathIndex: number;
  path: Point[];
  slowedUntil: number;
  burningUntil: number;
  burnDamage: number;
  attractedTo: Point | null;
  size: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  startPoint: Point;
  endPoint: Point;
  enemyWaves: EnemyWave[];
  initialPaint: number;
  obstacles: Obstacle[];
}

export interface EnemyWave {
  delay: number;
  enemies: EnemySpawn[];
}

export interface EnemySpawn {
  type: EnemyType;
  count: number;
  interval: number;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameState {
  status: 'idle' | 'playing' | 'paused' | 'won' | 'lost';
  currentLevel: number;
  paint: number;
  maxPaint: number;
  lives: number;
  maxLives: number;
  score: number;
  waveIndex: number;
  selectedLineType: LineType;
  lines: Line[];
  enemies: Enemy[];
  particles: Particle[];
  currentWaveTime: number;
  spawnedEnemyCount: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

export const LINE_CONFIG: Record<LineType, {
  color: string;
  lightColor: string;
  paintCostPerPixel: number;
  duration: number;
  baseDurability: number;
  damage: number;
  slowFactor: number;
  attractRange: number;
}> = {
  fire: {
    color: '#ef4444',
    lightColor: '#fca5a5',
    paintCostPerPixel: 0.15,
    duration: 10000,
    baseDurability: 100,
    damage: 5,
    slowFactor: 1,
    attractRange: 0,
  },
  slime: {
    color: '#3b82f6',
    lightColor: '#93c5fd',
    paintCostPerPixel: 0.1,
    duration: 15000,
    baseDurability: 150,
    damage: 0,
    slowFactor: 0.4,
    attractRange: 0,
  },
  magnet: {
    color: '#f59e0b',
    lightColor: '#fcd34d',
    paintCostPerPixel: 0.2,
    duration: 8000,
    baseDurability: 80,
    damage: 0,
    slowFactor: 1,
    attractRange: 80,
  },
  wall: {
    color: '#374151',
    lightColor: '#9ca3af',
    paintCostPerPixel: 0.25,
    duration: 20000,
    baseDurability: 300,
    damage: 0,
    slowFactor: 0,
    attractRange: 0,
  },
};

export const ENEMY_CONFIG: Record<EnemyType, {
  health: number;
  speed: number;
  size: number;
  score: number;
  color: string;
  fireResistance: number;
  iceResistance: number;
}> = {
  normal: {
    health: 100,
    speed: 1.5,
    size: 24,
    score: 10,
    color: '#8b5cf6',
    fireResistance: 0,
    iceResistance: 0,
  },
  fast: {
    health: 60,
    speed: 3,
    size: 20,
    score: 15,
    color: '#10b981',
    fireResistance: 0,
    iceResistance: 0,
  },
  tank: {
    health: 300,
    speed: 0.8,
    size: 32,
    score: 30,
    color: '#6b7280',
    fireResistance: 0.5,
    iceResistance: 0.5,
  },
  'fire-resistant': {
    health: 120,
    speed: 1.2,
    size: 26,
    score: 20,
    color: '#f97316',
    fireResistance: 1,
    iceResistance: -0.5,
  },
  'ice-resistant': {
    health: 120,
    speed: 1.2,
    size: 26,
    score: 20,
    color: '#06b6d4',
    fireResistance: -0.5,
    iceResistance: 1,
  },
};

export const LEVELS: Level[] = [
  {
    id: 1,
    name: '初学者画廊',
    description: '学习基本的涂鸦防御技巧',
    startPoint: { x: 50, y: 300 },
    endPoint: { x: 750, y: 300 },
    enemyWaves: [
      {
        delay: 2000,
        enemies: [
          { type: 'normal', count: 5, interval: 1500 },
        ],
      },
    ],
    initialPaint: 500,
    obstacles: [],
  },
  {
    id: 2,
    name: '色彩实验室',
    description: '尝试不同颜色的组合效果',
    startPoint: { x: 50, y: 100 },
    endPoint: { x: 750, y: 500 },
    enemyWaves: [
      {
        delay: 2000,
        enemies: [
          { type: 'normal', count: 3, interval: 2000 },
        ],
      },
      {
        delay: 10000,
        enemies: [
          { type: 'fast', count: 4, interval: 1000 },
        ],
      },
    ],
    initialPaint: 600,
    obstacles: [
      { x: 300, y: 200, width: 80, height: 150 },
      { x: 500, y: 300, width: 100, height: 100 },
    ],
  },
  {
    id: 3,
    name: '涂鸦竞技场',
    description: '面对更多样化的敌人',
    startPoint: { x: 50, y: 300 },
    endPoint: { x: 750, y: 300 },
    enemyWaves: [
      {
        delay: 2000,
        enemies: [
          { type: 'normal', count: 4, interval: 1500 },
        ],
      },
      {
        delay: 10000,
        enemies: [
          { type: 'tank', count: 2, interval: 3000 },
        ],
      },
      {
        delay: 18000,
        enemies: [
          { type: 'fast', count: 6, interval: 800 },
        ],
      },
    ],
    initialPaint: 800,
    obstacles: [
      { x: 200, y: 150, width: 60, height: 120 },
      { x: 400, y: 350, width: 80, height: 100 },
      { x: 600, y: 200, width: 50, height: 150 },
    ],
  },
  {
    id: 4,
    name: '元素风暴',
    description: '对抗具有元素抗性的敌人',
    startPoint: { x: 100, y: 50 },
    endPoint: { x: 700, y: 550 },
    enemyWaves: [
      {
        delay: 2000,
        enemies: [
          { type: 'fire-resistant', count: 3, interval: 2000 },
        ],
      },
      {
        delay: 10000,
        enemies: [
          { type: 'ice-resistant', count: 3, interval: 2000 },
        ],
      },
      {
        delay: 18000,
        enemies: [
          { type: 'normal', count: 4, interval: 1500 },
          { type: 'tank', count: 1, interval: 5000 },
        ],
      },
    ],
    initialPaint: 1000,
    obstacles: [
      { x: 250, y: 100, width: 100, height: 80 },
      { x: 450, y: 250, width: 80, height: 120 },
      { x: 300, y: 400, width: 120, height: 60 },
      { x: 550, y: 450, width: 70, height: 100 },
    ],
  },
  {
    id: 5,
    name: '终极挑战',
    description: '所有技能的终极考验',
    startPoint: { x: 50, y: 50 },
    endPoint: { x: 750, y: 550 },
    enemyWaves: [
      {
        delay: 1500,
        enemies: [
          { type: 'normal', count: 5, interval: 1000 },
        ],
      },
      {
        delay: 8000,
        enemies: [
          { type: 'fast', count: 8, interval: 600 },
        ],
      },
      {
        delay: 15000,
        enemies: [
          { type: 'fire-resistant', count: 3, interval: 1500 },
          { type: 'ice-resistant', count: 3, interval: 1500 },
        ],
      },
      {
        delay: 25000,
        enemies: [
          { type: 'tank', count: 4, interval: 2500 },
        ],
      },
    ],
    initialPaint: 1500,
    obstacles: [
      { x: 150, y: 100, width: 80, height: 100 },
      { x: 350, y: 150, width: 60, height: 150 },
      { x: 550, y: 100, width: 100, height: 80 },
      { x: 200, y: 300, width: 120, height: 60 },
      { x: 450, y: 350, width: 80, height: 100 },
      { x: 600, y: 300, width: 70, height: 120 },
      { x: 300, y: 480, width: 100, height: 60 },
      { x: 500, y: 500, width: 90, height: 50 },
    ],
  },
];
