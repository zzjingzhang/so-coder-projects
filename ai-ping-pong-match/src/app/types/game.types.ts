export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Ball {
  position: Position;
  velocity: Velocity;
  radius: number;
}

export interface Paddle {
  position: Position;
  width: number;
  height: number;
  speed: number;
}

export interface Player {
  id: number;
  name: string;
  paddle: Paddle;
  score: number;
  color: string;
  aiLevel: 'easy' | 'medium' | 'hard';
}

export enum GameState {
  IDLE = 'idle',
  PLAYING = 'playing',
  PAUSED = 'paused',
  FINISHED = 'finished'
}

export interface GameSettings {
  winningScore: number;
  ballSpeed: number;
  paddleSpeed: number;
  aiLevel: 'easy' | 'medium' | 'hard';
}

export interface ScoreEvent {
  playerId: number;
  newScore: number;
}

export interface GameStateChangeEvent {
  previousState: GameState;
  currentState: GameState;
}
