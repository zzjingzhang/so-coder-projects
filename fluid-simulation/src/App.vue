<script setup lang="ts">
import { ref, type Ref } from 'vue'
import FluidSimulation from './components/FluidSimulation.vue'
import ControlPanel from './components/ControlPanel.vue'
import type { FluidParams } from './composables/useFluidSimulation'

const fluidParams: Ref<FluidParams> = ref({
  viscosity: 10,
  gravity: 5,
  amplitude: 100
})

const fluidSimulationRef = ref<InstanceType<typeof FluidSimulation> | null>(null)

const handleReset = () => {
  if (fluidSimulationRef.value) {
    fluidSimulationRef.value.reset()
  }
}

const handleAddWave = () => {
  if (fluidSimulationRef.value) {
    fluidSimulationRef.value.addRandomWaves()
  }
}
</script>

<template>
  <div class="app-container min-h-screen bg-surface-dark flex flex-col">
    <header class="header bg-surface-light/50 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-text-primary">实时流体模拟演示</h1>
            <p class="text-sm text-text-secondary">Real-time Fluid Simulation</p>
          </div>
        </div>
        <div class="flex items-center gap-2 text-sm text-text-muted">
          <span class="inline-flex items-center gap-1">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            运行中
          </span>
        </div>
      </div>
    </header>
    
    <main class="main-content flex-1 p-6">
      <div class="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-6">
        <div class="flex-1 min-h-[400px] lg:min-h-0">
          <FluidSimulation
            ref="fluidSimulationRef"
            :params="fluidParams"
          />
        </div>
        
        <div class="w-full lg:w-80 flex-shrink-0">
          <ControlPanel
            v-model="fluidParams"
            @reset="handleReset"
            @addWave="handleAddWave"
          />
          
          <div class="mt-6 bg-surface-light/90 backdrop-blur-md rounded-xl p-6 border border-cyan-500/20 shadow-lg">
            <h3 class="text-lg font-semibold text-text-primary mb-4">使用说明</h3>
            <ul class="space-y-3 text-sm text-text-secondary">
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-0.5">•</span>
                <span>点击画布任意位置创建波纹</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-0.5">•</span>
                <span>按住鼠标拖拽可以连续创建波纹</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-0.5">•</span>
                <span>调整滑块或输入框来修改流体参数</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-0.5">•</span>
                <span>点击"重置参数"恢复默认设置</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-0.5">•</span>
                <span>点击"添加波纹"随机生成新的波纹</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    
    <footer class="footer bg-surface-light/30 border-t border-cyan-500/10 px-6 py-3">
      <div class="max-w-7xl mx-auto flex items-center justify-between text-xs text-text-muted">
        <span>Vue 3 + TypeScript + Vite + Tailwind CSS</span>
        <span>实时流体模拟演示 v1.0.0</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%);
}

.header {
  backdrop-filter: blur(12px);
}

.main-content {
  min-height: calc(100vh - 80px - 40px);
}
</style>
