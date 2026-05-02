<template>
  <div class="wheels absolute inset-0">
    <div class="wheel-front-left absolute -left-1 top-3 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
      <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
        <div class="w-1 h-full bg-gray-700" />
      </div>
    </div>
    
    <div class="wheel-front-right absolute -right-1 top-3 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
      <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
        <div class="w-1 h-full bg-gray-700" />
      </div>
    </div>
    
    <div v-if="!isTruck" class="wheel-rear-left absolute -left-1 bottom-3 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
      <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
        <div class="w-1 h-full bg-gray-700" />
      </div>
    </div>
    
    <div v-if="!isTruck" class="wheel-rear-right absolute -right-1 bottom-3 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
      <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
        <div class="w-1 h-full bg-gray-700" />
      </div>
    </div>
    
    <div v-if="isTruck" class="wheel-rear-left absolute -left-1 bottom-1 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
      <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
        <div class="w-1 h-full bg-gray-700" />
      </div>
    </div>
    
    <div v-if="isTruck" class="wheel-rear-right absolute -right-1 bottom-1 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
      <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
        <div class="w-1 h-full bg-gray-700" />
      </div>
    </div>
    
    <div v-if="isTruck" class="wheel-middle-left absolute -left-1 top-14 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
      <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
        <div class="w-1 h-full bg-gray-700" />
      </div>
    </div>
    
    <div v-if="isTruck" class="wheel-middle-right absolute -right-1 top-14 w-3 h-5 bg-gray-800 rounded-sm border border-gray-700">
      <div class="rim absolute inset-0.5 bg-gray-600 rounded-sm flex items-center justify-center">
        <div class="w-1 h-full bg-gray-700" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isTruck?: boolean
}>()
</script>

<style scoped>
</style>
