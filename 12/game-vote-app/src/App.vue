<template>
  <div class="min-h-screen bg-gray-50">
    <NavHeader />
    <main class="container mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavHeader from './components/NavHeader.vue'
</script>
