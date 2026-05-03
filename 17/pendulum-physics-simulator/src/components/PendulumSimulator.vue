<template>
  <div class="pendulum-container w-full h-full flex flex-col">
    <div class="canvas-wrapper relative flex-1 min-h-[400px] bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl overflow-hidden">
      <canvas
        ref="canvasRef"
        class="w-full h-full"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleMouseUp"
      />
      
      <div class="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg p-3 text-xs">
        <div class="text-gray-300 space-y-1">
          <p>当前角度: <span class="text-cyan-400 font-mono">{{ currentAngle.toFixed(1) }}°</span></p>
          <p>角速度: <span class="text-purple-400 font-mono">{{ angularVelocity.toFixed(2) }} rad/s</span></p>
          <p>运行时间: <span class="text-green-400 font-mono">{{ elapsedTime.toFixed(1) }} s</span></p>
          <p v-if="isDragging" class="text-yellow-400 animate-pulse">拖动调整角度</p>
        </div>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
      <n-card title="动能" :bordered="false" size="small" class="bg-white/5 text-center">
        <span class="text-xl font-bold text-orange-400 font-mono">{{ kineticEnergy.toFixed(2) }} J</span>
      </n-card>
      <n-card title="势能" :bordered="false" size="small" class="bg-white/5 text-center">
        <span class="text-xl font-bold text-blue-400 font-mono">{{ potentialEnergy.toFixed(2) }} J</span>
      </n-card>
      <n-card title="总能量" :bordered="false" size="small" class="bg-white/5 text-center">
        <span class="text-xl font-bold text-green-400 font-mono">{{ totalEnergy.toFixed(2) }} J</span>
      </n-card>
      <n-card title="振幅" :bordered="false" size="small" class="bg-white/5 text-center">
        <span class="text-xl font-bold text-purple-400 font-mono">{{ amplitude.toFixed(1) }}°</span>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface PendulumState {
  angle: number
  angularVelocity: number
  length: number
  mass: number
  gravity: number
  damping: number
}

interface Props {
  length: number
  mass: number
  gravity: number
  initialAngle: number
  isRunning: boolean
}

const props = withDefaults(defineProps<Props>(), {
  length: 1.5,
  mass: 5.0,
  gravity: 9.8,
  initialAngle: 45,
  isRunning: false
})

const emit = defineEmits<{
  (e: 'update:isRunning', value: boolean): void
  (e: 'update:initialAngle', value: number): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const isDragging = ref(false)
const currentAngle = ref(45)
const angularVelocity = ref(0)
const elapsedTime = ref(0)

let animationFrameId: number | null = null
let lastTime: number | null = null
const state: PendulumState = {
  angle: Math.PI / 4,
  angularVelocity: 0,
  length: 1.5,
  mass: 5.0,
  gravity: 9.8,
  damping: 0.9995
}

const maxAngle = ref(Math.PI / 4)

const kineticEnergy = computed(() => {
  const v = state.angularVelocity * state.length
  return 0.5 * state.mass * v * v
})

const potentialEnergy = computed(() => {
  const h = state.length * (1 - Math.cos(state.angle))
  return state.mass * state.gravity * h
})

const totalEnergy = computed(() => {
  return kineticEnergy.value + potentialEnergy.value
})

const amplitude = computed(() => {
  return (maxAngle.value * 180) / Math.PI
})

const getCanvasSize = () => {
  if (!canvasRef.value) return { width: 0, height: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  return { width: rect.width, height: rect.height }
}

const resizeCanvas = () => {
  if (!canvasRef.value || !ctx.value) return
  const { width, height } = getCanvasSize()
  canvasRef.value.width = width * window.devicePixelRatio
  canvasRef.value.height = height * window.devicePixelRatio
  ctx.value.scale(window.devicePixelRatio, window.devicePixelRatio)
}

const getPivotPosition = () => {
  const { width, height } = getCanvasSize()
  return { x: width / 2, y: height * 0.15 }
}

const getBobPosition = () => {
  const pivot = getPivotPosition()
  const scale = Math.min(getCanvasSize().width, getCanvasSize().height) * 0.15
  const x = pivot.x + Math.sin(state.angle) * scale * (state.length / 1.5)
  const y = pivot.y + Math.cos(state.angle) * scale * (state.length / 1.5)
  return { x, y }
}

const drawBackground = () => {
  if (!ctx.value) return
  const { width, height } = getCanvasSize()
  
  const gradient = ctx.value.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, 'rgba(15, 23, 42, 0.3)')
  gradient.addColorStop(1, 'rgba(30, 27, 75, 0.3)')
  
  ctx.value.fillStyle = gradient
  ctx.value.fillRect(0, 0, width, height)
  
  ctx.value.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.value.lineWidth = 1
  
  const gridSize = 40
  for (let x = 0; x < width; x += gridSize) {
    ctx.value.beginPath()
    ctx.value.moveTo(x, 0)
    ctx.value.lineTo(x, height)
    ctx.value.stroke()
  }
  
  for (let y = 0; y < height; y += gridSize) {
    ctx.value.beginPath()
    ctx.value.moveTo(0, y)
    ctx.value.lineTo(width, y)
    ctx.value.stroke()
  }
}

const drawPendulum = () => {
  if (!ctx.value) return
  
  const pivot = getPivotPosition()
  const bob = getBobPosition()
  
  ctx.value.strokeStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.value.lineWidth = 2
  ctx.value.setLineDash([5, 5])
  ctx.value.beginPath()
  ctx.value.moveTo(pivot.x, pivot.y)
  ctx.value.lineTo(pivot.x, pivot.y + 200)
  ctx.value.stroke()
  ctx.value.setLineDash([])
  
  const bobGradient = ctx.value.createRadialGradient(
    bob.x - 5, bob.y - 5, 0,
    bob.x, bob.y, 20 + state.mass
  )
  bobGradient.addColorStop(0, 'rgba(255, 150, 150, 1)')
  bobGradient.addColorStop(0.7, 'rgba(255, 100, 100, 1)')
  bobGradient.addColorStop(1, 'rgba(200, 50, 50, 1)')
  
  ctx.value.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.value.lineWidth = 3
  ctx.value.beginPath()
  ctx.value.moveTo(pivot.x, pivot.y)
  ctx.value.lineTo(bob.x, bob.y)
  ctx.value.stroke()
  
  ctx.value.shadowColor = 'rgba(255, 100, 100, 0.5)'
  ctx.value.shadowBlur = 15
  
  ctx.value.fillStyle = bobGradient
  ctx.value.beginPath()
  ctx.value.arc(bob.x, bob.y, 15 + state.mass / 2, 0, Math.PI * 2)
  ctx.value.fill()
  
  ctx.value.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.value.beginPath()
  ctx.value.arc(bob.x - 5, bob.y - 5, 5, 0, Math.PI * 2)
  ctx.value.fill()
  
  ctx.value.shadowBlur = 0
  
  ctx.value.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.value.beginPath()
  ctx.value.arc(pivot.x, pivot.y, 6, 0, Math.PI * 2)
  ctx.value.fill()
}

const drawTrail = () => {
  // 轨迹效果可以在后续优化中添加
}

const draw = () => {
  if (!ctx.value) return
  
  const { width, height } = getCanvasSize()
  ctx.value.clearRect(0, 0, width, height)
  
  drawBackground()
  drawTrail()
  drawPendulum()
}

const updatePhysics = (dt: number) => {
  if (!props.isRunning || isDragging.value) return
  
  const angularAcceleration = -(state.gravity / state.length) * Math.sin(state.angle)
  
  state.angularVelocity += angularAcceleration * dt
  state.angularVelocity *= state.damping
  state.angle += state.angularVelocity * dt
  
  const absAngle = Math.abs(state.angle)
  if (absAngle > maxAngle.value) {
    maxAngle.value = absAngle
  }
  
  currentAngle.value = (state.angle * 180) / Math.PI
  angularVelocity.value = state.angularVelocity
  elapsedTime.value += dt
}

const animate = (time: number) => {
  if (lastTime !== null) {
    const dt = Math.min((time - lastTime) / 1000, 0.016)
    updatePhysics(dt)
  }
  lastTime = time
  
  draw()
  animationFrameId = requestAnimationFrame(animate)
}

const startAnimation = () => {
  if (animationFrameId !== null) return
  lastTime = null
  animationFrameId = requestAnimationFrame(animate)
}

const stopAnimation = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const getAngleFromMouse = (mouseX: number, mouseY: number) => {
  const pivot = getPivotPosition()
  const dx = mouseX - pivot.x
  const dy = mouseY - pivot.y
  return Math.atan2(dx, dy)
}

const handleMouseDown = (e: MouseEvent) => {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top
  const bob = getBobPosition()
  
  const distance = Math.sqrt(
    Math.pow(mouseX - bob.x, 2) + Math.pow(mouseY - bob.y, 2)
  )
  
  if (distance < 30 + props.mass / 2) {
    isDragging.value = true
    emit('update:isRunning', false)
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top
  state.angle = getAngleFromMouse(mouseX, mouseY)
  currentAngle.value = (state.angle * 180) / Math.PI
}

const handleMouseUp = () => {
  if (isDragging.value) {
    emit('update:initialAngle', currentAngle.value)
  }
  isDragging.value = false
}

const handleTouchStart = (e: TouchEvent) => {
  e.preventDefault()
  const touch = e.touches[0]
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  
  const mouseEvent = {
    clientX: touch.clientX,
    clientY: touch.clientY
  } as MouseEvent
  
  handleMouseDown(mouseEvent)
}

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault()
  const touch = e.touches[0]
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  
  const mouseEvent = {
    clientX: touch.clientX,
    clientY: touch.clientY
  } as MouseEvent
  
  handleMouseMove(mouseEvent)
}

const reset = () => {
  state.angle = (props.initialAngle * Math.PI) / 180
  state.angularVelocity = 0
  state.length = props.length
  state.mass = props.mass
  state.gravity = props.gravity
  currentAngle.value = props.initialAngle
  angularVelocity.value = 0
  elapsedTime.value = 0
  maxAngle.value = Math.abs(state.angle)
}

watch([
  () => props.length,
  () => props.mass,
  () => props.gravity,
  () => props.initialAngle
], () => {
  state.length = props.length
  state.mass = props.mass
  state.gravity = props.gravity
  
  if (!props.isRunning) {
    state.angle = (props.initialAngle * Math.PI) / 180
    state.angularVelocity = 0
    currentAngle.value = props.initialAngle
    angularVelocity.value = 0
    maxAngle.value = Math.abs(state.angle)
  }
}, { immediate: true })

watch(() => props.isRunning, (newVal) => {
  if (!newVal) {
    // 暂停时不重置状态
  }
})

onMounted(() => {
  if (!canvasRef.value) return
  
  ctx.value = canvasRef.value.getContext('2d')
  if (!ctx.value) return
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  reset()
  startAnimation()
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.pendulum-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.canvas-wrapper {
  cursor: grab;
}

.canvas-wrapper:active {
  cursor: grabbing;
}

canvas {
  display: block;
  touch-action: none;
}

:deep(.n-card-header) {
  color: #f1f5f9 !important;
}

:deep(.n-card-header .n-card-header__main) {
  color: #f1f5f9 !important;
  font-weight: 600 !important;
}

:deep(.n-card__content) {
  color: #e2e8f0 !important;
}
</style>
