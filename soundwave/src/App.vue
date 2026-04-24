<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import BottomPlayer from './components/BottomPlayer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <NavBar />
    <main class="main-wrapper">
      <RouterView />
    </main>
    <BottomPlayer />
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-wrapper {
  flex: 1;
}
</style>
