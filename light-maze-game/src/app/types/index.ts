// 游戏核心类型定义

// 2D坐标点
export interface Point {
  x: number;
  y: number;
}

// 方向枚举
export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

// 墙壁位置
export enum WallPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

// 迷宫单元格
export interface MazeCell {
  row: number;
  col: number;
  walls: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  visited: boolean;
}

// 节点类型
export enum NodeType {
  Normal = 'normal',
  Sequence = 'sequence',
  Toggle = 'toggle',
}

// 游戏节点
export interface GameNode {
  id: string;
  row: number;
  col: number;
  type: NodeType;
  activated: boolean;
  sequenceOrder?: number; // 顺序节点的激活顺序
  requiredNodes?: string[]; // 需要先激活的节点ID
  effect?: NodeEffect; // 激活后的效果
}

// 节点激活效果
export interface NodeEffect {
  type: 'openPath' | 'revealArea' | 'unlockExit';
  targetCells?: { row: number; col: number }[]; // 影响的单元格
}

// 游戏出口
export interface GameExit {
  row: number;
  col: number;
  unlocked: boolean;
}

// 游戏关卡配置
export interface LevelConfig {
  levelNumber: number;
  mazeRows: number;
  mazeCols: number;
  playerStart: Point;
  nodes: GameNode[];
  exit: GameExit;
  lightRadius: number; // 光照半径
  requiredNodeCombinations: string[][]; // 解锁出口需要的节点组合
}

// 游戏状态
export enum GameState {
  Start = 'start',
  Playing = 'playing',
  LevelComplete = 'levelComplete',
  GameOver = 'gameOver',
}

// 玩家状态
export interface PlayerState {
  row: number;
  col: number;
  x: number;
  y: number;
  isMoving: boolean;
}

// 游戏事件
export type GameEvent = 
  | { type: 'nodeActivated'; nodeId: string }
  | { type: 'exitUnlocked' }
  | { type: 'levelComplete' }
  | { type: 'playerMoved'; position: Point };

// 游戏配置常量
export const GAME_CONFIG = {
  CELL_SIZE: 60, // 每个单元格的像素大小
  PLAYER_RADIUS: 8, // 玩家光点半径
  NODE_RADIUS: 10, // 节点半径
  EXIT_RADIUS: 15, // 出口半径
  LIGHT_RADIUS: 150, // 默认光照半径
  MOVE_SPEED: 5, // 移动速度（像素/帧）
  COLORS: {
    BACKGROUND: '#0a0a0f',
    WALL: '#ffffff',
    PLAYER: '#00ffff',
    PLAYER_GLOW: 'rgba(0, 255, 255, 0.3)',
    NODE: '#ffff00',
    NODE_ACTIVATED: '#00ff00',
    EXIT_LOCKED: '#666666',
    EXIT_UNLOCKED: '#ff00ff',
    LIGHT: 'rgba(0, 255, 255, 0.1)',
  },
};
