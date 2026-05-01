export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum TankType {
  PLAYER = 'player',
  ENEMY = 'enemy'
}

export enum BulletType {
  PLAYER = 'player',
  ENEMY = 'enemy'
}

export enum TileType {
  EMPTY = 0,
  BRICK = 1,
  STEEL = 2,
  WATER = 3,
  GRASS = 4,
  BASE = 5
}

export interface Position {
  x: number
  y: number
}

export interface Tank {
  id: string
  type: TankType
  position: Position
  direction: Direction
  health: number
  speed: number
  color: string
  canShoot: boolean
  lastShotTime: number
}

export interface Bullet {
  id: string
  type: BulletType
  position: Position
  direction: Direction
  speed: number
}

export interface GameMap {
  width: number
  height: number
  tileSize: number
  tiles: number[][]
}

export interface GameState {
  isPlaying: boolean
  isPaused: boolean
  isGameOver: boolean
  isVictory: boolean
  score: number
  lives: number
  level: number
  enemiesLeft: number
}

export interface Explosion {
  id: string
  position: Position
  size: number
  life: number
}