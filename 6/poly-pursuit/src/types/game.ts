export interface Vector2D {
  x: number;
  y: number;
}

export interface GameObject {
  id: string;
  position: Vector2D;
  width: number;
  height: number;
  color: string;
  type: 'platform' | 'collectible' | 'player' | 'enemy' | 'portal' | 'hazard';
}

export interface Platform extends GameObject {
  type: 'platform';
  isMoving?: boolean;
  moveRange?: number;
  moveSpeed?: number;
  startPosition?: Vector2D;
}

export interface Collectible extends GameObject {
  type: 'collectible';
  subtype: 'energy' | 'relic' | 'key';
  value: number;
  collected: boolean;
}

export interface Player extends GameObject {
  type: 'player';
  velocity: Vector2D;
  isJumping: boolean;
  isOnGround: boolean;
  facingRight: boolean;
  health: number;
  maxHealth: number;
  score: number;
}

export interface Enemy extends GameObject {
  type: 'enemy';
  velocity: Vector2D;
  health: number;
  isHostile: boolean;
  patrolRange: number;
  startPosition: Vector2D;
}

export interface Portal extends GameObject {
  type: 'portal';
  targetLevel: number;
  isActive: boolean;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  platforms: Platform[];
  collectibles: Collectible[];
  enemies: Enemy[];
  portals: Portal[];
  playerStartPosition: Vector2D;
  backgroundColor: string;
  accentColor: string;
  requiredEnergy: number;
}

export interface GameState {
  currentLevel: number;
  totalScore: number;
  totalEnergy: number;
  collectedRelics: string[];
  unlockedLevels: number[];
  playerSkins: string[];
  isPaused: boolean;
  isGameOver: boolean;
  isVictory: boolean;
  gameTime: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
  currentSkin: string;
}

export type GameContextType = {
  gameState: GameState;
  settings: GameSettings;
  updateGameState: (updates: Partial<GameState>) => void;
  updateSettings: (updates: Partial<GameSettings>) => void;
  resetGame: () => void;
  loadGame: () => void;
  saveGame: () => void;
};
