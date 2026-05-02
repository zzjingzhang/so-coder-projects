<template>
  <div class="enemy-car-wrapper relative" :class="carClass">
    <div v-if="type === 'sedan'" class="sedan-car">
      <div class="sedan-body flex flex-col items-center">
        <div class="sedan-front w-14 h-5 rounded-t-lg relative" :style="{ backgroundColor: color }">
          <div class="sedan-headlight-left absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full opacity-80" />
          <div class="sedan-headlight-right absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-80" />
        </div>
        
        <div class="sedan-roof w-12 h-8 relative" :style="{ backgroundColor: color }">
          <div class="sedan-windshield absolute inset-x-1 top-1 h-3 bg-blue-400 rounded-t-sm opacity-70" />
        </div>
        
        <div class="sedan-rear w-14 h-6 rounded-b-lg relative" :style="{ backgroundColor: color }">
          <div class="sedan-taillight-left absolute top-1 left-1 w-2 h-2 bg-red-600 rounded-sm" />
          <div class="sedan-taillight-right absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-sm" />
        </div>
      </div>
      
      <EnemyWheels />
    </div>

    <div v-else-if="type === 'truck'" class="truck-car">
      <div class="truck-body flex flex-col items-center">
        <div class="truck-cab w-14 h-10 rounded-t-lg relative" :style="{ backgroundColor: color }">
          <div class="truck-windshield absolute inset-x-1 top-1 h-4 bg-blue-400 rounded-t-sm opacity-70" />
          <div class="truck-grille absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-800 rounded-sm" />
        </div>
        
        <div class="truck-cargo w-16 h-14 relative" :style="{ backgroundColor: darkenColor(color, 20) }">
          <div class="truck-stripe absolute inset-x-2 top-2 h-1 bg-white opacity-30" />
          <div class="truck-stripe absolute inset-x-2 top-4 h-1 bg-white opacity-30" />
        </div>
      </div>
      
      <EnemyWheels :is-truck="true" />
    </div>

    <div v-else class="sports-car">
      <div class="sports-body flex flex-col items-center">
        <div class="sports-front w-14 h-4 rounded-t-full relative" :style="{ backgroundColor: color }">
          <div class="sports-headlight-left absolute top-0.5 left-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          <div class="sports-headlight-right absolute top-0.5 right-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
        </div>
        
        <div class="sports-roof w-10 h-6 relative rounded-t-lg" :style="{ backgroundColor: color }">
          <div class="sports-windshield absolute inset-x-0.5 top-0.5 h-2.5 bg-blue-400 rounded-t-sm opacity-70" />
        </div>
        
        <div class="sports-rear w-14 h-5 rounded-b-lg relative" :style="{ backgroundColor: color }">
          <div class="sports-taillight-left absolute top-0.5 left-1 w-1.5 h-1.5 bg-red-600 rounded-full" />
          <div class="sports-taillight-right absolute top-0.5 right-1 w-1.5 h-1.5 bg-red-600 rounded-full" />
          <div class="sports-spoiler absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-800 rounded-sm" />
        </div>
      </div>
      
      <EnemyWheels />
    </div>

    <div class="enemy-shadow absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black opacity-30 rounded-full blur-sm" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EnemyWheels from './EnemyWheels.vue'

const props = defineProps<{
  color?: string
  type?: 'sedan' | 'truck' | 'sports'
}>()

const carClass = computed(() => {
  switch (props.type) {
    case 'truck':
      return 'w-16 h-32'
    case 'sports':
      return 'w-14 h-20'
    default:
      return 'w-16 h-24'
  }
})

const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.max((num >> 16) - amt, 0)
  const G = Math.max(((num >> 8) & 0x00FF) - amt, 0)
  const B = Math.max((num & 0x0000FF) - amt, 0)
  return `#${(0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1)}`
}
</script>

<style scoped>
.sedan-body,
.truck-body,
.sports-body {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}
</style>
