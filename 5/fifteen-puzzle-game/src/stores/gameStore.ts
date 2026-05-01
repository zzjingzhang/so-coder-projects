import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameStatus, TileDescriptor } from '@/types'
import {
  createShuffledTiles,
  getCoordinates,
  isAdjacent,
  isPuzzleSolved,
  swapTileProperties,
} from '@/utils'

const GRID_SIZE = 4

export const useGameStore = defineStore('game', () => {
  const tiles = ref<TileDescriptor[]>([])
  const moves = ref(0)
  const seconds = ref(0)
  const status = ref<GameStatus>('idle')
  const timerInterval = ref<ReturnType<typeof setInterval> | null>(null)

  const solvedTiles = computed(() => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
      const value = i === GRID_SIZE * GRID_SIZE - 1 ? 0 : i + 1
      const { row, col } = getCoordinates(i, GRID_SIZE)
      return { value, row, col, isBlank: value === 0 }
    })
  })

  const blankTileIndex = computed(() => {
    return tiles.value.findIndex(tile => tile.isBlank)
  })

  function startNewGame() {
    tiles.value = createShuffledTiles(GRID_SIZE)
    moves.value = 0
    seconds.value = 0
    status.value = 'playing'
    startTimer()
  }

  function resetGame() {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
    tiles.value = []
    moves.value = 0
    seconds.value = 0
    status.value = 'idle'
  }

  function pauseGame() {
    if (status.value === 'playing') {
      status.value = 'paused'
      stopTimer()
    }
  }

  function resumeGame() {
    if (status.value === 'paused') {
      status.value = 'playing'
      startTimer()
    }
  }

  function togglePause() {
    if (status.value === 'playing') {
      pauseGame()
    } else if (status.value === 'paused') {
      resumeGame()
    }
  }

  function moveTile(tileIndex: number) {
    if (status.value !== 'playing') return

    const blankIndex = blankTileIndex.value
    if (blankIndex === -1) return

    if (isAdjacent(tileIndex, blankIndex, GRID_SIZE)) {
      tiles.value = swapTileProperties(tiles.value, tileIndex, blankIndex)
      moves.value++

      if (isPuzzleSolved(tiles.value, GRID_SIZE)) {
        status.value = 'completed'
        stopTimer()
      }
    }
  }

  function solvePuzzle() {
    tiles.value = [...solvedTiles.value]
    status.value = 'completed'
    stopTimer()
  }

  function startTimer() {
    if (timerInterval.value) return
    timerInterval.value = setInterval(() => {
      seconds.value++
    }, 1000)
  }

  function stopTimer() {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  function formatTime(totalSeconds: number): string {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return {
    tiles,
    moves,
    seconds,
    status,
    blankTileIndex,
    startNewGame,
    resetGame,
    pauseGame,
    resumeGame,
    togglePause,
    moveTile,
    solvePuzzle,
    formatTime
  }
})
