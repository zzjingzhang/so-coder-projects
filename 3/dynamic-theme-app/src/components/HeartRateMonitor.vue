<template>
  <el-card class="theme-transition h-full">
    <template #header>
      <div class="flex items-center gap-2">
        <el-icon><Monitor /></el-icon>
        <span class="font-semibold">心率监视器</span>
      </div>
    </template>
    
    <div class="space-y-4">
      <div class="flex items-center justify-center py-4">
        <div class="relative">
          <el-icon
            class="text-6xl text-red-500"
            :class="{ 'animate-pulse': isPulsing }"
          >
            <Heart />
          </el-icon>
          <div
            v-if="isPulsing"
            class="absolute inset-0 flex items-center justify-center"
          >
            <div class="w-16 h-16 bg-red-400 rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <div class="text-4xl font-bold text-red-500">{{ currentBPM }}</div>
        <div class="text-sm opacity-70">BPM</div>
      </div>
      
      <el-divider />
      
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm opacity-70">平均 BPM</span>
          <span class="font-medium">{{ avgBPM }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm opacity-70">最低</span>
          <span class="font-medium text-blue-500">{{ minBPM }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm opacity-70">最高</span>
          <span class="font-medium text-red-500">{{ maxBPM }}</span>
        </div>
      </div>
      
      <el-divider />
      
      <div>
        <div class="text-sm font-medium mb-2">最近 20 次心跳</div>
        <div class="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
          <svg width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0" />
              </linearGradient>
            </defs>
            <path :d="areaPath" fill="url(#heartGradient)" />
            <path
              :d="linePath"
              fill="none"
              stroke="#ef4444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle v-for="(point, i) in chartPoints" :key="i" :cx="point.x" :cy="point.y" r="3" fill="#ef4444" />
          </svg>
        </div>
      </div>
    </div>
    
    <div class="fixed bottom-6 right-6 z-50">
      <el-card class="shadow-xl" style="width: 200px">
        <div class="flex items-center gap-3">
          <el-icon
            class="text-3xl text-red-500"
            :class="{ 'animate-pulse': isPulsing }"
          >
            <Heart />
          </el-icon>
          <div>
            <div class="text-2xl font-bold text-red-500">{{ currentBPM }}</div>
            <div class="text-xs opacity-70">实时心率</div>
          </div>
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentBPM = ref(72)
const isPulsing = ref(true)
const heartbeats = ref([])
let intervalId = null

const generateHeartbeat = () => {
  const baseBPM = 70
  const variation = Math.floor(Math.random() * 30) - 15
  return baseBPM + variation
}

const addHeartbeat = () => {
  const bpm = generateHeartbeat()
  currentBPM.value = bpm
  
  heartbeats.value.push(bpm)
  if (heartbeats.value.length > 20) {
    heartbeats.value.shift()
  }
}

const avgBPM = computed(() => {
  if (heartbeats.value.length === 0) return 0
  const sum = heartbeats.value.reduce((a, b) => a + b, 0)
  return Math.round(sum / heartbeats.value.length)
})

const minBPM = computed(() => {
  if (heartbeats.value.length === 0) return 0
  return Math.min(...heartbeats.value)
})

const maxBPM = computed(() => {
  if (heartbeats.value.length === 0) return 0
  return Math.max(...heartbeats.value)
})

const chartPoints = computed(() => {
  const points = []
  const width = 400
  const height = 80
  const padding = 10
  
  if (heartbeats.value.length === 0) {
    for (let i = 0; i < 20; i++) {
      points.push({ x: (i / 19) * (width - 2 * padding) + padding, y: height / 2 })
    }
    return points
  }
  
  const min = Math.min(...heartbeats.value, 50)
  const max = Math.max(...heartbeats.value, 100)
  const range = max - min || 50
  
  const dataLength = heartbeats.value.length
  for (let i = 0; i < dataLength; i++) {
    const x = (i / Math.max(dataLength - 1, 1)) * (width - 2 * padding) + padding
    const normalizedValue = (heartbeats.value[i] - min) / range
    const y = height - padding - normalizedValue * (height - 2 * padding)
    points.push({ x, y })
  }
  
  return points
})

const linePath = computed(() => {
  if (chartPoints.value.length < 2) return ''
  
  let path = `M ${chartPoints.value[0].x} ${chartPoints.value[0].y}`
  
  for (let i = 1; i < chartPoints.value.length; i++) {
    const prev = chartPoints.value[i - 1]
    const curr = chartPoints.value[i]
    const cpx1 = prev.x + (curr.x - prev.x) / 3
    const cpx2 = prev.x + (curr.x - prev.x) * 2 / 3
    path += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`
  }
  
  return path
})

const areaPath = computed(() => {
  if (chartPoints.value.length < 2) return ''
  
  const firstPoint = chartPoints.value[0]
  const lastPoint = chartPoints.value[chartPoints.value.length - 1]
  const height = 80
  
  return linePath.value + ` L ${lastPoint.x} ${height} L ${firstPoint.x} ${height} Z`
})

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    addHeartbeat()
  }
  
  intervalId = setInterval(() => {
    addHeartbeat()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
