<template>
  <div class="relative w-full h-screen bg-gray-900 overflow-hidden select-none">
    
    <canvas 
      ref="gameCanvas" 
      class="w-full h-full"
    />

    <router-link 
      to="/" 
      class="absolute z-20 bg-gray-800 bg-opacity-80 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg"
      style="top: 32px; left: 32px; padding-left: 32px; padding-right: 32px; padding-top: 16px; padding-bottom: 16px; font-size: 18px; font-weight: 500;"
      v-if="!gameState.isPlaying"
    >
      ← 返回菜单
    </router-link>

    <div v-if="!gameState.isPlaying && !gameState.isGameOver" 
         class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-85 z-10">
      <div class="text-center" 
           style="padding-left: 32px; padding-right: 32px; padding-top: 48px; padding-bottom: 48px;">
        <h1 class="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl" 
            style="margin-bottom: 32px; line-height: 1.25;">
          梯子游戏
        </h1>
        <p class="text-xl md:text-3xl text-gray-300" 
           style="margin-top: 24px; margin-bottom: 24px; line-height: 1.75;">
          机器人正在准备攀登...
        </p>
        <p class="text-xl md:text-3xl text-yellow-400" 
           style="margin-top: 24px; margin-bottom: 48px; line-height: 1.75;">
          观察机器人如何自动收集金币并到达顶部！
        </p>
        <div style="margin-top: 32px;">
          <el-button type="primary" size="large" 
                     @click="startGame" 
                     class="bg-white text-blue-600 hover:bg-gray-100 border-none font-bold rounded-2xl shadow-2xl"
                     style="padding-left: 64px; padding-right: 64px; padding-top: 40px; padding-bottom: 40px; font-size: 20px;">
            🤖 开始观察
          </el-button>
        </div>
      </div>
    </div>

    <div v-if="gameState.isGameOver" 
         class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-85 z-10">
      <div class="text-center" 
           style="padding-left: 32px; padding-right: 32px; padding-top: 48px; padding-bottom: 48px;">
        <h1 class="text-5xl md:text-7xl font-bold drop-shadow-2xl" 
            :class="gameState.won ? 'text-green-500' : 'text-red-500'"
            style="margin-bottom: 40px; line-height: 1.25;">
          {{ gameState.won ? '🎉 任务完成！' : '💔 游戏结束' }}
        </h1>
        <p class="text-3xl md:text-5xl text-white" 
           style="margin-top: 24px; margin-bottom: 24px; line-height: 1.75;">
          最终得分: {{ gameState.score }}
        </p>
        <p class="text-xl md:text-3xl text-gray-300" 
           style="margin-top: 24px; margin-bottom: 48px; line-height: 1.75;">
          关卡: {{ gameState.level }}
        </p>
        <div style="margin-top: 32px;">
          <el-button type="primary" size="large" 
                     @click="restartGame" 
                     class="bg-white text-blue-600 hover:bg-gray-100 border-none font-bold rounded-2xl shadow-2xl"
                     style="padding-left: 64px; padding-right: 64px; padding-top: 40px; padding-bottom: 40px; font-size: 20px;">
            🔄 再看一次
          </el-button>
        </div>
      </div>
    </div>

    <div v-if="gameState.isPlaying" 
         class="absolute flex justify-between items-start z-10"
         style="top: 32px; left: 32px; right: 32px; gap: 32px;">
      <div class="bg-black bg-opacity-60 rounded-2xl shadow-xl backdrop-blur-sm"
           style="padding: 24px;">
        <p class="text-white text-xl md:text-3xl font-bold" 
           style="margin-bottom: 16px; line-height: 1.25;">
          机器人得分: {{ gameState.score }}
        </p>
        <p class="text-yellow-400 text-base md:text-xl" 
           style="margin-top: 16px; line-height: 1.75;">
          关卡: {{ gameState.level }}
        </p>
      </div>
      <div class="bg-black bg-opacity-60 rounded-2xl shadow-xl backdrop-blur-sm"
           style="padding: 24px;">
        <p class="text-purple-400 text-xl md:text-3xl font-bold" 
           style="margin-bottom: 16px; line-height: 1.25;">
          能量: {{ robot.health }}
        </p>
        <p class="text-blue-300 text-base md:text-xl" 
           style="margin-top: 16px; line-height: 1.75;">
          目标: {{ gameState.coinsCollected }}/{{ totalCoins }}
        </p>
      </div>
    </div>

    <div v-if="gameState.isPlaying" 
         class="absolute z-10 bg-blue-600 bg-opacity-80 rounded-xl shadow-lg backdrop-blur-sm"
         style="top: 32px; left: 50%; transform: translateX(-50%); padding-left: 32px; padding-right: 32px; padding-top: 20px; padding-bottom: 20px;">
      <p class="text-white text-lg md:text-xl font-bold" 
         style="line-height: 1.75;">
        🤖 机器人模式运行中...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import type { RobotPlayer, Platform, Ladder, Coin } from '../types'

const gameCanvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let lastTime = 0

const totalCoins = ref(0)

const gameState = reactive<{
  isPlaying: boolean
  isPaused: boolean
  isGameOver: boolean
  level: number
  score: number
  won: boolean
  coinsCollected: number
}>({
  isPlaying: false,
  isPaused: false,
  isGameOver: false,
  level: 1,
  score: 0,
  won: false,
  coinsCollected: 0
})

const robot = reactive<RobotPlayer>({
  id: 'robot',
  x: 100,
  y: 0,
  width: 40,
  height: 60,
  velocityX: 0,
  velocityY: 0,
  health: 5,
  score: 0,
  isJumping: false,
  canShoot: false,
  shootCooldown: 0,
  targetPosition: null,
  decisionTimer: 0
})

const platforms = ref<Platform[]>([])
const ladders = ref<Ladder[]>([])
const coins = ref<Coin[]>([])

const GRAVITY = 0.5
const MOVE_SPEED = 3
const CLIMB_SPEED = 4
const DECISION_INTERVAL = 500

function initGame() {
  if (!gameCanvas.value) return
  
  const canvas = gameCanvas.value
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  ctx = canvas.getContext('2d')

  robot.x = 100
  robot.y = canvas.height - 150
  robot.velocityX = 0
  robot.velocityY = 0
  robot.health = 5
  robot.score = 0
  robot.isJumping = false
  robot.targetPosition = null
  robot.decisionTimer = 0

  gameState.score = 0
  gameState.level = 1
  gameState.isGameOver = false
  gameState.won = false
  gameState.coinsCollected = 0

  ladders.value = []
  coins.value = []

  platforms.value = [
    { x: 0, y: canvas.height - 50, width: canvas.width, height: 50, isGround: true },
    { x: 50, y: canvas.height - 180, width: 200, height: 20, isGround: false },
    { x: 350, y: canvas.height - 180, width: 200, height: 20, isGround: false },
    { x: 650, y: canvas.height - 180, width: 200, height: 20, isGround: false },
    { x: 150, y: canvas.height - 320, width: 200, height: 20, isGround: false },
    { x: 450, y: canvas.height - 320, width: 200, height: 20, isGround: false },
    { x: 750, y: canvas.height - 320, width: 150, height: 20, isGround: false },
    { x: 50, y: canvas.height - 460, width: 200, height: 20, isGround: false },
    { x: 350, y: canvas.height - 460, width: 200, height: 20, isGround: false },
    { x: 650, y: canvas.height - 460, width: 200, height: 20, isGround: false },
    { x: 200, y: canvas.height - 580, width: 300, height: 30, isGround: false }
  ]

  ladders.value = [
    { id: 'ladder-1', x: 250, y: canvas.height - 180, width: 30, height: 130 },
    { id: 'ladder-2', x: 550, y: canvas.height - 180, width: 30, height: 130 },
    { id: 'ladder-3', x: 150, y: canvas.height - 320, width: 30, height: 140 },
    { id: 'ladder-4', x: 750, y: canvas.height - 320, width: 30, height: 140 },
    { id: 'ladder-5', x: 250, y: canvas.height - 460, width: 30, height: 140 },
    { id: 'ladder-6', x: 650, y: canvas.height - 460, width: 30, height: 140 },
    { id: 'ladder-7', x: 300, y: canvas.height - 580, width: 30, height: 120 }
  ]

  coins.value = [
    { id: 'coin-1', x: 150, y: canvas.height - 220, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-2', x: 450, y: canvas.height - 220, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-3', x: 750, y: canvas.height - 220, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-4', x: 250, y: canvas.height - 360, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-5', x: 550, y: canvas.height - 360, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-6', x: 800, y: canvas.height - 360, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-7', x: 150, y: canvas.height - 500, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-8', x: 450, y: canvas.height - 500, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-9', x: 750, y: canvas.height - 500, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false },
    { id: 'coin-10', x: 350, y: canvas.height - 620, width: 20, height: 20, velocityX: 0, velocityY: 0, collected: false }
  ]

  totalCoins.value = coins.value.length
}

function isOnLadder(): Ladder | null {
  for (const ladder of ladders.value) {
    if (
      robot.x + robot.width > ladder.x &&
      robot.x < ladder.x + ladder.width &&
      robot.y + robot.height > ladder.y &&
      robot.y < ladder.y + ladder.height
    ) {
      return ladder
    }
  }
  return null
}

function getNearestUncollectedCoin(): Coin | null {
  let nearest: Coin | null = null
  let minDistance = Infinity

  for (const coin of coins.value) {
    if (coin.collected) continue
    
    const distance = Math.sqrt(
      Math.pow(coin.x - robot.x, 2) + Math.pow(coin.y - robot.y, 2)
    )
    
    if (distance < minDistance) {
      minDistance = distance
      nearest = coin
    }
  }

  return nearest
}

function getLadderToTarget(targetY: number): Ladder | null {
  const currentPlatform = getCurrentPlatform()
  if (!currentPlatform) return null

  const goingUp = targetY < robot.y

  for (const ladder of ladders.value) {
    const ladderTop = ladder.y
    const ladderBottom = ladder.y + ladder.height

    if (goingUp) {
      if (
        ladderBottom >= currentPlatform.y &&
        ladderTop < currentPlatform.y &&
        ladderTop < targetY
      ) {
        return ladder
      }
    } else {
      if (
        ladderTop <= currentPlatform.y &&
        ladderBottom > currentPlatform.y
      ) {
        return ladder
      }
    }
  }

  return null
}

function getCurrentPlatform(): Platform | null {
  for (const platform of platforms.value) {
    if (
      Math.abs(robot.y + robot.height - platform.y) < 5 &&
      robot.x + robot.width > platform.x &&
      robot.x < platform.x + platform.width
    ) {
      return platform
    }
  }
  return null
}

function makeRobotDecision() {
  const targetCoin = getNearestUncollectedCoin()
  const currentPlatform = getCurrentPlatform()
  const ladder = isOnLadder()

  if (targetCoin) {
    robot.targetPosition = { x: targetCoin.x, y: targetCoin.y }
  }

  if (ladder && robot.targetPosition) {
    if (robot.targetPosition.y < robot.y - 50) {
      robot.velocityY = -CLIMB_SPEED
      robot.velocityX = 0
      return
    } else if (robot.targetPosition.y > robot.y + 50) {
      robot.velocityY = CLIMB_SPEED
      robot.velocityX = 0
      return
    }
  }

  if (robot.targetPosition && currentPlatform) {
    const targetX = robot.targetPosition.x

    if (targetX < robot.x - 20) {
      robot.velocityX = -MOVE_SPEED
    } else if (targetX > robot.x + 20) {
      robot.velocityX = MOVE_SPEED
    } else {
      robot.velocityX = 0
    }

    if (Math.abs(targetX - robot.x) < 30) {
      const ladderToTarget = getLadderToTarget(robot.targetPosition.y)
      if (ladderToTarget && !isOnLadder()) {
        if (ladderToTarget.x > robot.x + robot.width) {
          robot.velocityX = MOVE_SPEED
        } else if (ladderToTarget.x + ladderToTarget.width < robot.x) {
          robot.velocityX = -MOVE_SPEED
        }
      }
    }
  }
}

function update(deltaTime: number) {
  if (!gameCanvas.value || !ctx) return
  const canvas = gameCanvas.value

  robot.decisionTimer += deltaTime
  if (robot.decisionTimer >= DECISION_INTERVAL) {
    makeRobotDecision()
    robot.decisionTimer = 0
  }

  const onLadder = isOnLadder()

  if (!onLadder) {
    robot.velocityY += GRAVITY
  }

  robot.x += robot.velocityX
  robot.y += robot.velocityY

  if (robot.x < 0) robot.x = 0
  if (robot.x + robot.width > canvas.width) robot.x = canvas.width - robot.width

  for (const platform of platforms.value) {
    if (
      robot.velocityY >= 0 &&
      !isOnLadder() &&
      robot.x + robot.width > platform.x &&
      robot.x < platform.x + platform.width &&
      robot.y + robot.height >= platform.y &&
      robot.y + robot.height <= platform.y + platform.height + 20
    ) {
      robot.y = platform.y - robot.height
      robot.velocityY = 0
      robot.isJumping = false
    }
  }

  for (const coin of coins.value) {
    if (
      !coin.collected &&
      robot.x < coin.x + coin.width &&
      robot.x + robot.width > coin.x &&
      robot.y < coin.y + coin.height &&
      robot.y + robot.height > coin.y
    ) {
      coin.collected = true
      gameState.score += 100
      gameState.coinsCollected++
    }
  }

  if (coins.value.every(c => c.collected)) {
    gameState.won = true
    endGame()
  }

  if (robot.y > canvas.height) {
    robot.health--
    if (robot.health <= 0) {
      endGame()
    } else {
      robot.x = 100
      robot.y = canvas.height - 150
      robot.velocityY = 0
      robot.velocityX = 0
    }
  }
}

function render() {
  if (!gameCanvas.value || !ctx) return
  const canvas = gameCanvas.value

  ctx.fillStyle = '#1a1a2e'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (const platform of platforms.value) {
    if (platform.isGround) {
      ctx.fillStyle = '#4a5568'
    } else {
      ctx.fillStyle = '#718096'
    }
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
    
    ctx.fillStyle = '#a0aec0'
    for (let i = 0; i < platform.width; i += 20) {
      ctx.fillRect(platform.x + i, platform.y, 2, 3)
    }
  }

  for (const ladder of ladders.value) {
    ctx.fillStyle = '#8b5a2b'
    ctx.fillRect(ladder.x, ladder.y, 8, ladder.height)
    ctx.fillRect(ladder.x + ladder.width - 8, ladder.y, 8, ladder.height)
    
    ctx.fillStyle = '#a0522d'
    for (let i = 0; i < ladder.height; i += 30) {
      ctx.fillRect(ladder.x, ladder.y + i, ladder.width, 6)
    }
  }

  for (const coin of coins.value) {
    if (!coin.collected) {
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.fillStyle = '#d97706'
      ctx.font = 'bold 12px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('$', coin.x + coin.width / 2, coin.y + coin.height / 2)
    }
  }

  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(robot.x, robot.y, robot.width, robot.height)
  
  ctx.fillStyle = '#1e40af'
  ctx.fillRect(robot.x + 5, robot.y + 5, robot.width - 10, 20)
  
  ctx.fillStyle = '#60a5fa'
  ctx.fillRect(robot.x + 10, robot.y + 10, 8, 10)
  ctx.fillRect(robot.x + 22, robot.y + 10, 8, 10)
  
  ctx.fillStyle = '#00ffff'
  ctx.beginPath()
  ctx.arc(robot.x + 20, robot.y - 5, 5, 0, Math.PI * 2)
  ctx.fill()
  
  if (robot.targetPosition) {
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(robot.x + robot.width / 2, robot.y + robot.height / 2)
    ctx.lineTo(robot.targetPosition.x, robot.targetPosition.y)
    ctx.stroke()
    ctx.setLineDash([])
    
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
    ctx.beginPath()
    ctx.arc(robot.targetPosition.x, robot.targetPosition.y, 15, 0, Math.PI * 2)
    ctx.fill()
  }

  if (gameState.level === 1) {
    ctx.fillStyle = '#00ff00'
    ctx.font = 'bold 16px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('🏁 目标: 收集所有金币!', canvas.width / 2, 50)
  }
}

function gameLoop(currentTime: number) {
  if (!gameState.isPlaying) return

  const deltaTime = currentTime - lastTime
  lastTime = currentTime

  update(deltaTime)
  render()

  animationId = requestAnimationFrame(gameLoop)
}

function startGame() {
  initGame()
  gameState.isPlaying = true
  gameState.isGameOver = false
  gameState.won = false
  lastTime = performance.now()
  animationId = requestAnimationFrame(gameLoop)
}

function endGame() {
  gameState.isPlaying = false
  gameState.isGameOver = true
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function restartGame() {
  startGame()
}

function handleResize() {
  if (gameCanvas.value) {
    const canvas = gameCanvas.value
    const prevWidth = canvas.width
    const prevHeight = canvas.height
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    const scaleX = canvas.width / prevWidth
    const scaleY = canvas.height / prevHeight
    
    robot.x *= scaleX
    robot.y *= scaleY
    robot.velocityX *= scaleX
    
    platforms.value.forEach(p => {
      p.x *= scaleX
      p.y *= scaleY
      p.width *= scaleX
      p.height *= scaleY
    })
    
    ladders.value.forEach(l => {
      l.x *= scaleX
      l.y *= scaleY
      l.width *= scaleX
      l.height *= scaleY
    })
    
    coins.value.forEach(c => {
      c.x *= scaleX
      c.y *= scaleY
    })
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
canvas {
  image-rendering: pixelated;
}
</style>
