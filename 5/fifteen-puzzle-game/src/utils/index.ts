import type { TileDescriptor, TileAdjancency, LevelConfig } from '@/types'

export function generateRange(start: number, end: number): number[] {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export function getRandomSubarray<T>(array: T[], length: number): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, length)
}

export function getCoordinates(index: number, gridSize: number): { row: number; col: number } {
  return {
    row: Math.floor(index / gridSize),
    col: index % gridSize
  }
}

export function getIndex(row: number, col: number, gridSize: number): number {
  return row * gridSize + col
}

export function calculateDistance(
  pos1: { row: number; col: number },
  pos2: { row: number; col: number }
): number {
  return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col)
}

export function swapTileProperties(
  tiles: TileDescriptor[],
  index1: number,
  index2: number
): TileDescriptor[] {
  const newTiles = [...tiles]
  const tempRow = newTiles[index1].row
  const tempCol = newTiles[index1].col
  newTiles[index1] = {
    ...newTiles[index1],
    row: newTiles[index2].row,
    col: newTiles[index2].col
  }
  newTiles[index2] = {
    ...newTiles[index2],
    row: tempRow,
    col: tempCol
  }
  return newTiles
}

export function getAdjacency(index: number, gridSize: number): TileAdjancency {
  const { row, col } = getCoordinates(index, gridSize)
  return {
    top: row > 0,
    bottom: row < gridSize - 1,
    left: col > 0,
    right: col < gridSize - 1
  }
}

export function isAdjacent(index1: number, index2: number, gridSize: number): boolean {
  const pos1 = getCoordinates(index1, gridSize)
  const pos2 = getCoordinates(index2, gridSize)
  return calculateDistance(pos1, pos2) === 1
}

export function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function createLevelFactory(gridSize: number = 4): LevelConfig {
  return {
    size: gridSize * gridSize,
    gridSize
  }
}

export function isSolvable(tiles: number[], gridSize: number): boolean {
  let inversions = 0
  const flatTiles = tiles.filter(t => t !== 0)

  for (let i = 0; i < flatTiles.length; i++) {
    for (let j = i + 1; j < flatTiles.length; j++) {
      if (flatTiles[i] > flatTiles[j]) {
        inversions++
      }
    }
  }

  if (gridSize % 2 === 1) {
    return inversions % 2 === 0
  } else {
    const blankRow = Math.floor(tiles.indexOf(0) / gridSize)
    const blankRowFromBottom = gridSize - blankRow
    return (inversions + blankRowFromBottom) % 2 === 1
  }
}

export function createShuffledTiles(gridSize: number = 4): TileDescriptor[] {
  const totalTiles = gridSize * gridSize
  const values = generateRange(1, totalTiles - 1)
  let shuffled = fisherYatesShuffle(values)

  shuffled.push(0)

  if (!isSolvable(shuffled, gridSize)) {
    if (shuffled[0] !== 0 && shuffled[1] !== 0) {
      ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
    }
  }

  return shuffled.map((value, index) => {
    const { row, col } = getCoordinates(index, gridSize)
    return {
      value,
      row,
      col,
      isBlank: value === 0
    }
  })
}

export function isPuzzleSolved(tiles: TileDescriptor[], gridSize: number): boolean {
  for (let i = 0; i < tiles.length - 1; i++) {
    const currentValue = tiles[i].value
    const nextValue = tiles[i + 1].value
    if (currentValue === 0 || nextValue === 0) continue
    if (currentValue > nextValue) return false
  }
  return true
}
