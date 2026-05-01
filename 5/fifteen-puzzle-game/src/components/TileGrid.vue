<template>
  <div class="tile-grid">
    <div
      v-for="(tile, index) in store.tiles"
      :key="index"
      class="tile-container"
    >
      <v-card
        v-if="!tile.isBlank"
        :class="[
          'tile',
          { 'tile-movable': isMovable(index) }
        ]"
        :elevation="isMovable(index) ? 4 : 2"
        @click="handleTileClick(index)"
      >
        <div class="tile-content">
          <span class="tile-value">{{ tile.value }}</span>
        </div>
      </v-card>
      <div v-else class="tile blank-tile"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { isAdjacent } from '@/utils'

const store = useGameStore()
const GRID_SIZE = 4

function isMovable(index: number): boolean {
  if (store.status !== 'playing') return false
  const blankIndex = store.blankTileIndex
  if (blankIndex === -1) return false
  return isAdjacent(index, blankIndex, GRID_SIZE)
}

function handleTileClick(index: number) {
  if (isMovable(index)) {
    store.moveTile(index)
  }
}
</script>

<style scoped>
.tile-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
}

.tile-container {
  aspect-ratio: 1;
}

.tile {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  cursor: default;
  transition: all 0.2s ease;
}

.tile-movable {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  cursor: pointer;
  transform: scale(1);
}

.tile-movable:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.tile-movable:active {
  transform: scale(0.98);
}

.tile-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.tile-movable .tile-value {
  color: white;
}

.blank-tile {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

@media (max-width: 500px) {
  .tile-grid {
    gap: 6px;
    padding: 12px;
  }

  .tile-value {
    font-size: 1.5rem;
  }
}
</style>
