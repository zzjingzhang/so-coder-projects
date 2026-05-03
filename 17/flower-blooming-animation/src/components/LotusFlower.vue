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
  const duration = 9000 / props.speed
  
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

const getOuterPetalTransform = (index: number, total: number) => {
  const angle = (index / total) * 360
  const petalProgress = Math.min(bloomProgress.value * 1.1, 1)
  const openAngle = 10 + petalProgress * 30
  const translateY = -15 - petalProgress * 20
  const rotateX = 80 - petalProgress * 70
  
  return {
    transform: `rotate(${angle}deg) translateY(${translateY}px) rotateX(${rotateX}deg) rotateZ(${openAngle}deg)`,
    opacity: Math.max(0.2, bloomProgress.value),
    zIndex: index
  }
}

const getMiddlePetalTransform = (index: number, total: number) => {
  const angle = (index / total) * 360
  const petalProgress = Math.max(0, (bloomProgress.value - 0.15) / 0.85)
  const openAngle = 8 + petalProgress * 25
  const translateY = -10 - petalProgress * 18
  const rotateX = 75 - petalProgress * 65
  
  return {
    transform: `rotate(${angle}deg) translateY(${translateY}px) rotateX(${rotateX}deg) rotateZ(${openAngle}deg)`,
    opacity: Math.max(0.3, bloomProgress.value),
    zIndex: index + 20
  }
}

const getInnerPetalTransform = (index: number, total: number) => {
  const angle = (index / total) * 360
  const petalProgress = Math.max(0, (bloomProgress.value - 0.3) / 0.7)
  const openAngle = 5 + petalProgress * 20
  const translateY = -5 - petalProgress * 15
  const rotateX = 70 - petalProgress * 60
  
  return {
    transform: `rotate(${angle}deg) translateY(${translateY}px) rotateX(${rotateX}deg) rotateZ(${openAngle}deg)`,
    opacity: Math.max(0.4, bloomProgress.value),
    zIndex: index + 40
  }
}

const getStamenTransform = (index: number, total: number) => {
  const angle = (index / total) * 360
  const stamenProgress = Math.max(0, (bloomProgress.value - 0.5) / 0.5)
  
  return {
    transform: `rotate(${angle}deg) translateY(-${3 + stamenProgress * 8}px)`,
    opacity: stamenProgress
  }
}

const getOuterPetalColor = () => {
  const progress = Math.min(bloomProgress.value, 1)
  const h = 0 + progress * 5
  const s = 90
  const l = 85 + progress * 10
  
  return `hsl(${h}, ${s}%, ${l}%)`
}

const getInnerPetalColor = () => {
  const progress = Math.min(bloomProgress.value, 1)
  const h = 350 + progress * 10
  const s = 85
  const l = 75 + progress * 15
  
  return `hsl(${h}, ${s}%, ${l}%)`
}

const getCenterColor = () => {
  const progress = Math.min(bloomProgress.value, 1)
  const h = 50 + progress * 20
  const s = 100
  const l = 50 + progress * 10
  
  return `hsl(${h}, ${s}%, ${l}%)`
}
</script>

<template>
  <div class="lotus-container relative w-full h-full flex items-center justify-center">
    <!-- 莲叶 -->
    <div 
      class="lily-pad absolute"
      :style="{
        width: '120px',
        height: '100px',
        background: 'radial-gradient(ellipse at center, #32cd32, #228b22)',
        borderRadius: '50% 50% 50% 50%',
        bottom: '10px',
        left: '50%',
        transform: `translateX(-50%) scale(${0.6 + bloomProgress.value * 0.4})`,
        boxShadow: '0 4px 15px rgba(34, 139, 34, 0.5), inset 0 0 20px rgba(0, 100, 0, 0.3)',
        opacity: Math.max(0.5, bloomProgress.value),
        zIndex: 0
      }"
    >
      <!-- 莲叶缺口 -->
      <div 
        class="pad-notch absolute"
        :style="{
          width: '30px',
          height: '50px',
          background: 'transparent',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '0 0 50% 50%',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          boxShadow: 'inset 0 0 0 100px rgba(255, 255, 255, 0.3)'
        }"
      />
    </div>
    
    <div class="lotus relative" :style="{ transform: `scale(${0.5 + bloomProgress.value * 0.5})` }">
      <!-- 外层花瓣 -->
      <div
        v-for="i in 14"
        :key="'outer-' + i"
        class="petal outer-petal absolute"
        :style="{
          width: '18px',
          height: '55px',
          borderRadius: '50% 50% 30% 30%',
          ...getOuterPetalTransform(i - 1, 14),
          background: `linear-gradient(180deg, ${getOuterPetalColor()}, ${getInnerPetalColor()})`,
          boxShadow: `2px 2px 12px rgba(255, 100, 150, 0.3)`,
          zIndex: 10
        }"
      />
      
      <!-- 中层花瓣 -->
      <div
        v-for="i in 10"
        :key="'middle-' + i"
        class="petal middle-petal absolute"
        :style="{
          width: '16px',
          height: '48px',
          borderRadius: '50% 50% 35% 35%',
          ...getMiddlePetalTransform(i - 1, 10),
          background: `linear-gradient(180deg, ${getInnerPetalColor()}, ${getOuterPetalColor()})`,
          boxShadow: `2px 2px 10px rgba(255, 100, 150, 0.4)`,
          zIndex: 20
        }"
      />
      
      <!-- 内层花瓣 -->
      <div
        v-for="i in 6"
        :key="'inner-' + i"
        class="petal inner-petal absolute"
        :style="{
          width: '14px',
          height: '40px',
          borderRadius: '50% 50% 40% 40%',
          ...getInnerPetalTransform(i - 1, 6),
          background: `linear-gradient(180deg, #ffb6c1, #ff69b4)`,
          boxShadow: `2px 2px 8px rgba(255, 100, 150, 0.5)`,
          zIndex: 30
        }"
      />
      
      <!-- 莲蓬中心 -->
      <div 
        class="lotus-center absolute"
        :style="{
          width: '40px',
          height: '35px',
          background: `radial-gradient(ellipse at center, ${getCenterColor()}, #90ee90)`,
          borderRadius: '50% 50% 40% 40%',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(-${5 + bloomProgress.value * 8}px) scale(${0.7 + bloomProgress.value * 0.3})`,
          boxShadow: `0 0 15px rgba(144, 238, 144, 0.6), inset 0 0 10px rgba(0, 100, 0, 0.2)`,
          opacity: Math.max(0.3, bloomProgress.value),
          zIndex: 40
        }"
      >
        <!-- 莲子点 -->
        <div
          v-for="i in 9"
          :key="'seed-' + i"
          class="seed-dot absolute w-2 h-2 rounded-full"
          :style="{
            background: 'radial-gradient(circle, #8b4513, #654321)',
            boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.5)',
            top: `${10 + (i % 3) * 8}px`,
            left: `${8 + Math.floor(i / 3) * 12}px`,
            opacity: Math.max(0, (bloomProgress.value - 0.6) / 0.4)
          }"
        />
      </div>
      
      <!-- 雄蕊 -->
      <div
        v-for="i in 18"
        :key="'stamen-' + i"
        class="stamen absolute rounded-full"
        :style="{
          width: '1.5px',
          height: '12px',
          ...getStamenTransform(i - 1, 18),
          background: `linear-gradient(to top, #ffd700, #ffff00)`,
          boxShadow: `0 0 3px rgba(255, 215, 0, 0.5)`,
          zIndex: 35
        }"
      >
        <div 
          class="stamen-tip absolute w-3 h-3 rounded-full"
          :style="{
            top: '-5px',
            left: '-4px',
            background: 'radial-gradient(circle, #ffff00, #ffd700)',
            boxShadow: '0 0 6px rgba(255, 215, 0, 0.7)',
            opacity: Math.max(0, (bloomProgress.value - 0.6) / 0.4)
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lotus-container {
  perspective: 1000px;
}

.lotus {
  transform-style: preserve-3d;
  position: relative;
  width: 200px;
  height: 200px;
}

.petal {
  transform-origin: bottom center;
  transition: all 0.1s ease;
}

.lily-pad {
  position: absolute;
}

.lotus-center {
  position: relative;
}

.stamen {
  transform-origin: bottom center;
  transition: all 0.1s ease;
}
</style>
