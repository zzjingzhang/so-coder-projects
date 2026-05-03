<template>
  <div class="relative w-full h-full overflow-hidden">
    <WaterWaveRenderer
      :amplitude="amplitude"
      :speed="speed"
      :transparency="transparency"
    />
    
    <ControlPanel
      v-model:amplitude="amplitude"
      v-model:speed="speed"
      v-model:transparency="transparency"
    />

    <div class="absolute bottom-6 left-6 text-white">
      <h1 class="text-3xl font-bold mb-2 drop-shadow-lg">
        <span class="text-cyan-400">Gerstner</span> 水面波浪
      </h1>
      <p class="text-slate-300 text-sm drop-shadow-md max-w-md">
        基于 Gerstner 波浪模型的实时水面渲染，支持反射、菲涅尔效果和泡沫模拟
      </p>
    </div>

    <div class="absolute bottom-6 right-6 flex items-center gap-2 text-white/60 text-xs">
      <v-icon icon="mdi-gesture-swipe" class="text-base"></v-icon>
      <span>拖动鼠标旋转视角 | 滚轮缩放</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WaterWaveRenderer from '../components/WaterWaveRenderer.vue'
import ControlPanel from '../components/ControlPanel.vue'

const amplitude = ref(0.5)
const speed = ref(1.0)
const transparency = ref(0.7)
</script>

<style scoped>
</style>
