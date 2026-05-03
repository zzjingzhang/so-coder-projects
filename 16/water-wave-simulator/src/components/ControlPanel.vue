<template>
  <v-card 
    class="absolute top-4 right-4 w-80 bg-slate-900/90 backdrop-blur-md border border-slate-600/50 shadow-2xl rounded-xl"
    elevation="0"
    theme="dark"
  >
    <v-card-title class="text-white font-bold text-xl py-4 px-6 border-b border-slate-600/50">
      <div class="flex items-center gap-3">
        <v-icon icon="mdi-wave" class="text-cyan-400 text-2xl"></v-icon>
        <span class="text-white">波浪参数控制</span>
      </div>
    </v-card-title>

    <v-card-text class="px-6 py-5">
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <v-icon icon="mdi-sine-wave" class="text-cyan-400"></v-icon>
            <span class="text-white font-medium">波幅 (Amplitude)</span>
          </div>
          <span class="text-cyan-400 font-mono text-sm font-bold">
            {{ localAmplitude.toFixed(1) }}
          </span>
        </div>
        <v-slider
          v-model="localAmplitude"
          :min="0"
          :max="2"
          :step="0.1"
          color="cyan"
          track-color="cyan-lighten-4"
          thumb-color="cyan"
          thumb-label="always"
          hide-details
          show-ticks
          tick-size="2"
        />
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <v-icon icon="mdi-speedometer" class="text-teal-400"></v-icon>
            <span class="text-white font-medium">波速 (Speed)</span>
          </div>
          <span class="text-teal-400 font-mono text-sm font-bold">
            {{ localSpeed.toFixed(1) }}
          </span>
        </div>
        <v-slider
          v-model="localSpeed"
          :min="0.1"
          :max="3"
          :step="0.1"
          color="teal"
          track-color="teal-lighten-4"
          thumb-color="teal"
          thumb-label="always"
          hide-details
          show-ticks
          tick-size="2"
        />
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <v-icon icon="mdi-opacity" class="text-blue-400"></v-icon>
            <span class="text-white font-medium">透明度 (Transparency)</span>
          </div>
          <span class="text-blue-400 font-mono text-sm font-bold">
            {{ (localTransparency * 100).toFixed(0) }}%
          </span>
        </div>
        <v-slider
          v-model="localTransparency"
          :min="0.1"
          :max="1"
          :step="0.05"
          color="blue"
          track-color="blue-lighten-4"
          thumb-color="blue"
          thumb-label="always"
          hide-details
          show-ticks
          tick-size="2"
        />
      </div>
    </v-card-text>

    <v-divider class="border-slate-600/50"></v-divider>

    <v-card-actions class="px-6 py-4 justify-center gap-4">
      <v-btn
        color="cyan"
        variant="outlined"
        size="large"
        class="font-medium px-6 text-white border-cyan-500"
        @click="resetDefaults"
      >
        <v-icon icon="mdi-refresh" class="mr-2"></v-icon>
        重置默认
      </v-btn>

      <v-btn
        color="cyan"
        variant="flat"
        size="large"
        class="font-medium px-6 bg-cyan-900/40 hover:bg-cyan-900/60 text-white"
        @click="toggleInfo"
      >
        <v-icon :icon="showInfo ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="mr-2"></v-icon>
        {{ showInfo ? '收起说明' : '查看说明' }}
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showInfo">
        <v-divider class="border-slate-600/50"></v-divider>
        <v-card-text class="px-6 py-4 bg-slate-800/60">
          <h4 class="text-cyan-400 font-semibold mb-3 flex items-center gap-2 text-lg">
            <v-icon icon="mdi-information-outline"></v-icon>
            Gerstner 波浪模型
          </h4>
          <p class="text-gray-200 text-sm leading-relaxed mb-4">
            Gerstner 波浪模型通过多个正弦波的叠加来模拟真实的水面效果，广泛应用于计算机图形学和游戏开发中。
          </p>
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
              <v-icon icon="mdi-checkbox-blank-circle" class="text-cyan-400 text-base mt-0.5"></v-icon>
              <span class="text-gray-200"><strong class="text-cyan-400">波幅</strong>：控制波浪的高度，值越大波浪越高</span>
            </div>
            <div class="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
              <v-icon icon="mdi-checkbox-blank-circle" class="text-teal-400 text-base mt-0.5"></v-icon>
              <span class="text-gray-200"><strong class="text-teal-400">波速</strong>：控制波浪移动的速度</span>
            </div>
            <div class="flex items-start gap-3 bg-slate-700/30 p-3 rounded-lg">
              <v-icon icon="mdi-checkbox-blank-circle" class="text-blue-400 text-base mt-0.5"></v-icon>
              <span class="text-gray-200"><strong class="text-blue-400">透明度</strong>：控制水体的透明程度</span>
            </div>
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  amplitude: {
    type: Number,
    default: 0.5
  },
  speed: {
    type: Number,
    default: 1.0
  },
  transparency: {
    type: Number,
    default: 0.7
  }
})

const emit = defineEmits(['update:amplitude', 'update:speed', 'update:transparency'])

const localAmplitude = ref(props.amplitude)
const localSpeed = ref(props.speed)
const localTransparency = ref(props.transparency)
const showInfo = ref(false)

watch(localAmplitude, (newVal) => {
  emit('update:amplitude', newVal)
})

watch(localSpeed, (newVal) => {
  emit('update:speed', newVal)
})

watch(localTransparency, (newVal) => {
  emit('update:transparency', newVal)
})

watch([() => props.amplitude, () => props.speed, () => props.transparency], () => {
  localAmplitude.value = props.amplitude
  localSpeed.value = props.speed
  localTransparency.value = props.transparency
})

const resetDefaults = () => {
  localAmplitude.value = 0.5
  localSpeed.value = 1.0
  localTransparency.value = 0.7
}

const toggleInfo = () => {
  showInfo.value = !showInfo.value
}
</script>

<style scoped>
.v-card {
  font-family: 'Inter', system-ui, sans-serif;
}

.v-slider {
  --v-slider-track-height: 8px;
  --v-slider-thumb-size: 22px;
}

.v-slider .v-slider-track {
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.v-slider .v-slider-thumb {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.3px;
  border-radius: 8px;
}

.v-btn--outlined {
  border-width: 2px;
}
</style>
