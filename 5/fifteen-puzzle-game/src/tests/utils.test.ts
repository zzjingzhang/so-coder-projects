import { describe, it, expect } from 'vitest'
import {
  generateRange,
  getRandomSubarray,
  getCoordinates,
  getIndex,
  calculateDistance,
  swapTileProperties,
  getAdjacency,
  isAdjacent,
  fisherYatesShuffle,
  createLevelFactory,
  isSolvable,
  createShuffledTiles,
  isPuzzleSolved
} from '@/utils'
import type { TileDescriptor } from '@/types'

describe('generateRange', () => {
  it('should generate range from start to end inclusive', () => {
    expect(generateRange(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('should return single element when start equals end', () => {
    expect(generateRange(3, 3)).toEqual([3])
  })

  it('should handle negative numbers', () => {
    expect(generateRange(-2, 2)).toEqual([-2, -1, 0, 1, 2])
  })
})

describe('getRandomSubarray', () => {
  it('should return array of specified length', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const result = getRandomSubarray(array, 3)
    expect(result).toHaveLength(3)
  })

  it('should return elements from original array', () => {
    const array = [1, 2, 3, 4, 5]
    const result = getRandomSubarray(array, 3)
    result.forEach(item => {
      expect(array).toContain(item)
    })
  })

  it('should return empty array when length is 0', () => {
    const result = getRandomSubarray([1, 2, 3], 0)
    expect(result).toEqual([])
  })
})

describe('getCoordinates', () => {
  it('should return correct coordinates for first index', () => {
    expect(getCoordinates(0, 4)).toEqual({ row: 0, col: 0 })
  })

  it('should return correct coordinates for last index', () => {
    expect(getCoordinates(15, 4)).toEqual({ row: 3, col: 3 })
  })

  it('should return correct coordinates for middle index', () => {
    expect(getCoordinates(5, 4)).toEqual({ row: 1, col: 1 })
  })
})

describe('getIndex', () => {
  it('should return correct index for coordinates', () => {
    expect(getIndex(0, 0, 4)).toBe(0)
    expect(getIndex(1, 1, 4)).toBe(5)
    expect(getIndex(3, 3, 4)).toBe(15)
  })
})

describe('calculateDistance', () => {
  it('should return 0 for same position', () => {
    expect(calculateDistance({ row: 0, col: 0 }, { row: 0, col: 0 })).toBe(0)
  })

  it('should return 1 for adjacent positions', () => {
    expect(calculateDistance({ row: 0, col: 0 }, { row: 0, col: 1 })).toBe(1)
    expect(calculateDistance({ row: 0, col: 0 }, { row: 1, col: 0 })).toBe(1)
  })

  it('should return correct distance for diagonal', () => {
    expect(calculateDistance({ row: 0, col: 0 }, { row: 2, col: 2 })).toBe(4)
  })
})

describe('swapTileProperties', () => {
  it('should swap row and col between two tiles', () => {
    const tiles: TileDescriptor[] = [
      { value: 1, row: 0, col: 0, isBlank: false },
      { value: 2, row: 0, col: 1, isBlank: false },
      { value: 0, row: 1, col: 1, isBlank: true }
    ]
    const result = swapTileProperties(tiles, 0, 1)
    expect(result[0].row).toBe(0)
    expect(result[0].col).toBe(1)
    expect(result[1].row).toBe(0)
    expect(result[1].col).toBe(0)
  })
})

describe('getAdjacency', () => {
  it('should return correct adjacency for corner tile', () => {
    const adj = getAdjacency(0, 4)
    expect(adj).toEqual({ top: false, bottom: true, left: false, right: true })
  })

  it('should return correct adjacency for center tile', () => {
    const adj = getAdjacency(5, 4)
    expect(adj).toEqual({ top: true, bottom: true, left: true, right: true })
  })
})

describe('isAdjacent', () => {
  it('should return true for adjacent tiles', () => {
    expect(isAdjacent(0, 1, 4)).toBe(true)
    expect(isAdjacent(0, 4, 4)).toBe(true)
  })

  it('should return false for non-adjacent tiles', () => {
    expect(isAdjacent(0, 15, 4)).toBe(false)
    expect(isAdjacent(5, 7, 4)).toBe(false)
  })
})

describe('fisherYatesShuffle', () => {
  it('should return array of same length', () => {
    const array = [1, 2, 3, 4, 5]
    const result = fisherYatesShuffle(array)
    expect(result).toHaveLength(5)
  })

  it('should contain all original elements', () => {
    const array = [1, 2, 3, 4, 5]
    const result = fisherYatesShuffle(array)
    expect(result.sort()).toEqual(array)
  })
})

describe('createLevelFactory', () => {
  it('should create level config with correct size', () => {
    const config = createLevelFactory(4)
    expect(config.size).toBe(16)
    expect(config.gridSize).toBe(4)
  })

  it('should use default grid size of 4', () => {
    const config = createLevelFactory()
    expect(config.gridSize).toBe(4)
  })
})

describe('isSolvable', () => {
  it('should return true for solved puzzle', () => {
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
    expect(isSolvable(tiles, 4)).toBe(true)
  })

  it('should detect unsolvable configuration', () => {
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15]
    expect(isSolvable(tiles, 4)).toBe(false)
  })
})

describe('createShuffledTiles', () => {
  it('should create array of 16 tiles', () => {
    const tiles = createShuffledTiles(4)
    expect(tiles).toHaveLength(16)
  })

  it('should have exactly one blank tile', () => {
    const tiles = createShuffledTiles(4)
    const blankTiles = tiles.filter(t => t.isBlank)
    expect(blankTiles).toHaveLength(1)
  })

  it('should have tiles with values 1-15 and 0', () => {
    const tiles = createShuffledTiles(4)
    const values = tiles.map(t => t.value).filter(v => v !== 0)
    values.sort((a, b) => (a ?? 0) - (b ?? 0))
    expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
  })
})

describe('isPuzzleSolved', () => {
  it('should return true for solved puzzle', () => {
    const tiles: TileDescriptor[] = [
      { value: 1, row: 0, col: 0, isBlank: false },
      { value: 2, row: 0, col: 1, isBlank: false },
      { value: 3, row: 0, col: 2, isBlank: false },
      { value: 4, row: 0, col: 3, isBlank: false },
      { value: 5, row: 1, col: 0, isBlank: false },
      { value: 6, row: 1, col: 1, isBlank: false },
      { value: 7, row: 1, col: 2, isBlank: false },
      { value: 8, row: 1, col: 3, isBlank: false },
      { value: 9, row: 2, col: 0, isBlank: false },
      { value: 10, row: 2, col: 1, isBlank: false },
      { value: 11, row: 2, col: 2, isBlank: false },
      { value: 12, row: 2, col: 3, isBlank: false },
      { value: 13, row: 3, col: 0, isBlank: false },
      { value: 14, row: 3, col: 1, isBlank: false },
      { value: 15, row: 3, col: 2, isBlank: false },
      { value: 0, row: 3, col: 3, isBlank: true }
    ]
    expect(isPuzzleSolved(tiles, 4)).toBe(true)
  })

  it('should return false for unsolved puzzle', () => {
    const tiles: TileDescriptor[] = [
      { value: 2, row: 0, col: 0, isBlank: false },
      { value: 1, row: 0, col: 1, isBlank: false },
      { value: 3, row: 0, col: 2, isBlank: false },
      { value: 4, row: 0, col: 3, isBlank: false },
      { value: 5, row: 1, col: 0, isBlank: false },
      { value: 6, row: 1, col: 1, isBlank: false },
      { value: 7, row: 1, col: 2, isBlank: false },
      { value: 8, row: 1, col: 3, isBlank: false },
      { value: 9, row: 2, col: 0, isBlank: false },
      { value: 10, row: 2, col: 1, isBlank: false },
      { value: 11, row: 2, col: 2, isBlank: false },
      { value: 12, row: 2, col: 3, isBlank: false },
      { value: 13, row: 3, col: 0, isBlank: false },
      { value: 14, row: 3, col: 1, isBlank: false },
      { value: 15, row: 3, col: 2, isBlank: false },
      { value: 0, row: 3, col: 3, isBlank: true }
    ]
    expect(isPuzzleSolved(tiles, 4)).toBe(false)
  })
})
