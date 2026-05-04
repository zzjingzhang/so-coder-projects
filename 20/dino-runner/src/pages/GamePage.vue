<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">🦕 Dino Runner</h1>
    
    <DinoRunner />
    
    <div class="mt-8 text-center">
      <p class="text-gray-600 mb-4">操作说明：</p>
      <div class="flex flex-wrap justify-center gap-4">
        <div class="bg-white px-4 py-2 rounded-lg shadow">
          <span class="font-semibold text-gray-700">空格 / 上箭头</span>
          <span class="text-gray-500 ml-2">跳跃</span>
        </div>
        <div class="bg-white px-4 py-2 rounded-lg shadow">
          <span class="font-semibold text-gray-700">下箭头</span>
          <span class="text-gray-500 ml-2">下蹲</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DinoRunner from '../components/DinoRunner.vue'
</script>
