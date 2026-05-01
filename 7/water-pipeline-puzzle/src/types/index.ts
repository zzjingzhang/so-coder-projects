// 管道类型
export type PipeType = 'straight' | 'corner' | 't-shape' | 'cross' | 'empty' | 'fountain' | 'pond';

// 管道连接方向
export type Direction = 'top' | 'right' | 'bottom' | 'left';

// 游戏单元格
export interface GameCell {
  id: string;
  row: number;
  col: number;
  type: PipeType;
  rotation: number; // 0, 90, 180, 270
  hasWater: boolean;
  isFixed: boolean; // 喷泉和池塘是固定的，不能旋转
}

// 游戏级别
export interface GameLevel {
  id: number;
  name: string;
  rows: number;
  cols: number;
  cells: GameCell[];
}

// 管道连接点定义
export interface PipeConnections {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

// 游戏状态
export type GameState = 'playing' | 'won';
