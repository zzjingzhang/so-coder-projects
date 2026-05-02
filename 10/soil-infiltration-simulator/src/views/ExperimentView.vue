<script setup>
import { ref, reactive, onUnmounted, watch } from 'vue'
import { NButton, NCard, NSpace, NSlider, NStatistic, NRow, NCol, NDivider } from 'naive-ui'
import SoilSimulator from '../components/SoilSimulator.vue'
import DataChart from '../components/DataChart.vue'
import { soilTypes } from '../utils/soilTypes'

const isRunning = ref(false)
const rainfallIntensity = ref(50)
const elapsedTime = ref(0)

const claySimulator = ref(null)
const loessSimulator = ref(null)
const sandSimulator = ref(null)

const experimentData = reactive({
  clay: {
    time: [],
    infiltratedWater: [],
    collectedWater: [],
    infiltrationRate: []
  },
  loess: {
    time: [],
    infiltratedWater: [],
    collectedWater: [],
    infiltrationRate: []
  },
  sand: {
    time: [],
    infiltratedWater: [],
    collectedWater: [],
    infiltrationRate: []
  }
})

const currentStats = reactive({
  clay: { infiltratedWater: 0, collectedWater: 0, infiltrationRate: 0 },
  loess: { infiltratedWater: 0, collectedWater: 0, infiltrationRate: 0 },
  sand: { infiltratedWater: 0, collectedWater: 0, infiltrationRate: 0 }
})

const lastDataTime = reactive({
  clay: 0,
  loess: 0,
  sand: 0
})

let timerInterval = null
const DATA_RECORD_INTERVAL = 1000

const startExperiment = () => {
  isRunning.value = true
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsedTime.value += 1
    }, 1000)
  }
}

const pauseExperiment = () => {
  isRunning.value = false
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const resetExperiment = () => {
  pauseExperiment()
  elapsedTime.value = 0
  
  lastDataTime.clay = 0
  lastDataTime.loess = 0
  lastDataTime.sand = 0
  
  claySimulator.value?.reset()
  loessSimulator.value?.reset()
  sandSimulator.value?.reset()
  
  Object.keys(experimentData).forEach(key => {
    experimentData[key].time.length = 0
    experimentData[key].infiltratedWater.length = 0
    experimentData[key].collectedWater.length = 0
    experimentData[key].infiltrationRate.length = 0
  })
  
  Object.keys(currentStats).forEach(key => {
    currentStats[key].infiltratedWater = 0
    currentStats[key].collectedWater = 0
    currentStats[key].infiltrationRate = 0
  })
}

const handleDataUpdate = (data) => {
  const { soilType, infiltratedWater, collectedWater, infiltrationRate } = data
  
  currentStats[soilType].infiltratedWater = infiltratedWater
  currentStats[soilType].collectedWater = collectedWater
  currentStats[soilType].infiltrationRate = infiltrationRate
  
  if (elapsedTime.value - lastDataTime[soilType] >= 1) {
    lastDataTime[soilType] = elapsedTime.value
    
    if (!experimentData[soilType].time.includes(elapsedTime.value)) {
      experimentData[soilType].time.push(elapsedTime.value)
      experimentData[soilType].infiltratedWater.push(infiltratedWater)
      experimentData[soilType].collectedWater.push(collectedWater)
      experimentData[soilType].infiltrationRate.push(infiltrationRate)
    }
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          🌧️ 土壤下渗实验模拟
        </h1>
        <p class="text-gray-600">
          探索不同土壤类型的水分渗透能力差异
        </p>
      </div>
      
      <NCard class="mb-6">
        <NSpace vertical :size="16">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <NSpace :size="16">
              <NStatistic label="实验时间">
                <template #default>
                  <span class="text-2xl font-mono">{{ formatTime(elapsedTime) }}</span>
                </template>
              </NStatistic>
              <NStatistic label="降雨强度">
                <template #default>
                  <span class="text-2xl font-mono">{{ rainfallIntensity }} mm/h</span>
                </template>
              </NStatistic>
            </NSpace>
            
            <NSpace :size="12">
              <NButton 
                type="primary" 
                size="large"
                @click="startExperiment"
                :disabled="isRunning"
              >
                ▶ 开始实验
              </NButton>
              <NButton 
                type="warning" 
                size="large"
                @click="pauseExperiment"
                :disabled="!isRunning"
              >
                ⏸ 暂停
              </NButton>
              <NButton 
                type="error" 
                size="large"
                @click="resetExperiment"
              >
                ↺ 重置
              </NButton>
            </NSpace>
          </div>
          
          <div class="flex items-center gap-4">
            <span class="text-gray-600 whitespace-nowrap">降雨强度调节:</span>
            <NSlider 
              v-model:value="rainfallIntensity" 
              :min="10" 
              :max="100" 
              :step="5"
              class="flex-1"
            />
            <span class="text-gray-600 w-16 text-right">{{ rainfallIntensity }} mm/h</span>
          </div>
        </NSpace>
      </NCard>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="space-y-4">
          <SoilSimulator 
            ref="claySimulator"
            soilType="clay"
            :isRunning="isRunning"
            :rainfallIntensity="rainfallIntensity"
            @update:data="handleDataUpdate"
          />
          <NCard size="small">
            <template #header>
              <span class="font-bold text-amber-900">黏土数据</span>
            </template>
            <NSpace vertical :size="8">
              <div class="flex justify-between">
                <span class="text-gray-600">已下渗:</span>
                <span class="font-mono font-bold">{{ currentStats.clay.infiltratedWater.toFixed(1) }} ml</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">已收集:</span>
                <span class="font-mono font-bold">{{ currentStats.clay.collectedWater.toFixed(1) }} ml</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">下渗速度:</span>
                <span class="font-mono font-bold">{{ currentStats.clay.infiltrationRate.toFixed(2) }} ml/s</span>
              </div>
            </NSpace>
          </NCard>
        </div>
        
        <div class="space-y-4">
          <SoilSimulator 
            ref="loessSimulator"
            soilType="loess"
            :isRunning="isRunning"
            :rainfallIntensity="rainfallIntensity"
            @update:data="handleDataUpdate"
          />
          <NCard size="small">
            <template #header>
              <span class="font-bold text-yellow-800">黄土数据</span>
            </template>
            <NSpace vertical :size="8">
              <div class="flex justify-between">
                <span class="text-gray-600">已下渗:</span>
                <span class="font-mono font-bold">{{ currentStats.loess.infiltratedWater.toFixed(1) }} ml</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">已收集:</span>
                <span class="font-mono font-bold">{{ currentStats.loess.collectedWater.toFixed(1) }} ml</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">下渗速度:</span>
                <span class="font-mono font-bold">{{ currentStats.loess.infiltrationRate.toFixed(2) }} ml/s</span>
              </div>
            </NSpace>
          </NCard>
        </div>
        
        <div class="space-y-4">
          <SoilSimulator 
            ref="sandSimulator"
            soilType="sand"
            :isRunning="isRunning"
            :rainfallIntensity="rainfallIntensity"
            @update:data="handleDataUpdate"
          />
          <NCard size="small">
            <template #header>
              <span class="font-bold text-orange-600">砂土数据</span>
            </template>
            <NSpace vertical :size="8">
              <div class="flex justify-between">
                <span class="text-gray-600">已下渗:</span>
                <span class="font-mono font-bold">{{ currentStats.sand.infiltratedWater.toFixed(1) }} ml</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">已收集:</span>
                <span class="font-mono font-bold">{{ currentStats.sand.collectedWater.toFixed(1) }} ml</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">下渗速度:</span>
                <span class="font-mono font-bold">{{ currentStats.sand.infiltrationRate.toFixed(2) }} ml/s</span>
              </div>
            </NSpace>
          </NCard>
        </div>
      </div>
      
      <NCard class="mb-6">
        <DataChart :chartData="experimentData" />
      </NCard>
      
      <NCard>
        <template #header>
          <span class="font-bold text-lg">📚 土壤类型说明</span>
        </template>
        <NRow :gutter="24">
          <NCol :span="8">
            <div class="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-800">
              <h3 class="font-bold text-amber-900 mb-2">黏土 (Clay)</h3>
              <p class="text-sm text-gray-600 mb-2">
                颗粒大小: 0.002mm 以下
              </p>
              <p class="text-sm text-gray-600 mb-2">
                下渗速度: ~1.5 ml/s
              </p>
              <p class="text-sm text-gray-700">
                颗粒极细，孔隙极小，渗透性最差，但保水能力最强。常用于水库防渗层。
              </p>
            </div>
          </NCol>
          <NCol :span="8">
            <div class="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-700">
              <h3 class="font-bold text-yellow-800 mb-2">黄土 (Loess)</h3>
              <p class="text-sm text-gray-600 mb-2">
                颗粒大小: 0.002-0.05mm
              </p>
              <p class="text-sm text-gray-600 mb-2">
                下渗速度: ~8 ml/s
              </p>
              <p class="text-sm text-gray-700">
                颗粒中等，渗透性适中，保水能力一般。是农业生产的理想土壤类型。
              </p>
            </div>
          </NCol>
          <NCol :span="8">
            <div class="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h3 class="font-bold text-orange-600 mb-2">砂土 (Sand)</h3>
              <p class="text-sm text-gray-600 mb-2">
                颗粒大小: 0.05-2mm
              </p>
              <p class="text-sm text-gray-600 mb-2">
                下渗速度: ~25 ml/s
              </p>
              <p class="text-sm text-gray-700">
                颗粒大，孔隙大，渗透性最好，但保水能力差。常用于排水系统和过滤层。
              </p>
            </div>
          </NCol>
        </NRow>
        
        <NDivider class="my-4" />
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800 mb-2">💡 实验原理</h3>
          <p class="text-gray-700 mb-2">
            土壤的渗透能力主要取决于土壤颗粒的大小和孔隙度。颗粒越大，孔隙越大，水分越容易通过。
          </p>
          <p class="text-gray-700">
            通过这个模拟实验，您可以直观地观察到：<strong class="text-blue-600">砂土 > 黄土 > 黏土</strong> 的渗透能力排序。
            同时，图表会实时记录数据，帮助您理解土壤颗粒大小与水分渗透能力的定量关系。
          </p>
        </div>
      </NCard>
      
      <div class="text-center text-gray-500 text-sm mt-8">
        土壤下渗实验模拟 | Vue 3 + Tailwind CSS + Naive UI + ECharts
      </div>
    </div>
  </div>
</template>
