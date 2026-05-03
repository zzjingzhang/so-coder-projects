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
  const duration = 6000 / props.speed
  
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

const getOuterPetalTransform = (index: number) => {
  const angles = [0, 120, 240]
  const angle = angles[index]
  const petalProgress = Math.min(bloomProgress.value * 1.2, 1)
  const openAngle = 5 + petalProgress * 25
  const translateY = -20 - petalProgress * 15
  const rotateX = 70 - petalProgress * 60
  
  return {
    transform: `rotate(${angle}deg) translateY(${translateY}px) rotateX(${rotateX}deg) rotateZ(${openAngle}deg)`,
    opacity: Math.max(0.3, bloomProgress.value),
    zIndex: index
  }
}

const getInnerPetalTransform = (index: number) => {
  const angles = [60, 180, 300]
  const angle = angles[index]
  const petalProgress = Math.max(0, (bloomProgress.value - 0.2) / 0.8)
  const openAngle = 3 + petalProgress * 20
  const translateY = -15 - petalProgress * 12
  const rotateX = 60 - petalProgress * 50
  
  return {
    transform: `rotate(${angle}deg) translateY(${translateY}px) rotateX(${rotateX}deg) rotateZ(${openAngle}deg)`,
    opacity: Math.max(0.4, bloomProgress.value),
    zIndex: index + 10
  }
}

const getStamenTransform = (index: number, total: number) => {
  const angle = (index / total) * 360
  const stamenProgress = Math.max(0, (bloomProgress.value - 0.4) / 0.6)
  
  return {
    transform: `rotate(${angle}deg) translateY(-${5 + stamenProgress * 8}px)`,
    opacity: stamenProgress
  }
}

const getPetalColor = (isInner: boolean = false) => {
  const progress = Math.min(bloomProgress.value, 1)
  const baseH = isInner ? 270 : 280
  const h = baseH + progress * 10
  const s = 80
  const l = isInner ? 65 + progress * 10 : 55 + progress * 15
  
  return `hsl(${h}, ${s}%, ${l}%)`
}

const getInnerColor = () => {
  const progress = Math.min(bloomProgress.value, 1)
  const h = 280 + progress * 20
  const s = 70
  const l = 45 + progress * 20
  
  return `hsl(${h}, ${s}%, ${l}%)`
}
</script>

<template>
  <div class="tulip-container relative w-full h-full flex items-center justify-center">
    <div class="tulip relative" :style="{ transform: `scale(${0.5 + bloomProgress.value * 0.5})` }">
      <!-- 外层花瓣 -->
      <div
        v-for="i in 3"
        :key="'outer-' + i"
        class="petal outer-petal absolute"
        :style="{
          width: '35px',
          height: '70px',
          borderRadius: '50% 50% 20% 20%',
          ...getOuterPetalTransform(i - 1),
          background: `linear-gradient(135deg, ${getPetalColor()}, ${getInnerColor()})`,
          boxShadow: `2px 2px 15px rgba(138, 43, 226, 0.4)`,
          zIndex: 10
        }"
      />
      
      <!-- 内层花瓣 -->
      <div
        v-for="i in 3"
        :key="'inner-' + i"
        class="petal inner-petal absolute"
        :style="{
          width: '30px',
          height: '60px',
          borderRadius: '50% 50% 25% 25%',
          ...getInnerPetalTransform(i - 1),
          background: `linear-gradient(135deg, ${getPetalColor(true)}, ${getInnerColor()})`,
          boxShadow: `2px 2px 12px rgba(138, 43, 226, 0.5)`,
          zIndex: 20
        }"
      />
      
      <!-- 雄蕊 -->
      <div
        v-for="i in 6"
        :key="'stamen-' + i"
        class="stamen absolute rounded-full"
        :style="{
          width: '2px',
          height: '15px',
          ...getStamenTransform(i - 1, 6),
          background: `linear-gradient(to top, #ffd700, #ffeb3b)`,
          boxShadow: `0 0 4px rgba(255, 215, 0, 0.6)`,
          zIndex: 30
        }"
      >
        <div 
          class="stamen-tip absolute w-4 h-4 rounded-full"
          :style="{
            top: '-6px',
            left: '-5px',
            background: 'radial-gradient(circle, #ffeb3b, #ffd700)',
            boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)',
            opacity: Math.max(0, (bloomProgress.value - 0.5) / 0.5)
          }"
        />
      </div>
      
      <!-- 雌蕊 -->
      <div 
        class="pistil absolute w-6 h-6 rounded-full"
        :style="{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(-${10 + bloomProgress.value * 5}px)`,
          background: `radial-gradient(circle, #32cd32, #228b22)`,
          boxShadow: `0 0 10px rgba(50, 205, 50, 0.6)`,
          opacity: Math.max(0, (bloomProgress.value - 0.3) / 0.7),
          zIndex: 40
        }"
      />
    </div>
    
    <!-- 花茎 -->
    <div 
      class="stem absolute w-3 rounded-full"
      :style="{
        height: `${130 + bloomProgress.value * 40}px`,
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(to right, #228b22, #32cd32, #228b22)',
        boxShadow: '2px 0 5px rgba(34, 139, 34, 0.3)',
        opacity: Math.max(0.5, bloomProgress.value),
        zIndex: 0
      }"
    />
    
    <!-- 郁金香特有的叶子 -->
    <div 
      class="tulip-leaf absolute"
      :style="{
        width: '60px',
        height: '100px',
        background: 'linear-gradient(135deg, #228b22, #32cd32, #228b22)',
        borderRadius: '0 80% 0 80%',
        transform: `rotate(-15deg) skewX(-10deg) scaleY(${0.5 + bloomProgress.value * 0.5})`,
        transformOrigin: 'bottom left',
        left: 'calc(50% - 80px)',
        bottom: '20px',
        opacity: bloomProgress.value,
        boxShadow: '3px 3px 8px rgba(34, 139, 34, 0.4)',
        zIndex: 0
      }"
    />
    <div 
      class="tulip-leaf absolute"
      :style="{
        width: '50px',
        height: '80px',
        background: 'linear-gradient(45deg, #228b22, #32cd32, #228b22)',
        borderRadius: '80% 0 80% 0',
        transform: `rotate(20deg) skewX(10deg) scaleY(${0.5 + bloomProgress.value * 0.5})`,
        transformOrigin: 'bottom right',
        right: 'calc(50% - 70px)',
        bottom: '40px',
        opacity: bloomProgress.value,
        boxShadow: '-3px 3px 8px rgba(34, 139, 34, 0.4)',
        zIndex: 0
      }"
    />
  </div>
</template>

<style scoped>
.tulip-container {
  perspective: 1000px;
}

.tulip {
  transform-style: preserve-3d;
  position: relative;
  width: 200px;
  height: 200px;
}

.petal {
  transform-origin: bottom center;
  transition: all 0.1s ease;
}

.stamen {
  transform-origin: bottom center;
  transition: all 0.1s ease;
}

.tulip-leaf {
  transform-origin: bottom;
}
</style>
