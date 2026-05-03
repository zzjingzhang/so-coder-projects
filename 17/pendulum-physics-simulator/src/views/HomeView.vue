<template>
  <div class="home-view w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
    <header class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">摆锤物理模拟器</h1>
      <p class="text-gray-300 text-sm md:text-base">探索单摆运动的物理规律</p>
    </header>

    <main class="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
      <div class="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
        <PendulumSimulator
          :length="length"
          :mass="mass"
          :gravity="gravity"
          :initialAngle="initialAngle"
          :isRunning="isRunning"
          @update:isRunning="isRunning = $event"
          @update:initialAngle="initialAngle = $event"
        />
      </div>

      <div class="w-full lg:w-80 bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <h2 class="text-xl font-semibold text-white mb-6 text-center">参数控制</h2>
        
        <div class="space-y-6">
          <n-card title="摆长" :bordered="false" class="bg-white/5">
            <template #header-extra>
              <span class="text-blue-400 font-mono">{{ length.toFixed(1) }} m</span>
            </template>
            <n-slider
              v-model:value="length"
              :min="0.5"
              :max="3.0"
              :step="0.1"
              :tooltip="false"
              class="mt-2"
            />
            <p class="text-xs text-gray-400 mt-2">范围: 0.5m - 3.0m</p>
          </n-card>

          <n-card title="质量" :bordered="false" class="bg-white/5">
            <template #header-extra>
              <span class="text-green-400 font-mono">{{ mass.toFixed(1) }} kg</span>
            </template>
            <n-slider
              v-model:value="mass"
              :min="1.0"
              :max="10.0"
              :step="0.5"
              :tooltip="false"
              class="mt-2"
            />
            <p class="text-xs text-gray-400 mt-2">范围: 1.0kg - 10.0kg</p>
          </n-card>

          <n-card title="重力加速度" :bordered="false" class="bg-white/5">
            <template #header-extra>
              <span class="text-yellow-400 font-mono">{{ gravity.toFixed(1) }} m/s²</span>
            </template>
            <n-slider
              v-model:value="gravity"
              :min="1.0"
              :max="20.0"
              :step="0.5"
              :tooltip="false"
              class="mt-2"
            />
            <p class="text-xs text-gray-400 mt-2">范围: 1.0m/s² - 20.0m/s²</p>
          </n-card>

          <n-card title="初始角度" :bordered="false" class="bg-white/5">
            <template #header-extra>
              <span class="text-purple-400 font-mono">{{ initialAngle.toFixed(0) }}°</span>
            </template>
            <n-slider
              v-model:value="initialAngle"
              :min="5"
              :max="85"
              :step="1"
              :tooltip="false"
              class="mt-2"
              :disabled="isRunning"
            />
            <p class="text-xs text-gray-400 mt-2">范围: 5° - 85° (运行时不可调整)</p>
          </n-card>
        </div>

        <div class="mt-8 space-y-4">
          <n-space vertical :size="12" class="w-full">
            <n-button
              :type="isRunning ? 'warning' : 'primary'"
              size="large"
              block
              @click="toggleSimulation"
              class="h-12 text-lg font-medium !bg-blue-600 hover:!bg-blue-700 !text-white"
              :class="{
                '!bg-orange-600 hover:!bg-orange-700': isRunning
              }"
            >
              <span class="flex items-center justify-center">
                {{ isRunning ? '暂停' : '开始' }}
              </span>
            </n-button>

            <n-button
              type="error"
              size="large"
              block
              @click="resetSimulation"
              class="h-12 text-lg font-medium !bg-red-600 hover:!bg-red-700 !text-white"
            >
              <span class="flex items-center justify-center">
                重置
              </span>
            </n-button>
          </n-space>
        </div>

        <div class="mt-8 p-4 bg-black/20 rounded-xl">
          <h3 class="text-sm font-semibold text-gray-300 mb-3">物理公式</h3>
          <div class="space-y-2 text-xs text-gray-400 font-mono">
            <p>角加速度: α = -(g/L)·sin(θ)</p>
            <p>周期: T = 2π√(L/g)</p>
            <p>理论周期: <span class="text-cyan-400">{{ theoreticalPeriod.toFixed(3) }} s</span></p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PendulumSimulator from '../components/PendulumSimulator.vue'

const DEFAULT_LENGTH = 1.5
const DEFAULT_MASS = 5.0
const DEFAULT_GRAVITY = 9.8
const DEFAULT_INITIAL_ANGLE = 45

const length = ref(DEFAULT_LENGTH)
const mass = ref(DEFAULT_MASS)
const gravity = ref(DEFAULT_GRAVITY)
const initialAngle = ref(DEFAULT_INITIAL_ANGLE)
const isRunning = ref(false)

const theoreticalPeriod = computed(() => {
  return 2 * Math.PI * Math.sqrt(length.value / gravity.value)
})

const toggleSimulation = () => {
  isRunning.value = !isRunning.value
}

const resetSimulation = () => {
  isRunning.value = false
  setTimeout(() => {
    length.value = DEFAULT_LENGTH
    mass.value = DEFAULT_MASS
    gravity.value = DEFAULT_GRAVITY
    initialAngle.value = DEFAULT_INITIAL_ANGLE
  }, 50)
}
</script>

<style scoped>
.home-view {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
}

:deep(.n-card-header) {
  color: #f1f5f9 !important;
}

:deep(.n-card-header .n-card-header__main) {
  color: #f1f5f9 !important;
  font-weight: 600 !important;
}

:deep(.n-card__content) {
  color: #e2e8f0 !important;
}

:deep(.n-button .n-button__content) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 100% !important;
  color: #ffffff !important;
  font-weight: 500 !important;
}
</style>
