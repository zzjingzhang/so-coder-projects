<template>
  <div class="game-container flex flex-col items-center justify-center min-h-screen p-4">
    <!-- 顶部信息栏 -->
    <div class="top-bar w-full max-w-5xl flex justify-between items-center mb-4">
      <button 
        @click="goBack"
        class="back-button bg-gray-800 border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        ← 返回主页
      </button>
      
      <div class="game-title text-2xl font-bold text-pink-400" style="font-family: 'Press Start 2P', cursive;">
        RETRO PINBALL
      </div>
      
      <div class="game-controls flex gap-2">
        <button 
          @click="togglePause"
          class="retro-button"
        >
          {{ isPaused ? '继续' : '暂停' }}
        </button>
        <button 
          @click="resetGame"
          class="retro-button"
        >
          重置
        </button>
      </div>
    </div>

    <!-- 主游戏区域 -->
    <div class="game-area flex gap-6">
      <!-- 左侧信息面板 -->
      <div class="info-panel w-48 bg-gray-900/80 border border-gray-700 rounded-lg p-4">
        <div class="score-section mb-6">
          <div class="control-label mb-2">得分</div>
          <div class="score-display text-center">
            {{ score.toLocaleString() }}
          </div>
        </div>
        
        <div class="multiplier-section mb-6">
          <div class="control-label mb-2">得分乘数</div>
          <div class="multiplier-display text-center">
            x{{ multiplier }}
          </div>
        </div>
        
        <div class="balls-section mb-6">
          <div class="control-label mb-2">剩余弹球</div>
          <div class="flex justify-center gap-2">
            <div 
              v-for="i in maxBalls" 
              :key="i"
              class="ball-indicator w-6 h-6 rounded-full"
              :class="i <= balls ? 'bg-pink-500 shadow-lg shadow-pink-500/50' : 'bg-gray-700'"
            ></div>
          </div>
        </div>
        
        <div class="mode-section mb-6">
          <div class="control-label mb-2">游戏模式</div>
          <div 
            class="text-center py-2 px-3 rounded"
            :class="isMultiBall ? 'bg-yellow-900/50 text-yellow-400' : 'bg-gray-800 text-gray-400'"
          >
            {{ isMultiBall ? '多球模式' : '单球模式' }}
          </div>
        </div>
        
        <div class="combo-section">
          <div class="control-label mb-2">连击</div>
          <div class="text-center text-cyan-400 text-lg font-bold">
            {{ combo }}x
          </div>
        </div>
      </div>

      <!-- 游戏画布 -->
      <div class="canvas-container relative">
        <canvas 
          ref="gameCanvas"
          class="pinball-canvas"
          :width="canvasWidth"
          :height="canvasHeight"
        ></canvas>
        
        <!-- 暂停遮罩 -->
        <div 
          v-if="isPaused && !gameOver"
          class="pause-overlay absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg"
        >
          <div class="text-4xl text-yellow-400 mb-4" style="font-family: 'Press Start 2P', cursive;">
            游戏暂停
          </div>
          <div class="text-gray-400">按 P 键继续</div>
        </div>
        
        <!-- 游戏结束遮罩 -->
        <div 
          v-if="gameOver"
          class="game-over-overlay absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg"
        >
          <div class="text-5xl text-red-500 mb-6" style="font-family: 'Press Start 2P', cursive;">
            游戏结束
          </div>
          <div class="text-2xl text-yellow-400 mb-2">最终得分</div>
          <div class="text-4xl text-pink-400 mb-8" style="font-family: 'Press Start 2P', cursive;">
            {{ score.toLocaleString() }}
          </div>
          <el-button 
            type="primary" 
            size="large"
            @click="resetGame"
            class="px-8 py-3 text-lg"
          >
            再玩一次
          </el-button>
        </div>
      </div>

      <!-- 右侧操作面板 -->
      <div class="controls-panel w-48 bg-gray-900/80 border border-gray-700 rounded-lg p-4">
        <div class="controls-title text-cyan-400 text-center mb-4 font-bold">
          操作说明
        </div>
        
        <div class="control-item mb-4">
          <div class="flex items-center justify-between mb-1">
            <span class="text-gray-400 text-sm">左挡板</span>
            <span class="text-cyan-400 text-xs bg-gray-800 px-2 py-1 rounded">←</span>
          </div>
          <div class="h-2 bg-gray-800 rounded">
            <div 
              class="h-full bg-cyan-400 rounded transition-all duration-100"
              :style="{ width: leftFlipperActive ? '100%' : '0%' }"
            ></div>
          </div>
        </div>
        
        <div class="control-item mb-4">
          <div class="flex items-center justify-between mb-1">
            <span class="text-gray-400 text-sm">右挡板</span>
            <span class="text-cyan-400 text-xs bg-gray-800 px-2 py-1 rounded">→</span>
          </div>
          <div class="h-2 bg-gray-800 rounded">
            <div 
              class="h-full bg-cyan-400 rounded transition-all duration-100"
              :style="{ width: rightFlipperActive ? '100%' : '0%' }"
            ></div>
          </div>
        </div>
        
        <div class="control-item mb-6">
          <div class="flex items-center justify-between mb-1">
            <span class="text-gray-400 text-sm">发射弹球</span>
            <span class="text-pink-400 text-xs bg-gray-800 px-2 py-1 rounded">空格</span>
          </div>
          <div class="h-2 bg-gray-800 rounded">
            <div 
              class="h-full bg-pink-400 rounded transition-all duration-100"
              :style="{ width: plungerPower * 100 + '%' }"
            ></div>
          </div>
        </div>
        
        <div class="tips-section bg-gray-800/50 rounded-lg p-3">
          <div class="text-yellow-400 text-xs font-bold mb-2">游戏提示</div>
          <ul class="text-gray-400 text-xs space-y-1">
            <li>• 撞击保险杠获得分数</li>
            <li>• 连续撞击增加乘数</li>
            <li>• 得分达到10000触发多球模式</li>
            <li>• 挡板落空丢失弹球</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 底部状态栏 -->
    <div class="bottom-bar mt-4 text-gray-500 text-sm">
      提示: 使用方向键 ← → 控制挡板，空格键发射弹球
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 画布配置
const canvasWidth = 600
const canvasHeight = 800
const gameCanvas = ref(null)

// 游戏状态
const score = ref(0)
const multiplier = ref(1)
const balls = ref(3)
const maxBalls = 3
const combo = ref(0)
const isPaused = ref(false)
const gameOver = ref(false)
const isMultiBall = ref(false)
const leftFlipperActive = ref(false)
const rightFlipperActive = ref(false)
const plungerPower = ref(0)

// 游戏对象
let ctx = null
let animationId = null
let ballsArray = []
let bumpers = []
let flippers = { left: null, right: null }
let walls = []
let flashEffects = []
let comboTimer = null
let isCharging = false
let chargeStartTime = 0

// 物理常量
const GRAVITY = 0.15
const BOUNCE_DAMPING = 0.85
const FLIPPER_FORCE = 15
const BUMPER_BOUNCE = 12

// 颜色配置
const COLORS = {
  background: '#0a0a0a',
  wall: '#333',
  bumper: [
    { fill: '#ff00ff', glow: '#ff00ff' },
    { fill: '#00ffff', glow: '#00ffff' },
    { fill: '#ffff00', glow: '#ffff00' },
    { fill: '#ff6600', glow: '#ff6600' },
    { fill: '#00ff00', glow: '#00ff00' }
  ],
  flipper: '#ff00ff',
  ball: '#ffffff',
  grid: 'rgba(255, 255, 255, 0.05)'
}

class Ball {
  constructor(x, y, vx = 0, vy = 0) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.radius = 8
    this.active = true
    this.trail = []
  }

  update() {
    this.vy += GRAVITY
    
    this.vx *= 0.998
    this.vy *= 0.998
    
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
    if (speed > 25) {
      this.vx = (this.vx / speed) * 25
      this.vy = (this.vy / speed) * 25
    }
    
    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > 10) {
      this.trail.shift()
    }
    
    this.x += this.vx
    this.y += this.vy
  }

  draw(ctx) {
    for (let i = 0; i < this.trail.length; i++) {
      const alpha = (i + 1) / this.trail.length * 0.5
      ctx.beginPath()
      ctx.arc(this.trail[i].x, this.trail[i].y, this.radius * (i + 1) / this.trail.length, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.fill()
    }
    
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(
      this.x - 2, this.y - 2, 0,
      this.x, this.y, this.radius
    )
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(0.5, '#e0e0e0')
    gradient.addColorStop(1, '#a0a0a0')
    ctx.fillStyle = gradient
    ctx.fill()
    
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
    ctx.shadowBlur = 15
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

class Bumper {
  constructor(x, y, radius, colorIndex = 0) {
    this.x = x
    this.y = y
    this.radius = radius
    this.colorIndex = colorIndex
    this.hitTimer = 0
    this.pulsePhase = Math.random() * Math.PI * 2
  }

  hit() {
    this.hitTimer = 30
    
    const points = 100 * multiplier.value
    score.value += points
    
    combo.value++
    if (comboTimer) clearTimeout(comboTimer)
    comboTimer = setTimeout(() => {
      combo.value = 0
      multiplier.value = 1
    }, 2000)
    
    if (combo.value >= 3) {
      multiplier.value = Math.min(multiplier.value + 1, 5)
    }
    
    if (score.value >= 10000 && !isMultiBall.value) {
      activateMultiBall()
    }
    
    addFlashEffect(this.x, this.y, COLORS.bumper[this.colorIndex].glow)
    
    return points
  }

  update() {
    if (this.hitTimer > 0) {
      this.hitTimer--
    }
    this.pulsePhase += 0.05
  }

  draw(ctx) {
    const color = COLORS.bumper[this.colorIndex]
    const pulseScale = this.hitTimer > 0 ? 1.2 : 1 + Math.sin(this.pulsePhase) * 0.05
    const displayRadius = this.radius * pulseScale
    
    ctx.beginPath()
    ctx.arc(this.x, this.y, displayRadius + 5, 0, Math.PI * 2)
    ctx.strokeStyle = this.hitTimer > 0 ? color.glow : 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 2
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(this.x, this.y, displayRadius, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, displayRadius
    )
    gradient.addColorStop(0, 'white')
    gradient.addColorStop(0.3, color.fill)
    gradient.addColorStop(1, this.hitTimer > 0 ? color.glow : color.fill)
    ctx.fillStyle = gradient
    ctx.fill()
    
    if (this.hitTimer > 0) {
      ctx.shadowColor = color.glow
      ctx.shadowBlur = 30
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }
}

class Flipper {
  constructor(x, y, length, angle, isLeft) {
    this.x = x
    this.y = y
    this.length = length
    this.baseAngle = angle
    this.currentAngle = angle
    this.targetAngle = angle
    this.isLeft = isLeft
    this.active = false
  }

  setActive(active) {
    this.active = active
    if (active) {
      this.targetAngle = this.isLeft ? this.baseAngle - 0.8 : this.baseAngle + 0.8
    } else {
      this.targetAngle = this.baseAngle
    }
  }

  update() {
    const diff = this.targetAngle - this.currentAngle
    this.currentAngle += diff * 0.3
  }

  getEndPoint() {
    return {
      x: this.x + Math.cos(this.currentAngle) * this.length,
      y: this.y + Math.sin(this.currentAngle) * this.length
    }
  }

  draw(ctx) {
    const end = this.getEndPoint()
    
    ctx.beginPath()
    ctx.moveTo(this.x - 10, this.y)
    ctx.lineTo(end.x, end.y)
    ctx.strokeStyle = COLORS.flipper
    ctx.lineWidth = 12
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.shadowColor = COLORS.flipper
    ctx.shadowBlur = 15
    ctx.stroke()
    ctx.shadowBlur = 0
    
    ctx.beginPath()
    ctx.moveTo(this.x - 8, this.y)
    ctx.lineTo(end.x, end.y)
    ctx.strokeStyle = 'rgba(255, 0, 255, 0.5)'
    ctx.lineWidth = 8
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2)
    ctx.fillStyle = '#ff00ff'
    ctx.shadowColor = '#ff00ff'
    ctx.shadowBlur = 10
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

class Wall {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.strokeStyle = COLORS.wall
    ctx.lineWidth = 3
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 1
    ctx.stroke()
  }
}

class FlashEffect {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.radius = 5
    this.maxRadius = 50
    this.alpha = 1
    this.active = true
  }

  update() {
    this.radius += 5
    this.alpha -= 0.05
    if (this.alpha <= 0) {
      this.active = false
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.strokeStyle = this.color
    ctx.lineWidth = 3
    ctx.globalAlpha = this.alpha
    ctx.shadowColor = this.color
    ctx.shadowBlur = 20
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.globalAlpha = 1
  }
}

function addFlashEffect(x, y, color) {
  flashEffects.push(new FlashEffect(x, y, color))
}

function activateMultiBall() {
  isMultiBall.value = true
  for (let i = 0; i < 2; i++) {
    const ball = new Ball(
      canvasWidth / 2 + (Math.random() - 0.5) * 100,
      canvasHeight / 3,
      (Math.random() - 0.5) * 5,
      -5
    )
    ballsArray.push(ball)
  }
}

function initGame() {
  ballsArray = []
  bumpers = []
  walls = []
  flashEffects = []
  score.value = 0
  multiplier.value = 1
  balls.value = maxBalls
  combo.value = 0
  isPaused.value = false
  gameOver.value = false
  isMultiBall.value = false
  
  flippers.left = new Flipper(180, canvasHeight - 80, 80, -0.5, true)
  flippers.right = new Flipper(canvasWidth - 180, canvasHeight - 80, 80, Math.PI + 0.5, false)
  
  const bumperRadius = 25
  const bumperPositions = [
    { x: 200, y: 200, color: 0 },
    { x: 400, y: 200, color: 1 },
    { x: 300, y: 280, color: 2 },
    { x: 180, y: 350, color: 3 },
    { x: 420, y: 350, color: 4 },
    { x: 300, y: 420, color: 0 },
    { x: 200, y: 500, color: 1 },
    { x: 400, y: 500, color: 2 }
  ]
  
  bumperPositions.forEach(pos => {
    bumpers.push(new Bumper(pos.x, pos.y, bumperRadius, pos.color))
  })
  
  walls = [
    new Wall(50, 100, 50, canvasHeight - 100),
    new Wall(canvasWidth - 50, 100, canvasWidth - 50, canvasHeight - 100),
    new Wall(50, 100, 150, 50),
    new Wall(canvasWidth - 50, 100, canvasWidth - 150, 50),
    new Wall(150, 50, canvasWidth - 150, 50),
    new Wall(50, canvasHeight - 100, 150, canvasHeight - 50),
    new Wall(canvasWidth - 50, canvasHeight - 100, canvasWidth - 150, canvasHeight - 50),
    new Wall(50, 100, 100, 200),
    new Wall(canvasWidth - 50, 100, canvasWidth - 100, 200)
  ]
  
  spawnBall()
}

function spawnBall() {
  const ball = new Ball(canvasWidth - 30, canvasHeight - 100, 0, 0)
  ballsArray.push(ball)
}

function launchBall(power) {
  const inactiveBall = ballsArray.find(ball => 
    ball.vx === 0 && ball.vy === 0 && ball.x === canvasWidth - 30 && ball.y === canvasHeight - 100
  )
  
  if (inactiveBall) {
    inactiveBall.vx = -2 + (Math.random() - 0.5) * 2
    inactiveBall.vy = -power * 15
  }
}

function checkBallCollisions(ball) {
  const leftWall = 50 + ball.radius
  const rightWall = canvasWidth - 50 - ball.radius
  const topWall = 50 + ball.radius
  
  if (ball.x - ball.radius < leftWall) {
    ball.x = leftWall
    ball.vx = Math.abs(ball.vx) * BOUNCE_DAMPING
  }
  if (ball.x + ball.radius > rightWall) {
    ball.x = rightWall
    ball.vx = -Math.abs(ball.vx) * BOUNCE_DAMPING
  }
  if (ball.y - ball.radius < topWall) {
    ball.y = topWall
    ball.vy = Math.abs(ball.vy) * BOUNCE_DAMPING
  }
  
  bumpers.forEach(bumper => {
    const dx = ball.x - bumper.x
    const dy = ball.y - bumper.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const minDist = ball.radius + bumper.radius
    
    if (distance < minDist) {
      const nx = dx / distance
      const ny = dy / distance
      
      const dotProduct = ball.vx * nx + ball.vy * ny
      
      ball.vx -= 2 * dotProduct * nx
      ball.vy -= 2 * dotProduct * ny
      
      const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy)
      if (speed < BUMPER_BOUNCE) {
        ball.vx = (ball.vx / speed) * BUMPER_BOUNCE
        ball.vy = (ball.vy / speed) * BUMPER_BOUNCE
      }
      
      const overlap = minDist - distance
      ball.x += nx * overlap
      ball.y += ny * overlap
      
      bumper.hit()
    }
  })
  
  checkFlipperCollision(ball, flippers.left)
  checkFlipperCollision(ball, flippers.right)
  
  if (ball.y > canvasHeight + ball.radius) {
    ball.active = false
  }
}

function checkFlipperCollision(ball, flipper) {
  const end = flipper.getEndPoint()
  
  const closestPoint = getClosestPointOnLine(
    { x: flipper.x, y: flipper.y },
    end,
    { x: ball.x, y: ball.y }
  )
  
  const dx = ball.x - closestPoint.x
  const dy = ball.y - closestPoint.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  if (distance < ball.radius + 6) {
    const nx = dx / distance
    const ny = dy / distance
    
    const dotProduct = ball.vx * nx + ball.vy * ny
    ball.vx -= 2 * dotProduct * nx
    ball.vy -= 2 * dotProduct * ny
    
    if (flipper.active) {
      const direction = flipper.isLeft ? -1 : 1
      ball.vx += FLIPPER_FORCE * direction * 0.5
      ball.vy -= FLIPPER_FORCE * 0.8
    }
    
    const overlap = ball.radius + 6 - distance
    ball.x += nx * overlap
    ball.y += ny * overlap
  }
}

function getClosestPointOnLine(lineStart, lineEnd, point) {
  const dx = lineEnd.x - lineStart.x
  const dy = lineEnd.y - lineStart.y
  const lengthSq = dx * dx + dy * dy
  
  if (lengthSq === 0) return lineStart
  
  let t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / lengthSq
  t = Math.max(0, Math.min(1, t))
  
  return {
    x: lineStart.x + t * dx,
    y: lineStart.y + t * dy
  }
}

function drawBackground() {
  ctx.fillStyle = COLORS.background
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  
  ctx.strokeStyle = COLORS.grid
  ctx.lineWidth = 1
  
  for (let x = 0; x < canvasWidth; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvasHeight)
    ctx.stroke()
  }
  
  for (let y = 0; y < canvasHeight; y += 50) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvasWidth, y)
    ctx.stroke()
  }
}

function drawPlunger() {
  const plungerX = canvasWidth - 30
  const plungerY = canvasHeight - 100
  
  ctx.beginPath()
  ctx.rect(plungerX - 10, plungerY - 100, 20, 100)
  ctx.fillStyle = 'rgba(50, 50, 50, 0.5)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.lineWidth = 1
  ctx.stroke()
  
  const plungerHeight = plungerPower.value * 80
  ctx.beginPath()
  ctx.rect(plungerX - 8, plungerY - plungerHeight, 16, plungerHeight)
  ctx.fillStyle = '#ff00ff'
  ctx.shadowColor = '#ff00ff'
  ctx.shadowBlur = 10
  ctx.fill()
  ctx.shadowBlur = 0
}

function gameLoop() {
  if (isPaused.value || gameOver.value) {
    animationId = requestAnimationFrame(gameLoop)
    return
  }
  
  drawBackground()
  
  walls.forEach(wall => wall.draw(ctx))
  
  bumpers.forEach(bumper => {
    bumper.update()
    bumper.draw(ctx)
  })
  
  flippers.left.update()
  flippers.right.update()
  flippers.left.draw(ctx)
  flippers.right.draw(ctx)
  
  leftFlipperActive.value = flippers.left.active
  rightFlipperActive.value = flippers.right.active
  
  drawPlunger()
  
  const activeBalls = []
  let ballsLost = 0
  
  ballsArray.forEach(ball => {
    ball.update()
    checkBallCollisions(ball)
    
    if (ball.active) {
      ball.draw(ctx)
      activeBalls.push(ball)
    } else {
      ballsLost++
    }
  })
  
  ballsArray = activeBalls
  
  if (ballsLost > 0 && !isMultiBall.value) {
    balls.value -= ballsLost
    
    if (balls.value <= 0) {
      gameOver.value = true
    } else {
      spawnBall()
    }
  }
  
  if (isMultiBall.value && ballsArray.length === 0) {
    isMultiBall.value = false
    spawnBall()
  }
  
  flashEffects = flashEffects.filter(effect => effect.active)
  flashEffects.forEach(effect => {
    effect.update()
    effect.draw(ctx)
  })
  
  animationId = requestAnimationFrame(gameLoop)
}

function handleKeyDown(e) {
  if (gameOver.value) return
  
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      flippers.left.setActive(true)
      break
    case 'ArrowRight':
      e.preventDefault()
      flippers.right.setActive(true)
      break
    case ' ':
      e.preventDefault()
      if (!isCharging) {
        isCharging = true
        chargeStartTime = Date.now()
        plungerPower.value = 0
      }
      break
    case 'p':
    case 'P':
      isPaused.value = !isPaused.value
      break
  }
}

function handleKeyUp(e) {
  if (gameOver.value) return
  
  switch (e.key) {
    case 'ArrowLeft':
      flippers.left.setActive(false)
      break
    case 'ArrowRight':
      flippers.right.setActive(false)
      break
    case ' ':
      if (isCharging) {
        const chargeTime = Math.min((Date.now() - chargeStartTime) / 1000, 1)
        plungerPower.value = chargeTime
        launchBall(chargeTime)
        isCharging = false
        plungerPower.value = 0
      }
      break
  }
}

function updateCharge() {
  if (isCharging) {
    const chargeTime = Math.min((Date.now() - chargeStartTime) / 1000, 1)
    plungerPower.value = chargeTime
  }
  requestAnimationFrame(updateCharge)
}

function goBack() {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  router.push('/')
}

function togglePause() {
  isPaused.value = !isPaused.value
}

function resetGame() {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  initGame()
  gameLoop()
}

onMounted(() => {
  ctx = gameCanvas.value.getContext('2d')
  initGame()
  
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  
  updateCharge()
  gameLoop()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<style scoped>
.game-container {
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);
}

.info-panel, .controls-panel {
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.1);
}

.pause-overlay, .game-over-overlay {
  backdrop-filter: blur(5px);
}

.ball-indicator {
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
}

.ball-indicator.bg-pink-500 {
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
}
</style>
