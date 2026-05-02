<script setup>
import { ref, computed, onUnmounted, watch } from 'vue'
import { soilTypes } from '../utils/soilTypes'

const props = defineProps({
  soilType: {
    type: String,
    required: true
  },
  isRunning: {
    type: Boolean,
    default: false
  },
  rainfallIntensity: {
    type: Number,
    default: 50
  }
})

const emit = defineEmits(['update:data'])

const soilConfig = computed(() => soilTypes[props.soilType])

const waterLevel = ref(0)
const infiltratedWater = ref(0)
const collectedWater = ref(0)
const currentInfiltrationRate = ref(0)
const surfaceWater = ref(0)
const waterDepthInSoil = ref(0)

let animationFrame = null
let lastTime = null

const maxWaterLevel = 100
const soilHeight = 200
const containerHeight = 300

const startSimulation = () => {
  if (animationFrame) return
  lastTime = performance.now()
  animate()
}

const stopSimulation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

const animate = () => {
  animationFrame = requestAnimationFrame(animate)
  
  const currentTime = performance.now()
  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime
  
  if (!props.isRunning) return
  
  const rainfallAmount = (props.rainfallIntensity / 60) * deltaTime
  
  surfaceWater.value = Math.min(surfaceWater.value + rainfallAmount, maxWaterLevel)
  
  const maxPossibleInfiltration = soilConfig.value.infiltrationRate * deltaTime
  const availableWater = surfaceWater.value
  
  const actualInfiltration = Math.min(maxPossibleInfiltration, availableWater)
  
  if (actualInfiltration > 0) {
    surfaceWater.value -= actualInfiltration
    infiltratedWater.value += actualInfiltration
    
    const newDepth = (infiltratedWater.value / soilConfig.value.maxInfiltration) * soilHeight
    waterDepthInSoil.value = Math.min(newDepth, soilHeight)
    
    if (waterDepthInSoil.value >= soilHeight) {
      const overflow = actualInfiltration * 0.5
      collectedWater.value += overflow
    }
  }
  
  currentInfiltrationRate.value = actualInfiltration / deltaTime
  
  emit('update:data', {
    soilType: props.soilType,
    surfaceWater: surfaceWater.value,
    infiltratedWater: infiltratedWater.value,
    collectedWater: collectedWater.value,
    infiltrationRate: currentInfiltrationRate.value,
    waterDepth: waterDepthInSoil.value
  })
}

const resetSimulation = () => {
  stopSimulation()
  waterLevel.value = 0
  infiltratedWater.value = 0
  collectedWater.value = 0
  currentInfiltrationRate.value = 0
  surfaceWater.value = 0
  waterDepthInSoil.value = 0
  lastTime = null
}

watch(() => props.isRunning, (newVal) => {
  if (newVal) {
    startSimulation()
  } else {
    stopSimulation()
  }
})

watch(() => props.soilType, () => {
  resetSimulation()
})

onUnmounted(() => {
  stopSimulation()
})

defineExpose({
  reset: resetSimulation
})
</script>

<template>
  <div class="relative w-full h-96 bg-gradient-to-b from-sky-200 to-sky-100 rounded-xl overflow-hidden shadow-lg">
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
      <div class="text-lg font-bold text-gray-700">{{ soilConfig.name }}</div>
      <div class="text-xs text-gray-500">颗粒大小: {{ soilConfig.particleSize }}</div>
    </div>
    
    <div class="absolute top-16 left-0 right-0 h-20 overflow-hidden">
      <div v-if="isRunning" class="rain-container">
        <div v-for="i in 20" :key="i" class="rain-drop" :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${0.5 + Math.random() * 0.3}s`
        }"></div>
      </div>
    </div>
    
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48">
      <div class="relative h-64 bg-gray-200 rounded-b-lg border-2 border-gray-400">
        <div 
          class="absolute top-0 left-0 right-0 bg-blue-400 bg-opacity-60 transition-all duration-100"
          :style="{ height: `${Math.min(surfaceWater, 20)}px` }"
        >
          <div class="absolute bottom-0 left-0 right-0 h-2 bg-blue-300 animate-pulse"></div>
        </div>
        
        <div 
          class="absolute transition-all duration-200"
          :style="{
            top: `${Math.min(surfaceWater, 20)}px`,
            left: 0,
            right: 0,
            height: `${200 - Math.min(surfaceWater, 20)}px`,
            backgroundColor: soilConfig.color
          }"
        >
          <div 
            class="absolute top-0 left-0 right-0 bg-blue-500 bg-opacity-40 transition-all duration-200"
            :style="{ height: `${waterDepthInSoil}px` }"
          >
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-blue-300"></div>
          </div>
          
          <div class="absolute inset-0 opacity-30">
            <div v-for="i in 15" :key="i" class="absolute rounded-full" :style="{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: soilConfig.lightColor
            }"></div>
          </div>
        </div>
        
        <div class="absolute -bottom-1 left-0 right-0 h-4 bg-gray-600 rounded-b-lg flex items-center justify-center">
          <div v-if="waterDepthInSoil >= 180" class="w-2 h-2 bg-blue-400 rounded-full animate-bounce mx-0.5"></div>
          <div v-if="waterDepthInSoil >= 190" class="w-2 h-2 bg-blue-400 rounded-full animate-bounce mx-0.5" style="animation-delay: 0.1s"></div>
          <div v-if="waterDepthInSoil >= 195" class="w-2 h-2 bg-blue-400 rounded-full animate-bounce mx-0.5" style="animation-delay: 0.2s"></div>
        </div>
      </div>
      
      <div class="mt-2 h-16 bg-white bg-opacity-50 rounded-lg border-2 border-gray-300 relative overflow-hidden">
        <div 
          class="absolute bottom-0 left-0 right-0 bg-blue-500 bg-opacity-70 transition-all duration-300"
          :style="{ height: `${Math.min((collectedWater / 100) * 100, 100)}%` }"
        >
          <div class="absolute top-0 left-0 right-0 h-1 bg-blue-300"></div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-600">
          收集: {{ collectedWater.toFixed(1) }} ml
        </div>
      </div>
    </div>
    
    <div class="absolute bottom-4 left-4 text-xs space-y-1">
      <div class="bg-white bg-opacity-80 px-2 py-1 rounded">
        下渗速度: {{ currentInfiltrationRate.toFixed(1) }} ml/s
      </div>
      <div class="bg-white bg-opacity-80 px-2 py-1 rounded">
        已下渗: {{ infiltratedWater.toFixed(1) }} ml
      </div>
    </div>
  </div>
</template>

<style scoped>
.rain-container {
  position: absolute;
  inset: 0;
}

.rain-drop {
  position: absolute;
  width: 2px;
  height: 15px;
  background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.8));
  border-radius: 0 0 2px 2px;
  animation: rain-fall linear infinite;
}

@keyframes rain-fall {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(80px);
    opacity: 0;
  }
}
</style>
