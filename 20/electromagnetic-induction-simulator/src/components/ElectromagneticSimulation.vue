<template>
  <div class="w-full">
    <svg 
      ref="svgRef"
      :width="svgWidth" 
      :height="svgHeight" 
      class="w-full bg-slate-900/50 rounded-xl border border-slate-700"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="magnetNorth" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="magnetSouth" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="coilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#4f46e5;stop-opacity:0.8" />
        </linearGradient>
        <radialGradient id="currentGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <marker 
          id="arrowhead" 
          markerWidth="10" 
          markerHeight="7" 
          refX="9" 
          refY="3.5" 
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
        </marker>
      </defs>

      <rect x="0" y="0" width="800" height="400" fill="transparent" />

      <g v-if="showMagneticField">
        <path
          v-for="(line, index) in magneticFieldLines"
          :key="index"
          :d="line.path"
          :stroke="line.color"
          :stroke-width="line.width"
          :stroke-opacity="line.opacity"
          :marker-end="line.hasArrow ? 'url(#arrowhead)' : 'none'"
          fill="none"
          :class="{'animate-magnetic': line.animated}"
        />
      </g>

      <g>
        <rect
          x="350"
          y="120"
          width="100"
          height="160"
          rx="8"
          fill="url(#coilGradient)"
          opacity="0.9"
        />
        
        <g v-for="(turn, i) in coilTurns" :key="i">
          <ellipse
            :cx="350"
            :cy="130 + i * 12"
            :rx="50"
            :ry="8"
            fill="none"
            :stroke="currentFlow > 0 ? '#22d3ee' : currentFlow < 0 ? '#f97316' : '#6366f1'"
            :stroke-width="Math.abs(currentFlow) > 0.01 ? 3 : 2"
            :stroke-dasharray="Math.abs(currentFlow) > 0.01 ? '5,3' : 'none'"
            :filter="Math.abs(currentFlow) > 0.01 ? 'url(#glow)' : 'none'"
          />
        </g>

        <g v-if="Math.abs(currentFlow) > 0.01">
          <path
            :d="currentIndicatorPath"
            :stroke="currentFlow > 0 ? '#22d3ee' : '#f97316'"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
            :class="{'animate-current': true}"
            filter="url(#glow)"
          />
        </g>
      </g>

      <g :transform="`translate(${magnetX}, ${magnetY})`">
        <rect
          x="0"
          y="0"
          :width="magnetWidth"
          :height="magnetHeight"
          rx="6"
          fill="url(#magnetNorth)"
        />
        <rect
          :x="magnetWidth"
          y="0"
          :width="magnetWidth"
          :height="magnetHeight"
          rx="6"
          fill="url(#magnetSouth)"
        />
        
        <text
          :x="magnetWidth / 2"
          :y="magnetHeight / 2 + 5"
          text-anchor="middle"
          fill="white"
          font-size="18"
          font-weight="bold"
        >N</text>
        <text
          :x="magnetWidth * 1.5"
          :y="magnetHeight / 2 + 5"
          text-anchor="middle"
          fill="white"
          font-size="18"
          font-weight="bold"
        >S</text>

        <rect
          x="-3"
          y="10"
          :width="6"
          :height="magnetHeight - 20"
          rx="3"
          fill="#94a3b8"
        />
        <rect
          :x="magnetWidth * 2 - 3"
          y="10"
          :width="6"
          :height="magnetHeight - 20"
          rx="3"
          fill="#94a3b8"
        />
      </g>

      <g>
        <text x="150" y="380" text-anchor="middle" fill="#94a3b8" font-size="12">
          磁铁移动方向 →
        </text>
        <line x1="80" y1="385" x2="220" y2="385" stroke="#6366f1" stroke-width="2" />
        <polygon points="220,380 230,385 220,390" fill="#6366f1" />
      </g>

      <g v-if="Math.abs(currentFlow) > 0.01">
        <rect
          x="500"
          y="300"
          width="120"
          height="40"
          rx="8"
          fill="rgba(30, 41, 59, 0.95)"
          stroke="#6366f1"
          stroke-width="1"
        />
        <text
          x="560"
          y="325"
          text-anchor="middle"
          :fill="currentFlow > 0 ? '#22d3ee' : '#f97316'"
          font-size="14"
          font-weight="bold"
        >
          感应电流: {{ Math.abs(currentFlow).toFixed(2) }}A
        </text>
        <text
          x="560"
          y="310"
          text-anchor="middle"
          fill="#94a3b8"
          font-size="10"
        >
          {{ currentFlow > 0 ? '正向 (顺时针)' : currentFlow < 0 ? '反向 (逆时针)' : '' }}
        </text>
      </g>

      <g>
        <rect x="30" y="30" width="100" height="60" rx="8" fill="rgba(30, 41, 59, 0.9)" stroke="#4f46e5" stroke-width="1" />
        <text x="80" y="52" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">N极 = 红色</text>
        <text x="80" y="72" text-anchor="middle" fill="#3b82f6" font-size="12" font-weight="bold">S极 = 蓝色</text>
      </g>

      <g>
        <text x="380" y="20" text-anchor="middle" fill="#94a3b8" font-size="14">
          磁场线: 从 N 极出发，回到 S 极
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  magnetPosition: {
    type: Number,
    default: -50
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  speed: {
    type: Number,
    default: 1
  },
  mode: {
    type: String,
    default: 'auto'
  }
})

const emit = defineEmits([
  'update:magnetPosition',
  'update:isPlaying',
  'current-change',
  'step-complete'
])

const svgRef = ref(null)
const svgWidth = ref(800)
const svgHeight = ref(400)
const magnetWidth = 60
const magnetHeight = 100
const coilTurns = Array.from({ length: 12 }, (_, i) => i)

const localMagnetPosition = ref(props.magnetPosition)
const localIsPlaying = ref(props.isPlaying)
const animationFrame = ref(null)
const lastTime = ref(0)
const direction = ref(1)
const velocity = ref(0)

const magnetX = computed(() => {
  const minX = 50
  const maxX = 600
  return minX + (localMagnetPosition.value + 100) * (maxX - minX) / 300
})

const magnetY = computed(() => 150)

const currentFlow = computed(() => {
  const pos = localMagnetPosition.value
  
  if (pos < -30 || pos > 130) {
    return 0
  }
  
  if (pos >= -30 && pos <= 50) {
    const t = (pos + 30) / 80
    return -Math.sin(t * Math.PI) * Math.abs(velocity.value) * 2
  }
  
  if (pos > 50 && pos <= 130) {
    const t = (pos - 50) / 80
    return Math.sin(t * Math.PI) * Math.abs(velocity.value) * 2
  }
  
  return 0
})

const magneticFieldLines = computed(() => {
  const lines = []
  const mx = magnetX.value + magnetWidth
  const my = magnetY.value + magnetHeight / 2
  
  const intensity = Math.max(0, 1 - Math.abs(mx - 400) / 400)
  const lineCount = Math.floor(5 + intensity * 10)
  
  for (let i = 0; i < lineCount; i++) {
    const angle = (i / lineCount) * Math.PI * 2
    const startX = mx
    const startY = my + Math.sin(angle) * 30
    
    const targetX = 400
    const targetY = 200
    
    const controlX1 = startX + (targetX - startX) * 0.3
    const controlY1 = startY + Math.sin(angle) * 50
    const controlX2 = startX + (targetX - startX) * 0.7
    const controlY2 = targetY + (Math.random() - 0.5) * 30
    
    lines.push({
      path: `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`,
      color: '#6366f1',
      width: 1.5,
      opacity: 0.3 + intensity * 0.5,
      animated: localIsPlaying.value,
      hasArrow: true
    })
  }
  
  for (let i = 0; i < lineCount; i++) {
    const angle = (i / lineCount) * Math.PI * 2
    const startX = 400
    const startY = 200 + Math.sin(angle) * 30
    
    const targetX = magnetX.value
    const targetY = my + Math.sin(angle) * 30
    
    lines.push({
      path: `M ${startX} ${startY} Q ${(startX + targetX) / 2} ${(startY + targetY) / 2 + Math.sin(angle) * 40}, ${targetX} ${targetY}`,
      color: '#22d3ee',
      width: 1.5,
      opacity: 0.3 + intensity * 0.5,
      animated: localIsPlaying.value,
      hasArrow: true
    })
  }
  
  return lines
})

const currentIndicatorPath = computed(() => {
  const direction = currentFlow.value > 0 ? 1 : -1
  const baseY = 200
  
  if (direction > 0) {
    return `M 450 ${baseY - 60} 
            Q 480 ${baseY - 60}, 480 ${baseY - 30}
            L 480 ${baseY + 30}
            Q 480 ${baseY + 60}, 450 ${baseY + 60}`
  } else {
    return `M 350 ${baseY + 60}
            Q 320 ${baseY + 60}, 320 ${baseY + 30}
            L 320 ${baseY - 30}
            Q 320 ${baseY - 60}, 350 ${baseY - 60}`
  }
})

const showMagneticField = computed(() => true)

const animate = (time) => {
  if (!lastTime.value) lastTime.value = time
  const deltaTime = (time - lastTime.value) / 1000
  lastTime.value = time
  
  if (localIsPlaying.value && props.mode === 'auto') {
    const moveSpeed = 80 * props.speed
    const newVelocity = moveSpeed * direction.value * deltaTime
    velocity.value = newVelocity / deltaTime
    
    localMagnetPosition.value += moveSpeed * direction.value * deltaTime
    
    if (localMagnetPosition.value >= 150) {
      direction.value = -1
      localMagnetPosition.value = 150
    } else if (localMagnetPosition.value <= -50) {
      direction.value = 1
      localMagnetPosition.value = -50
    }
    
    emit('update:magnetPosition', localMagnetPosition.value)
    emit('current-change', currentFlow.value, velocity.value)
  }
  
  animationFrame.value = requestAnimationFrame(animate)
}

watch(() => props.magnetPosition, (newVal) => {
  localMagnetPosition.value = newVal
  const delta = newVal - localMagnetPosition.value
  velocity.value = delta * 10
  emit('current-change', currentFlow.value, velocity.value)
})

watch(() => props.isPlaying, (newVal) => {
  localIsPlaying.value = newVal
  if (!newVal) {
    velocity.value = 0
    emit('current-change', currentFlow.value, 0)
  }
})

watch([localMagnetPosition, velocity], () => {
  emit('current-change', currentFlow.value, velocity.value)
})

onMounted(() => {
  animationFrame.value = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})
</script>
