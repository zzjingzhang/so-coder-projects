<template>
  <div class="glass-panel p-4 h-full">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xl font-bold text-white flex items-center">
        <i class="pi pi-water mr-2"></i>生态系统瓶
      </h2>
      <div v-if="selectedOrganism" class="text-sm text-green-400">
        <i class="pi pi-info-circle mr-1"></i>
        点击水族箱添加 {{ organismTypes[selectedOrganism]?.name }}
      </div>
    </div>
    
    <!-- 水族箱容器 -->
    <div 
      ref="aquariumRef"
      class="aquarium relative w-full h-[500px] md:h-[550px]"
      @click="handleClick"
      :class="{ 'cursor-crosshair': selectedOrganism }"
    >
      <!-- 水层光线效果 -->
      <div class="water-light"></div>
      
      <!-- 底床层 -->
      <div class="substrate"></div>
      
      <!-- 气泡 -->
      <div 
        v-for="bubble in bubbles" 
        :key="bubble.id"
        class="bubble"
        :style="{
          left: bubble.x + 'px',
          top: bubble.y + 'px',
          width: bubble.size + 'px',
          height: bubble.size + 'px'
        }"
      ></div>
      
      <!-- 生物 -->
      <div 
        v-for="organism in organisms" 
        :key="organism.id"
        :class="getOrganismClass(organism.type)"
        :style="getOrganismStyle(organism)"
        :title="organism.name"
      >
        {{ organism.icon }}
      </div>
      
      <!-- 添加提示 -->
      <div 
        v-if="selectedOrganism && organisms.length === 0"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div class="glass-panel-dark px-6 py-4 text-center">
          <p class="text-white/90 text-lg mb-2">
            点击此处添加第一个生物
          </p>
          <p class="text-white/60 text-sm">
            已选择: <span class="text-green-400 font-bold">{{ organismTypes[selectedOrganism]?.name }}</span>
          </p>
        </div>
      </div>
      
      <!-- 状态指示 -->
      <div class="absolute top-3 right-3">
        <div v-if="isRunning" class="flex items-center gap-2">
          <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-white/80 text-xs">运行中</span>
        </div>
        <div v-else class="flex items-center gap-2">
          <span class="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span class="text-white/80 text-xs">已暂停</span>
        </div>
      </div>
    </div>
    
    <!-- 生物统计 -->
    <div class="mt-4 grid grid-cols-3 gap-3">
      <div class="glass-panel-dark p-3 text-center">
        <div class="text-2xl mb-1">🌱</div>
        <div class="text-white/80 text-xs">植物</div>
        <div class="text-green-400 font-bold">{{ plantCount }}</div>
      </div>
      <div class="glass-panel-dark p-3 text-center">
        <div class="text-2xl mb-1">🐠</div>
        <div class="text-white/80 text-xs">动物</div>
        <div class="text-orange-400 font-bold">{{ animalCount }}</div>
      </div>
      <div class="glass-panel-dark p-3 text-center">
        <div class="text-2xl mb-1">🔬</div>
        <div class="text-white/80 text-xs">微生物</div>
        <div class="text-purple-400 font-bold">{{ microbeCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  organisms: {
    type: Array,
    default: () => []
  },
  bubbles: {
    type: Array,
    default: () => []
  },
  selectedOrganism: {
    type: String,
    default: null
  },
  isRunning: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['add-organism'])

const aquariumRef = ref(null)

// 生物类型
const organismTypes = {
  plant: { name: '水草' },
  algae: { name: '藻类' },
  fish: { name: '小鱼' },
  shrimp: { name: '虾' },
  bacteria: { name: '细菌' },
  protozoa: { name: '原生生物' }
}

// 计算生物数量
const plantCount = computed(() => {
  return props.organisms.filter(o => o.type === 'plant' || o.type === 'algae').length
})

const animalCount = computed(() => {
  return props.organisms.filter(o => o.type === 'fish' || o.type === 'shrimp').length
})

const microbeCount = computed(() => {
  return props.organisms.filter(o => o.type === 'bacteria' || o.type === 'protozoa').length
})

// 获取生物CSS类
const getOrganismClass = (type) => {
  const classMap = {
    plant: 'plant',
    algae: 'algae',
    fish: 'fish',
    shrimp: 'shrimp',
    bacteria: 'microbe',
    protozoa: 'microbe'
  }
  return classMap[type] || 'plant'
}

// 获取生物样式（包含随机动画延迟）
const getOrganismStyle = (organism) => {
  const animationDelay = (organism.id % 100) / 100 * 2
  const baseStyle = {
    left: organism.x + 'px',
    top: organism.y + 'px',
    animationDelay: animationDelay + 's'
  }
  
  // 根据生物类型调整位置
  if (organism.type === 'plant') {
    // 植物固定在底部
    return {
      ...baseStyle,
      bottom: '60px',
      top: 'auto'
    }
  }
  
  if (organism.type === 'shrimp') {
    // 虾在底部附近
    return {
      ...baseStyle,
      top: 'auto',
      bottom: (60 + Math.random() * 30) + 'px'
    }
  }
  
  if (organism.type === 'bacteria' || organism.type === 'protozoa') {
    // 微生物在中层
    return {
      ...baseStyle
    }
  }
  
  return baseStyle
}

// 处理点击事件
const handleClick = (event) => {
  if (!props.selectedOrganism || !aquariumRef.value) return
  
  const rect = aquariumRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  // 确保不会点击到太边缘的位置
  const margin = 30
  const minX = margin
  const maxX = rect.width - margin
  const minY = margin
  const maxY = rect.height - 80 // 留出底床空间
  
  const clampedX = Math.max(minX, Math.min(maxX, x))
  const clampedY = Math.max(minY, Math.min(maxY, y))
  
  emit('add-organism', { x: clampedX, y: clampedY })
}
</script>

<style scoped>
</style>
