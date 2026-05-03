<template>
  <v-container fluid class="h-full p-0">
    <snake-game />
  </v-container>
</template>

<script setup>
import SnakeGame from '../components/SnakeGame.vue'
</script>

<style scoped>
.h-full {
  height: 100%;
}
</style>
