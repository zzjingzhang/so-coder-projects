export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameObject extends Position, Size {
  id: string;
  velocityX: number;
  velocityY: number;
}

export interface Player extends GameObject {
  health: number;
  score: number;
  isJumping: boolean;
  canShoot: boolean;
  shootCooldown: number;
}

export interface Bullet extends GameObject {
  isPlayerBullet: boolean;
  damage: number;
}

export interface Enemy extends GameObject {
  health: number;
  type: 'ground' | 'flying';
  moveDirection: number;
  shootTimer: number;
}

export interface Platform extends Position, Size {
  isGround: boolean;
}

export interface Ladder extends Position, Size {
  id: string;
}

export interface Coin extends GameObject {
  collected: boolean;
}

export interface PowerUp extends GameObject {
  type: 'health' | 'speed' | 'shield';
  collected: boolean;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  level: number;
  score: number;
}

export interface RobotPlayer extends Player {
  targetPosition: Position | null;
  decisionTimer: number;
}

export interface TouchControl {
  type: 'left' | 'right' | 'jump' | 'shoot';
  isActive: boolean;
}
