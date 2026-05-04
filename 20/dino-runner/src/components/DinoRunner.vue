<template>
  <div class="relative">
    <!-- 游戏分数显示 -->
    <div class="absolute top-4 right-4 z-10">
      <div class="bg-white bg-opacity-90 px-6 py-3 rounded-lg shadow-lg">
        <p class="text-sm text-gray-500 font-medium">分数</p>
        <p class="text-2xl font-bold text-gray-800 font-mono">{{ displayScore }}</p>
      </div>
    </div>
    
    <!-- 最高分显示 -->
    <div class="absolute top-4 left-4 z-10">
      <div class="bg-white bg-opacity-90 px-6 py-3 rounded-lg shadow-lg">
        <p class="text-sm text-gray-500 font-medium">最高分</p>
        <p class="text-2xl font-bold text-orange-600 font-mono">{{ highScore }}</p>
      </div>
    </div>

    <!-- 游戏画布 -->
    <canvas
      ref="gameCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
      class="border-4 border-gray-300 rounded-lg bg-white shadow-xl cursor-pointer"
      @click="handleClick"
    ></canvas>

    <!-- 开始/重新开始按钮 -->
    <div v-if="gameState === 'start' || gameState === 'gameOver'" class="absolute inset-0 flex items-center justify-center z-20">
      <div class="bg-white bg-opacity-95 px-12 py-10 rounded-xl shadow-2xl text-center">
        <h2 v-if="gameState === 'gameOver'" class="text-3xl font-bold text-red-500 mb-6">游戏结束!</h2>
        <h2 v-else class="text-3xl font-bold text-gray-800 mb-6">准备开始</h2>
        
        <p v-if="gameState === 'gameOver'" class="text-xl text-gray-600 mb-8">
          最终分数: <span class="font-bold text-orange-600">{{ displayScore }}</span>
        </p>
        
        <button
          @click="startGame"
          class="px-10 py-4 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center shadow-md mx-auto"
          style="display: inline-flex; min-width: 160px;"
        >
          {{ gameState === 'gameOver' ? '重新开始' : '开始游戏' }}
        </button>
        
        <p class="text-gray-500 mt-6 text-sm">或按空格键开始</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const gameCanvas = ref(null)
const gameState = ref('start')
const score = ref(0)
const highScore = ref(0)
const displayScore = computed(() => Math.floor(score.value))

const canvasWidth = 800
const canvasHeight = 300

let ctx = null
let animationId = null
let gameSpeed = 6
let frameCount = 0

const dino = {
  x: 50,
  y: 0,
  width: 40,
  height: 60,
  ducking: false,
  velocityY: 0,
  jumping: false,
  grounded: true
}

const gravity = 0.8
const jumpForce = -15
const groundY = canvasHeight - 80

let obstacles = []
let clouds = []
let particles = []

const obstacleTypes = [
  { type: 'cactus', width: 20, height: 40, color: '#535353' },
  { type: 'cactus-small', width: 15, height: 30, color: '#535353' },
  { type: 'cactus-double', width: 35, height: 40, color: '#535353' },
  { type: 'bird', width: 40, height: 30, color: '#535353', flying: true }
]

function initCanvas() {
  ctx = gameCanvas.value.getContext('2d')
  dino.y = groundY - dino.height
}

function drawGround() {
  ctx.strokeStyle = '#535353'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, groundY)
  ctx.lineTo(canvasWidth, groundY)
  ctx.stroke()
  
  for (let i = 0; i < canvasWidth; i += 20) {
    const offset = (frameCount * 2 + i) % 20
    ctx.beginPath()
    ctx.moveTo(i + offset, groundY + 5)
    ctx.lineTo(i + offset + 5, groundY + 5)
    ctx.stroke()
  }
}

function drawDino() {
  const height = dino.ducking ? 30 : 60
  const y = dino.ducking ? dino.y + 30 : dino.y
  
  ctx.fillStyle = '#535353'
  
  ctx.fillRect(dino.x, y, 35, height)
  
  ctx.fillRect(dino.x + 25, y - 10, 20, 20)
  
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(dino.x + 35, y - 5, 6, 6)
  ctx.fillStyle = '#535353'
  ctx.fillRect(dino.x + 37, y - 3, 3, 3)
  
  if (!dino.ducking) {
    const legOffset = Math.floor(frameCount / 5) % 2
    ctx.fillStyle = '#535353'
    ctx.fillRect(dino.x + 5, dino.y + height, 8, 15 + (legOffset * 3))
    ctx.fillRect(dino.x + 20, dino.y + height, 8, 15 + ((1 - legOffset) * 3))
  }
}

function drawClouds() {
  ctx.fillStyle = '#D3D3D3'
  clouds.forEach(cloud => {
    ctx.beginPath()
    ctx.arc(cloud.x, cloud.y, 20, Math.PI * 0.5, Math.PI * 1.5)
    ctx.arc(cloud.x + 20, cloud.y - 10, 25, Math.PI * 1, Math.PI * 2)
    ctx.arc(cloud.x + 40, cloud.y, 20, Math.PI * 1.5, Math.PI * 0.5)
    ctx.closePath()
    ctx.fill()
  })
}

function drawObstacles() {
  obstacles.forEach(obstacle => {
    ctx.fillStyle = obstacle.color
    
    if (obstacle.type === 'bird') {
      const wingOffset = Math.floor(frameCount / 3) % 2
      ctx.fillRect(obstacle.x + 5, obstacle.y + 10, 25, 15)
      ctx.fillRect(obstacle.x, obstacle.y + 5, 15, 10)
      if (wingOffset === 0) {
        ctx.fillRect(obstacle.x + 10, obstacle.y, 15, 10)
      } else {
        ctx.fillRect(obstacle.x + 10, obstacle.y + 5, 15, 10)
      }
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(obstacle.x + 25, obstacle.y + 12, 4, 4)
    } else if (obstacle.type === 'cactus-double') {
      ctx.fillRect(obstacle.x, obstacle.y, 12, obstacle.height)
      ctx.fillRect(obstacle.x + 4, obstacle.y - 10, 4, 15)
      ctx.fillRect(obstacle.x + 23, obstacle.y, 12, obstacle.height)
      ctx.fillRect(obstacle.x + 27, obstacle.y - 15, 4, 20)
    } else {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      ctx.fillRect(obstacle.x - 5, obstacle.y + 10, 5, 15)
      ctx.fillRect(obstacle.x + obstacle.width, obstacle.y + 5, 5, 10)
    }
  })
}

function drawParticles() {
  particles.forEach(particle => {
    ctx.fillStyle = `rgba(107, 107, 107, ${particle.alpha})`
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
  })
}

function spawnObstacle() {
  const minGap = 300
  const lastObstacle = obstacles[obstacles.length - 1]
  
  if (lastObstacle && lastObstacle.x > canvasWidth - minGap) {
    return
  }
  
  const typeIndex = Math.floor(Math.random() * obstacleTypes.length)
  const obstacleType = obstacleTypes[typeIndex]
  
  const obstacle = {
    x: canvasWidth,
    y: obstacleType.flying ? groundY - 70 - Math.random() * 40 : groundY - obstacleType.height,
    width: obstacleType.width,
    height: obstacleType.height,
    color: obstacleType.color,
    type: obstacleType.type,
    flying: obstacleType.flying || false
  }
  
  obstacles.push(obstacle)
}

function spawnCloud() {
  if (Math.random() < 0.01) {
    clouds.push({
      x: canvasWidth,
      y: 50 + Math.random() * 50,
      speed: 1 + Math.random()
    })
  }
}

function createParticles(x, y) {
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: x + Math.random() * 20,
      y: y + Math.random() * 10,
      size: 2 + Math.random() * 3,
      velocityX: -2 - Math.random() * 2,
      velocityY: -1 - Math.random(),
      alpha: 0.8
    })
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i]
    particle.x += particle.velocityX
    particle.y += particle.velocityY
    particle.velocityY += 0.2
    particle.alpha -= 0.02
    
    if (particle.alpha <= 0 || particle.y > groundY) {
      particles.splice(i, 1)
    }
  }
}

function updateClouds() {
  for (let i = clouds.length - 1; i >= 0; i--) {
    clouds[i].x -= clouds[i].speed
    if (clouds[i].x < -100) {
      clouds.splice(i, 1)
    }
  }
}

function updateObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= gameSpeed
    
    if (obstacles[i].x < -50) {
      obstacles.splice(i, 1)
    }
  }
}

function updateDino() {
  if (dino.jumping || !dino.grounded) {
    dino.velocityY += gravity
    dino.y += dino.velocityY
  }
  
  if (dino.y >= groundY - dino.height) {
    dino.y = groundY - dino.height
    dino.velocityY = 0
    dino.jumping = false
    dino.grounded = true
  }
  
  if (dino.grounded && !dino.ducking && frameCount % 3 === 0) {
    createParticles(dino.x, groundY)
  }
}

function checkCollision() {
  const dinoHeight = dino.ducking ? 30 : 60
  const dinoY = dino.ducking ? dino.y + 30 : dino.y
  
  const dinoBox = {
    x: dino.x + 5,
    y: dinoY + 5,
    width: 30,
    height: dinoHeight - 10
  }
  
  for (const obstacle of obstacles) {
    const obstacleBox = {
      x: obstacle.x + 2,
      y: obstacle.y + 2,
      width: obstacle.width - 4,
      height: obstacle.height - 4
    }
    
    if (
      dinoBox.x < obstacleBox.x + obstacleBox.width &&
      dinoBox.x + dinoBox.width > obstacleBox.x &&
      dinoBox.y < obstacleBox.y + obstacleBox.height &&
      dinoBox.y + dinoBox.height > obstacleBox.y
    ) {
      return true
    }
  }
  
  return false
}

function gameLoop() {
  if (gameState.value !== 'playing') return
  
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  
  drawGround()
  drawClouds()
  drawObstacles()
  drawDino()
  drawParticles()
  
  updateDino()
  updateObstacles()
  updateClouds()
  updateParticles()
  
  frameCount++
  score.value += gameSpeed * 0.01
  
  if (frameCount % 600 === 0 && gameSpeed < 15) {
    gameSpeed += 0.5
  }
  
  const spawnRate = Math.max(0.015, 0.025 - (gameSpeed - 6) * 0.001)
  if (Math.random() < spawnRate) {
    spawnObstacle()
  }
  
  spawnCloud()
  
  if (checkCollision()) {
    gameOver()
    return
  }
  
  animationId = requestAnimationFrame(gameLoop)
}

function jump() {
  if (dino.grounded && gameState.value === 'playing') {
    dino.jumping = true
    dino.grounded = false
    dino.velocityY = jumpForce
  }
}

function duck(active) {
  if (gameState.value === 'playing') {
    dino.ducking = active
  }
}

function startGame() {
  score.value = 0
  gameSpeed = 6
  frameCount = 0
  obstacles = []
  particles = []
  clouds = []
  dino.y = groundY - dino.height
  dino.velocityY = 0
  dino.jumping = false
  dino.grounded = true
  dino.ducking = false
  gameState.value = 'playing'
  
  gameLoop()
}

function gameOver() {
  gameState.value = 'gameOver'
  cancelAnimationFrame(animationId)
  
  if (displayScore.value > highScore.value) {
    highScore.value = displayScore.value
  }
}

function handleClick() {
  if (gameState.value === 'start' || gameState.value === 'gameOver') {
    startGame()
  } else if (gameState.value === 'playing') {
    jump()
  }
}

function handleKeydown(event) {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    event.preventDefault()
    if (gameState.value === 'start' || gameState.value === 'gameOver') {
      startGame()
    } else if (gameState.value === 'playing') {
      jump()
    }
  } else if (event.code === 'ArrowDown') {
    event.preventDefault()
    if (gameState.value === 'playing') {
      duck(true)
    }
  }
}

function handleKeyup(event) {
  if (event.code === 'ArrowDown') {
    duck(false)
  }
}

onMounted(() => {
  initCanvas()
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keyup', handleKeyup)
})
</script>
