<script setup lang="ts">
import { ref } from 'vue'
import WaterSimulation from './components/WaterSimulation.vue'
import ControlPanel from './components/ControlPanel.vue'
import type { WaterSimulationParams } from './types'

const params = ref<WaterSimulationParams>({
  amplitude: 1.0,
  speed: 1.0,
  lightIntensity: 1.5
})
</script>

<template>
  <div class="app-container">
    <WaterSimulation :params="params" />
    <ControlPanel 
      :params="params" 
      @update:params="(newParams) => params = newParams"
    />
    <div class="title-overlay">
      <h1>实时水面流体模拟</h1>
      <p>Real-time Water Fluid Simulation</p>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.title-overlay {
  position: fixed;
  top: 20px;
  left: 20px;
  color: white;
  z-index: 1000;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

.title-overlay h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 2px;
}

.title-overlay p {
  font-size: 1rem;
  opacity: 0.8;
  letter-spacing: 1px;
}
</style>
