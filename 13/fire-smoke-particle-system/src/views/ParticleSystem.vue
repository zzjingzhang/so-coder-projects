<template>
  <div class="w-full min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gradient-to-r from-orange-600 to-red-600 py-6 px-8 shadow-lg">
      <h1 class="text-3xl font-bold text-white text-center">
        🔥 火灾与烟雾粒子系统 🔥
      </h1>
      <p class="text-orange-100 text-center mt-2">
        实时风相互作用模拟 - 调节下方滑块观察效果
      </p>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col lg:flex-row">
      <!-- Canvas Area -->
      <div class="flex-1 p-4">
        <div class="relative w-full h-[500px] lg:h-[600px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
          <canvas
            ref="canvasRef"
            class="w-full h-full cursor-crosshair"
            @mousemove="handleMouseMove"
            @click="handleClick"
          />
          <!-- Info Overlay -->
          <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
            <p class="text-sm text-gray-300">
              粒子数量: <span class="text-orange-400 font-bold">{{ particleCount }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Controls Panel -->
      <div class="lg:w-96 bg-gray-800 p-6 lg:border-l-2 border-gray-700">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span class="text-2xl">⚙️</span> 控制面板
        </h2>

        <!-- Emission Rate -->
        <div class="mb-6">
          <label class="block text-gray-300 font-semibold mb-2">
            🔥 发射率
          </label>
          <a-slider
            v-model:value="settings.emissionRate"
            :min="1"
            :max="20"
            :step="1"
            class="mb-2"
          />
          <div class="flex justify-between text-sm text-gray-400">
            <span>慢</span>
            <span class="text-orange-400 font-bold">{{ settings.emissionRate }} 粒子/帧</span>
            <span>快</span>
          </div>
        </div>

        <!-- Particle Size -->
        <div class="mb-6">
          <label class="block text-gray-300 font-semibold mb-2">
            ○ 粒子大小
          </label>
          <a-slider
            v-model:value="settings.particleSize"
            :min="5"
            :max="50"
            :step="1"
            class="mb-2"
          />
          <div class="flex justify-between text-sm text-gray-400">
            <span>小</span>
            <span class="text-orange-400 font-bold">{{ settings.particleSize }}px</span>
            <span>大</span>
          </div>
        </div>

        <!-- Turbulence -->
        <div class="mb-6">
          <label class="block text-gray-300 font-semibold mb-2">
            🌪️ 湍流强度
          </label>
          <a-slider
            v-model:value="settings.turbulence"
            :min="0"
            :max="5"
            :step="0.1"
            class="mb-2"
          />
          <div class="flex justify-between text-sm text-gray-400">
            <span>稳定</span>
            <span class="text-orange-400 font-bold">{{ settings.turbulence.toFixed(1) }}</span>
            <span>剧烈</span>
          </div>
        </div>

        <!-- Wind Speed -->
        <div class="mb-6">
          <label class="block text-gray-300 font-semibold mb-2">
            💨 风速
          </label>
          <a-slider
            v-model:value="settings.windSpeed"
            :min="-10"
            :max="10"
            :step="0.5"
            class="mb-2"
          />
          <div class="flex justify-between text-sm text-gray-400">
            <span>← 左风</span>
            <span class="text-orange-400 font-bold">
              {{ settings.windSpeed > 0 ? '右风 →' : settings.windSpeed < 0 ? '← 左风' : '无风' }}
            </span>
            <span>右风 →</span>
          </div>
        </div>

        <!-- Fire Intensity -->
        <div class="mb-6">
          <label class="block text-gray-300 font-semibold mb-2">
            🔥 火焰强度
          </label>
          <a-slider
            v-model:value="settings.fireIntensity"
            :min="0.1"
            :max="2"
            :step="0.1"
            class="mb-2"
          />
          <div class="flex justify-between text-sm text-gray-400">
            <span>弱</span>
            <span class="text-orange-400 font-bold">{{ settings.fireIntensity.toFixed(1) }}x</span>
            <span>强</span>
          </div>
        </div>

        <!-- Smoke Density -->
        <div class="mb-6">
          <label class="block text-gray-300 font-semibold mb-2">
            💨 烟雾密度
          </label>
          <a-slider
            v-model:value="settings.smokeDensity"
            :min="0"
            :max="1"
            :step="0.1"
            class="mb-2"
          />
          <div class="flex justify-between text-sm text-gray-400">
            <span>稀薄</span>
            <span class="text-orange-400 font-bold">{{ (settings.smokeDensity * 100).toFixed(0) }}%</span>
            <span>浓厚</span>
          </div>
        </div>

        <!-- Reset Button -->
        <div class="mt-8">
          <a-button
            type="primary"
            size="large"
            block
            @click="resetSettings"
            class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none h-12 text-lg font-semibold shadow-lg"
          >
            🔄 重置默认值
          </a-button>
        </div>

        <!-- Instructions -->
        <div class="mt-6 p-4 bg-gray-700/50 rounded-lg">
          <h3 class="text-white font-semibold mb-2">📝 使用提示</h3>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>• 点击画布可添加额外火焰点</li>
            <li>• 调节风速观察风对火焰的影响</li>
            <li>• 增加湍流使火焰更加不规则</li>
            <li>• 烟雾密度控制烟雾的浓密程度</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  type: 'fire' | 'smoke' | 'ember'
  color: { r: number; g: number; b: number }
  alpha: number
  rotation: number
  rotationSpeed: number
}

interface Settings {
  emissionRate: number
  particleSize: number
  turbulence: number
  windSpeed: number
  fireIntensity: number
  smokeDensity: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const particleCount = ref(0)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let particles: Particle[] = []
let noiseOffset = 0
let time = 0

const settings = reactive<Settings>({
  emissionRate: 8,
  particleSize: 25,
  turbulence: 1.5,
  windSpeed: 0,
  fireIntensity: 1,
  smokeDensity: 0.5
})

const defaultSettings: Settings = {
  emissionRate: 8,
  particleSize: 25,
  turbulence: 1.5,
  windSpeed: 0,
  fireIntensity: 1,
  smokeDensity: 0.5
}

function resetSettings() {
  Object.assign(settings, defaultSettings)
}

function noise(x: number, y: number, z: number): number {
  const p = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
    140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
    247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
    57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
    60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
    65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
    52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
    207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
    119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
    218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
    81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
    184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
    222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
    140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
    247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
    57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
    60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
    65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
    52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
    207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
    119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
    218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
    81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
    184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
    222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
  ]

  function fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  function lerp(a: number, b: number, t: number): number {
    return a + t * (b - a)
  }

  function grad(hash: number, x: number, y: number, z: number): number {
    const h = hash & 15
    const u = h < 8 ? x : y
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  const Z = Math.floor(z) & 255

  x -= Math.floor(x)
  y -= Math.floor(y)
  z -= Math.floor(z)

  const u = fade(x)
  const v = fade(y)
  const w = fade(z)

  const A = p[X] + Y
  const AA = p[A] + Z
  const AB = p[A + 1] + Z
  const B = p[X + 1] + Y
  const BA = p[B] + Z
  const BB = p[B + 1] + Z

  return lerp(
    lerp(
      lerp(grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z), u),
      lerp(grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z), u),
      v
    ),
    lerp(
      lerp(grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1), u),
      lerp(grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1), u),
      v
    ),
    w
  )
}

function createFireParticle(canvasWidth: number, canvasHeight: number, baseX?: number, baseY?: number): Particle {
  const x = baseX ?? (canvasWidth / 2 + (Math.random() - 0.5) * 60)
  const y = baseY ?? canvasHeight - 50
  const baseSize = Math.max(2, settings.particleSize + (Math.random() - 0.5) * 15)
  const size = baseSize * Math.max(0.1, settings.fireIntensity)

  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 2 + settings.windSpeed * 0.1,
    vy: -(Math.random() * 3 + 2) * Math.max(0.1, settings.fireIntensity),
    size: Math.max(1, size),
    life: 1,
    maxLife: 60 + Math.random() * 40,
    type: 'fire',
    color: { r: 255, g: 100 + Math.random() * 100, b: 0 },
    alpha: 1,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.1
  }
}

function createSmokeParticle(canvasWidth: number, canvasHeight: number, baseX?: number, baseY?: number): Particle {
  const x = baseX ?? (canvasWidth / 2 + (Math.random() - 0.5) * 40)
  const y = baseY ?? (canvasHeight - 100 - Math.random() * 50)
  const size = Math.max(3, settings.particleSize * 1.5 + Math.random() * 20)

  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 1 + settings.windSpeed * 0.08,
    vy: -(Math.random() * 1.5 + 0.5) * Math.max(0.1, settings.fireIntensity),
    size,
    life: 1,
    maxLife: 120 + Math.random() * 80,
    type: 'smoke',
    color: { r: 80 + Math.random() * 40, g: 80 + Math.random() * 40, b: 80 + Math.random() * 40 },
    alpha: 0.3 * Math.max(0, settings.smokeDensity),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02
  }
}

function createEmberParticle(canvasWidth: number, canvasHeight: number, baseX?: number, baseY?: number): Particle {
  const x = baseX ?? (canvasWidth / 2 + (Math.random() - 0.5) * 50)
  const y = baseY ?? (canvasHeight - 60)
  const size = Math.random() * 4 + 2

  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 4 + settings.windSpeed * 0.15,
    vy: -(Math.random() * 5 + 3) * settings.fireIntensity,
    size,
    life: 1,
    maxLife: 80 + Math.random() * 60,
    type: 'ember',
    color: { r: 255, g: 150 + Math.random() * 50, b: 0 },
    alpha: 1,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.3
  }
}

function updateParticle(particle: Particle, canvasWidth: number, canvasHeight: number): boolean {
  const turbulence = settings.turbulence
  const noiseScale = 0.01
  const timeOffset = time * 0.01

  const noiseX = noise(particle.x * noiseScale + noiseOffset, particle.y * noiseScale, timeOffset) * turbulence
  const noiseY = noise(particle.x * noiseScale, particle.y * noiseScale + noiseOffset, timeOffset + 100) * turbulence * 0.5

  particle.vx += noiseX * 0.05 + settings.windSpeed * 0.005

  if (particle.type === 'fire') {
    particle.vy -= 0.08 * Math.max(0.1, settings.fireIntensity)
    particle.size = Math.max(0.5, particle.size * 0.992)
    particle.color.g = Math.max(0, particle.color.g - 2)
    particle.color.b = Math.max(0, particle.color.b + 0.5)
  } else if (particle.type === 'smoke') {
    particle.vy -= 0.02 * Math.max(0.1, settings.fireIntensity)
    particle.size = Math.min(200, particle.size * 1.005)
    particle.alpha *= 0.998
  } else if (particle.type === 'ember') {
    particle.vy += 0.02
    particle.alpha *= 0.995
    if (Math.random() < 0.05) {
      particle.alpha = Math.random() * 0.5 + 0.5
    }
  }

  particle.x += particle.vx
  particle.y += particle.vy
  particle.life -= 1 / particle.maxLife
  particle.rotation += particle.rotationSpeed

  return particle.life > 0 && particle.y > -50 && particle.x > -100 && particle.x < canvasWidth + 100
}

function drawParticle(particle: Particle, ctx: CanvasRenderingContext2D) {
  ctx.save()
  ctx.translate(particle.x, particle.y)
  ctx.rotate(particle.rotation)
  ctx.globalAlpha = particle.alpha * particle.life

  if (particle.type === 'fire') {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size)
    const lifeRatio = particle.life

    const r = particle.color.r
    const g = Math.floor(particle.color.g * lifeRatio + 50 * (1 - lifeRatio))
    const b = Math.floor(particle.color.b * lifeRatio)

    gradient.addColorStop(0, `rgba(255, 255, 200, ${0.9 * lifeRatio})`)
    gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${0.7 * lifeRatio})`)
    gradient.addColorStop(0.7, `rgba(${r - 50}, ${g - 80}, 0, ${0.4 * lifeRatio})`)
    gradient.addColorStop(1, `rgba(100, 0, 0, 0)`)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
    ctx.fill()

    const glowSize = particle.size * 2
    const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize)
    glowGradient.addColorStop(0, `rgba(255, 150, 50, ${0.2 * lifeRatio})`)
    glowGradient.addColorStop(1, 'rgba(255, 100, 0, 0)')
    ctx.fillStyle = glowGradient
    ctx.beginPath()
    ctx.arc(0, 0, glowSize, 0, Math.PI * 2)
    ctx.fill()
  } else if (particle.type === 'smoke') {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size)
    const c = particle.color.r
    gradient.addColorStop(0, `rgba(${c}, ${c}, ${c}, ${particle.alpha * particle.life * 0.5})`)
    gradient.addColorStop(0.5, `rgba(${c}, ${c}, ${c}, ${particle.alpha * particle.life * 0.3})`)
    gradient.addColorStop(1, `rgba(${c}, ${c}, ${c}, 0)`)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
    ctx.fill()
  } else if (particle.type === 'ember') {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size)
    gradient.addColorStop(0, `rgba(255, 255, 200, ${particle.alpha * particle.life})`)
    gradient.addColorStop(0.5, `rgba(${particle.color.r}, ${particle.color.g}, 0, ${particle.alpha * particle.life * 0.8})`)
    gradient.addColorStop(1, 'rgba(200, 50, 0, 0)')

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

function animate() {
  const canvas = canvasRef.value
  
  if (!canvas || !ctx) {
    animationId = requestAnimationFrame(animate)
    return
  }

  const width = canvas.width
  const height = canvas.height

  if (width === 0 || height === 0) {
    animationId = requestAnimationFrame(animate)
    return
  }

  try {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.3)'
    ctx.fillRect(0, 0, width, height)

    const emissionRate = Math.max(1, Math.floor(settings.emissionRate))
    for (let i = 0; i < emissionRate; i++) {
      particles.push(createFireParticle(width, height))
    }

    if (settings.smokeDensity > 0 && Math.random() < settings.smokeDensity * 0.3) {
      particles.push(createSmokeParticle(width, height))
    }

    if (settings.fireIntensity > 0 && Math.random() < 0.1 * settings.fireIntensity) {
      particles.push(createEmberParticle(width, height))
    }

    particles = particles.filter(p => updateParticle(p, width, height))
    particleCount.value = particles.length

    particles.sort((a, b) => {
      const order: Record<string, number> = { smoke: 0, fire: 1, ember: 2 }
      return order[a.type] - order[b.type]
    })

    particles.forEach(p => drawParticle(p, ctx!))

    const fireIntensity = Math.max(0.1, settings.fireIntensity)
    const baseGradient = ctx.createRadialGradient(
      width / 2, height - 20, 0, 
      width / 2, height - 20, 
      80 * fireIntensity
    )
    baseGradient.addColorStop(0, `rgba(255, 150, 50, ${0.5 * fireIntensity})`)
    baseGradient.addColorStop(0.5, `rgba(255, 100, 0, ${0.3 * fireIntensity})`)
    baseGradient.addColorStop(1, 'rgba(255, 50, 0, 0)')
    ctx.fillStyle = baseGradient
    ctx.beginPath()
    ctx.arc(width / 2, height - 20, 80 * fireIntensity, 0, Math.PI * 2)
    ctx.fill()

    time += 1
    noiseOffset += 0.01
  } catch (error) {
    console.error('Particle system error:', error)
  }

  animationId = requestAnimationFrame(animate)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = rect.height * window.devicePixelRatio

  if (ctx) {
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
}

function handleMouseMove(event: MouseEvent) {
}

function handleClick(event: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  for (let i = 0; i < 15; i++) {
    particles.push(createFireParticle(canvas.width, canvas.height, x + (Math.random() - 0.5) * 30, y))
  }
  for (let i = 0; i < 5; i++) {
    particles.push(createEmberParticle(canvas.width, canvas.height, x, y))
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  ctx.fillStyle = '#1a1a2e'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
</style>
