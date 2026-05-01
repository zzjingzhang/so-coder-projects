export type GameStatus = 'idle' | 'playing' | 'paused' | 'completed'

export interface TileDescriptor {
  value: number | null
  row: number
  col: number
  isBlank: boolean
}

export interface TileAdjancency {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
}

export interface GameState {
  tiles: TileDescriptor[]
  moves: number
  seconds: number
  status: GameStatus
}

export interface LevelConfig {
  size: number
  gridSize: number
}
