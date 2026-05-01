<template>
  <div class="fullscreen-progress fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
    <n-spin size="large" />
  </div>
</template>

<script setup>
import { NSpin } from 'naive-ui'
</script>

<style scoped>
.fullscreen-progress {
  backdrop-filter: blur(4px);
}
</style>
