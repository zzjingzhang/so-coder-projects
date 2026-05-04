<template>
  <div class="particle-container relative bg-white/50 rounded-lg overflow-hidden border-2 border-gray-200 shadow-inner">
    <canvas 
      ref="canvasRef" 
      :width="canvasWidth" 
      :height="canvasHeight"
      class="w-full h-full"
    ></canvas>
    <div 
      v-if="mode === 'constant-pressure'"
      class="absolute top-0 bottom-0 bg-gradient-to-r from-blue-100/30 to-transparent transition-all duration-500 flex items-center justify-center"
      :style="{ width: `${volumeScale}%`, right: 0 }"
    >
      <span class="text-xs text-blue-600 font-medium bg-white/80 px-2 py-1 rounded" v-if="volumeScale > 20">
        体积变化
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import type { GasType, GasMoles } from '../types/gas'

const props = defineProps<{
  moles: GasMoles
  mode: 'constant-volume' | 'constant-pressure'
  volumeRatio: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasWidth = ref(600)
const canvasHeight = ref(400)
let animationId: number | null = null
let ctx: CanvasRenderingContext2D | null = null

interface Particle {
  id: number
  type: GasType
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const particles = ref<Particle[]>([])

const gasColors: Record<GasType, string> = {
  N2: '#3b82f6',
  H2: '#ef4444',
  He: '#22c55e'
}

const gasRadii: Record<GasType, number> = {
  N2: 8,
  H2: 5,
  He: 6
}

const volumeScale = computed(() => {
  return Math.min(100, Math.max(0, (props.volumeRatio - 1) * 100))
})

function generateParticles() {
  const newParticles: Particle[] = []
  let idCounter = 0
  
  const totalMoles = props.moles.N2 + props.moles.H2 + props.moles.He
  const maxParticles = 120
  
  const n2Count = Math.round((props.moles.N2 / totalMoles) * maxParticles)
  const h2Count = Math.round((props.moles.H2 / totalMoles) * maxParticles)
  const heCount = Math.max(0, Math.round((props.moles.He / totalMoles) * maxParticles))
  
  for (let i = 0; i < n2Count; i++) {
    newParticles.push(createParticle('N2', idCounter++))
  }
  for (let i = 0; i < h2Count; i++) {
    newParticles.push(createParticle('H2', idCounter++))
  }
  for (let i = 0; i < heCount; i++) {
    newParticles.push(createParticle('He', idCounter++))
  }
  
  particles.value = newParticles
}

function createParticle(type: GasType, id: number): Particle {
  const effectiveWidth = props.mode === 'constant-pressure' 
    ? canvasWidth.value * props.volumeRatio 
    : canvasWidth.value
  
  const radius = gasRadii[type]
  return {
    id,
    type,
    x: radius + Math.random() * (effectiveWidth - 2 * radius),
    y: radius + Math.random() * (canvasHeight.value - 2 * radius),
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    radius
  }
}

function updateParticles() {
  const effectiveWidth = props.mode === 'constant-pressure' 
    ? canvasWidth.value * props.volumeRatio 
    : canvasWidth.value
  
  particles.value.forEach(p => {
    p.x += p.vx
    p.y += p.vy
    
    if (p.x - p.radius <= 0) {
      p.x = p.radius
      p.vx = Math.abs(p.vx)
    }
    if (p.x + p.radius >= effectiveWidth) {
      p.x = effectiveWidth - p.radius
      p.vx = -Math.abs(p.vx)
    }
    if (p.y - p.radius <= 0) {
      p.y = p.radius
      p.vy = Math.abs(p.vy)
    }
    if (p.y + p.radius >= canvasHeight.value) {
      p.y = canvasHeight.value - p.radius
      p.vy = -Math.abs(p.vy)
    }
  })
}

function drawParticles() {
  if (!ctx) return
  
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  
  const effectiveWidth = props.mode === 'constant-pressure' 
    ? canvasWidth.value * props.volumeRatio 
    : canvasWidth.value
  
  ctx.strokeStyle = '#94a3b8'
  ctx.lineWidth = 2
  ctx.strokeRect(1, 1, effectiveWidth - 2, canvasHeight.value - 2)
  
  if (props.mode === 'constant-pressure' && props.volumeRatio > 1) {
    const originalWidth = canvasWidth.value
    ctx.fillStyle = 'rgba(59, 130, 246, 0.05)'
    ctx.fillRect(originalWidth, 1, effectiveWidth - originalWidth, canvasHeight.value - 2)
    
    ctx.strokeStyle = '#3b82f6'
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(originalWidth, 0)
    ctx.lineTo(originalWidth, canvasHeight.value)
    ctx.stroke()
    ctx.setLineDash([])
  }
  
  particles.value.forEach(p => {
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx!.fillStyle = gasColors[p.type]
    ctx!.fill()
    
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx!.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx!.lineWidth = 1
    ctx!.stroke()
  })
}

function animate() {
  updateParticles()
  drawParticles()
  animationId = requestAnimationFrame(animate)
}

watch(() => [props.moles.N2, props.moles.H2, props.moles.He, props.volumeRatio], () => {
  generateParticles()
}, { deep: true })

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    const container = canvasRef.value.parentElement
    if (container) {
      canvasWidth.value = container.clientWidth
      canvasHeight.value = Math.max(300, container.clientHeight)
    }
    generateParticles()
    animate()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.particle-container {
  min-height: 300px;
  width: 100%;
}
</style>
