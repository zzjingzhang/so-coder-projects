<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { levels } from '../data/levels'
import type { Level, Position } from '../types'

interface CustomLevelData {
  player: Position
  boxes: Position[]
  targets: Position[]
  walls: Position[]
  width: number
  height: number
}

const route = useRoute()
const router = useRouter()

const currentLevelId = ref<number>(1)
const isCustomLevel = ref<boolean>(false)
const customLevelData = ref<CustomLevelData | null>(null)

const moves = ref<number>(0)
const gameWon = ref<boolean>(false)
const showLevelSelect = ref<boolean>(false)
const showSnackbar = ref<boolean>(false)
const snackbarMessage = ref<string>('')

const playerPosition = ref<Position>({ x: 0, y: 0 })
const boxPositions = ref<Position[]>([])
const targetPositions = ref<Position[]>([])
const wallPositions = ref<Position[]>([])
const originalPlayerPosition = ref<Position>({ x: 0, y: 0 })
const originalBoxPositions = ref<Position[]>([])

const currentLevel = computed<Level | undefined>(() => {
  if (isCustomLevel.value) return undefined
  return levels.find(l => l.id === currentLevelId.value)
})

const mapWidth = computed(() => {
  if (isCustomLevel.value && customLevelData.value) {
    return customLevelData.value.width
  }
  return currentLevel.value?.map[0]?.length || 0
})

const mapHeight = computed(() => {
  if (isCustomLevel.value && customLevelData.value) {
    return customLevelData.value.height
  }
  return currentLevel.value?.map.length || 0
})

const isWall = (x: number, y: number): boolean => {
  if (isCustomLevel.value) {
    return wallPositions.value.some(w => w.x === x && w.y === y)
  }
  return currentLevel.value?.walls.some(w => w.x === x && w.y === y) || false
}

const isTarget = (x: number, y: number): boolean => {
  if (isCustomLevel.value) {
    return targetPositions.value.some(t => t.x === x && t.y === y)
  }
  return currentLevel.value?.targets.some(t => t.x === x && t.y === y) || false
}

const getBoxIndex = (x: number, y: number): number => {
  return boxPositions.value.findIndex(b => b.x === x && b.y === y)
}

const hasBox = (x: number, y: number): boolean => {
  return getBoxIndex(x, y) !== -1
}

const checkWin = (): boolean => {
  return targetPositions.value.every(target =>
    boxPositions.value.some(box => box.x === target.x && box.y === target.y)
  )
}

const movePlayer = (dx: number, dy: number) => {
  if (gameWon.value) return

  const newX = playerPosition.value.x + dx
  const newY = playerPosition.value.y + dy

  if (isWall(newX, newY)) return

  const boxIndex = getBoxIndex(newX, newY)
  if (boxIndex !== -1) {
    const newBoxX = newX + dx
    const newBoxY = newY + dy

    if (isWall(newBoxX, newBoxY) || hasBox(newBoxX, newBoxY)) return

    boxPositions.value[boxIndex] = { x: newBoxX, y: newBoxY }
  }

  playerPosition.value = { x: newX, y: newY }
  moves.value++

  if (checkWin()) {
    gameWon.value = true
    showMessage(`🎉 恭喜过关！用了 ${moves.value} 步！`)
  }
}

const resetLevel = () => {
  playerPosition.value = { ...originalPlayerPosition.value }
  boxPositions.value = originalBoxPositions.value.map(b => ({ ...b }))
  moves.value = 0
  gameWon.value = false
}

const loadLevel = (levelId: number) => {
  const level = levels.find(l => l.id === levelId)
  if (!level) return

  isCustomLevel.value = false
  customLevelData.value = null
  currentLevelId.value = levelId
  playerPosition.value = { ...level.playerStart }
  boxPositions.value = level.boxes.map(b => ({ ...b }))
  targetPositions.value = level.targets.map(t => ({ ...t }))
  wallPositions.value = level.walls.map(w => ({ ...w }))
  originalPlayerPosition.value = { ...level.playerStart }
  originalBoxPositions.value = level.boxes.map(b => ({ ...b }))
  moves.value = 0
  gameWon.value = false
  showLevelSelect.value = false
}

const loadCustomLevel = () => {
  const saved = localStorage.getItem('customLevel')
  if (!saved) {
    showMessage('没有找到自定义关卡，请先在编辑器中创建')
    router.push('/editor')
    return
  }

  try {
    const data: CustomLevelData = JSON.parse(saved)
    isCustomLevel.value = true
    customLevelData.value = data
    currentLevelId.value = 0
    playerPosition.value = { ...data.player }
    boxPositions.value = data.boxes.map(b => ({ ...b }))
    targetPositions.value = data.targets.map(t => ({ ...t }))
    wallPositions.value = data.walls.map(w => ({ ...w }))
    originalPlayerPosition.value = { ...data.player }
    originalBoxPositions.value = data.boxes.map(b => ({ ...b }))
    moves.value = 0
    gameWon.value = false
    showLevelSelect.value = false
  } catch (e) {
    showMessage('加载自定义关卡失败')
    router.push('/editor')
  }
}

const showMessage = (message: string) => {
  snackbarMessage.value = message
  showSnackbar.value = true
}

const nextLevel = () => {
  if (isCustomLevel.value) {
    showMessage('自定义关卡没有下一关')
    return
  }
  const nextId = currentLevelId.value + 1
  if (nextId <= levels.length) {
    loadLevel(nextId)
  } else {
    showMessage('🎊 恭喜你完成了所有关卡！')
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      e.preventDefault()
      movePlayer(0, -1)
      break
    case 'ArrowDown':
    case 's':
    case 'S':
      e.preventDefault()
      movePlayer(0, 1)
      break
    case 'ArrowLeft':
    case 'a':
    case 'A':
      e.preventDefault()
      movePlayer(-1, 0)
      break
    case 'ArrowRight':
    case 'd':
    case 'D':
      e.preventDefault()
      movePlayer(1, 0)
      break
  }
}

watch(
  () => route.params.levelId,
  (levelId) => {
    if (levelId === 'custom') {
      loadCustomLevel()
    } else if (levelId) {
      const id = parseInt(levelId as string)
      if (!isNaN(id) && id >= 1 && id <= levels.length) {
        loadLevel(id)
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  if (!route.params.levelId) {
    loadLevel(1)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="game-view">
    <v-container class="py-4">
      <v-card class="mb-4" elevation="2">
        <v-card-title class="d-flex align-center justify-between">
          <span class="text-xl font-bold text-primary">
            <template v-if="isCustomLevel">
              🎯 自定义关卡
            </template>
            <template v-else>
              🎯 第 {{ currentLevelId }} 关：{{ currentLevel?.name }}
            </template>
          </span>
          <v-chip color="primary" size="large">
            步数：{{ moves }}
          </v-chip>
        </v-card-title>
      </v-card>

      <v-card class="mb-4" elevation="2">
        <v-card-text class="py-6 text-center">
          <div
            class="game-board mx-auto"
            :style="{
              display: 'grid',
              gridTemplateColumns: `repeat(${mapWidth}, 48px)`,
              gap: '2px',
              backgroundColor: '#E0E0E0',
              padding: '4px',
              borderRadius: '8px'
            }"
          >
            <template v-for="y in mapHeight" :key="y">
              <template v-for="x in mapWidth" :key="`${x}-${y}`">
                <div
                  class="cell"
                  :style="{
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    fontSize: '28px',
                    backgroundColor: isWall(x - 1, y - 1) ? '#795548' :
                      isTarget(x - 1, y - 1) ? '#C8E6C9' : '#FFFFFF'
                  }"
                >
                  <template v-if="isWall(x - 1, y - 1)">🧱</template>
                  <template v-else-if="playerPosition.x === x - 1 && playerPosition.y === y - 1">
                    <span :style="{ color: isTarget(x - 1, y - 1) ? '#4CAF50' : '#2196F3' }">😊</span>
                  </template>
                  <template v-else-if="hasBox(x - 1, y - 1)">
                    <span :style="{ color: isTarget(x - 1, y - 1) ? '#4CAF50' : '#FF9800' }">📦</span>
                  </template>
                  <template v-else-if="isTarget(x - 1, y - 1)">
                    <span style="color: #4CAF50; font-size: 16px;">●</span>
                  </template>
                </div>
              </template>
            </template>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mb-4" elevation="2">
        <v-card-title class="text-lg font-bold">🕹️ 控制按钮</v-card-title>
        <v-card-text class="py-4">
          <div class="d-flex flex-column align-center gap-2">
            <v-btn
              color="primary"
              size="large"
              fab
              @click="movePlayer(0, -1)"
              :disabled="gameWon"
            >
              <v-icon size="32">mdi-chevron-up</v-icon>
            </v-btn>
            <div class="d-flex gap-2">
              <v-btn
                color="primary"
                size="large"
                fab
                @click="movePlayer(-1, 0)"
                :disabled="gameWon"
              >
                <v-icon size="32">mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                color="primary"
                size="large"
                fab
                @click="movePlayer(0, 1)"
                :disabled="gameWon"
              >
                <v-icon size="32">mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn
                color="primary"
                size="large"
                fab
                @click="movePlayer(1, 0)"
                :disabled="gameWon"
              >
                <v-icon size="32">mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mb-4" elevation="2">
        <v-card-text class="py-4">
          <v-row class="justify-center" gap="2">
            <v-btn
              color="secondary"
              size="large"
              prepend-icon="mdi-refresh"
              @click="resetLevel"
            >
              重新开始
            </v-btn>
            <v-btn
              color="primary"
              size="large"
              prepend-icon="mdi-format-list-bulleted"
              @click="showLevelSelect = true"
            >
              选择关卡
            </v-btn>
            <v-btn
              color="info"
              size="large"
              prepend-icon="mdi-home"
              @click="router.push('/')"
            >
              返回首页
            </v-btn>
            <v-btn
              v-if="gameWon && !isCustomLevel && currentLevelId < levels.length"
              color="success"
              size="large"
              prepend-icon="mdi-skip-next"
              @click="nextLevel"
            >
              下一关
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card elevation="2">
        <v-card-text class="text-center text-gray-600 py-4">
          💡 提示：使用键盘方向键或 WASD 键也可以控制移动
        </v-card-text>
      </v-card>
    </v-container>

    <v-dialog v-model="showLevelSelect" max-width="700">
      <v-card>
        <v-card-title class="text-xl font-bold text-primary">🎯 选择关卡</v-card-title>
        <v-card-text>
          <v-row class="mb-4">
            <v-col cols="12">
              <v-card
                class="cursor-pointer hover:elevation-4 transition-elevation"
                :elevation="isCustomLevel ? 4 : 1"
                :color="isCustomLevel ? 'secondary' : undefined"
                @click="loadCustomLevel()"
              >
                <v-card-text class="text-center py-4">
                  <div class="text-lg font-medium">🎨 自定义关卡</div>
                  <div class="text-sm">从编辑器创建的关卡</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-divider class="mb-4"></v-divider>
          <v-subheader class="pl-0">预设关卡</v-subheader>
          <v-row>
            <v-col
              v-for="level in levels"
              :key="level.id"
              cols="6"
              sm="4"
              class="mb-2"
            >
              <v-card
                class="cursor-pointer hover:elevation-4 transition-elevation"
                :elevation="!isCustomLevel && currentLevelId === level.id ? 4 : 1"
                :color="!isCustomLevel && currentLevelId === level.id ? 'primary' : undefined"
                @click="loadLevel(level.id)"
              >
                <v-card-text class="text-center py-4">
                  <div class="text-lg font-medium">
                    第 {{ level.id }} 关
                  </div>
                  <div class="text-sm">{{ level.name }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showLevelSelect = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="showSnackbar"
      :timeout="3000"
      color="success"
      location="top"
    >
      {{ snackbarMessage }}
      <template #actions>
        <v-btn variant="text" @click="showSnackbar = false">
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
