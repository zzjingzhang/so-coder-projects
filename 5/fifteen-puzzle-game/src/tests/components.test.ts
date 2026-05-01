import { describe, it, expect } from 'vitest'
import { createLevelFactory } from '@/utils'
import type { LevelConfig } from '@/types'

describe('Level Factory', () => {
  it('should create level with correct grid size', () => {
    const config = createLevelFactory(4)
    expect(config.gridSize).toBe(4)
    expect(config.size).toBe(16)
  })

  it('should create level with custom grid size', () => {
    const config = createLevelFactory(3)
    expect(config.gridSize).toBe(3)
    expect(config.size).toBe(9)
  })

  it('should return valid LevelConfig type', () => {
    const config = createLevelFactory(4)
    expect(config).toHaveProperty('size')
    expect(config).toHaveProperty('gridSize')
  })
})
