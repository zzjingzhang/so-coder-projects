<template>
  <div class="fluid-simulation-container relative w-full h-full">
    <canvas
      ref="canvasRef"
      class="w-full h-full cursor-pointer"
      @click="handleCanvasClick"
      @mousemove="handleCanvasMouseMove"
      width="800"
      height="600"
    ></canvas>
    <div class="absolute bottom-4 left-4 text-sm text-text-secondary bg-surface/80 px-3 py-2 rounded-lg backdrop-blur-sm">
      点击或拖拽画布创建波纹
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, toRef } from 'vue'
import { useFluidSimulation, type FluidParams } from '../composables/useFluidSimulation'

interface Props {
  params: FluidParams
}

const props = defineProps<Props>()
const canvasRef = ref<HTMLCanvasElement | null>(null)

const paramsRef = toRef(props, 'params')

const {
  isRunning,
  start,
  stop,
  reset,
  handleCanvasClick,
  handleCanvasMouseMove,
  addRandomWaves
} = useFluidSimulation(canvasRef, paramsRef)

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const container = canvas.parentElement
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  canvas.width = Math.floor(rect.width)
  canvas.height = Math.floor(rect.height)
  
  if (isRunning.value) {
    reset()
  }
}

onMounted(() => {
  resizeCanvas()
  start()
  window.addEventListener('resize', resizeCanvas)
  
  const interval = setInterval(() => {
    if (isRunning.value && Math.random() > 0.7) {
      addRandomWaves()
    }
  }, 3000)
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})

onUnmounted(() => {
  stop()
  window.removeEventListener('resize', resizeCanvas)
})



defineExpose({
  reset,
  addRandomWaves
})
</script>

<style scoped>
.fluid-simulation-container {
  background: linear-gradient(180deg, #020617 0%, #0f172a 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(6, 182, 212, 0.2), inset 0 0 60px rgba(6, 182, 212, 0.05);
}

canvas {
  display: block;
}
</style>
