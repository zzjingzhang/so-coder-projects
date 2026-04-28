<template>
  <span 
    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
    :class="iconConfig.bgColor"
  >
    <span class="text-base">{{ iconConfig.icon }}</span>
    <span :class="iconConfig.color">{{ techName }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTechIcon, type TechName } from '../utils/techIcons'

const props = defineProps<{
  techName: TechName
}>()

const iconConfig = computed(() => getTechIcon(props.techName))
</script>
