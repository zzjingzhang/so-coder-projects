<template>
  <v-card 
    class="absolute top-4 right-4 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-600/50 shadow-2xl rounded-xl"
    elevation="0"
  >
    <v-card-title class="text-white font-bold text-xl py-4 px-6 border-b border-slate-700/50">
      <div class="flex items-center gap-3">
        <v-icon icon="mdi-star" class="text-purple-400 text-2xl"></v-icon>
        <span>星系参数控制</span>
      </div>
    </v-card-title>

    <v-card-text class="px-6 py-5">
      <v-slider
        v-model="localScale"
        :min="20"
        :max="100"
        :step="5"
        color="purple"
        track-color="purple-lighten-4"
        thumb-color="purple"
        thumb-label="always"
        class="mb-6"
        hide-details
      >
        <template #label>
          <span class="text-white font-medium">星系规模 (Scale)</span>
        </template>
        <template #prepend>
          <v-icon icon="mdi-vector-radius" class="text-purple-400"></v-icon>
        </template>
        <template #append>
          <span class="text-purple-400 font-mono text-sm w-12 text-right">
            {{ localScale }}
          </span>
        </template>
      </v-slider>

      <v-slider
        v-model="localDensity"
        :min="2000"
        :max="50000"
        :step="1000"
        color="pink"
        track-color="pink-lighten-4"
        thumb-color="pink"
        thumb-label="always"
        class="mb-6"
        hide-details
      >
        <template #label>
          <span class="text-white font-medium">星体密度 (Density)</span>
        </template>
        <template #prepend>
          <v-icon icon="mdi-dots-hexagon" class="text-pink-400"></v-icon>
        </template>
        <template #append>
          <span class="text-pink-400 font-mono text-sm w-16 text-right">
            {{ localDensity.toLocaleString() }}
          </span>
        </template>
      </v-slider>

      <v-slider
        v-model="localRotationSpeed"
        :min="0"
        :max="2"
        :step="0.1"
        color="cyan"
        track-color="cyan-lighten-4"
        thumb-color="cyan"
        thumb-label="always"
        class="mb-6"
        hide-details
      >
        <template #label>
          <span class="text-white font-medium">旋转速度 (Rotation)</span>
        </template>
        <template #prepend>
          <v-icon icon="mdi-sync" class="text-cyan-400"></v-icon>
        </template>
        <template #append>
          <span class="text-cyan-400 font-mono text-sm w-12 text-right">
            {{ localRotationSpeed.toFixed(1) }}x
          </span>
        </template>
      </v-slider>

      <div class="mb-2">
        <label class="text-white text-sm font-medium mb-2 block flex items-center gap-2">
          <v-icon icon="mdi-palette" class="text-amber-400"></v-icon>
          颜色方案 (Color Scheme)
        </label>
        <v-select
          v-model="localColorScheme"
          :items="colorOptions"
          color="amber"
          variant="outlined"
          density="comfortable"
          class="mt-2"
          hide-details
        >
        </v-select>
      </div>
    </v-card-text>

    <v-divider class="border-slate-700/50"></v-divider>

    <v-card-actions class="px-6 py-4 justify-center gap-4">
      <v-btn
        color="purple"
        variant="outlined"
        size="large"
        class="font-medium px-6 min-h-[48px] flex items-center justify-center"
        @click="randomize"
      >
        <v-icon icon="mdi-dice-multiple" class="mr-2"></v-icon>
        随机生成
      </v-btn>

      <v-btn
        color="purple"
        variant="flat"
        size="large"
        class="font-medium px-6 bg-purple-900/30 hover:bg-purple-900/50 min-h-[48px] flex items-center justify-center"
        @click="resetDefaults"
      >
        <v-icon icon="mdi-refresh" class="mr-2"></v-icon>
        重置默认
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showInfo">
        <v-divider class="border-slate-700/50"></v-divider>
        <v-card-text class="px-6 py-4 bg-slate-800/50">
          <h4 class="text-purple-400 font-semibold mb-3 flex items-center gap-2">
            <v-icon icon="mdi-information-outline"></v-icon>
            关于星系生成器
          </h4>
          <p class="text-slate-300 text-sm leading-relaxed mb-3">
            本星系生成器使用程序化方法生成真实的螺旋星系结构，包含多条旋臂、核心区域和星际尘埃。
          </p>
          <div class="space-y-2 text-sm">
            <div class="flex items-start gap-2">
              <v-icon icon="mdi-checkbox-blank-circle" class="text-purple-400 text-xs mt-1"></v-icon>
              <span class="text-slate-300"><strong class="text-purple-400">规模</strong>：控制星系的整体大小</span>
            </div>
            <div class="flex items-start gap-2">
              <v-icon icon="mdi-checkbox-blank-circle" class="text-pink-400 text-xs mt-1"></v-icon>
              <span class="text-slate-300"><strong class="text-pink-400">密度</strong>：控制星体的数量</span>
            </div>
            <div class="flex items-start gap-2">
              <v-icon icon="mdi-checkbox-blank-circle" class="text-cyan-400 text-xs mt-1"></v-icon>
              <span class="text-slate-300"><strong class="text-cyan-400">旋转</strong>：控制星系的自转速度</span>
            </div>
            <div class="flex items-start gap-2">
              <v-icon icon="mdi-checkbox-blank-circle" class="text-amber-400 text-xs mt-1"></v-icon>
              <span class="text-slate-300"><strong class="text-amber-400">颜色</strong>：选择不同的星体配色方案</span>
            </div>
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-divider class="border-slate-700/50"></v-divider>
    
    <v-card-actions class="px-6 py-3 justify-center">
      <v-btn
        color="slate"
        variant="text"
        size="small"
        class="text-slate-400 hover:text-white min-h-[36px] flex items-center justify-center"
        @click="toggleInfo"
      >
        <v-icon :icon="showInfo ? 'mdi-chevron-up' : 'mdi-chevron-down'" class="mr-1"></v-icon>
        {{ showInfo ? '收起说明' : '查看说明' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  scale: {
    type: Number,
    default: 50
  },
  density: {
    type: Number,
    default: 10000
  },
  colorScheme: {
    type: String,
    default: 'cosmic'
  },
  rotationSpeed: {
    type: Number,
    default: 0.5
  }
})

const emit = defineEmits(['update:scale', 'update:density', 'update:colorScheme', 'update:rotationSpeed'])

const localScale = ref(props.scale)
const localDensity = ref(props.density)
const localColorScheme = ref(props.colorScheme)
const localRotationSpeed = ref(props.rotationSpeed)
const showInfo = ref(false)

const colorOptions = computed(() => [
  { title: '宇宙紫', value: 'cosmic' },
  { title: '烈焰红', value: 'fire' },
  { title: '冰蓝', value: 'ice' },
  { title: '翠绿', value: 'emerald' },
  { title: '日落橙', value: 'sunset' }
])

watch(localScale, (newVal) => {
  emit('update:scale', newVal)
})

watch(localDensity, (newVal) => {
  emit('update:density', newVal)
})

watch(localColorScheme, (newVal) => {
  emit('update:colorScheme', newVal)
})

watch(localRotationSpeed, (newVal) => {
  emit('update:rotationSpeed', newVal)
})

watch([() => props.scale, () => props.density, () => props.colorScheme, () => props.rotationSpeed], () => {
  localScale.value = props.scale
  localDensity.value = props.density
  localColorScheme.value = props.colorScheme
  localRotationSpeed.value = props.rotationSpeed
})

const resetDefaults = () => {
  localScale.value = 50
  localDensity.value = 10000
  localColorScheme.value = 'cosmic'
  localRotationSpeed.value = 0.5
}

const randomize = () => {
  localScale.value = Math.floor(Math.random() * 80) + 20
  localDensity.value = Math.floor(Math.random() * 48000) + 2000
  const schemes = ['cosmic', 'fire', 'ice', 'emerald', 'sunset']
  localColorScheme.value = schemes[Math.floor(Math.random() * schemes.length)]
  localRotationSpeed.value = Math.random() * 2
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
  --v-slider-track-height: 6px;
  --v-slider-thumb-size: 20px;
}

.v-slider .v-slider-track {
  border-radius: 3px;
}

.v-slider .v-slider-thumb {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.3px;
}

.v-select .v-field {
  background-color: rgba(30, 41, 59, 0.8);
  --v-field-input-color: white;
  --v-field-placeholder-color: rgba(255, 255, 255, 0.6);
}

:deep(.v-list-item-title) {
  color: white !important;
}

:deep(.v-select) {
  --v-field-label-color: white;
}

:deep(.v-menu) {
  --v-list-bg: rgb(30, 41, 59);
  --v-list-item-color: white;
}
</style>
