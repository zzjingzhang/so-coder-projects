<script setup lang="ts">
import { computed, ref } from 'vue'
import type { YearData } from '../types'
import { formatPopulation } from '../data/populationData'

const props = defineProps<{
  data: YearData[]
  currentYear: number
}>()

const sortField = ref<string>('rank')
const sortOrder = ref<-1 | 1>(1)

const currentYearData = computed(() => {
  return props.data.find(d => d.year === props.currentYear) || props.data[0]
})

const sortedCountries = computed(() => {
  const countries = [...currentYearData.value.countries]
  
  countries.sort((a, b) => {
    let comparison = 0
    
    switch (sortField.value) {
      case 'rank':
        comparison = a.rank - b.rank
        break
      case 'name':
        comparison = a.name.localeCompare(b.name, 'zh')
        break
      case 'population':
        comparison = a.population - b.population
        break
      default:
        comparison = 0
    }
    
    return comparison * sortOrder.value
  })
  
  return countries
})

const handleSort = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = (sortOrder.value * -1) as -1 | 1
  } else {
    sortField.value = field
    sortOrder.value = 1
  }
}

const getSortIcon = (field: string): string => {
  if (sortField.value !== field) return 'pi pi-sort'
  return sortOrder.value === 1 ? 'pi pi-sort-up' : 'pi pi-sort-down'
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
  <div class="bg-surface rounded-xl shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-text">数据表格</h2>
      <Badge
        :value="`${currentYear}年`"
        class="bg-primary text-white"
      />
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b-2 border-border">
            <th 
              class="text-left py-3 px-4 cursor-pointer hover:bg-background transition-colors"
              @click="handleSort('rank')"
            >
              <div class="flex items-center gap-2">
                <span class="font-semibold">排名</span>
                <i :class="getSortIcon('rank')" class="text-text-secondary"></i>
              </div>
            </th>
            <th 
              class="text-left py-3 px-4 cursor-pointer hover:bg-background transition-colors"
              @click="handleSort('name')"
            >
              <div class="flex items-center gap-2">
                <span class="font-semibold">国家</span>
                <i :class="getSortIcon('name')" class="text-text-secondary"></i>
              </div>
            </th>
            <th 
              class="text-left py-3 px-4 cursor-pointer hover:bg-background transition-colors"
              @click="handleSort('population')"
            >
              <div class="flex items-center gap-2">
                <span class="font-semibold">人口</span>
                <i :class="getSortIcon('population')" class="text-text-secondary"></i>
              </div>
            </th>
            <th class="text-left py-3 px-4">
              <span class="font-semibold">颜色标识</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="country in sortedCountries" 
            :key="country.id"
            class="border-b border-border hover:bg-background/50 transition-colors"
          >
            <td class="py-3 px-4">
              <span
                :class="[
                  'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                  getRankBadgeClass(country.rank)
                ]"
              >
                {{ country.rank }}
              </span>
            </td>
            <td class="py-3 px-4 font-medium text-text">
              {{ country.name }}
            </td>
            <td class="py-3 px-4 font-semibold text-primary">
              {{ formatPopulation(country.population) }}
            </td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-2">
                <div 
                  class="w-6 h-6 rounded-full shadow-inner" 
                  :style="{ backgroundColor: country.color }"
                ></div>
                <span class="text-sm text-text-secondary">{{ country.color }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="mt-4 pt-4 border-t border-border text-center text-sm text-text-secondary">
      共 {{ sortedCountries.length }} 个国家数据
    </div>
  </div>
</template>
