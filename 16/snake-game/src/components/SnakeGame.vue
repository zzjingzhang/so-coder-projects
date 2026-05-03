<template>
  <div class="game-container">
    <v-container fluid class="h-full d-flex flex-column align-center justify-center p-2">
      <v-row align="center" justify="center" class="w-100 mb-2">
        <v-col cols="auto" class="text-center">
          <h1 class="text-h4 font-bold mb-0 text-primary">
            🐍 贪吃蛇游戏
          </h1>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-around" class="w-100 mb-2">
        <v-col cols="auto">
          <v-chip size="large" color="primary" variant="flat">
            <v-icon left>mdi-trophy</v-icon>
            得分: {{ score }}
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-chip size="large" color="accent" variant="flat">
            <v-icon left>mdi-speedometer</v-icon>
            难度: {{ difficultyLabel }}
          </v-chip>
        </v-col>
        <v-col cols="auto" v-if="gameState === 'playing'">
          <v-chip size="large" color="warning" variant="flat" :class="{ 'pulse-animation': obstacleWarning }">
            <v-icon left :color="obstacleWarning ? 'error' : 'inherit'">mdi-alert-circle</v-icon>
            {{ obstacleCountdown > 0 ? `障碍倒计时: ${obstacleCountdown}秒` : '障碍已生成' }}
          </v-chip>
        </v-col>
      </v-row>

      <v-row justify="center" class="w-100">
        <v-col cols="12" md="8" lg="7" class="d-flex justify-center">
          <div class="game-board-wrapper" :style="boardStyle">
            <canvas 
              ref="gameCanvas" 
              :width="canvasWidth" 
              :height="canvasHeight"
              class="game-canvas"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
            ></canvas>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center" class="w-100 mt-3 mb-2">
        <v-col cols="auto" class="d-flex gap-2">
          <v-btn 
            color="success" 
            size="large" 
            @click="startGame"
            :disabled="gameState === 'playing'"
            prepend-icon="mdi-play"
          >
            开始游戏
          </v-btn>
          <v-btn 
            color="warning" 
            size="large" 
            @click="pauseGame"
            :disabled="gameState !== 'playing'"
            prepend-icon="mdi-pause"
          >
            暂停
          </v-btn>
          <v-btn 
            color="error" 
            size="large" 
            @click="resetGame"
            prepend-icon="mdi-refresh"
          >
            重置
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center" class="w-100 mb-2">
        <v-col cols="auto" class="d-flex gap-2">
          <v-btn 
            :color="difficulty === 'easy' ? 'accent' : 'primary'" 
            :variant="difficulty === 'easy' ? 'elevated' : 'outlined'"
            size="large" 
            @click="setDifficulty('easy')"
            prepend-icon="mdi-emoticon-happy"
          >
            简单
          </v-btn>
          <v-btn 
            :color="difficulty === 'medium' ? 'accent' : 'primary'" 
            :variant="difficulty === 'medium' ? 'elevated' : 'outlined'"
            size="large" 
            @click="setDifficulty('medium')"
            prepend-icon="mdi-emoticon-neutral"
          >
            中等
          </v-btn>
          <v-btn 
            :color="difficulty === 'hard' ? 'accent' : 'primary'" 
            :variant="difficulty === 'hard' ? 'elevated' : 'outlined'"
            size="large" 
            @click="setDifficulty('hard')"
            prepend-icon="mdi-emoticon-devil"
          >
            困难
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center" class="w-100 mt-2 d-none d-md-flex">
        <v-col cols="auto" class="text-center text-caption text-gray-400">
          使用键盘方向键或 WASD 控制蛇的移动
        </v-col>
      </v-row>

      <v-row justify="center" class="w-100 d-md-none mt-2">
        <v-col cols="auto">
          <div class="touch-controls">
            <div class="touch-row">
              <v-btn 
                fab 
                size="large" 
                color="primary" 
                elevation="8"
                @mousedown="handleDirection('up')"
                @touchstart.prevent="handleDirection('up')"
              >
                <v-icon size="large">mdi-chevron-up</v-icon>
              </v-btn>
            </div>
            <div class="touch-row gap-4">
              <v-btn 
                fab 
                size="large" 
                color="primary" 
                elevation="8"
                @mousedown="handleDirection('left')"
                @touchstart.prevent="handleDirection('left')"
              >
                <v-icon size="large">mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn 
                fab 
                size="large" 
                color="primary" 
                elevation="8"
                @mousedown="handleDirection('down')"
                @touchstart.prevent="handleDirection('down')"
              >
                <v-icon size="large">mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn 
                fab 
                size="large" 
                color="primary" 
                elevation="8"
                @mousedown="handleDirection('right')"
                @touchstart.prevent="handleDirection('right')"
              >
                <v-icon size="large">mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-dialog v-model="showGameOver" max-width="400">
        <v-card class="bg-surface">
          <v-card-title class="text-h4 text-center text-error">
            游戏结束！
          </v-card-title>
          <v-card-text class="text-center">
            <p class="text-h6 mb-4">最终得分: <span class="text-primary font-bold">{{ score }}</span></p>
            <p class="text-caption text-gray-400">
              按空格键或点击下方按钮重新开始
            </p>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <v-btn color="primary" size="large" @click="resetGame" prepend-icon="mdi-refresh">
              再来一局
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const gameCanvas = ref(null)
const canvasWidth = ref(600)
const canvasHeight = ref(600)
const score = ref(0)
const gameState = ref('idle')
const difficulty = ref('medium')
const showGameOver = ref(false)
const obstacleCountdown = ref(0)
const obstacleWarning = ref(false)
const boardSize = ref(600)

const GRID_SIZE = 20
const INITIAL_SNAKE_LENGTH = 3
const OBSTACLE_FIRST_DELAY = 15000
const OBSTACLE_INTERVAL = 20000
const OBSTACLE_WARNING_TIME = 5000

const speedSettings = {
  easy: 150,
  medium: 100,
  hard: 60
}

const difficultyLabels = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}

const difficultyLabel = computed(() => difficultyLabels[difficulty.value])

const boardStyle = computed(() => {
  return {
    width: `${boardSize.value}px`,
    height: `${boardSize.value}px`
  }
})

let snake = []
let direction = 'right'
let nextDirection = 'right'
let food = { x: 0, y: 0 }
let obstacles = []
let gameLoopId = null
let obstacleTimeoutId = null
let warningTimeoutId = null
let gameStartTime = 0
let touchStartX = 0
let touchStartY = 0
let ctx = null
let gridCols = 0
let gridRows = 0

function initGame() {
  const canvas = gameCanvas.value
  if (!canvas) return
  
  ctx = canvas.getContext('2d')
  gridCols = Math.floor(canvas.width / GRID_SIZE)
  gridRows = Math.floor(canvas.height / GRID_SIZE)
  
  const startX = Math.floor(gridCols / 2)
  const startY = Math.floor(gridRows / 2)
  
  snake = []
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.push({ x: startX - i, y: startY })
  }
  
  direction = 'right'
  nextDirection = 'right'
  obstacles = []
  score.value = 0
  obstacleCountdown.value = 0
  obstacleWarning.value = false
  
  spawnFood()
  draw()
}

function spawnFood() {
  let newFood
  do {
    newFood = {
      x: Math.floor(Math.random() * gridCols),
      y: Math.floor(Math.random() * gridRows)
    }
  } while (isPositionOccupied(newFood))
  
  food = newFood
}

function isPositionOccupied(pos) {
  if (snake.some(segment => segment.x === pos.x && segment.y === pos.y)) {
    return true
  }
  if (obstacles.some(obstacle => obstacle.x === pos.x && obstacle.y === pos.y)) {
    return true
  }
  return false
}

function generateObstacles() {
  obstacles = []
  const numObstacles = 8 + Math.floor(Math.random() * 5)
  
  for (let i = 0; i < numObstacles; i++) {
    const patternType = Math.floor(Math.random() * 4)
    const startX = Math.floor(Math.random() * (gridCols - 6)) + 3
    const startY = Math.floor(Math.random() * (gridRows - 6)) + 3
    
    let patternObstacles = []
    
    switch (patternType) {
      case 0:
        for (let j = 0; j < 3; j++) {
          patternObstacles.push({ x: startX + j, y: startY })
        }
        break
      case 1:
        for (let j = 0; j < 3; j++) {
          patternObstacles.push({ x: startX, y: startY + j })
        }
        break
      case 2:
        patternObstacles.push({ x: startX, y: startY })
        patternObstacles.push({ x: startX + 1, y: startY })
        patternObstacles.push({ x: startX, y: startY + 1 })
        patternObstacles.push({ x: startX + 1, y: startY + 1 })
        break
      case 3:
        patternObstacles.push({ x: startX, y: startY })
        patternObstacles.push({ x: startX + 1, y: startY })
        patternObstacles.push({ x: startX + 2, y: startY })
        patternObstacles.push({ x: startX + 1, y: startY + 1 })
        patternObstacles.push({ x: startX + 1, y: startY + 2 })
        break
    }
    
    patternObstacles.forEach(obstacle => {
      if (obstacle.x >= 0 && obstacle.x < gridCols && 
          obstacle.y >= 0 && obstacle.y < gridRows &&
          !isPositionOccupied(obstacle) &&
          !isNearSnakeHead(obstacle)) {
        obstacles.push(obstacle)
      }
    })
  }
  
  obstacleCountdown.value = Math.ceil(OBSTACLE_INTERVAL / 1000)
  obstacleWarning.value = false
}

function isNearSnakeHead(pos) {
  if (snake.length === 0) return false
  const head = snake[0]
  const distance = Math.abs(head.x - pos.x) + Math.abs(head.y - pos.y)
  return distance < 5
}

function scheduleNextObstacle() {
  if (gameState.value !== 'playing') return
  
  const nextInterval = OBSTACLE_INTERVAL - OBSTACLE_WARNING_TIME
  
  warningTimeoutId = setTimeout(() => {
    if (gameState.value === 'playing') {
      obstacleWarning.value = true
      obstacleCountdown.value = Math.ceil(OBSTACLE_WARNING_TIME / 1000)
      
      const countdownInterval = setInterval(() => {
        if (gameState.value !== 'playing') {
          clearInterval(countdownInterval)
          return
        }
        obstacleCountdown.value--
        if (obstacleCountdown.value <= 0) {
          clearInterval(countdownInterval)
        }
      }, 1000)
      
      obstacleTimeoutId = setTimeout(() => {
        if (gameState.value === 'playing') {
          generateObstacles()
          scheduleNextObstacle()
        }
      }, OBSTACLE_WARNING_TIME)
    }
  }, nextInterval)
}

function moveSnake() {
  direction = nextDirection
  
  const head = { ...snake[0] }
  
  switch (direction) {
    case 'up':
      head.y--
      break
    case 'down':
      head.y++
      break
    case 'left':
      head.x--
      break
    case 'right':
      head.x++
      break
  }
  
  if (checkCollision(head)) {
    gameOver()
    return
  }
  
  snake.unshift(head)
  
  if (head.x === food.x && head.y === food.y) {
    score.value += 10
    spawnFood()
  } else {
    snake.pop()
  }
  
  draw()
}

function checkCollision(head) {
  if (head.x < 0 || head.x >= gridCols || head.y < 0 || head.y >= gridRows) {
    return true
  }
  
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true
    }
  }
  
  for (let obstacle of obstacles) {
    if (obstacle.x === head.x && obstacle.y === head.y) {
      return true
    }
  }
  
  return false
}

function draw() {
  const canvas = gameCanvas.value
  if (!canvas || !ctx) return
  
  ctx.fillStyle = '#0a0a1a'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)'
  ctx.lineWidth = 1
  
  for (let i = 0; i <= gridCols; i++) {
    ctx.beginPath()
    ctx.moveTo(i * GRID_SIZE, 0)
    ctx.lineTo(i * GRID_SIZE, canvas.height)
    ctx.stroke()
  }
  
  for (let i = 0; i <= gridRows; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * GRID_SIZE)
    ctx.lineTo(canvas.width, i * GRID_SIZE)
    ctx.stroke()
  }
  
  obstacles.forEach(obstacle => {
    const gradient = ctx.createRadialGradient(
      obstacle.x * GRID_SIZE + GRID_SIZE / 2,
      obstacle.y * GRID_SIZE + GRID_SIZE / 2,
      0,
      obstacle.x * GRID_SIZE + GRID_SIZE / 2,
      obstacle.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2
    )
    gradient.addColorStop(0, '#ff3366')
    gradient.addColorStop(1, '#991144')
    
    ctx.fillStyle = gradient
    ctx.shadowColor = '#ff3366'
    ctx.shadowBlur = 10
    ctx.fillRect(
      obstacle.x * GRID_SIZE + 1,
      obstacle.y * GRID_SIZE + 1,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    )
    ctx.shadowBlur = 0
  })
  
  snake.forEach((segment, index) => {
    const isHead = index === 0
    const alpha = 1 - (index / snake.length) * 0.5
    
    const gradient = ctx.createRadialGradient(
      segment.x * GRID_SIZE + GRID_SIZE / 2,
      segment.y * GRID_SIZE + GRID_SIZE / 2,
      0,
      segment.x * GRID_SIZE + GRID_SIZE / 2,
      segment.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2
    )
    
    if (isHead) {
      gradient.addColorStop(0, '#00ff88')
      gradient.addColorStop(1, '#00aa55')
      ctx.shadowColor = '#00ff88'
      ctx.shadowBlur = 15
    } else {
      gradient.addColorStop(0, `rgba(0, 212, 255, ${alpha})`)
      gradient.addColorStop(1, `rgba(0, 150, 200, ${alpha})`)
      ctx.shadowColor = 'rgba(0, 212, 255, 0.5)'
      ctx.shadowBlur = 8
    }
    
    ctx.fillStyle = gradient
    const padding = 1
    const radius = 4
    
    roundRect(
      ctx,
      segment.x * GRID_SIZE + padding,
      segment.y * GRID_SIZE + padding,
      GRID_SIZE - padding * 2,
      GRID_SIZE - padding * 2,
      radius
    )
    ctx.fill()
    ctx.shadowBlur = 0
    
    if (isHead) {
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#ffffff'
      ctx.shadowBlur = 5
      
      const eyeSize = 3
      const eyeOffset = 5
      
      let eye1X, eye1Y, eye2X, eye2Y
      
      switch (direction) {
        case 'right':
          eye1X = segment.x * GRID_SIZE + GRID_SIZE - eyeOffset
          eye1Y = segment.y * GRID_SIZE + eyeOffset
          eye2X = segment.x * GRID_SIZE + GRID_SIZE - eyeOffset
          eye2Y = segment.y * GRID_SIZE + GRID_SIZE - eyeOffset
          break
        case 'left':
          eye1X = segment.x * GRID_SIZE + eyeOffset
          eye1Y = segment.y * GRID_SIZE + eyeOffset
          eye2X = segment.x * GRID_SIZE + eyeOffset
          eye2Y = segment.y * GRID_SIZE + GRID_SIZE - eyeOffset
          break
        case 'up':
          eye1X = segment.x * GRID_SIZE + eyeOffset
          eye1Y = segment.y * GRID_SIZE + eyeOffset
          eye2X = segment.x * GRID_SIZE + GRID_SIZE - eyeOffset
          eye2Y = segment.y * GRID_SIZE + eyeOffset
          break
        case 'down':
          eye1X = segment.x * GRID_SIZE + eyeOffset
          eye1Y = segment.y * GRID_SIZE + GRID_SIZE - eyeOffset
          eye2X = segment.x * GRID_SIZE + GRID_SIZE - eyeOffset
          eye2Y = segment.y * GRID_SIZE + GRID_SIZE - eyeOffset
          break
      }
      
      ctx.beginPath()
      ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }
  })
  
  const foodGradient = ctx.createRadialGradient(
    food.x * GRID_SIZE + GRID_SIZE / 2,
    food.y * GRID_SIZE + GRID_SIZE / 2,
    0,
    food.x * GRID_SIZE + GRID_SIZE / 2,
    food.y * GRID_SIZE + GRID_SIZE / 2,
    GRID_SIZE / 2
  )
  foodGradient.addColorStop(0, '#ff00ff')
  foodGradient.addColorStop(1, '#aa00aa')
  
  ctx.fillStyle = foodGradient
  ctx.shadowColor = '#ff00ff'
  ctx.shadowBlur = 15
  
  ctx.beginPath()
  ctx.arc(
    food.x * GRID_SIZE + GRID_SIZE / 2,
    food.y * GRID_SIZE + GRID_SIZE / 2,
    GRID_SIZE / 2 - 2,
    0,
    Math.PI * 2
  )
  ctx.fill()
  ctx.shadowBlur = 0
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

function startGame() {
  if (gameState.value === 'playing') return
  
  if (gameState.value === 'idle' || gameState.value === 'gameover') {
    initGame()
  }
  
  gameState.value = 'playing'
  gameStartTime = Date.now()
  obstacleCountdown.value = Math.ceil(OBSTACLE_FIRST_DELAY / 1000)
  
  if (obstacles.length === 0) {
    const firstWarningTime = OBSTACLE_FIRST_DELAY - OBSTACLE_WARNING_TIME
    const initialCountdown = Math.ceil(OBSTACLE_FIRST_DELAY / 1000)
    obstacleCountdown.value = initialCountdown
    
    const countdownInterval = setInterval(() => {
      if (gameState.value !== 'playing') {
        clearInterval(countdownInterval)
        return
      }
      obstacleCountdown.value--
      if (obstacleCountdown.value <= 5) {
        obstacleWarning.value = true
      }
      if (obstacleCountdown.value <= 0) {
        clearInterval(countdownInterval)
      }
    }, 1000)
    
    warningTimeoutId = setTimeout(() => {
      if (gameState.value === 'playing') {
        obstacleWarning.value = true
      }
    }, firstWarningTime)
    
    obstacleTimeoutId = setTimeout(() => {
      if (gameState.value === 'playing') {
        generateObstacles()
        scheduleNextObstacle()
      }
    }, OBSTACLE_FIRST_DELAY)
  } else {
    scheduleNextObstacle()
  }
  
  gameLoop()
}

function pauseGame() {
  if (gameState.value !== 'playing') return
  gameState.value = 'paused'
  
  if (gameLoopId) {
    clearTimeout(gameLoopId)
    gameLoopId = null
  }
  
  if (warningTimeoutId) {
    clearTimeout(warningTimeoutId)
    warningTimeoutId = null
  }
  
  if (obstacleTimeoutId) {
    clearTimeout(obstacleTimeoutId)
    obstacleTimeoutId = null
  }
}

function resetGame() {
  if (gameLoopId) {
    clearTimeout(gameLoopId)
    gameLoopId = null
  }
  
  if (warningTimeoutId) {
    clearTimeout(warningTimeoutId)
    warningTimeoutId = null
  }
  
  if (obstacleTimeoutId) {
    clearTimeout(obstacleTimeoutId)
    obstacleTimeoutId = null
  }
  
  gameState.value = 'idle'
  showGameOver.value = false
  initGame()
}

function gameOver() {
  gameState.value = 'gameover'
  
  if (gameLoopId) {
    clearTimeout(gameLoopId)
    gameLoopId = null
  }
  
  if (warningTimeoutId) {
    clearTimeout(warningTimeoutId)
    warningTimeoutId = null
  }
  
  if (obstacleTimeoutId) {
    clearTimeout(obstacleTimeoutId)
    obstacleTimeoutId = null
  }
  
  obstacleWarning.value = false
  showGameOver.value = true
}

function gameLoop() {
  if (gameState.value !== 'playing') return
  
  moveSnake()
  gameLoopId = setTimeout(gameLoop, speedSettings[difficulty.value])
}

function handleDirection(newDirection) {
  const opposites = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
  }
  
  if (opposites[newDirection] !== direction) {
    nextDirection = newDirection
  }
}

function handleKeyDown(event) {
  const keyMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    w: 'up',
    W: 'up',
    s: 'down',
    S: 'down',
    a: 'left',
    A: 'left',
    d: 'right',
    D: 'right'
  }
  
  if (keyMap[event.key]) {
    event.preventDefault()
    handleDirection(keyMap[event.key])
  }
  
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    if (gameState.value === 'idle' || gameState.value === 'gameover') {
      startGame()
    } else if (gameState.value === 'playing') {
      pauseGame()
    } else if (gameState.value === 'paused') {
      startGame()
    }
  }
  
  if (event.key === 'Escape') {
    resetGame()
  }
  
  if (event.key === '1') {
    setDifficulty('easy')
  } else if (event.key === '2') {
    setDifficulty('medium')
  } else if (event.key === '3') {
    setDifficulty('hard')
  }
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX
  touchStartY = event.touches[0].clientY
}

function handleTouchMove(event) {
  event.preventDefault()
}

function handleTouchEnd(event) {
  const touchEndX = event.changedTouches[0].clientX
  const touchEndY = event.changedTouches[0].clientY
  
  const deltaX = touchEndX - touchStartX
  const deltaY = touchEndY - touchStartY
  
  const minSwipe = 30
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > minSwipe) {
      handleDirection('right')
    } else if (deltaX < -minSwipe) {
      handleDirection('left')
    }
  } else {
    if (deltaY > minSwipe) {
      handleDirection('down')
    } else if (deltaY < -minSwipe) {
      handleDirection('up')
    }
  }
}

function setDifficulty(newDifficulty) {
  difficulty.value = newDifficulty
}

function calculateBoardSize() {
  const isLandscape = window.innerWidth > window.innerHeight
  let maxWidth, maxHeight
  
  if (isLandscape) {
    maxWidth = window.innerWidth * 0.5
    maxHeight = window.innerHeight * 0.75
  } else {
    maxWidth = window.innerWidth * 0.92
    maxHeight = window.innerHeight * 0.48
  }
  
  const size = Math.min(maxWidth, maxHeight, 650)
  const gridAlignedSize = Math.floor(size / GRID_SIZE) * GRID_SIZE
  
  return Math.max(gridAlignedSize, 200)
}

function handleResize() {
  const newSize = calculateBoardSize()
  
  if (newSize !== boardSize.value) {
    boardSize.value = newSize
    canvasWidth.value = newSize
    canvasHeight.value = newSize
    
    nextTick(() => {
      if (gameState.value === 'idle') {
        initGame()
      } else {
        draw()
      }
    })
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('resize', handleResize)
  
  nextTick(() => {
    handleResize()
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('resize', handleResize)
  
  if (gameLoopId) {
    clearTimeout(gameLoopId)
  }
  if (warningTimeoutId) {
    clearTimeout(warningTimeoutId)
  }
  if (obstacleTimeoutId) {
    clearTimeout(obstacleTimeoutId)
  }
})
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #0a0a1a 100%);
  overflow: hidden;
}

.game-board-wrapper {
  position: relative;
  border: 3px solid;
  border-image: linear-gradient(135deg, #00d4ff, #ff00ff, #00ff88) 1;
  box-shadow: 
    0 0 30px rgba(0, 212, 255, 0.3),
    0 0 60px rgba(255, 0, 255, 0.2),
    inset 0 0 30px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  overflow: hidden;
}

.game-canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
}

.touch-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.touch-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.pulse-animation {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 51, 102, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 10px rgba(255, 51, 102, 0.3);
  }
}

:deep(.v-chip) {
  font-size: 16px !important;
  font-weight: 600;
}

:deep(.v-btn) {
  font-weight: 600;
}

@media (max-width: 600px) {
  .game-container {
    padding: 4px;
  }
  
  :deep(.v-chip) {
    font-size: 14px !important;
  }
  
  :deep(.v-btn) {
    font-size: 14px !important;
  }
}
</style>
