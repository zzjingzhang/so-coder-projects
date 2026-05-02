<script setup lang="ts">
import { ref, computed } from 'vue'
import CityNightScene from '../components/CityNightScene.vue'
import ControlPanel from '../components/ControlPanel.vue'

const lightIntensity = ref(0.8)
const neonColor = ref('#ff00ff')
const trafficDensity = ref(0.5)

const isPanelOpen = ref(true)

const sceneProps = computed(() => ({
  lightIntensity: lightIntensity.value,
  neonColor: neonColor.value,
  trafficDensity: trafficDensity.value
}))
</script>

<template>
  <div class="relative w-full h-screen bg-gray-900 overflow-hidden">
    <CityNightScene
      :light-intensity="sceneProps.lightIntensity"
      :neon-color="sceneProps.neonColor"
      :traffic-density="sceneProps.trafficDensity"
    />
    
    <button
      class="absolute top-4 right-4 z-20 bg-gray-800 bg-opacity-80 text-white px-4 py-2 rounded-lg hover:bg-opacity-100 transition-all duration-300 flex items-center gap-2"
      @click="isPanelOpen = !isPanelOpen"
    >
      <span class="text-sm font-medium">{{ isPanelOpen ? '隐藏面板' : '显示面板' }}</span>
      <span class="text-lg">{{ isPanelOpen ? '✕' : '☰' }}</span>
    </button>

    <div
      class="absolute top-4 left-4 z-20 transition-all duration-500"
      :class="isPanelOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'"
    >
      <ControlPanel
        v-model:light-intensity="lightIntensity"
        v-model:neon-color="neonColor"
        v-model:traffic-density="trafficDensity"
      />
    </div>

    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
      <h1 class="text-white text-2xl font-bold drop-shadow-lg">城市夜景物理渲染</h1>
      <p class="text-gray-300 text-sm mt-1 drop-shadow-md">City Night Scene - Physics Based Rendering</p>
    </div>
  </div>
</template>

<style scoped>
</style>
