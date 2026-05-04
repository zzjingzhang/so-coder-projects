<template>
  <div class="glass-panel p-6 h-full">
    <h2 class="text-xl font-bold text-white mb-4 flex items-center">
      <i class="pi pi-cog mr-2"></i>控制面板
    </h2>
    
    <!-- 系统控制 -->
    <div class="mb-6">
      <h3 class="text-white/90 text-sm font-semibold mb-3">系统控制</h3>
      <div class="grid grid-cols-3 gap-2">
        <Button 
          @click="$emit('start-simulation')"
          :disabled="isRunning"
          class="w-full h-12"
          :class="{'btn-primary': !isRunning, 'opacity-50': isRunning}"
        >
          <i class="pi pi-play mr-1"></i>启动
        </Button>
        <Button 
          @click="$emit('pause-simulation')"
          :disabled="!isRunning"
          class="w-full h-12"
          :class="{'btn-secondary': isRunning, 'opacity-50': !isRunning}"
        >
          <i class="pi pi-pause mr-1"></i>暂停
        </Button>
        <Button 
          @click="$emit('reset-simulation')"
          class="w-full h-12 btn-secondary"
        >
          <i class="pi pi-refresh mr-1"></i>重置
        </Button>
      </div>
      
      <!-- 模拟速度 -->
      <div class="mt-4">
        <label class="text-white/90 text-sm mb-2 block">
          模拟速度: <span class="font-bold">{{ simulationSpeed }}x</span>
        </label>
        <div class="flex items-center gap-3">
          <span class="text-white/60 text-xs">0.5x</span>
          <Slider 
            v-model="speedValue"
            :min="0.5"
            :max="3"
            :step="0.5"
            class="flex-1 custom-slider"
          />
          <span class="text-white/60 text-xs">3x</span>
        </div>
      </div>
    </div>
    
    <Divider class="my-4 bg-white/20" />
    
    <!-- 生物选择 -->
    <div class="mb-6">
      <h3 class="text-white/90 text-sm font-semibold mb-3">
        <i class="pi pi-fish mr-1"></i>添加生物
        <span v-if="selectedOrganism" class="text-green-400 text-xs ml-2">
          (已选择: {{ organismTypes[selectedOrganism]?.name }})
        </span>
      </h3>
      
      <p class="text-white/60 text-xs mb-3">
        选择生物类型后，点击水族箱添加
      </p>
      
      <!-- 植物类 -->
      <div class="mb-3">
        <h4 class="text-green-400 text-xs font-semibold mb-2">🌱 植物</h4>
        <div class="grid grid-cols-2 gap-2">
          <Button
            @click="$emit('select-organism', 'plant')"
            :class="selectedOrganism === 'plant' ? 'bg-green-600' : 'btn-secondary'"
            class="h-14 text-sm"
          >
            <div class="flex flex-col items-center">
              <span class="text-2xl">🌿</span>
              <span class="text-xs mt-1">水草</span>
            </div>
          </Button>
          <Button
            @click="$emit('select-organism', 'algae')"
            :class="selectedOrganism === 'algae' ? 'bg-green-600' : 'btn-secondary'"
            class="h-14 text-sm"
          >
            <div class="flex flex-col items-center">
              <span class="text-2xl">🟢</span>
              <span class="text-xs mt-1">藻类</span>
            </div>
          </Button>
        </div>
      </div>
      
      <!-- 动物类 -->
      <div class="mb-3">
        <h4 class="text-orange-400 text-xs font-semibold mb-2">🐠 动物</h4>
        <div class="grid grid-cols-2 gap-2">
          <Button
            @click="$emit('select-organism', 'fish')"
            :class="selectedOrganism === 'fish' ? 'bg-orange-600' : 'btn-secondary'"
            class="h-14 text-sm"
          >
            <div class="flex flex-col items-center">
              <span class="text-2xl">🐟</span>
              <span class="text-xs mt-1">小鱼</span>
            </div>
          </Button>
          <Button
            @click="$emit('select-organism', 'shrimp')"
            :class="selectedOrganism === 'shrimp' ? 'bg-orange-600' : 'btn-secondary'"
            class="h-14 text-sm"
          >
            <div class="flex flex-col items-center">
              <span class="text-2xl">🦐</span>
              <span class="text-xs mt-1">虾</span>
            </div>
          </Button>
        </div>
      </div>
      
      <!-- 微生物类 -->
      <div>
        <h4 class="text-purple-400 text-xs font-semibold mb-2">🔬 微生物</h4>
        <div class="grid grid-cols-2 gap-2">
          <Button
            @click="$emit('select-organism', 'bacteria')"
            :class="selectedOrganism === 'bacteria' ? 'bg-purple-600' : 'btn-secondary'"
            class="h-14 text-sm"
          >
            <div class="flex flex-col items-center">
              <span class="text-2xl">🦠</span>
              <span class="text-xs mt-1">细菌</span>
            </div>
          </Button>
          <Button
            @click="$emit('select-organism', 'protozoa')"
            :class="selectedOrganism === 'protozoa' ? 'bg-purple-600' : 'btn-secondary'"
            class="h-14 text-sm"
          >
            <div class="flex flex-col items-center">
              <span class="text-2xl">🔬</span>
              <span class="text-xs mt-1">原生生物</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
    
    <Divider class="my-4 bg-white/20" />
    
    <!-- 环境参数 -->
    <div>
      <h3 class="text-white/90 text-sm font-semibold mb-3">
        <i class="pi pi-sliders-h mr-1"></i>环境参数
      </h3>
      
      <!-- 光照强度 -->
      <div class="mb-4">
        <label class="text-white/90 text-sm mb-2 flex justify-between">
          <span>☀️ 光照强度</span>
          <span class="font-bold">{{ environmentParams.lightIntensity }}%</span>
        </label>
        <Slider 
          v-model="lightValue"
          :min="0"
          :max="100"
          class="custom-slider"
        />
        <div class="flex justify-between text-white/50 text-xs mt-1">
          <span>黑暗</span>
          <span>强光</span>
        </div>
      </div>
      
      <!-- 温度 -->
      <div class="mb-4">
        <label class="text-white/90 text-sm mb-2 flex justify-between">
          <span>🌡️ 温度</span>
          <span class="font-bold">{{ environmentParams.temperature }}°C</span>
        </label>
        <Slider 
          v-model="tempValue"
          :min="10"
          :max="35"
          class="custom-slider"
        />
        <div class="flex justify-between text-white/50 text-xs mt-1">
          <span>10°C</span>
          <span>35°C</span>
        </div>
      </div>
      
      <!-- 营养水平 -->
      <div>
        <label class="text-white/90 text-sm mb-2 flex justify-between">
          <span>🧪 营养水平</span>
          <span class="font-bold">{{ environmentParams.nutrientLevel }}%</span>
        </label>
        <Slider 
          v-model="nutrientValue"
          :min="0"
          :max="100"
          class="custom-slider"
        />
        <div class="flex justify-between text-white/50 text-xs mt-1">
          <span>贫瘠</span>
          <span>丰富</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedOrganism: {
    type: String,
    default: null
  },
  environmentParams: {
    type: Object,
    default: () => ({
      lightIntensity: 50,
      temperature: 25,
      nutrientLevel: 50
    })
  },
  simulationSpeed: {
    type: Number,
    default: 1
  },
  isRunning: {
    type: Boolean,
    default: false
  }
})

defineEmits([
  'select-organism',
  'update-environment',
  'update-speed',
  'start-simulation',
  'pause-simulation',
  'reset-simulation'
])

// 生物类型
const organismTypes = {
  plant: { name: '水草' },
  algae: { name: '藻类' },
  fish: { name: '小鱼' },
  shrimp: { name: '虾' },
  bacteria: { name: '细菌' },
  protozoa: { name: '原生生物' }
}

// 本地状态
const speedValue = ref(props.simulationSpeed)
const lightValue = ref(props.environmentParams.lightIntensity)
const tempValue = ref(props.environmentParams.temperature)
const nutrientValue = ref(props.environmentParams.nutrientLevel)

// 监听props变化
watch(() => props.simulationSpeed, (val) => {
  speedValue.value = val
})

watch(() => props.environmentParams, (val) => {
  lightValue.value = val.lightIntensity
  tempValue.value = val.temperature
  nutrientValue.value = val.nutrientLevel
}, { deep: true })

// 监听本地变化并触发事件
watch(speedValue, (val) => {
  emit('update-speed', val)
})

watch(lightValue, (val) => {
  emit('update-environment', { lightIntensity: val })
})

watch(tempValue, (val) => {
  emit('update-environment', { temperature: val })
})

watch(nutrientValue, (val) => {
  emit('update-environment', { nutrientLevel: val })
})
</script>

<style scoped>
</style>
