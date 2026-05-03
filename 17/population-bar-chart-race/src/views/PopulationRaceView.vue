<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { AnimationConfig } from '../types'
import { populationData, getYearRange } from '../data/populationData'
import BarChartRace from '../components/BarChartRace.vue'
import ControlPanel from '../components/ControlPanel.vue'
import DataTableView from '../components/DataTableView.vue'

const { startYear, endYear } = getYearRange()

const config = ref<AnimationConfig>({
  isPlaying: false,
  speed: 1,
  currentYear: startYear,
  startYear,
  endYear,
  displayCount: 10
})

let animationInterval: number | null = null

const getIntervalDuration = computed(() => {
  return Math.max(100, 1000 / config.value.speed)
})

const startAnimation = () => {
  config.value.isPlaying = true
  
  if (animationInterval) {
    clearInterval(animationInterval)
  }
  
  animationInterval = window.setInterval(() => {
    if (config.value.currentYear >= config.value.endYear) {
      config.value.isPlaying = false
      if (animationInterval) {
        clearInterval(animationInterval)
        animationInterval = null
      }
      return
    }
    
    config.value.currentYear++
  }, getIntervalDuration.value)
}

const pauseAnimation = () => {
  config.value.isPlaying = false
  
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
}

const resetAnimation = () => {
  pauseAnimation()
  config.value.currentYear = config.value.startYear
}

const handleSpeedChange = (speed: number) => {
  config.value.speed = speed
  
  if (config.value.isPlaying) {
    pauseAnimation()
    startAnimation()
  }
}

const handleYearChange = (year: number) => {
  config.value.currentYear = year
}

const handleDisplayCountChange = (count: number) => {
  config.value.displayCount = count
}

onMounted(() => {
  // 可选：自动开始播放
  // startAnimation()
})

onUnmounted(() => {
  pauseAnimation()
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="bg-gradient-to-r from-primary to-secondary text-white py-8 px-6 shadow-lg">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold mb-2">人口增长柱状图竞赛</h1>
        <p class="text-lg opacity-90">
          观看世界各国人口从 {{ startYear }} 年到 {{ endYear }} 年的变化历程
        </p>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="lg:col-span-2">
          <BarChartRace
            :data="populationData"
            :config="config"
          />
        </div>
        
        <div class="lg:col-span-1">
          <ControlPanel
            :config="config"
            @play="startAnimation"
            @pause="pauseAnimation"
            @reset="resetAnimation"
            @speed-change="handleSpeedChange"
            @year-change="handleYearChange"
            @display-count-change="handleDisplayCountChange"
          />
        </div>
      </div>
      
      <div class="mt-6">
        <DataTableView
          :data="populationData"
          :current-year="config.currentYear"
        />
      </div>
    </main>
    
    <footer class="bg-surface border-t border-border py-6 mt-12">
      <div class="max-w-7xl mx-auto px-6 text-center text-text-secondary">
        <p class="text-sm">
          人口增长柱状图竞赛 | 使用 Vue 3 + TypeScript + Tailwind CSS + PrimeVue 构建
        </p>
        <p class="text-xs mt-2">
          数据为模拟数据，仅供演示使用
        </p>
      </div>
    </footer>
  </div>
</template>
