<template>
  <v-dialog v-model="dialogVisible" max-width="400" persistent>
    <v-card class="pa-4">
      <v-card-title class="text-h5 text-center mb-4">
        <v-icon icon="mdi-trophy" color="primary" size="large" class="mb-2" />
        <div>恭喜通关！</div>
      </v-card-title>

      <v-card-text class="text-center">
        <div class="text-h4 font-weight-bold text-primary mb-4">
          {{ store.moves }} 步
        </div>
        <div class="text-h5 mb-2">
          <v-icon icon="mdi-clock-outline" class="mr-2" />
          用时: {{ store.formatTime(store.seconds) }}
        </div>
      </v-card-text>

      <v-card-actions class="justify-center ga-4 mt-4">
        <v-btn
          color="primary"
          variant="flat"
          size="large"
          @click="playAgain"
        >
          <v-icon icon="mdi-replay" class="mr-2" />
          再玩一次
        </v-btn>
        <v-btn
          color="secondary"
          variant="outlined"
          size="large"
          @click="closeDialog"
        >
          关闭
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const dialogVisible = computed({
  get: () => store.status === 'completed',
  set: () => {}
})

function playAgain() {
  store.startNewGame()
}

function closeDialog() {
  store.resetGame()
}
</script>
