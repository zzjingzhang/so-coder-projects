export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'won';

export interface SudokuConfig {
  size: number;
  difficulty: Difficulty;
}

export interface SudokuCell {
  value: number;
  isFixed: boolean;
  isSelected: boolean;
  isError: boolean;
  isHighlighted: boolean;
}

export interface GameState {
  board: SudokuCell[][];
  solution: number[][];
  status: GameStatus;
  time: number;
  config: SudokuConfig;
}
