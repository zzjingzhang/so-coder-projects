<template>
  <div class="control-panel bg-surface-light/90 backdrop-blur-md rounded-xl p-6 border border-cyan-500/20 shadow-lg">
    <h3 class="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
      <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
      流体参数控制
    </h3>
    
    <div class="space-y-6">
      <div class="control-group">
        <div class="flex justify-between items-center mb-3">
          <label class="text-sm font-medium text-text-primary">
            粘度 (Viscosity)
          </label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              :value="localViscosity"
              @input="handleViscosityInput"
              class="w-20 text-center text-sm"
              min="0"
              max="100"
              step="0.1"
            />
            <span class="text-xs text-text-muted">%</span>
          </div>
        </div>
        <input
          type="range"
          :value="localViscosity"
          @input="handleViscositySlider"
          min="0"
          max="100"
          step="0.1"
          class="w-full"
        />
        <p class="text-xs text-text-muted mt-1">
          控制流体的粘稠程度，值越高波动衰减越快
        </p>
      </div>
      
      <div class="control-group">
        <div class="flex justify-between items-center mb-3">
          <label class="text-sm font-medium text-text-primary">
            重力 (Gravity)
          </label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              :value="localGravity"
              @input="handleGravityInput"
              class="w-20 text-center text-sm"
              min="0"
              max="100"
              step="0.1"
            />
            <span class="text-xs text-text-muted">%</span>
          </div>
        </div>
        <input
          type="range"
          :value="localGravity"
          @input="handleGravitySlider"
          min="0"
          max="100"
          step="0.1"
          class="w-full"
        />
        <p class="text-xs text-text-muted mt-1">
          控制重力对流体的影响，值越高流体越容易恢复平静
        </p>
      </div>
      
      <div class="control-group">
        <div class="flex justify-between items-center mb-3">
          <label class="text-sm font-medium text-text-primary">
            波幅 (Amplitude)
          </label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              :value="localAmplitude"
              @input="handleAmplitudeInput"
              class="w-20 text-center text-sm"
              min="0"
              max="200"
              step="0.1"
            />
            <span class="text-xs text-text-muted">%</span>
          </div>
        </div>
        <input
          type="range"
          :value="localAmplitude"
          @input="handleAmplitudeSlider"
          min="0"
          max="200"
          step="0.1"
          class="w-full"
        />
        <p class="text-xs text-text-muted mt-1">
          控制波纹的振幅大小，值越高波纹越明显
        </p>
      </div>
      
      <div class="pt-4 border-t border-cyan-500/10">
        <div class="flex gap-3">
          <button
            @click="handleReset"
            class="flex-1 py-2 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all duration-200 font-medium text-sm"
          >
            重置参数
          </button>
          <button
            @click="handleAddWave"
            class="flex-1 py-2 px-4 bg-secondary hover:bg-accent text-white rounded-lg transition-all duration-200 font-medium text-sm"
          >
            添加波纹
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FluidParams } from '../composables/useFluidSimulation'

interface Props {
  modelValue: FluidParams
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    viscosity: 10,
    gravity: 5,
    amplitude: 100
  })
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: FluidParams): void
  (e: 'reset'): void
  (e: 'addWave'): void
}>()

const localViscosity = ref(props.modelValue.viscosity)
const localGravity = ref(props.modelValue.gravity)
const localAmplitude = ref(props.modelValue.amplitude)

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

const updateParams = () => {
  emit('update:modelValue', {
    viscosity: localViscosity.value,
    gravity: localGravity.value,
    amplitude: localAmplitude.value
  })
}

const handleViscosityInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  localViscosity.value = clamp(parseFloat(target.value) || 0, 0, 100)
  updateParams()
}

const handleViscositySlider = (event: Event) => {
  const target = event.target as HTMLInputElement
  localViscosity.value = parseFloat(target.value)
  updateParams()
}

const handleGravityInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  localGravity.value = clamp(parseFloat(target.value) || 0, 0, 100)
  updateParams()
}

const handleGravitySlider = (event: Event) => {
  const target = event.target as HTMLInputElement
  localGravity.value = parseFloat(target.value)
  updateParams()
}

const handleAmplitudeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  localAmplitude.value = clamp(parseFloat(target.value) || 0, 0, 200)
  updateParams()
}

const handleAmplitudeSlider = (event: Event) => {
  const target = event.target as HTMLInputElement
  localAmplitude.value = parseFloat(target.value)
  updateParams()
}

const handleReset = () => {
  localViscosity.value = 10
  localGravity.value = 5
  localAmplitude.value = 100
  updateParams()
  emit('reset')
}

const handleAddWave = () => {
  emit('addWave')
}

watch(() => props.modelValue, (newValue) => {
  localViscosity.value = newValue.viscosity
  localGravity.value = newValue.gravity
  localAmplitude.value = newValue.amplitude
}, { deep: true })
</script>

<style scoped>
.control-group {
  transition: all 0.3s ease;
}

.control-group:hover {
  transform: translateX(2px);
}
</style>
