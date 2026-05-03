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
  const duration = 8000 / props.speed
  
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
  const openProgress = Math.min(bloomProgress.value * 1.1, 1)
  const openDistance = 15 + openProgress * 30
  const scale = 0.6 + openProgress * 0.4
  const rotateZ = (index % 2 === 0 ? 1 : -1) * openProgress * 15
  
  return {
    transform: `rotate(${angle}deg) translateY(-${openDistance}px) rotateZ(${rotateZ}deg) scale(${scale})`,
    opacity: Math.max(0.4, bloomProgress.value),
    zIndex: 10
  }
}

const getMiddlePetalTransform = (index: number, total: number) => {
  const angle = (index / total) * 360 + 22.5
  const openProgress = Math.max(0, (bloomProgress.value - 0.1) / 0.9)
  const openDistance = 10 + openProgress * 20
  const scale = 0.5 + openProgress * 0.4
  const rotateZ = (index % 2 === 0 ? 1 : -1) * openProgress * 10
  
  return {
    transform: `rotate(${angle}deg) translateY(-${openDistance}px) rotateZ(${rotateZ}deg) scale(${scale})`,
    opacity: Math.max(0.5, bloomProgress.value),
    zIndex: 20
  }
}

const getInnerPetalTransform = (index: number, total: number) => {
  const angle = (index / total) * 360 + 36
  const openProgress = Math.max(0, (bloomProgress.value - 0.2) / 0.8)
  const openDistance = 5 + openProgress * 12
  const scale = 0.4 + openProgress * 0.5
  
  return {
    transform: `rotate(${angle}deg) translateY(-${openDistance}px) scale(${scale})`,
    opacity: Math.max(0.6, bloomProgress.value),
    zIndex: 30
  }
}

const getStamenTransform = (index: number, total: number) => {
  const angle = (index / total) * 360
  const stamenProgress = Math.max(0, (bloomProgress.value - 0.35) / 0.65)
  const distance = 3 + stamenProgress * 8
  
  return {
    transform: `rotate(${angle}deg) translateY(-${distance}px)`,
    opacity: stamenProgress
  }
}

const getColor = () => {
  const progress = Math.min(bloomProgress.value, 1)
  const h = 340 + progress * 8
  const s = 82
  const l = 62 + progress * 12
  
  return `hsl(${h}, ${s}%, ${l}%)`
}

const getInnerColor = () => {
  const progress = Math.min(bloomProgress.value, 1)
  const h = 345 + progress * 10
  const s = 85
  const l = 55 + progress * 18
  
  return `hsl(${h}, ${s}%, ${l}%)`
}
</script>

<template>
  <div class="rose-container relative w-full h-full flex items-center justify-center">
    <div class="rose relative" :style="{ transform: `scale(${0.6 + bloomProgress.value * 0.4})` }">
      <!-- 外层花瓣 -->
      <div
        v-for="i in 12"
        :key="'outer-' + i"
        class="petal outer-petal absolute rounded-full"
        :style="{
          width: '28px',
          height: '55px',
          ...getOuterPetalTransform(i - 1, 12),
          background: `linear-gradient(to top, ${getColor()}, ${getInnerColor()})`,
          boxShadow: `0 3px 12px rgba(255, 100, 150, 0.35)`,
          left: '50%',
          top: '50%',
          marginLeft: '-14px',
          marginTop: '-27px'
        }"
      />
      
      <!-- 中层花瓣 -->
      <div
        v-for="i in 8"
        :key="'middle-' + i"
        class="petal middle-petal absolute rounded-full"
        :style="{
          width: '24px',
          height: '48px',
          ...getMiddlePetalTransform(i - 1, 8),
          background: `linear-gradient(to top, ${getInnerColor()}, ${getColor()})`,
          boxShadow: `0 2px 10px rgba(255, 100, 150, 0.45)`,
          left: '50%',
          top: '50%',
          marginLeft: '-12px',
          marginTop: '-24px'
        }"
      />
      
      <!-- 内层花瓣 -->
      <div
        v-for="i in 5"
        :key="'inner-' + i"
        class="petal inner-petal absolute rounded-full"
        :style="{
          width: '20px',
          height: '40px',
          ...getInnerPetalTransform(i - 1, 5),
          background: `linear-gradient(to top, #ff69b4, #ff1493)`,
          boxShadow: `0 2px 8px rgba(255, 50, 150, 0.55)`,
          left: '50%',
          top: '50%',
          marginLeft: '-10px',
          marginTop: '-20px'
        }"
      />
      
      <!-- 雄蕊 -->
      <div
        v-for="i in 16"
        :key="'stamen-' + i"
        class="stamen absolute rounded-full"
        :style="{
          width: '2px',
          height: '12px',
          ...getStamenTransform(i - 1, 16),
          background: `linear-gradient(to top, #ffd700, #ffeb3b)`,
          boxShadow: `0 0 6px rgba(255, 215, 0, 0.6)`,
          left: '50%',
          top: '50%',
          marginLeft: '-1px',
          marginTop: '-6px',
          zIndex: 40
        }"
      >
        <div 
          class="stamen-tip absolute rounded-full"
          :style="{
            width: '5px',
            height: '5px',
            top: '-3px',
            left: '-1.5px',
            background: 'radial-gradient(circle, #ffeb3b, #ffd700)',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.9)',
            opacity: Math.max(0, (bloomProgress.value - 0.45) / 0.55)
          }"
        />
      </div>
      
      <!-- 中心 -->
      <div 
        class="center absolute rounded-full"
        :style="{
          width: '16px',
          height: '16px',
          background: `radial-gradient(circle, #ffeb3b, #ff8c00)`,
          boxShadow: `0 0 18px rgba(255, 140, 0, 0.7)`,
          opacity: Math.max(0.4, bloomProgress.value),
          left: '50%',
          top: '50%',
          marginLeft: '-8px',
          marginTop: '-8px',
          zIndex: 50
        }"
      />
    </div>
    
    <!-- 花茎 -->
    <div 
      class="stem absolute rounded-full"
      :style="{
        width: '5px',
        height: `${90 + bloomProgress.value * 50}px`,
        bottom: '10px',
        left: '50%',
        marginLeft: '-2.5px',
        background: 'linear-gradient(to right, #228b22, #32cd32, #228b22)',
        boxShadow: '1px 0 4px rgba(34, 139, 34, 0.3)',
        opacity: Math.max(0.5, bloomProgress.value),
        zIndex: 0
      }"
    />
    
    <!-- 叶子 -->
    <div 
      class="leaf absolute"
      :style="{
        width: '35px',
        height: '18px',
        background: 'linear-gradient(135deg, #228b22, #32cd32)',
        borderRadius: '0 60% 40% 0',
        transform: `rotate(-25deg) scale(${0.5 + bloomProgress.value * 0.5})`,
        transformOrigin: 'right center',
        left: 'calc(50% - 55px)',
        bottom: '70px',
        opacity: bloomProgress.value,
        boxShadow: '2px 2px 6px rgba(34, 139, 34, 0.35)',
        zIndex: 0
      }"
    />
    <div 
      class="leaf absolute"
      :style="{
        width: '30px',
        height: '16px',
        background: 'linear-gradient(45deg, #228b22, #32cd32)',
        borderRadius: '60% 0 0 40%',
        transform: `rotate(25deg) scale(${0.5 + bloomProgress.value * 0.5})`,
        transformOrigin: 'left center',
        right: 'calc(50% - 50px)',
        bottom: '100px',
        opacity: bloomProgress.value,
        boxShadow: '-2px 2px 6px rgba(34, 139, 34, 0.35)',
        zIndex: 0
      }"
    />
  </div>
</template>

<style scoped>
.rose-container {
  position: relative;
}

.rose {
  position: relative;
  width: 180px;
  height: 180px;
}

.petal {
  transform-origin: center bottom;
  transition: all 0.05s ease;
}

.stamen {
  transform-origin: center bottom;
  transition: all 0.05s ease;
}
</style>
