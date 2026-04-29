<template>
  <div class="relative w-full h-screen bg-gray-900 overflow-hidden select-none"
       @touchstart.prevent="handleTouchStart"
       @touchmove.prevent="handleTouchMove"
       @touchend.prevent="handleTouchEnd">
    
    <canvas 
      ref="gameCanvas" 
      class="w-full h-full"
      :style="{ touchAction: 'none' }"
    />

    <router-link 
      to="/" 
      class="absolute top-6 left-6 z-20 bg-gray-800 bg-opacity-80 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg text-base font-medium"
      v-if="!gameState.isPlaying"
    >
      ← 返回菜单
    </router-link>

    <div v-if="!gameState.isPlaying && !gameState.isGameOver" 
         class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-85 z-10">
      <div class="text-center px-8">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">射击游戏</h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-12 text-center">使用屏幕左侧按钮移动，右侧按钮跳跃和射击</p>
        <el-button type="primary" size="large" @click="startGame" class="text-xl px-12 py-8 rounded-2xl shadow-2xl">
          🎮 开始游戏
        </el-button>
      </div>
    </div>

    <div v-if="gameState.isGameOver" 
         class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-85 z-10">
      <div class="text-center px-8">
        <h1 class="text-5xl md:text-6xl font-bold text-red-500 mb-8 drop-shadow-2xl">游戏结束</h1>
        <p class="text-3xl md:text-4xl text-white mb-4">最终得分: {{ gameState.score }}</p>
        <p class="text-xl md:text-2xl text-gray-300 mb-12">关卡: {{ gameState.level }}</p>
        <el-button type="primary" size="large" @click="restartGame" class="text-xl px-12 py-8 rounded-2xl shadow-2xl">
          🔄 重新开始
        </el-button>
      </div>
    </div>

    <div v-if="gameState.isPlaying" class="absolute top-6 left-6 right-6 flex justify-between items-start gap-6 z-10">
      <div class="bg-black bg-opacity-60 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <p class="text-white text-xl md:text-2xl font-bold mb-2">得分: {{ gameState.score }}</p>
        <p class="text-yellow-400 text-base md:text-lg">关卡: {{ gameState.level }}</p>
      </div>
      <div class="bg-black bg-opacity-60 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <p class="text-red-400 text-xl md:text-2xl font-bold">生命: {{ player.health }}</p>
      </div>
    </div>

    <div v-if="gameState.isPlaying" class="absolute bottom-12 left-0 right-0 flex justify-between px-6 md:px-12 z-10">
      <div class="flex gap-6">
        <button 
          class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-700 bg-opacity-80 text-white text-3xl md:text-4xl font-bold flex items-center justify-center active:bg-gray-600 shadow-2xl backdrop-blur-sm transition-all duration-150 active:scale-95"
          @touchstart.prevent="activateControl('left')"
          @touchend.prevent="deactivateControl('left')"
          @mousedown.prevent="activateControl('left')"
          @mouseup.prevent="deactivateControl('left')"
          @mouseleave.prevent="deactivateControl('left')"
        >
          ←
        </button>
        <button 
          class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-700 bg-opacity-80 text-white text-3xl md:text-4xl font-bold flex items-center justify-center active:bg-gray-600 shadow-2xl backdrop-blur-sm transition-all duration-150 active:scale-95"
          @touchstart.prevent="activateControl('right')"
          @touchend.prevent="deactivateControl('right')"
          @mousedown.prevent="activateControl('right')"
          @mouseup.prevent="deactivateControl('right')"
          @mouseleave.prevent="deactivateControl('right')"
        >
          →
        </button>
      </div>
      <div class="flex gap-6">
        <button 
          class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-600 bg-opacity-80 text-white text-2xl md:text-3xl font-bold flex items-center justify-center active:bg-green-500 shadow-2xl backdrop-blur-sm transition-all duration-150 active:scale-95"
          @touchstart.prevent="activateControl('jump')"
          @touchend.prevent="deactivateControl('jump')"
          @mousedown.prevent="activateControl('jump')"
          @mouseup.prevent="deactivateControl('jump')"
          @mouseleave.prevent="deactivateControl('jump')"
        >
          跳
        </button>
        <button 
          class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-600 bg-opacity-80 text-white text-2xl md:text-3xl font-bold flex items-center justify-center active:bg-red-500 shadow-2xl backdrop-blur-sm transition-all duration-150 active:scale-95"
          @touchstart.prevent="activateControl('shoot')"
          @touchend.prevent="deactivateControl('shoot')"
          @mousedown.prevent="activateControl('shoot')"
          @mouseup.prevent="deactivateControl('shoot')"
          @mouseleave.prevent="deactivateControl('shoot')"
        >
          射
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import type { Player, Bullet, Enemy, Platform, Coin, GameState } from '../types'
const gameCanvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let lastTime = 0

const gameState = reactive<GameState>({
  isPlaying: false,
  isPaused: false,
  isGameOver: false,
  level: 1,
  score: 0
})

const activeControls = reactive<Record<string, boolean>>({
  left: false,
  right: false,
  jump: false,
  shoot: false
})

const player = reactive<Player>({
  id: 'player',
  x: 100,
  y: 0,
  width: 40,
  height: 60,
  velocityX: 0,
  velocityY: 0,
  health: 3,
  score: 0,
  isJumping: false,
  canShoot: true,
  shootCooldown: 0
})

const bullets = ref<Bullet[]>([])
const enemies = ref<Enemy[]>([])
const platforms = ref<Platform[]>([])
const coins = ref<Coin[]>([])

const GRAVITY = 0.5
const MOVE_SPEED = 5
const JUMP_FORCE = -12
const BULLET_SPEED = 10
const SHOOT_COOLDOWN = 300

function initGame() {
  if (!gameCanvas.value) return
  
  const canvas = gameCanvas.value
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  ctx = canvas.getContext('2d')

  player.x = 100
  player.y = canvas.height - 150
  player.velocityX = 0
  player.velocityY = 0
  player.health = 3
  player.score = 0
  player.isJumping = false
  player.canShoot = true
  player.shootCooldown = 0

  gameState.score = 0
  gameState.level = 1
  gameState.isGameOver = false

  bullets.value = []
  enemies.value = []
  coins.value = []

  platforms.value = [
    { x: 0, y: canvas.height - 50, width: canvas.width, height: 50, isGround: true },
    { x: 150, y: canvas.height - 150, width: 150, height: 20, isGround: false },
    { x: 400, y: canvas.height - 250, width: 150, height: 20, isGround: false },
    { x: 650, y: canvas.height - 150, width: 150, height: 20, isGround: false },
    { x: 900, y: canvas.height - 200, width: 150, height: 20, isGround: false }
  ]

  spawnEnemies()
  spawnCoins()
}

function spawnEnemies() {
  if (!gameCanvas.value) return
  const canvas = gameCanvas.value

  for (let i = 0; i < 3 + gameState.level; i++) {
    enemies.value.push({
      id: `enemy-${Date.now()}-${i}`,
      x: 300 + i * 200,
      y: canvas.height - 100,
      width: 35,
      height: 50,
      velocityX: 1 + Math.random(),
      velocityY: 0,
      health: 1,
      type: 'ground',
      moveDirection: Math.random() > 0.5 ? 1 : -1,
      shootTimer: 0
    })
  }

  for (let i = 0; i < Math.floor(gameState.level / 2); i++) {
    enemies.value.push({
      id: `enemy-fly-${Date.now()}-${i}`,
      x: 400 + i * 250,
      y: canvas.height - 300,
      width: 40,
      height: 30,
      velocityX: 1.5,
      velocityY: 0,
      health: 1,
      type: 'flying',
      moveDirection: 1,
      shootTimer: 0
    })
  }
}

function spawnCoins() {
  if (!gameCanvas.value) return
  const canvas = gameCanvas.value

  for (let i = 0; i < 5 + gameState.level * 2; i++) {
    coins.value.push({
      id: `coin-${Date.now()}-${i}`,
      x: 200 + i * 150,
      y: canvas.height - 200 - Math.random() * 200,
      width: 20,
      height: 20,
      velocityX: 0,
      velocityY: 0,
      collected: false
    })
  }
}

function update(deltaTime: number) {
  if (!gameCanvas.value || !ctx) return
  const canvas = gameCanvas.value

  if (activeControls.left) {
    player.velocityX = -MOVE_SPEED
  } else if (activeControls.right) {
    player.velocityX = MOVE_SPEED
  } else {
    player.velocityX *= 0.8
  }

  if (activeControls.jump && !player.isJumping) {
    player.velocityY = JUMP_FORCE
    player.isJumping = true
  }

  if (activeControls.shoot && player.canShoot) {
    shootBullet()
  }

  if (!player.canShoot) {
    player.shootCooldown -= deltaTime
    if (player.shootCooldown <= 0) {
      player.canShoot = true
    }
  }

  player.velocityY += GRAVITY
  player.x += player.velocityX
  player.y += player.velocityY

  if (player.x < 0) player.x = 0
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width

  player.isJumping = true
  for (const platform of platforms.value) {
    if (
      player.velocityY >= 0 &&
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.y + player.height >= platform.y &&
      player.y + player.height <= platform.y + platform.height + 20
    ) {
      player.y = platform.y - player.height
      player.velocityY = 0
      player.isJumping = false
    }
  }

  if (player.y > canvas.height) {
    player.health--
    if (player.health <= 0) {
      endGame()
    } else {
      player.x = 100
      player.y = canvas.height - 150
      player.velocityY = 0
    }
  }

  bullets.value = bullets.value.filter(bullet => {
    bullet.x += bullet.velocityX
    bullet.y += bullet.velocityY
    return bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.height
  })

  for (const enemy of enemies.value) {
    if (enemy.type === 'ground') {
      enemy.x += enemy.velocityX * enemy.moveDirection
      if (enemy.x < 0 || enemy.x + enemy.width > canvas.width) {
        enemy.moveDirection *= -1
      }
    } else {
      enemy.x += enemy.velocityX * enemy.moveDirection
      enemy.y += Math.sin(Date.now() / 500) * 0.5
      if (enemy.x < 0 || enemy.x + enemy.width > canvas.width) {
        enemy.moveDirection *= -1
      }
    }
  }

  bullets.value = bullets.value.filter(bullet => {
    if (!bullet.isPlayerBullet) return true
    
    for (let i = enemies.value.length - 1; i >= 0; i--) {
      const enemy = enemies.value[i]
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        enemy.health--
        if (enemy.health <= 0) {
          enemies.value.splice(i, 1)
          gameState.score += 100
        }
        return false
      }
    }
    return true
  })

  bullets.value = bullets.value.filter(bullet => {
    if (bullet.isPlayerBullet) return true
    
    if (
      bullet.x < player.x + player.width &&
      bullet.x + bullet.width > player.x &&
      bullet.y < player.y + player.height &&
      bullet.y + bullet.height > player.y
    ) {
      player.health--
      if (player.health <= 0) {
        endGame()
      }
      return false
    }
    return true
  })

  for (const enemy of enemies.value) {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      player.health--
      player.x = 100
      player.y = canvas.height - 150
      player.velocityY = 0
      if (player.health <= 0) {
        endGame()
      }
    }
  }

  for (const coin of coins.value) {
    if (
      !coin.collected &&
      player.x < coin.x + coin.width &&
      player.x + player.width > coin.x &&
      player.y < coin.y + coin.height &&
      player.y + player.height > coin.y
    ) {
      coin.collected = true
      gameState.score += 50
    }
  }

  if (enemies.value.length === 0) {
    gameState.level++
    spawnEnemies()
    spawnCoins()
  }
}

function shootBullet() {
  player.canShoot = false
  player.shootCooldown = SHOOT_COOLDOWN
  
  bullets.value.push({
    id: `bullet-${Date.now()}`,
    x: player.x + player.width,
    y: player.y + player.height / 2 - 3,
    width: 15,
    height: 6,
    velocityX: BULLET_SPEED,
    velocityY: 0,
    isPlayerBullet: true,
    damage: 1
  })
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
    }
  }

  for (const enemy of enemies.value) {
    if (enemy.type === 'ground') {
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(enemy.x + 8, enemy.y + 10, 8, 8)
      ctx.fillRect(enemy.x + 20, enemy.y + 10, 8, 8)
      ctx.fillStyle = '#000000'
      ctx.fillRect(enemy.x + 10, enemy.y + 12, 4, 4)
      ctx.fillRect(enemy.x + 22, enemy.y + 12, 4, 4)
    } else {
      ctx.fillStyle = '#8b5cf6'
      ctx.beginPath()
      ctx.ellipse(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, enemy.height / 2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(enemy.x + 10, enemy.y + 8, 6, 6)
      ctx.fillRect(enemy.x + 24, enemy.y + 8, 6, 6)
    }
  }

  for (const bullet of bullets.value) {
    if (bullet.isPlayerBullet) {
      ctx.fillStyle = '#3b82f6'
    } else {
      ctx.fillStyle = '#ef4444'
    }
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
  }

  ctx.fillStyle = '#22c55e'
  ctx.fillRect(player.x, player.y, player.width, player.height)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(player.x + 8, player.y + 15, 10, 10)
  ctx.fillRect(player.x + 22, player.y + 15, 10, 10)
  ctx.fillStyle = '#000000'
  ctx.fillRect(player.x + 12, player.y + 18, 4, 4)
  ctx.fillRect(player.x + 26, player.y + 18, 4, 4)
  ctx.fillStyle = '#065f46'
  ctx.fillRect(player.x + player.width, player.y + 25, 15, 8)
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

function activateControl(type: string) {
  activeControls[type] = true
}

function deactivateControl(type: string) {
  activeControls[type] = false
}

function handleTouchStart(e: TouchEvent) {
  e.preventDefault()
}

function handleTouchMove(e: TouchEvent) {
  e.preventDefault()
}

function handleTouchEnd(e: TouchEvent) {
  e.preventDefault()
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
    
    player.x *= scaleX
    player.y *= scaleY
    player.velocityX *= scaleX
    
    platforms.value.forEach(p => {
      p.x *= scaleX
      p.y *= scaleY
      p.width *= scaleX
      p.height *= scaleY
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
button {
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
</style>
