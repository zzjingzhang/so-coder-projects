<template>
  <div class="game-page w-full h-full flex flex-col">
    <div class="game-header bg-racing-dark p-4 flex justify-between items-center border-b-2 border-racing-red shadow-lg">
      <div class="flex items-center gap-8">
        <n-statistic label="分数" :value="score" class="text-white">
          <template #prefix>
            <span class="text-yellow-400">🏆</span>
          </template>
        </n-statistic>
        
        <n-statistic label="速度" :value="currentSpeed" suffix=" km/h" class="text-white">
          <template #prefix>
            <span class="text-green-400">⚡</span>
          </template>
        </n-statistic>
      </div>

      <div class="flex items-center gap-4">
        <div v-if="isBoosting" class="flex items-center gap-2 text-yellow-400 animate-pulse">
          <span>🔥</span>
          <span class="font-bold">加速中!</span>
        </div>
        
        <n-button 
          type="default" 
          size="medium" 
          @click="pauseGame"
          class="bg-gray-700 hover:bg-gray-600"
        >
          暂停
        </n-button>
      </div>
    </div>

    <div class="flex-1 relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
      <div 
        ref="gameContainer"
        class="game-canvas w-full h-full relative"
        @keydown="handleKeyDown"
        @keyup="handleKeyUp"
        tabindex="0"
      >
        <div class="sky absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-900 via-blue-800 to-gray-800" />
        
        <div class="horizon absolute top-1/3 left-0 right-0 h-16 bg-gradient-to-t from-gray-700 to-transparent" />

        <div class="road absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-2/3" 
             :style="{ perspective: '500px' }">
          <div 
            class="road-surface absolute inset-0 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800"
            :style="{
              transform: 'rotateX(60deg)',
              transformOrigin: 'center bottom',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)'
            }"
          >
            <div class="road-lines absolute inset-0">
              <div 
                v-for="i in 10" 
                :key="i"
                class="road-line absolute left-1/2 transform -translate-x-1/2 w-4 bg-yellow-400"
                :style="{
                  height: `${30 + i * 5}px`,
                  top: `${(i * 10)}%`,
                  opacity: 0.3 + (i * 0.07)
                }"
              />
            </div>
          </div>
        </div>

        <div class="speed-lines absolute inset-0 pointer-events-none" :class="{ 'animate-speed-lines': currentSpeed > 150 }">
          <div 
            v-for="line in 15" 
            :key="line"
            class="speed-line absolute w-0.5 bg-white opacity-10"
            :style="{
              left: `${10 + Math.random() * 80}%`,
              top: `${Math.random() * 100}%`,
              height: `${50 + Math.random() * 100}px`,
              animationDuration: `${0.3 + Math.random() * 0.3}s`
            }"
          />
        </div>

        <div 
          class="player-car absolute bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-100"
          :style="{ left: `calc(50% + ${playerX}px)` }"
        >
          <PlayerCar :is-boosting="isBoosting" />
        </div>

        <div 
          v-for="enemy in enemies" 
          :key="enemy.id"
          class="enemy-car absolute"
          :style="{
            left: `calc(50% + ${enemy.x}px)`,
            bottom: `${enemy.y}px`,
            transform: `scale(${enemy.scale})`,
            opacity: enemy.opacity
          }"
        >
          <EnemyCar :color="enemy.color" :type="enemy.type" />
        </div>

        <div 
          v-for="coin in coins" 
          :key="coin.id"
          class="coin absolute text-3xl animate-bounce"
          :style="{
            left: `calc(50% + ${coin.x}px)`,
            bottom: `${coin.y}px`,
            transform: `scale(${coin.scale})`,
            opacity: coin.opacity
          }"
        >
          🪙
        </div>
      </div>

      <div class="mobile-controls absolute bottom-4 left-0 right-0 flex justify-center gap-8 md:hidden">
        <button 
          @touchstart="moveLeft" 
          @touchend="stopMoving"
          class="w-20 h-20 bg-gray-800 bg-opacity-70 rounded-full flex items-center justify-center text-4xl active:bg-gray-700"
        >
          ◀
        </button>
        <button 
          @touchstart="moveRight" 
          @touchend="stopMoving"
          class="w-20 h-20 bg-gray-800 bg-opacity-70 rounded-full flex items-center justify-center text-4xl active:bg-gray-700"
        >
          ▶
        </button>
      </div>
    </div>

    <n-modal 
      v-model:show="isPaused" 
      preset="dialog"
      title="游戏暂停"
      :style="{ width: '350px' }"
      positive-text="继续游戏"
      negative-text="返回主页"
      @positive-click="resumeGame"
      @negative-click="goHome"
    >
      <div class="text-center py-4">
        <p class="text-lg mb-4">当前分数: {{ score }}</p>
        <p class="text-gray-500">按 ESC 或 空格键 继续</p>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PlayerCar from '@/components/PlayerCar.vue'
import EnemyCar from '@/components/EnemyCar.vue'

interface Enemy {
  id: number
  x: number
  y: number
  speed: number
  color: string
  type: 'sedan' | 'truck' | 'sports'
  scale: number
  opacity: number
}

interface Coin {
  id: number
  x: number
  y: number
  scale: number
  opacity: number
}

const router = useRouter()
const gameContainer = ref<HTMLElement | null>(null)
const playerX = ref(0)
const score = ref(0)
const currentSpeed = ref(100)
const isBoosting = ref(false)
const isPaused = ref(false)
const enemies = ref<Enemy[]>([])
const coins = ref<Coin[]>([])
const gameLoopRef = ref<number | null>(null)
const enemyIdCounter = ref(0)
const coinIdCounter = ref(0)
const keysPressed = ref<Set<string>>(new Set())
const difficulty = ref(1)
const boostCooldown = ref(false)
const gameTime = ref(0)

const PLAYER_SPEED = 8
const LANE_POSITIONS = [-120, -40, 40, 120]
const ENEMY_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444']
const ENEMY_TYPES: Array<'sedan' | 'truck' | 'sports'> = ['sedan', 'truck', 'sports']

const spawnEnemy = () => {
  const lane = LANE_POSITIONS[Math.floor(Math.random() * LANE_POSITIONS.length)]
  const color = ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)]
  const type = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)]
  
  const enemy: Enemy = {
    id: enemyIdCounter.value++,
    x: lane,
    y: 600,
    speed: 2 + difficulty.value * 0.5 + Math.random() * 2,
    color,
    type,
    scale: 0.3,
    opacity: 0.3
  }
  
  enemies.value.push(enemy)
}

const spawnCoin = () => {
  const lane = LANE_POSITIONS[Math.floor(Math.random() * LANE_POSITIONS.length)]
  
  const coin: Coin = {
    id: coinIdCounter.value++,
    x: lane,
    y: 600,
    scale: 0.3,
    opacity: 0.3
  }
  
  coins.value.push(coin)
}

const checkCollision = (enemy: Enemy) => {
  const playerLeft = playerX.value - 25
  const playerRight = playerX.value + 25
  const playerBottom = 100
  const playerTop = 170
  
  const enemyLeft = enemy.x - 25
  const enemyRight = enemy.x + 25
  const enemyBottom = enemy.y
  const enemyTop = enemy.y + 70
  
  return (
    playerLeft < enemyRight &&
    playerRight > enemyLeft &&
    playerBottom < enemyTop &&
    playerTop > enemyBottom
  )
}

const checkCoinCollision = (coin: Coin) => {
  const distance = Math.sqrt(
    Math.pow(playerX.value - coin.x, 2) + 
    Math.pow(135 - (coin.y + 15), 2)
  )
  return distance < 50
}

const gameLoop = () => {
  if (isPaused.value) return
  
  gameTime.value++
  
  if (gameTime.value % 600 === 0) {
    difficulty.value = Math.min(difficulty.value + 0.5, 5)
  }
  
  if (keysPressed.value.has('ArrowLeft') && playerX.value > -140) {
    playerX.value -= PLAYER_SPEED
  }
  if (keysPressed.value.has('ArrowRight') && playerX.value < 140) {
    playerX.value += PLAYER_SPEED
  }
  
  score.value += Math.floor(currentSpeed.value / 100)
  
  if (gameTime.value % Math.max(30, 60 - difficulty.value * 10) === 0) {
    spawnEnemy()
  }
  
  if (gameTime.value % 120 === 0) {
    spawnCoin()
  }
  
  const speedMultiplier = (currentSpeed.value / 100) * difficulty.value
  
  for (let i = enemies.value.length - 1; i >= 0; i--) {
    const enemy = enemies.value[i]
    enemy.y -= enemy.speed * speedMultiplier
    
    const progress = (600 - enemy.y) / 600
    enemy.scale = 0.3 + progress * 0.7
    enemy.opacity = 0.3 + progress * 0.7
    
    if (checkCollision(enemy)) {
      endGame()
      return
    }
    
    if (enemy.y < -100) {
      enemies.value.splice(i, 1)
      score.value += 10
    }
  }
  
  for (let i = coins.value.length - 1; i >= 0; i--) {
    const coin = coins.value[i]
    coin.y -= 3 * speedMultiplier
    
    const progress = (600 - coin.y) / 600
    coin.scale = 0.3 + progress * 0.7
    coin.opacity = 0.3 + progress * 0.7
    
    if (checkCoinCollision(coin)) {
      coins.value.splice(i, 1)
      score.value += 50
      continue
    }
    
    if (coin.y < -50) {
      coins.value.splice(i, 1)
    }
  }
  
  currentSpeed.value = 100 + Math.floor(score.value / 500) * 10
  
  if (isBoosting.value) {
    currentSpeed.value *= 1.5
  }
  
  gameLoopRef.value = requestAnimationFrame(gameLoop)
}

const startGameLoop = () => {
  gameLoopRef.value = requestAnimationFrame(gameLoop)
}

const stopGameLoop = () => {
  if (gameLoopRef.value) {
    cancelAnimationFrame(gameLoopRef.value)
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  keysPressed.value.add(e.key)
  
  if (e.key === 'Escape') {
    if (isPaused.value) {
      resumeGame()
    } else {
      pauseGame()
    }
  }
  
  if (e.key === ' ' && !boostCooldown.value && !isPaused.value) {
    e.preventDefault()
    activateBoost()
  }
}

const handleKeyUp = (e: KeyboardEvent) => {
  keysPressed.value.delete(e.key)
}

const moveLeft = () => {
  keysPressed.value.add('ArrowLeft')
}

const moveRight = () => {
  keysPressed.value.add('ArrowRight')
}

const stopMoving = () => {
  keysPressed.value.delete('ArrowLeft')
  keysPressed.value.delete('ArrowRight')
}

const activateBoost = () => {
  if (boostCooldown.value) return
  
  isBoosting.value = true
  boostCooldown.value = true
  
  setTimeout(() => {
    isBoosting.value = false
  }, 2000)
  
  setTimeout(() => {
    boostCooldown.value = false
  }, 5000)
}

const pauseGame = () => {
  isPaused.value = true
  stopGameLoop()
}

const resumeGame = () => {
  isPaused.value = false
  startGameLoop()
}

const goHome = () => {
  stopGameLoop()
  router.push('/')
}

const endGame = () => {
  stopGameLoop()
  router.push({
    path: '/game-over',
    query: { score: score.value.toString() }
  })
}

onMounted(() => {
  if (gameContainer.value) {
    gameContainer.value.focus()
  }
  
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  
  startGameLoop()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  stopGameLoop()
})
</script>

<style scoped>
.game-canvas {
  touch-action: none;
}

@keyframes coinCollect {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(0); opacity: 0; }
}

.speed-lines {
  pointer-events: none;
}
</style>
