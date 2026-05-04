<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-sky-50 to-white">
    <Navigation />
    <main class="pt-16">
      <router-view />
    </main>
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="text-gray-400">© 2026 昆明印象 | 彩云之南，春城昆明</p>
        <p class="text-gray-500 text-sm mt-2">探索这座美丽的城市，感受四季如春的魅力</p>
      </div>
    </footer>
  </div>
</template>
