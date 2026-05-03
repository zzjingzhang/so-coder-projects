<script setup lang="ts">
import { computed } from 'vue'
import type { AnimationConfig } from '../types'

const props = defineProps<{
  config: AnimationConfig
}>()

const emit = defineEmits<{
  play: []
  pause: []
  reset: []
  speedChange: [speed: number]
  yearChange: [year: number]
  displayCountChange: [count: number]
}>()

const progress = computed(() => {
  const total = props.config.endYear - props.config.startYear
  const current = props.config.currentYear - props.config.startYear
  return (current / total) * 100
})

const speedOptions = [
  { label: '0.5x', value: 0.5 },
  { label: '1x', value: 1 },
  { label: '2x', value: 2 },
  { label: '3x', value: 3 },
  { label: '5x', value: 5 }
]

const displayCountOptions = [
  { label: '显示 5 个', value: 5 },
  { label: '显示 10 个', value: 10 },
  { label: '显示 15 个', value: 15 }
]
</script>

<template>
  <div class="bg-surface rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold text-text mb-6">控制面板</h2>
    
    <div class="mb-6">
      <div class="flex justify-between text-sm text-text-secondary mb-2">
        <span>起始: {{ config.startYear }}</span>
        <span class="font-bold text-primary text-lg">{{ config.currentYear }}</span>
        <span>结束: {{ config.endYear }}</span>
      </div>
      <ProgressBar 
        :value="progress" 
        class="h-2"
        :style="{ background: 'var(--color-border)' }"
      />
    </div>
    
    <div class="mb-6">
      <label class="block text-sm font-medium text-text-secondary mb-3">
        播放控制
      </label>
      <div class="flex gap-3">
        <Button
          :label="config.isPlaying ? '暂停' : '播放'"
          :icon="config.isPlaying ? 'pi pi-pause' : 'pi pi-play'"
          :class="config.isPlaying ? 'p-button-warning' : 'p-button-success'"
          class="flex-1"
          @click="config.isPlaying ? emit('pause') : emit('play')"
        />
        <Button
          label="重置"
          icon="pi pi-refresh"
          class="p-button-secondary flex-1"
          @click="emit('reset')"
        />
      </div>
    </div>
    
    <div class="mb-6">
      <label class="block text-sm font-medium text-text-secondary mb-3">
        播放速度
      </label>
      <div class="flex gap-2 flex-wrap">
        <Button
          v-for="option in speedOptions"
          :key="option.value"
          :label="option.label"
          :class="config.speed === option.value ? 'p-button-primary' : 'p-button-outlined'"
          size="small"
          @click="emit('speedChange', option.value)"
        />
      </div>
    </div>
    
    <div class="mb-6">
      <label class="block text-sm font-medium text-text-secondary mb-3">
        拖动滑块选择年份
      </label>
      <Slider
        v-model:value="config.currentYear"
        :min="config.startYear"
        :max="config.endYear"
        :step="1"
        @change="emit('yearChange', config.currentYear)"
      />
    </div>
    
    <div class="mb-6">
      <label class="block text-sm font-medium text-text-secondary mb-3">
        显示数量
      </label>
      <div class="flex gap-2 flex-wrap">
        <Button
          v-for="option in displayCountOptions"
          :key="option.value"
          :label="option.label"
          :class="config.displayCount === option.value ? 'p-button-primary' : 'p-button-outlined'"
          size="small"
          @click="emit('displayCountChange', option.value)"
        />
      </div>
    </div>
    
    <div class="p-4 bg-background rounded-lg">
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-text-secondary">当前状态:</span>
          <Badge
            :value="config.isPlaying ? '播放中' : '已暂停'"
            :class="config.isPlaying ? 'bg-success' : 'bg-text-secondary'"
            class="ml-2"
          />
        </div>
        <div>
          <span class="text-text-secondary">播放速度:</span>
          <span class="ml-2 font-medium text-text">{{ config.speed }}x</span>
        </div>
        <div>
          <span class="text-text-secondary">当前年份:</span>
          <span class="ml-2 font-medium text-text">{{ config.currentYear }}</span>
        </div>
        <div>
          <span class="text-text-secondary">显示国家:</span>
          <span class="ml-2 font-medium text-text">{{ config.displayCount }} 个</span>
        </div>
      </div>
    </div>
  </div>
</template>
