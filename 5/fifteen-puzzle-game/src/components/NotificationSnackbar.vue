<template>
  <v-snackbar
    v-model="snackbarVisible"
    :timeout="3000"
    color="info"
    location="top"
    rounded="lg"
  >
    <v-icon icon="mdi-information" class="mr-2" />
    {{ message }}
    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="snackbarVisible = false"
      >
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const snackbarVisible = computed({
  get: () => store.status === 'paused',
  set: () => {}
})

const message = computed(() => {
  return '游戏已暂停'
})
</script>
