<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  isPlaying: boolean
  delay: number
  speed: number
}>()

const isBlooming = ref(false)
const bloomProgress = ref(0)
let animationFrame: number | null = null

const startBloom = () => {
  isBlooming.value = true
  bloomProgress.value = 0
  
  const startTime = Date.now()
  const duration = 7000 / props.speed
  
  const animate = () => {
    if (!isBlooming.value) return
    
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    bloomProgress.value = progress
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }
  
  animate()
}

const stopBloom = () => {
  isBlooming.value = false
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

watch(() => props.isPlaying, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      startBloom()
    }, props.delay)
  } else {
    stopBloom()
  }
})

onMounted(() => {
  if (props.isPlaying) {
    setTimeout(() => {
      startBloom()
    }, props.delay)
  }
})

const getPetalTransform = (index: number, total: number) => {
  const angle = (index / total) * 360
  const petalProgress = Math.min(bloomProgress.value * 1.3, 1)
  const openAngle = 10 + petalProgress * 20
  
  return {
    transform: `rotate(${angle}deg) translateY(-${35 + openAngle}px) rotateX(${70 - petalProgress * 60}deg)`,
    opacity: Math.max(0.2, bloomProgress.value),
    zIndex: index
  }
}

const getStamenTransform = (index: number, total: number) => {
  const angle = (index / total) * 360
  const stamenProgress = Math.max(0, (bloomProgress.value - 0.4) / 0.6)
  
  return {
    transform: `rotate(${angle}deg) translateY(-${5 + stamenProgress * 10}px)`,
    opacity: stamenProgress
  }
}

const getPetalColor = () => {
  const progress = Math.min(bloomProgress.value, 1)
  const h = 45 + progress * 5
  const s = 100
  const l = 50 + progress * 10
  
  return `hsl(${h}, ${s}%, ${l}%)`
}

const getInnerPetalColor = () => {
  const progress = Math.min(bloomProgress.value, 1)
  const h = 35 + progress * 10
  const s = 100
  const l = 45 + progress * 15
  
  return `hsl(${h}, ${s}%, ${l}%)`
}
</script>

<template>
  <div class="sunflower-container relative w-full h-full flex items-center justify-center">
    <div class="sunflower relative" :style="{ transform: `scale(${0.5 + bloomProgress.value * 0.5})` }">
      <!-- 外层花瓣 -->
      <div
        v-for="i in 20"
        :key="'outer-' + i"
        class="petal outer-petal absolute"
        :style="{
          width: '12px',
          height: '50px',
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          ...getPetalTransform(i - 1, 20),
          background: `linear-gradient(to top, ${getPetalColor()}, ${getInnerPetalColor()})`,
          boxShadow: `0 2px 8px rgba(255, 200, 0, 0.4)`,
          zIndex: 10
        }"
      />
      
      <!-- 内层花瓣 -->
      <div
        v-for="i in 14"
        :key="'inner-' + i"
        class="petal inner-petal absolute"
        :style="{
          width: '10px',
          height: '40px',
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          transform: `rotate(${(i - 1) / 14 * 360}deg) translateY(-${25 + bloomProgress.value * 15}px) rotateX(${60 - bloomProgress.value * 50}deg)`,
          background: `linear-gradient(to top, #ffd700, #ffeb3b)`,
          boxShadow: `0 2px 6px rgba(255, 200, 0, 0.5)`,
          opacity: Math.max(0.3, bloomProgress.value),
          zIndex: 20
        }"
      />
      
      <!-- 花盘 -->
      <div 
        class="disk absolute w-24 h-24 rounded-full"
        :style="{
          background: `radial-gradient(circle, #8b4513, #654321, #3d2b1f)`,
          boxShadow: `0 0 20px rgba(101, 67, 33, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3)`,
          opacity: Math.max(0.3, bloomProgress.value),
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${0.8 + bloomProgress.value * 0.2})`,
          zIndex: 30
        }"
      >
        <!-- 花盘纹理 -->
        <div 
          v-for="i in 5"
          :key="'ring-' + i"
          class="disk-ring absolute rounded-full"
          :style="{
            width: `${30 + i * 15}px`,
            height: `${30 + i * 15}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(139, 69, 19, 0.5)',
            opacity: bloomProgress.value * 0.6
          }"
        />
        
        <!-- 雄蕊/种子点 -->
        <div
          v-for="i in 30"
          :key="'seed-' + i"
          class="seed-point absolute w-1.5 h-1.5 rounded-full"
          :style="{
            background: `radial-gradient(circle, #ffd700, #8b4513)`,
            boxShadow: '0 0 3px rgba(255, 215, 0, 0.5)',
            top: '50%',
            left: '50%',
            transform: `rotate(${(i - 1) / 30 * 360}deg) translateY(-${15 + (i % 3) * 8}px)`,
            opacity: Math.max(0, (bloomProgress.value - 0.5) / 0.5)
          }"
        />
      </div>
    </div>
    
    <!-- 花茎 -->
    <div 
      class="stem absolute w-4 rounded-full"
      :style="{
        height: `${120 + bloomProgress.value * 60}px`,
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(to right, #228b22, #32cd32, #228b22)',
        boxShadow: '2px 0 6px rgba(34, 139, 34, 0.3)',
        opacity: Math.max(0.5, bloomProgress.value),
        zIndex: 0
      }"
    />
    
    <!-- 叶子 -->
    <div 
      class="leaf absolute"
      :style="{
        width: '50px',
        height: '25px',
        background: 'linear-gradient(135deg, #228b22, #32cd32)',
        borderRadius: '0 60% 40% 0',
        transform: `rotate(-20deg) scale(${bloomProgress.value})`,
        left: 'calc(50% - 70px)',
        bottom: '80px',
        opacity: bloomProgress.value,
        boxShadow: '2px 2px 6px rgba(34, 139, 34, 0.3)',
        zIndex: 0
      }"
    />
    <div 
      class="leaf absolute"
      :style="{
        width: '45px',
        height: '22px',
        background: 'linear-gradient(45deg, #228b22, #32cd32)',
        borderRadius: '60% 0 0 40%',
        transform: `rotate(25deg) scale(${bloomProgress.value})`,
        right: 'calc(50% - 70px)',
        bottom: '110px',
        opacity: bloomProgress.value,
        boxShadow: '-2px 2px 6px rgba(34, 139, 34, 0.3)',
        zIndex: 0
      }"
    />
    <div 
      class="leaf absolute"
      :style="{
        width: '40px',
        height: '20px',
        background: 'linear-gradient(135deg, #228b22, #32cd32)',
        borderRadius: '0 60% 40% 0',
        transform: `rotate(-15deg) scale(${bloomProgress.value})`,
        left: 'calc(50% - 60px)',
        bottom: '140px',
        opacity: bloomProgress.value,
        boxShadow: '2px 2px 5px rgba(34, 139, 34, 0.3)',
        zIndex: 0
      }"
    />
  </div>
</template>

<style scoped>
.sunflower-container {
  perspective: 1000px;
}

.sunflower {
  transform-style: preserve-3d;
  position: relative;
  width: 200px;
  height: 200px;
}

.petal {
  transform-origin: bottom center;
  transition: all 0.1s ease;
}

.disk {
  position: relative;
}

.disk-ring {
  position: absolute;
}

.seed-point {
  position: absolute;
  transform-origin: center;
}
</style>
