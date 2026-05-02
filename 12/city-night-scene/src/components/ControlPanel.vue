<script setup lang="ts">
import { NCard, NSpace, NSwitch, NText } from 'naive-ui'

interface Props {
  lightIntensity?: number
  neonColor?: string
  trafficDensity?: number
}

interface Emits {
  (e: 'update:lightIntensity', value: number): void
  (e: 'update:neonColor', value: string): void
  (e: 'update:trafficDensity', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  lightIntensity: 0.8,
  neonColor: '#ff00ff',
  trafficDensity: 0.5
})

const emit = defineEmits<Emits>()

const presetColors = [
  { label: '紫', value: '#ff00ff' },
  { label: '蓝', value: '#00ffff' },
  { label: '红', value: '#ff3366' },
  { label: '黄', value: '#ffff00' },
  { label: '绿', value: '#00ff66' },
  { label: '橙', value: '#ff6600' }
]

const updateLightIntensity = (value: number | null) => {
  if (value !== null) {
    emit('update:lightIntensity', value)
  }
}

const updateTrafficDensity = (value: number | null) => {
  if (value !== null) {
    emit('update:trafficDensity', value)
  }
}

const selectColor = (color: string) => {
  emit('update:neonColor', color)
}
</script>

<template>
  <NCard 
    class="w-80 bg-gray-900 bg-opacity-90 backdrop-blur-sm border-gray-700"
    :bordered="false"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <span class="text-2xl">🌙</span>
        <NText class="text-white text-lg font-bold">场景控制面板</NText>
      </div>
    </template>

    <NSpace vertical :size="24">
      <div>
        <div class="flex justify-between items-center mb-3">
          <NText class="text-gray-300 text-sm font-medium flex items-center gap-2">
            <span>💡</span> 光照强度
          </NText>
          <NText class="text-cyan-400 text-sm font-bold">
            {{ Math.round(lightIntensity * 100) }}%
          </NText>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="lightIntensity"
          @input="updateLightIntensity(parseFloat((<HTMLInputElement>$event.target).value))"
          class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div class="flex justify-between mt-1">
          <NText class="text-gray-500 text-xs">暗</NText>
          <NText class="text-gray-500 text-xs">亮</NText>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-3">
          <NText class="text-gray-300 text-sm font-medium flex items-center gap-2">
            <span>✨</span> 霓虹颜色
          </NText>
          <div 
            class="w-6 h-6 rounded-full border-2 border-gray-600"
            :style="{ backgroundColor: neonColor, boxShadow: `0 0 10px ${neonColor}` }"
          ></div>
        </div>
        <div class="grid grid-cols-6 gap-2">
          <button
            v-for="color in presetColors"
            :key="color.value"
            class="w-full aspect-square rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
            :class="neonColor === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''"
            :style="{ backgroundColor: color.value, boxShadow: `0 0 8px ${color.value}` }"
            @click="selectColor(color.value)"
          >
            <span 
              class="text-xs font-bold"
              :style="{ color: color.value === '#ffff00' ? '#333' : '#fff' }"
            >
              {{ color.label }}
            </span>
          </button>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-3">
          <NText class="text-gray-300 text-sm font-medium flex items-center gap-2">
            <span>🚗</span> 车流密度
          </NText>
          <NText class="text-cyan-400 text-sm font-bold">
            {{ Math.round(trafficDensity * 100) }}%
          </NText>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="trafficDensity"
          @input="updateTrafficDensity(parseFloat((<HTMLInputElement>$event.target).value))"
          class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div class="flex justify-between mt-1">
          <NText class="text-gray-500 text-xs">稀疏</NText>
          <NText class="text-gray-500 text-xs">拥挤</NText>
        </div>
      </div>

      <div class="pt-4 border-t border-gray-700">
        <div class="flex items-center gap-2 text-gray-400 text-xs">
          <span>ℹ️</span>
          <span>拖动滑块实时调整夜间场景效果</span>
        </div>
      </div>
    </NSpace>
  </NCard>
</template>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
  transition: transform 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}
</style>
