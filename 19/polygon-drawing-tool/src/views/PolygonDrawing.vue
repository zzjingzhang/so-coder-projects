<script setup>
import { ref } from 'vue'
import DataInput from '../components/DataInput.vue'
import CanvasDisplay from '../components/CanvasDisplay.vue'

const polygons = ref([])

const handleDraw = (newPolygons) => {
  polygons.value = newPolygons
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <div class="w-1/3 p-6 bg-white border-r border-gray-200">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">多边形绘制工具</h1>
      <DataInput @draw="handleDraw" />
    </div>
    <div class="w-2/3 p-6">
      <CanvasDisplay :polygons="polygons" />
    </div>
  </div>
</template>
