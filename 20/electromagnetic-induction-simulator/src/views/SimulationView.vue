<template>
  <div class="space-y-6">
    <div class="text-center mb-4">
      <h2 class="text-2xl font-bold text-indigo-300 mb-2">电磁感应原理模拟实验</h2>
      <p class="text-slate-400">探索法拉第电磁感应定律与楞次定律的交互演示</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <el-card shadow="hover" class="h-full">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-indigo-300">🧪 实验区域</span>
              <el-tag :type="simulationStatus === 'playing' ? 'success' : simulationStatus === 'paused' ? 'warning' : 'info'" size="small">
                {{ simulationStatusText }}
              </el-tag>
            </div>
          </template>
          <ElectromagneticSimulation
            v-model:magnetPosition="magnetPosition"
            v-model:isPlaying="isPlaying"
            :speed="animationSpeed"
            :mode="simulationMode"
            @current-change="handleCurrentChange"
            @step-complete="handleStepComplete"
          />
        </el-card>
      </div>

      <div class="space-y-6">
        <el-card shadow="hover">
          <template #header>
            <span class="font-semibold text-indigo-300">📊 实时数据</span>
          </template>
          <div class="space-y-4">
            <div class="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span class="text-slate-300">感应电流</span>
              <span 
                class="font-mono text-lg font-bold transition-colors duration-300"
                :class="getCurrentColorClass(currentValue)"
              >
                {{ currentValue.toFixed(2) }} A
              </span>
            </div>
            <div class="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span class="text-slate-300">磁通量变化率</span>
              <span class="font-mono text-lg font-bold text-cyan-400">
                {{ Math.abs(magnetVelocity).toFixed(2) }} m/s
              </span>
            </div>
            <div class="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span class="text-slate-300">磁铁位置</span>
              <span class="font-mono text-lg font-bold text-green-400">
                {{ magnetPosition.toFixed(1) }} %
              </span>
            </div>
          </div>
        </el-card>

        <el-card shadow="hover">
          <template #header>
            <span class="font-semibold text-indigo-300">🎯 电流计</span>
          </template>
          <div class="flex justify-center">
            <Ammeter :current="currentValue" />
          </div>
        </el-card>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <el-card shadow="hover">
          <template #header>
            <span class="font-semibold text-indigo-300">🎮 控制面板</span>
          </template>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4">
              <div>
                <label class="block text-sm text-slate-400 mb-2">模拟模式</label>
                <el-radio-group v-model="simulationMode">
                  <el-radio-button label="auto">自动演示</el-radio-button>
                  <el-radio-button label="manual">手动控制</el-radio-button>
                  <el-radio-button label="step">分步演示</el-radio-button>
                </el-radio-group>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-slate-400 mb-2">动画速度</label>
                <el-slider
                  v-model="animationSpeed"
                  :min="0.5"
                  :max="3"
                  :step="0.1"
                  show-input
                  :show-input-controls="false"
                  :disabled="simulationMode === 'manual'"
                />
              </div>
              <div v-if="simulationMode === 'manual'" class="flex flex-col justify-end">
                <label class="block text-sm text-slate-400 mb-2">磁铁位置控制</label>
                <el-slider
                  v-model="magnetPosition"
                  :min="-100"
                  :max="200"
                  :step="1"
                  show-input
                  :show-input-controls="false"
                  @input="handleManualControl"
                />
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <el-button
                type="primary"
                size="large"
                @click="togglePlay"
                :disabled="simulationMode === 'manual'"
              >
                <span class="flex items-center gap-2">
                  <span>{{ isPlaying ? '⏸' : '▶' }}</span>
                  <span>{{ isPlaying ? '暂停' : '开始' }}</span>
                </span>
              </el-button>
              
              <el-button
                size="large"
                @click="resetSimulation"
              >
                <span class="flex items-center gap-2">
                  <span>🔄</span>
                  <span>重置</span>
                </span>
              </el-button>

              <el-button
                v-if="simulationMode === 'step'"
                type="warning"
                size="large"
                @click="nextStep"
              >
                <span class="flex items-center gap-2">
                  <span>⏭</span>
                  <span>下一步</span>
                </span>
              </el-button>

              <el-button
                v-if="simulationMode === 'step'"
                type="info"
                size="large"
                @click="prevStep"
                :disabled="currentStep === 0"
              >
                <span class="flex items-center gap-2">
                  <span>⏮</span>
                  <span>上一步</span>
                </span>
              </el-button>
            </div>

            <div v-if="simulationMode === 'step'" class="p-4 bg-indigo-900/30 rounded-lg border border-indigo-500/30">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">📖</span>
                <span class="font-semibold text-indigo-300">当前步骤 ({{ currentStep + 1 }}/{{ totalSteps }})</span>
              </div>
              <p class="text-slate-300 text-sm">{{ currentStepDescription }}</p>
            </div>
          </div>
        </el-card>
      </div>

      <div>
        <el-card shadow="hover">
          <template #header>
            <span class="font-semibold text-indigo-300">💡 物理原理</span>
          </template>
          <div class="space-y-4 text-sm">
            <div class="p-3 bg-slate-700/50 rounded-lg">
              <h4 class="font-semibold text-cyan-400 mb-1">法拉第电磁感应定律</h4>
              <p class="text-slate-300 text-xs leading-relaxed">
                当穿过闭合回路的磁通量发生变化时，回路中会产生感应电动势。
              </p>
              <div class="mt-2 p-2 bg-slate-800 rounded text-center">
                <span class="font-mono text-indigo-300">ε = -dΦ/dt</span>
              </div>
            </div>
            
            <div class="p-3 bg-slate-700/50 rounded-lg">
              <h4 class="font-semibold text-orange-400 mb-1">楞次定律</h4>
              <p class="text-slate-300 text-xs leading-relaxed">
                感应电流产生的磁场总是阻碍引起感应电流的磁通量的变化。
              </p>
            </div>

            <div class="p-3 bg-slate-700/50 rounded-lg">
              <h4 class="font-semibold text-green-400 mb-1">右手定则</h4>
              <p class="text-slate-300 text-xs leading-relaxed">
                拇指指向磁场方向，四指环绕方向为感应电流方向。
              </p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ElectromagneticSimulation from '@/components/ElectromagneticSimulation.vue'
import Ammeter from '@/components/Ammeter.vue'

const magnetPosition = ref(-50)
const isPlaying = ref(false)
const animationSpeed = ref(1)
const simulationMode = ref('auto')
const currentValue = ref(0)
const magnetVelocity = ref(0)
const currentStep = ref(0)

const steps = [
  { 
    position: -50, 
    description: '初始状态：磁铁位于线圈左侧，穿过线圈的磁通量为0，电流计指针归零。' 
  },
  { 
    position: 0, 
    description: '磁铁接近：磁铁N极向线圈移动，磁通量增加。根据楞次定律，感应电流产生的磁场会阻碍这种变化，电流计指针向负方向偏转。' 
  },
  { 
    position: 50, 
    description: '磁铁进入：磁铁穿过线圈中心，磁通量变化率减小，感应电流方向开始改变。' 
  },
  { 
    position: 100, 
    description: '磁铁离开：磁铁S极远离线圈，磁通量减少。感应电流产生的磁场会阻碍磁通量的减少，电流计指针向正方向偏转。' 
  },
  { 
    position: 150, 
    description: '恢复状态：磁铁完全离开线圈，磁通量变为0，电流计指针归零。' 
  }
]

const totalSteps = computed(() => steps.length)

const currentStepDescription = computed(() => {
  if (currentStep.value >= 0 && currentStep.value < steps.length) {
    return steps[currentStep.value].description
  }
  return ''
})

const simulationStatus = computed(() => {
  if (simulationMode.value === 'step') return 'step'
  return isPlaying.value ? 'playing' : 'paused'
})

const simulationStatusText = computed(() => {
  if (simulationMode.value === 'step') return '分步模式'
  return isPlaying.value ? '运行中' : '已暂停'
})

const getCurrentColorClass = (value) => {
  if (Math.abs(value) < 0.01) return 'text-slate-400'
  return value > 0 ? 'text-green-400' : 'text-red-400'
}

const handleCurrentChange = (val, velocity) => {
  currentValue.value = val
  magnetVelocity.value = velocity
}

const handleStepComplete = (step) => {
  currentStep.value = step
}

const handleManualControl = () => {
  magnetVelocity.value = 0
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const resetSimulation = () => {
  isPlaying.value = false
  magnetPosition.value = -50
  currentValue.value = 0
  currentStep.value = 0
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    magnetPosition.value = steps[currentStep.value].position
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    magnetPosition.value = steps[currentStep.value].position
  }
}

watch([simulationMode, isPlaying], () => {
  if (simulationMode.value === 'manual') {
    isPlaying.value = false
  }
})
</script>
