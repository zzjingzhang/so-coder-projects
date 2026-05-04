<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const SystemStatus = {
  STOPPED: 'stopped',
  RUNNING: 'running',
  ERROR: 'error'
} as const

type SystemStatusType = typeof SystemStatus[keyof typeof SystemStatus]

const MIN_LUX = 0
const MAX_LUX = 2000
const LUX_THRESHOLD_LOW = 1000
const LUX_THRESHOLD_HIGH = 1500

const currentLux = ref(1200)
const systemStatus = ref<SystemStatusType>(SystemStatus.STOPPED)
const lightOn = ref(false)
let animationFrame: number | null = null

const luxPercentage = computed(() => {
  return (currentLux.value / MAX_LUX) * 100
})

const statusText = computed(() => {
  switch (systemStatus.value) {
    case SystemStatus.RUNNING:
      return '运行中'
    case SystemStatus.STOPPED:
      return '已停止'
    case SystemStatus.ERROR:
      return '错误'
    default:
      return '未知'
  }
})

const statusColor = computed(() => {
  switch (systemStatus.value) {
    case SystemStatus.RUNNING:
      return 'bg-green-500'
    case SystemStatus.STOPPED:
      return 'bg-gray-500'
    case SystemStatus.ERROR:
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
})

const lightStatusText = computed(() => {
  return lightOn.value ? '补光灯开启' : '补光灯关闭'
})

const startSystem = () => {
  systemStatus.value = SystemStatus.RUNNING
  startAutoControl()
}

const stopSystem = () => {
  systemStatus.value = SystemStatus.STOPPED
  stopAutoControl()
  lightOn.value = false
}

const resetSystem = () => {
  stopSystem()
  currentLux.value = 1200
  lightOn.value = false
}

const startAutoControl = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  
  const autoControl = () => {
    if (systemStatus.value !== SystemStatus.RUNNING) return
    
    if (currentLux.value < LUX_THRESHOLD_LOW) {
      lightOn.value = true
      currentLux.value = Math.min(currentLux.value + 5, MAX_LUX)
    } else if (currentLux.value > LUX_THRESHOLD_HIGH) {
      lightOn.value = false
      currentLux.value = Math.max(currentLux.value - 5, MIN_LUX)
    } else if (lightOn.value) {
      currentLux.value = Math.min(currentLux.value + 2, MAX_LUX)
    }
    
    animationFrame = requestAnimationFrame(autoControl)
  }
  
  animationFrame = requestAnimationFrame(autoControl)
}

const stopAutoControl = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

const handleSliderChange = (value: number) => {
  currentLux.value = value
  if (systemStatus.value === SystemStatus.RUNNING) {
    if (currentLux.value < LUX_THRESHOLD_LOW) {
      lightOn.value = true
    } else if (currentLux.value > LUX_THRESHOLD_HIGH) {
      lightOn.value = false
    }
  }
}

onMounted(() => {
  // 初始化时不自动启动
})

onUnmounted(() => {
  stopAutoControl()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">温室光照控制系统</h1>
        <p class="text-slate-400">自动补光功能模拟演示</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧：温室环境模拟 -->
        <div class="lg:col-span-2">
          <div class="bg-slate-800 rounded-2xl p-6 shadow-2xl">
            <div class="relative w-full h-96 md:h-[500px] bg-gradient-to-b from-sky-200 via-sky-300 to-green-200 rounded-xl overflow-hidden" :style="{
              filter: `brightness(${0.3 + (currentLux / MAX_LUX) * 0.7})`
            }">
              <!-- 太阳/天空 -->
              <div 
                class="absolute top-8 right-12 w-16 h-16 md:w-24 md:h-24 rounded-full"
                :style="{
                  background: `radial-gradient(circle, #fcd34d 0%, #f59e0b 50%, transparent 70%)`,
                  opacity: currentLux / MAX_LUX
                }"
              ></div>

              <!-- 温室结构 -->
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
                <!-- 温室顶部 -->
                <div 
                  class="w-full h-32 md:h-40 bg-gradient-to-r from-green-100 via-green-50 to-green-100 border-4 border-gray-700 border-b-0 rounded-t-3xl relative"
                  :style="{
                    opacity: 0.8 + (currentLux / MAX_LUX) * 0.2
                  }"
                >
                  <!-- 温室骨架 -->
                  <div class="absolute inset-0 flex justify-around">
                    <div v-for="i in 5" :key="i" class="w-1 bg-gray-600 h-full"></div>
                  </div>
                  
                  <!-- 补光灯 -->
                  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-8 md:gap-16">
                    <div 
                      v-for="i in 2" 
                      :key="i" 
                      class="w-12 md:w-16 h-4 md:h-5 rounded-full transition-all duration-300"
                      :class="lightOn ? 'bg-yellow-300 shadow-lg shadow-yellow-400' : 'bg-gray-400'"
                    >
                      <div 
                        v-if="lightOn"
                        class="absolute top-full left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-b from-yellow-200 to-transparent opacity-60"
                        :style="{
                          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
                
                <!-- 温室主体 -->
                <div class="w-full h-40 md:h-48 bg-gradient-to-b from-green-50 to-green-100 border-4 border-gray-700 border-t-0 relative">
                  <!-- 植物 -->
                  <div class="absolute bottom-0 left-0 right-0 flex justify-around items-end px-4 md:px-8">
                    <div v-for="i in 5" :key="i" class="flex flex-col items-center">
                      <!-- 茎 -->
                      <div class="w-1.5 md:w-2 bg-green-600" :style="{ height: `${40 + i * 10}px` }"></div>
                      <!-- 叶子 -->
                      <div class="relative">
                        <div 
                          class="absolute w-8 md:w-12 h-6 md:h-8 bg-green-500 rounded-full transform -rotate-45 -translate-x-2 -translate-y-2"
                          :style="{ opacity: 0.7 + (currentLux / MAX_LUX) * 0.3 }"
                        ></div>
                        <div 
                          class="absolute w-8 md:w-12 h-6 md:h-8 bg-green-500 rounded-full transform rotate-45 translate-x-2 -translate-y-2"
                          :style="{ opacity: 0.7 + (currentLux / MAX_LUX) * 0.3 }"
                        ></div>
                        <div 
                          class="w-6 md:w-8 h-4 md:h-6 bg-green-400 rounded-full transform -translate-y-1"
                          :style="{ opacity: 0.7 + (currentLux / MAX_LUX) * 0.3 }"
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 土壤 -->
                  <div class="absolute bottom-0 left-0 right-0 h-6 md:h-8 bg-amber-800"></div>
                </div>
              </div>

              <!-- 亮度传感器 -->
              <div class="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
                <div class="text-xs text-gray-600 font-medium mb-1">亮度传感器</div>
                <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <div 
                    class="w-4 h-4 rounded-full transition-colors duration-300"
                    :class="currentLux > 1000 ? 'bg-yellow-400' : 'bg-gray-600'"
                  ></div>
                </div>
              </div>

              <!-- 光线效果 -->
              <div 
                v-if="lightOn"
                class="absolute inset-0 pointer-events-none"
                :style="{
                  background: 'radial-gradient(ellipse at center, rgba(253, 224, 71, 0.1) 0%, transparent 70%)'
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- 右侧：控制面板 -->
        <div class="lg:col-span-1 space-y-6">
          <!-- 系统状态 -->
          <div class="bg-slate-800 rounded-2xl p-6 shadow-2xl">
            <h2 class="text-xl font-bold text-white mb-4">系统状态</h2>
            
            <div class="space-y-4">
              <!-- 系统运行状态 -->
              <div class="flex items-center justify-between">
                <span class="text-slate-300">运行状态</span>
                <div class="flex items-center gap-2">
                  <div 
                    class="w-3 h-3 rounded-full animate-pulse"
                    :class="statusColor"
                  ></div>
                  <span class="text-white font-medium">{{ statusText }}</span>
                </div>
              </div>

              <!-- 补光灯状态 -->
              <div class="flex items-center justify-between">
                <span class="text-slate-300">补光灯状态</span>
                <div class="flex items-center gap-2">
                  <Badge 
                    :value="lightStatusText" 
                    :severity="lightOn ? 'success' : 'secondary'"
                    class="text-sm px-3 py-1"
                  ></Badge>
                </div>
              </div>

              <!-- 当前光照强度 -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-slate-300">光照强度</span>
                  <span class="text-white font-bold text-lg">{{ currentLux }} lux</span>
                </div>
                <ProgressBar 
                  :value="luxPercentage" 
                  :showValue="false"
                  class="h-3"
                  :style="{
                    background: '#334155'
                  }"
                ></ProgressBar>
                <div class="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0</span>
                  <span class="text-yellow-400">1000</span>
                  <span class="text-green-400">1500</span>
                  <span>2000</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 控制面板 -->
          <div class="bg-slate-800 rounded-2xl p-6 shadow-2xl">
            <h2 class="text-xl font-bold text-white mb-4">控制面板</h2>
            
            <!-- 操作按钮 -->
            <div class="grid grid-cols-3 gap-3 mb-6">
              <Button 
                label="启动" 
                @click="startSystem"
                :disabled="systemStatus === 'running'"
                class="w-full h-12 text-sm font-medium"
                severity="success"
              ></Button>
              <Button 
                label="停止" 
                @click="stopSystem"
                :disabled="systemStatus === 'stopped'"
                class="w-full h-12 text-sm font-medium"
                severity="danger"
              ></Button>
              <Button 
                label="重置" 
                @click="resetSystem"
                class="w-full h-12 text-sm font-medium"
                severity="secondary"
              ></Button>
            </div>

            <!-- 手动调节光照 -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-slate-300">手动调节光照</span>
                <span class="text-white font-medium">{{ currentLux }} lux</span>
              </div>
              <Slider 
                v-model="currentLux" 
                :min="MIN_LUX" 
                :max="MAX_LUX" 
                :step="10"
                @change="handleSliderChange(currentLux)"
                class="w-full"
              ></Slider>
              <div class="flex justify-between text-xs text-slate-500 mt-2">
                <span>暗 (0 lux)</span>
                <span>亮 (2000 lux)</span>
              </div>
            </div>
          </div>

          <!-- 阈值说明 -->
          <div class="bg-slate-800 rounded-2xl p-6 shadow-2xl">
            <h2 class="text-xl font-bold text-white mb-4">阈值说明</h2>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span class="text-slate-300">
                  低于 <span class="text-yellow-400 font-bold">1000 lux</span> 时自动开启补光灯
                </span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full bg-green-400"></div>
                <span class="text-slate-300">
                  高于 <span class="text-green-400 font-bold">1500 lux</span> 时自动关闭补光灯
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 确保按钮文字居中 */
:deep(.p-button) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.p-slider) {
  height: 8px;
}

:deep(.p-slider .p-slider-range) {
  background: linear-gradient(to right, #60a5fa, #a78bfa);
}

:deep(.p-slider .p-slider-handle) {
  background: white;
  border-color: #60a5fa;
}

:deep(.p-progressbar) {
  background: #334155;
  border-radius: 9999px;
}

:deep(.p-progressbar .p-progressbar-value) {
  background: linear-gradient(to right, #fbbf24, #f59e0b);
  border-radius: 9999px;
}
</style>
