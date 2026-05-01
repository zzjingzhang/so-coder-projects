<template>
  <v-app-bar color="primary" dark elevation="4">
    <v-app-bar-title class="font-weight-bold">
      <v-icon icon="mdi-puzzle" class="mr-2" />
      <span class="hidden-sm-and-down">15 谜题</span>
      <span class="hidden-sm-only hidden-md-and-up">15</span>
    </v-app-bar-title>

    <v-spacer />

    <div class="d-flex align-center ga-2 mr-4">
      <v-chip color="white" variant="outlined" class="px-3">
        <v-icon icon="mdi-clock-outline" class="mr-1" size="small" />
        <span class="hidden-sm-and-down">时间:</span>
        {{ store.formatTime(store.seconds) }}
      </v-chip>

      <v-chip color="white" variant="outlined" class="px-3">
        <v-icon icon="mdi-counter" class="mr-1" size="small" />
        <span class="hidden-sm-and-down">移动:</span>
        {{ store.moves }}
      </v-chip>

      <v-chip :color="statusColor" variant="flat" class="px-3">
        <v-icon :icon="statusIcon" class="mr-1" size="small" />
        {{ statusText }}
      </v-chip>
    </div>

    <v-btn
      :icon="isCompact"
      :disabled="store.status === 'idle'"
      color="white"
      variant="outlined"
      class="mr-2"
      @click="store.togglePause()"
    >
      <v-icon :icon="store.status === 'paused' ? 'mdi-play' : 'mdi-pause'" />
      <v-tooltip v-if="!isCompact" activator="parent" location="bottom">
        {{ store.status === 'paused' ? '恢复' : '暂停' }}
      </v-tooltip>
    </v-btn>

    <v-btn
      :icon="isCompact"
      color="white"
      variant="outlined"
      class="mr-2"
      @click="store.resetGame()"
    >
      <v-icon icon="mdi-refresh" />
      <v-tooltip v-if="!isCompact" activator="parent" location="bottom">
        重置
      </v-tooltip>
    </v-btn>

    <v-btn
      :icon="isCompact"
      color="secondary"
      variant="flat"
      @click="store.startNewGame()"
    >
      <v-icon icon="mdi-play" />
      <v-tooltip v-if="!isCompact" activator="parent" location="bottom">
        开始新游戏
      </v-tooltip>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useGameStore } from '@/stores/gameStore'
import type { GameStatus } from '@/types'

const store = useGameStore()
const { width } = useDisplay()

const isCompact = computed(() => width.value < 600)

const statusColor = computed(() => {
  const colors: Record<GameStatus, string> = {
    idle: 'grey',
    playing: 'success',
    paused: 'warning',
    completed: 'primary'
  }
  return colors[store.status]
})

const statusIcon = computed(() => {
  const icons: Record<GameStatus, string> = {
    idle: 'mdi-help-circle-outline',
    playing: 'mdi-play-circle-outline',
    paused: 'mdi-pause-circle-outline',
    completed: 'mdi-check-circle-outline'
  }
  return icons[store.status]
})

const statusText = computed(() => {
  const texts: Record<GameStatus, string> = {
    idle: '等待开始',
    playing: '进行中',
    paused: '已暂停',
    completed: '已完成'
  }
  return texts[store.status]
})
</script>
