<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Position } from '../types'

const router = useRouter()

const gridWidth = ref<number>(8)
const gridHeight = ref<number>(8)
const selectedTool = ref<string>('wall')

const walls = ref<Position[]>([])
const player = ref<Position | null>(null)
const boxes = ref<Position[]>([])
const targets = ref<Position[]>([])

const tools = [
  { id: 'wall', label: '墙壁', icon: 'mdi-wall', color: 'brown' },
  { id: 'player', label: '玩家', icon: 'mdi-account', color: 'blue' },
  { id: 'box', label: '箱子', icon: 'mdi-package', color: 'orange' },
  { id: 'target', label: '目标', icon: 'mdi-checkbox-marked-circle', color: 'green' },
  { id: 'eraser', label: '橡皮擦', icon: 'mdi-eraser', color: 'gray' }
]

const isWall = (x: number, y: number): boolean => {
  return walls.value.some(w => w.x === x && w.y === y)
}

const isPlayer = (x: number, y: number): boolean => {
  return player.value?.x === x && player.value?.y === y
}

const isBox = (x: number, y: number): boolean => {
  return boxes.value.some(b => b.x === x && b.y === y)
}

const isTarget = (x: number, y: number): boolean => {
  return targets.value.some(t => t.x === x && t.y === y)
}

const handleCellClick = (x: number, y: number) => {
  switch (selectedTool.value) {
    case 'wall':
      const wallIndex = walls.value.findIndex(w => w.x === x && w.y === y)
      if (wallIndex !== -1) {
        walls.value.splice(wallIndex, 1)
      } else {
        walls.value.push({ x, y })
      }
      break
    case 'player':
      player.value = { x, y }
      break
    case 'box':
      const boxIndex = boxes.value.findIndex(b => b.x === x && b.y === y)
      if (boxIndex !== -1) {
        boxes.value.splice(boxIndex, 1)
      } else {
        boxes.value.push({ x, y })
      }
      break
    case 'target':
      const targetIndex = targets.value.findIndex(t => t.x === x && t.y === y)
      if (targetIndex !== -1) {
        targets.value.splice(targetIndex, 1)
      } else {
        targets.value.push({ x, y })
      }
      break
    case 'eraser':
      walls.value = walls.value.filter(w => !(w.x === x && w.y === y))
      if (player.value?.x === x && player.value?.y === y) {
        player.value = null
      }
      boxes.value = boxes.value.filter(b => !(b.x === x && b.y === y))
      targets.value = targets.value.filter(t => !(t.x === x && t.y === y))
      break
  }
}

const validateLevel = (): { valid: boolean; message: string } => {
  if (!player.value) {
    return { valid: false, message: '请放置一个玩家（😊）' }
  }
  if (boxes.value.length === 0) {
    return { valid: false, message: '请至少放置一个箱子（📦）' }
  }
  if (targets.value.length === 0) {
    return { valid: false, message: '请至少放置一个目标位置（绿色圆点）' }
  }
  if (boxes.value.length !== targets.value.length) {
    return { valid: false, message: `箱子数量（${boxes.value.length}）必须等于目标数量（${targets.value.length}）` }
  }
  return { valid: true, message: '' }
}

const saveLevel = () => {
  const validation = validateLevel()
  if (!validation.valid) {
    showMessage(validation.message)
    return
  }

  const levelData = {
    player: player.value,
    boxes: [...boxes.value],
    targets: [...targets.value],
    walls: [...walls.value],
    width: gridWidth.value,
    height: gridHeight.value
  }

  localStorage.setItem('customLevel', JSON.stringify(levelData))
  showMessage('关卡已保存！可以在游戏中选择"自定义关卡"来玩')
}

const clearAll = () => {
  walls.value = []
  player.value = null
  boxes.value = []
  targets.value = []
}

const showMessage = (message: string) => {
  snackbarMessage.value = message
  showSnackbar.value = true
}

const playCustomLevel = () => {
  const validation = validateLevel()
  if (!validation.valid) {
    showMessage(validation.message)
    return
  }

  const levelData = {
    player: player.value,
    boxes: [...boxes.value],
    targets: [...targets.value],
    walls: [...walls.value],
    width: gridWidth.value,
    height: gridHeight.value
  }

  localStorage.setItem('customLevel', JSON.stringify(levelData))
  router.push('/game/custom')
}

const showSnackbar = ref<boolean>(false)
const snackbarMessage = ref<string>('')

const loadSavedLevel = () => {
  const saved = localStorage.getItem('customLevel')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      gridWidth.value = data.width || 8
      gridHeight.value = data.height || 8
      player.value = data.player
      boxes.value = data.boxes || []
      targets.value = data.targets || []
      walls.value = data.walls || []
      showMessage('已加载之前保存的关卡')
    } catch (e) {
      showMessage('加载关卡失败')
    }
  } else {
    showMessage('没有找到保存的关卡')
  }
}
</script>

<template>
  <div class="editor-view">
    <v-container class="py-4">
      <v-card class="mb-4" elevation="2">
        <v-card-title class="text-xl font-bold text-primary">
          🎨 关卡编辑器
        </v-card-title>
        <v-card-text>
          <p class="text-gray-600 mb-4">
            在这里你可以创建自己的关卡！选择工具后点击网格来放置元素。
          </p>
        </v-card-text>
      </v-card>

      <v-card class="mb-4" elevation="2">
        <v-card-title class="text-lg font-bold">📐 网格设置</v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" sm="4">
              <v-text-field
                v-model.number="gridWidth"
                label="宽度（列数）"
                type="number"
                :min="3"
                :max="15"
                @update:model-value="clearAll"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model.number="gridHeight"
                label="高度（行数）"
                type="number"
                :min="3"
                :max="15"
                @update:model-value="clearAll"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                color="info"
                prepend-icon="mdi-folder-open"
                class="mr-2"
                @click="loadSavedLevel"
              >
                加载已保存的
              </v-btn>
              <v-btn
                color="error"
                prepend-icon="mdi-delete"
                @click="clearAll"
              >
                清空
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mb-4" elevation="2">
        <v-card-title class="text-lg font-bold">🛠️ 选择工具</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="tool in tools"
              :key="tool.id"
              cols="6"
              sm="3"
              md="auto"
            >
              <v-card
                class="cursor-pointer"
                :color="selectedTool === tool.id ? tool.color : undefined"
                :variant="selectedTool === tool.id ? 'flat' : 'outlined'"
                @click="selectedTool = tool.id"
              >
                <v-card-text class="text-center py-3">
                  <v-icon size="32" :color="selectedTool === tool.id ? 'white' : tool.color">
                    {{ tool.icon }}
                  </v-icon>
                  <div class="mt-1" :class="selectedTool === tool.id ? 'text-white' : ''">
                    {{ tool.label }}
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="mb-4" elevation="2">
        <v-card-title class="text-lg font-bold">👀 预览</v-card-title>
        <v-card-text class="py-6 text-center">
          <div
            class="editor-grid mx-auto"
            :style="{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridWidth}, 40px)`,
              gap: '2px',
              backgroundColor: '#E0E0E0',
              padding: '4px',
              borderRadius: '8px'
            }"
          >
            <template v-for="y in gridHeight" :key="y">
              <template v-for="x in gridWidth" :key="`${x}-${y}`">
                <div
                  class="cell cursor-pointer hover:opacity-80 transition-opacity"
                  :style="{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    fontSize: '24px',
                    backgroundColor: isWall(x - 1, y - 1) ? '#795548' :
                      isTarget(x - 1, y - 1) ? '#C8E6C9' : '#FFFFFF'
                  }"
                  @click="handleCellClick(x - 1, y - 1)"
                >
                  <template v-if="isWall(x - 1, y - 1)">🧱</template>
                  <template v-else-if="isPlayer(x - 1, y - 1)">
                    <span style="color: #2196F3;">😊</span>
                  </template>
                  <template v-else-if="isBox(x - 1, y - 1)">
                    <span style="color: #FF9800;">📦</span>
                  </template>
                  <template v-else-if="isTarget(x - 1, y - 1)">
                    <span style="color: #4CAF50; font-size: 14px;">●</span>
                  </template>
                </div>
              </template>
            </template>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mb-4" elevation="2">
        <v-card-title class="text-lg font-bold">📊 当前状态</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" sm="3">
              <v-chip color="blue" size="large">
                玩家：{{ player ? '✓' : '✗' }}
              </v-chip>
            </v-col>
            <v-col cols="6" sm="3">
              <v-chip color="orange" size="large">
                箱子：{{ boxes.length }} 个
              </v-chip>
            </v-col>
            <v-col cols="6" sm="3">
              <v-chip color="green" size="large">
                目标：{{ targets.length }} 个
              </v-chip>
            </v-col>
            <v-col cols="6" sm="3">
              <v-chip
                :color="boxes.length === targets.length ? 'success' : 'error'"
                size="large"
              >
                匹配：{{ boxes.length === targets.length ? '✓' : '✗' }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card elevation="2">
        <v-card-text class="py-4">
          <v-row class="justify-center" gap="2">
            <v-btn
              color="success"
              size="large"
              prepend-icon="mdi-play"
              @click="playCustomLevel"
            >
              开始游戏
            </v-btn>
            <v-btn
              color="primary"
              size="large"
              prepend-icon="mdi-content-save"
              @click="saveLevel"
            >
              保存关卡
            </v-btn>
            <v-btn
              color="info"
              size="large"
              prepend-icon="mdi-home"
              @click="router.push('/')"
            >
              返回首页
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-snackbar
      v-model="showSnackbar"
      :timeout="3000"
      color="info"
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
