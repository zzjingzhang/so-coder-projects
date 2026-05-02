export interface Position {
  x: number
  y: number
}

export interface Level {
  id: number
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
  map: string[][]
  playerStart: Position
  boxes: Position[]
  targets: Position[]
  walls: Position[]
}

export type CellType = 'empty' | 'wall' | 'player' | 'box' | 'target' | 'boxOnTarget' | 'playerOnTarget'
