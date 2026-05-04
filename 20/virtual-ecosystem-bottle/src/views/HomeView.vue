<template>
  <div class="min-h-screen p-4 md:p-6 lg:p-8">
    <!-- 顶部标题栏 -->
    <header class="glass-panel p-6 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
            <i class="pi pi-water mr-3"></i>虚拟生态系统瓶
          </h1>
          <p class="text-white/80 text-sm md:text-base">
            模拟封闭水族生态系统，展示植物、动物和微生物之间的氧气与二氧化碳平衡
          </p>
        </div>
        <div class="mt-4 md:mt-0">
          <Badge 
            :value="isRunning ? '运行中' : '已暂停'" 
            :class="isRunning ? 'bg-green-500' : 'bg-yellow-500'"
            class="text-lg px-4 py-2"
          />
        </div>
      </div>
    </header>

    <!-- 主体内容区 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- 左侧控制面板 -->
      <ControlPanel 
        :selected-organism="selectedOrganism"
        :environment-params="environmentParams"
        :simulation-speed="simulationSpeed"
        :is-running="isRunning"
        @select-organism="selectOrganism"
        @update-environment="updateEnvironment"
        @update-speed="updateSpeed"
        @start-simulation="startSimulation"
        @pause-simulation="pauseSimulation"
        @reset-simulation="resetSimulation"
      />

      <!-- 右侧生态系统可视化区域 -->
      <div class="lg:col-span-2">
        <Aquarium 
          :organisms="organisms"
          :bubbles="bubbles"
          :selected-organism="selectedOrganism"
          :is-running="isRunning"
          @add-organism="addOrganism"
        />
      </div>
    </div>

    <!-- 底部数据展示面板 -->
    <DataPanel 
      :ecosystem-data="ecosystemData"
      :gas-history="gasHistory"
      :run-time="runTime"
    />

    <!-- 科学知识展示区 -->
    <KnowledgePanel />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import ControlPanel from '../components/ControlPanel.vue'
import Aquarium from '../components/Aquarium.vue'
import DataPanel from '../components/DataPanel.vue'
import KnowledgePanel from '../components/KnowledgePanel.vue'

// 系统状态
const isRunning = ref(false)
const simulationSpeed = ref(1)
const runTime = ref(0)
let simulationInterval = null
let lastTime = Date.now()

// 选中的生物类型
const selectedOrganism = ref(null)

// 环境参数
const environmentParams = ref({
  lightIntensity: 50,
  temperature: 25,
  nutrientLevel: 50
})

// 生态系统数据
const ecosystemData = ref({
  oxygenLevel: 21,
  co2Level: 0.04,
  phValue: 7.0,
  plantCount: 0,
  animalCount: 0,
  microbeCount: 0,
  photosynthesisRate: 0,
  respirationRate: 0,
  healthScore: 100
})

// 气体浓度历史数据（用于图表）
const gasHistory = ref({
  labels: [],
  oxygen: [],
  co2: []
})

// 生物列表
const organisms = ref([])

// 气泡列表
const bubbles = ref([])

// 生物类型定义
const organismTypes = {
  plant: {
    name: '水草',
    icon: '🌿',
    type: 'plant',
    oxygenProduction: 0.5,
    co2Consumption: 0.3,
    nutrientConsumption: 0.1
  },
  algae: {
    name: '藻类',
    icon: '🟢',
    type: 'plant',
    oxygenProduction: 0.3,
    co2Consumption: 0.2,
    nutrientConsumption: 0.05
  },
  fish: {
    name: '小鱼',
    icon: '🐟',
    type: 'animal',
    oxygenConsumption: 0.4,
    co2Production: 0.3,
    nutrientProduction: 0.2
  },
  shrimp: {
    name: '虾',
    icon: '🦐',
    type: 'animal',
    oxygenConsumption: 0.2,
    co2Production: 0.15,
    nutrientProduction: 0.1
  },
  bacteria: {
    name: '细菌',
    icon: '🦠',
    type: 'microbe',
    oxygenConsumption: 0.05,
    co2Production: 0.03,
    nutrientProduction: 0.3
  },
  protozoa: {
    name: '原生生物',
    icon: '🔬',
    type: 'microbe',
    oxygenConsumption: 0.03,
    co2Production: 0.02,
    nutrientProduction: 0.1
  }
}

// 选择生物类型
const selectOrganism = (type) => {
  selectedOrganism.value = type
}

// 更新环境参数
const updateEnvironment = (params) => {
  environmentParams.value = { ...environmentParams.value, ...params }
}

// 更新模拟速度
const updateSpeed = (speed) => {
  simulationSpeed.value = speed
}

// 添加生物
const addOrganism = (position) => {
  if (!selectedOrganism.value) return
  
  const type = organismTypes[selectedOrganism.value]
  const organism = {
    id: Date.now() + Math.random(),
    type: selectedOrganism.value,
    ...type,
    x: position.x,
    y: position.y,
    createdAt: Date.now()
  }
  
  organisms.value.push(organism)
  updateCounts()
}

// 更新生物计数
const updateCounts = () => {
  ecosystemData.value.plantCount = organisms.value.filter(o => o.type === 'plant' || o.type === 'algae').length
  ecosystemData.value.animalCount = organisms.value.filter(o => o.type === 'fish' || o.type === 'shrimp').length
  ecosystemData.value.microbeCount = organisms.value.filter(o => o.type === 'bacteria' || o.type === 'protozoa').length
}

// 计算生态系统动态
const updateEcosystem = () => {
  const now = Date.now()
  const deltaTime = (now - lastTime) / 1000 * simulationSpeed.value
  lastTime = now
  
  // 更新运行时间
  if (isRunning.value) {
    runTime.value += deltaTime
  }
  
  // 计算光合作用率（基于光照、温度和植物数量）
  const lightFactor = environmentParams.value.lightIntensity / 100
  const tempFactor = 1 - Math.abs(environmentParams.value.temperature - 25) / 20
  const plantFactor = (ecosystemData.value.plantCount * 0.1)
  
  const photosynthesisRate = lightFactor * tempFactor * plantFactor * 0.5
  ecosystemData.value.photosynthesisRate = photosynthesisRate
  
  // 计算呼吸作用率（基于动物和微生物数量）
  const animalFactor = ecosystemData.value.animalCount * 0.08
  const microbeFactor = ecosystemData.value.microbeCount * 0.02
  const respirationRate = (animalFactor + microbeFactor) * 0.3
  ecosystemData.value.respirationRate = respirationRate
  
  // 更新气体浓度
  const oxygenChange = (photosynthesisRate - respirationRate) * deltaTime * 0.1
  const co2Change = (respirationRate - photosynthesisRate * 0.6) * deltaTime * 0.01
  
  ecosystemData.value.oxygenLevel = Math.max(5, Math.min(35, ecosystemData.value.oxygenLevel + oxygenChange))
  ecosystemData.value.co2Level = Math.max(0.01, Math.min(5, ecosystemData.value.co2Level + co2Change))
  
  // 更新pH值（基于CO2浓度）
  const targetPh = 7.5 - (ecosystemData.value.co2Level - 0.04) * 0.3
  ecosystemData.value.phValue += (targetPh - ecosystemData.value.phValue) * deltaTime * 0.1
  ecosystemData.value.phValue = Math.max(5, Math.min(9, ecosystemData.value.phValue))
  
  // 计算生态健康度
  const oxygenHealth = 1 - Math.abs(ecosystemData.value.oxygenLevel - 21) / 16
  const co2Health = 1 - Math.abs(ecosystemData.value.co2Level - 0.04) / 2.5
  const phHealth = 1 - Math.abs(ecosystemData.value.phValue - 7.0) / 2
  
  ecosystemData.value.healthScore = Math.max(0, Math.min(100, 
    (oxygenHealth * 30 + co2Health * 30 + phHealth * 40)
  ))
  
  // 更新历史数据（每2秒记录一次）
  if (Math.floor(runTime.value) % 2 === 0) {
    const timeLabel = Math.floor(runTime.value)
    if (!gasHistory.value.labels.includes(timeLabel)) {
      gasHistory.value.labels.push(timeLabel)
      gasHistory.value.oxygen.push(ecosystemData.value.oxygenLevel)
      gasHistory.value.co2.push(ecosystemData.value.co2Level * 100)
      
      // 保持最近50个数据点
      if (gasHistory.value.labels.length > 50) {
        gasHistory.value.labels.shift()
        gasHistory.value.oxygen.shift()
        gasHistory.value.co2.shift()
      }
    }
  }
  
  // 生成气泡（植物进行光合作用时）
  if (isRunning.value && photosynthesisRate > 0.1) {
    const plants = organisms.value.filter(o => o.type === 'plant' || o.type === 'algae')
    if (plants.length > 0 && Math.random() < photosynthesisRate * 0.3) {
      const randomPlant = plants[Math.floor(Math.random() * plants.length)]
      bubbles.value.push({
        id: Date.now() + Math.random(),
        x: randomPlant.x + (Math.random() - 0.5) * 20,
        y: randomPlant.y - 10,
        size: 4 + Math.random() * 6,
        createdAt: Date.now()
      })
    }
  }
  
  // 清理过期气泡
  const now2 = Date.now()
  bubbles.value = bubbles.value.filter(b => now2 - b.createdAt < 3000)
}

// 启动模拟
const startSimulation = () => {
  isRunning.value = true
  lastTime = Date.now()
}

// 暂停模拟
const pauseSimulation = () => {
  isRunning.value = false
}

// 重置模拟
const resetSimulation = () => {
  isRunning.value = false
  runTime.value = 0
  organisms.value = []
  bubbles.value = []
  selectedOrganism.value = null
  
  ecosystemData.value = {
    oxygenLevel: 21,
    co2Level: 0.04,
    phValue: 7.0,
    plantCount: 0,
    animalCount: 0,
    microbeCount: 0,
    photosynthesisRate: 0,
    respirationRate: 0,
    healthScore: 100
  }
  
  gasHistory.value = {
    labels: [],
    oxygen: [],
    co2: []
  }
  
  environmentParams.value = {
    lightIntensity: 50,
    temperature: 25,
    nutrientLevel: 50
  }
  
  simulationSpeed.value = 1
}

// 生命周期
onMounted(() => {
  lastTime = Date.now()
  simulationInterval = setInterval(updateEcosystem, 100)
})

onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})
</script>

<style scoped>
</style>
