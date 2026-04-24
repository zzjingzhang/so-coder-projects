<script setup lang="ts">
import type { WaterSimulationParams } from '../types'

const props = defineProps<{
  params: WaterSimulationParams
}>()

const emit = defineEmits<{
  (e: 'update:params', params: WaterSimulationParams): void
}>()

const handleAmplitudeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:params', {
    ...props.params,
    amplitude: parseFloat(target.value)
  })
}

const handleSpeedInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:params', {
    ...props.params,
    speed: parseFloat(target.value)
  })
}

const handleLightIntensityInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:params', {
    ...props.params,
    lightIntensity: parseFloat(target.value)
  })
}
</script>

<template>
  <div class="control-panel">
    <h3 class="panel-title">水面参数控制</h3>
    
    <div class="control-group">
      <label class="control-label">
        波幅: {{ params.amplitude.toFixed(1) }}
      </label>
      <input 
        type="range" 
        min="0.1" 
        max="3.0" 
        step="0.1" 
        :value="params.amplitude"
        @input="handleAmplitudeInput"
        class="control-slider"
      />
    </div>
    
    <div class="control-group">
      <label class="control-label">
        速度: {{ params.speed.toFixed(1) }}
      </label>
      <input 
        type="range" 
        min="0.1" 
        max="5.0" 
        step="0.1" 
        :value="params.speed"
        @input="handleSpeedInput"
        class="control-slider"
      />
    </div>
    
    <div class="control-group">
      <label class="control-label">
        光照强度: {{ params.lightIntensity.toFixed(1) }}
      </label>
      <input 
        type="range" 
        min="0.1" 
        max="3.0" 
        step="0.1" 
        :value="params.lightIntensity"
        @input="handleLightIntensityInput"
        class="control-slider"
      />
    </div>
    
    <div class="info-panel">
      <p>💡 提示: 拖动滑块实时调整水面效果</p>
      <p>🌊 波幅: 控制波浪的高度</p>
      <p>⚡ 速度: 控制波浪的运动速度</p>
      <p>☀️ 光照: 控制整体光照强度</p>
    </div>
  </div>
</template>

<style scoped>
.control-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  width: 320px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
}

.panel-title {
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 12px;
}

.control-group {
  margin-bottom: 20px;
}

.control-label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.control-slider {
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, #1e88e5, #64b5f6);
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

.control-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.control-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.control-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.info-panel {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.info-panel p {
  margin: 4px 0;
}
</style>
