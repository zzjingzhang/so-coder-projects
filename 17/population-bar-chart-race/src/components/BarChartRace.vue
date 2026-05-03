<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { YearData, AnimationConfig } from '../types'
import { formatPopulation } from '../data/populationData'

const props = defineProps<{
  data: YearData[]
  config: AnimationConfig
}>()

const maxPopulation = ref(0)

const currentYearData = computed(() => {
  return props.data.find(d => d.year === props.config.currentYear) || props.data[0]
})

const displayCountries = computed(() => {
  return currentYearData.value.countries.slice(0, props.config.displayCount)
})

watch(
  () => props.config.currentYear,
  () => {
    const currentMax = Math.max(...currentYearData.value.countries.map(c => c.population))
    maxPopulation.value = currentMax * 1.1
  },
  { immediate: true }
)

const getBarWidth = (population: number): string => {
  const percentage = (population / maxPopulation.value) * 100
  return `${Math.max(percentage, 2)}%`
}

const getRankBadgeClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return 'bg-yellow-500 text-white'
    case 2:
      return 'bg-gray-400 text-white'
    case 3:
      return 'bg-amber-600 text-white'
    default:
      return 'bg-gray-200 text-gray-700'
  }
}
</script>

<template>
  <div class="bg-surface rounded-xl shadow-lg p-6 h-full">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-text">人口增长竞赛</h2>
      <div class="text-5xl font-bold text-primary">
        {{ config.currentYear }}
      </div>
    </div>
    
    <div class="space-y-3">
      <div
        v-for="country in displayCountries"
        :key="country.id"
        class="flex items-center gap-3 bar-transition"
      >
        <div class="w-12 flex justify-center">
          <span
            :class="[
              'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
              getRankBadgeClass(country.rank)
            ]"
          >
            {{ country.rank }}
          </span>
        </div>
        
        <div class="w-28 flex-shrink-0">
          <span class="font-semibold text-text text-sm">
            {{ country.name }}
          </span>
        </div>
        
        <div class="flex-1 relative">
          <div
            class="h-12 rounded-lg flex items-center justify-end px-4 bar-transition"
            :style="{
              width: getBarWidth(country.population),
              backgroundColor: country.color,
              minWidth: '80px'
            }"
          >
            <span class="text-white font-bold text-sm">
              {{ formatPopulation(country.population) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
