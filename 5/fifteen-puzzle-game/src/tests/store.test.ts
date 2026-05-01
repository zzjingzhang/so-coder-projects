import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameStore } from '@/stores/gameStore'

describe('Game Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with idle status', () => {
    const store = useGameStore()
    expect(store.status).toBe('idle')
    expect(store.moves).toBe(0)
    expect(store.seconds).toBe(0)
    expect(store.tiles).toHaveLength(0)
  })

  it('should start new game with 16 tiles', () => {
    const store = useGameStore()
    store.startNewGame()
    expect(store.tiles).toHaveLength(16)
    expect(store.status).toBe('playing')
    expect(store.moves).toBe(0)
    expect(store.seconds).toBe(0)
  })

  it('should reset game state', () => {
    const store = useGameStore()
    store.startNewGame()
    store.resetGame()
    expect(store.status).toBe('idle')
    expect(store.moves).toBe(0)
    expect(store.seconds).toBe(0)
    expect(store.tiles).toHaveLength(0)
  })

  it('should pause and resume game', () => {
    const store = useGameStore()
    store.startNewGame()
    store.pauseGame()
    expect(store.status).toBe('paused')
    store.resumeGame()
    expect(store.status).toBe('playing')
  })

  it('should toggle pause state', () => {
    const store = useGameStore()
    store.startNewGame()
    store.togglePause()
    expect(store.status).toBe('paused')
    store.togglePause()
    expect(store.status).toBe('playing')
  })

  it('should format time correctly', () => {
    const store = useGameStore()
    expect(store.formatTime(0)).toBe('00:00')
    expect(store.formatTime(65)).toBe('01:05')
    expect(store.formatTime(125)).toBe('02:05')
  })

  it('should solve puzzle instantly', () => {
    const store = useGameStore()
    store.startNewGame()
    store.solvePuzzle()
    expect(store.status).toBe('completed')
  })
})
