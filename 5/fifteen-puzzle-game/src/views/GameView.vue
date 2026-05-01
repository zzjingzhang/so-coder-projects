<template>
  <v-app>
    <GameHeader />

    <v-main class="d-flex align-center justify-center flex-grow-1">
      <v-container class="d-flex flex-column align-center">
        <v-card v-if="store.status === 'idle'" class="pa-8 text-center" max-width="500">
          <v-card-title class="text-h4 font-weight-bold mb-4">
            <v-icon icon="mdi-puzzle" size="large" class="mr-2" color="primary" />
            15 谜题
          </v-card-title>
          <v-card-text class="text-body-1 mb-6">
            点击图块移动到空白区域，按正确顺序排列数字1-15。
            <br />
            使用键盘快捷键 <kbd class="kbd">Ctrl+Alt+F</kbd> 可立即解决谜题。
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              size="x-large"
              variant="flat"
              @click="store.startNewGame()"
            >
              <v-icon icon="mdi-play" class="mr-2" />
              开始游戏
            </v-btn>
          </v-card-actions>
        </v-card>

        <TileGrid v-else />

        <div v-if="store.status !== 'idle'" class="mt-4 text-center text-grey">
          <span class="text-caption">
            键盘快捷键: <kbd class="kbd">Ctrl+Alt+F</kbd> 立即解决
          </span>
        </div>
      </v-container>
    </v-main>

    <GameFooter />
    <CompletionDialog />
    <NotificationSnackbar />

    <v-snackbar
      v-model="shortcutHintVisible"
      :timeout="2000"
      color="info"
      location="bottom"
      rounded="lg"
    >
      <v-icon icon="mdi-keyboard" class="mr-2" />
      快捷键 Ctrl+Alt+F 已触发，谜题已解决！
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GameHeader from '@/components/GameHeader.vue'
import TileGrid from '@/components/TileGrid.vue'
import GameFooter from '@/components/GameFooter.vue'
import CompletionDialog from '@/components/CompletionDialog.vue'
import NotificationSnackbar from '@/components/NotificationSnackbar.vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()
const shortcutHintVisible = ref(false)

function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'f') {
    event.preventDefault()
    if (store.status !== 'idle' && store.status !== 'completed') {
      store.solvePuzzle()
      shortcutHintVisible.value = true
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.kbd {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: monospace;
  font-size: 0.875rem;
}
</style>
