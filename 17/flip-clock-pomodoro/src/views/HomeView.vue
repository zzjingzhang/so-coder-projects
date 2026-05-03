<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center py-16 px-4 gap-12">
    <h1 class="text-4xl md:text-5xl font-bold text-white text-center mt-4">翻转时钟番茄计时器</h1>
    
    <div class="w-full max-w-2xl flex-1 flex items-center">
      <FlipClockPomodoro />
    </div>
    
    <div class="text-center text-white/80 mb-4">
      <p class="text-lg">专注工作，高效休息</p>
      <p class="mt-2 text-sm">番茄工作法：25分钟专注 + 5分钟休息</p>
    </div>
  </div>
</template>

<script setup>
import FlipClockPomodoro from '../components/FlipClockPomodoro.vue'
</script>
