<template>
  <el-card class="game-card h-full flex flex-col cursor-pointer" shadow="hover">
    <div class="relative">
      <el-image 
        :src="game.cover" 
        :alt="game.name"
        class="w-full h-48 object-cover"
        fit="cover"
        :preview-src-list="[game.cover]"
      >
        <template #placeholder>
          <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
            <el-icon class="text-gray-400" :size="40"><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div 
        v-if="showRank" 
        class="absolute top-2 left-2 bg-yellow-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg shadow"
      >
        {{ rank }}
      </div>
      <div 
        v-if="showVotes" 
        class="absolute top-2 right-2 bg-blue-600 text-white text-sm px-2 py-1 rounded-full shadow"
      >
        {{ votes }} 票
      </div>
    </div>
    <div class="p-4 flex-1 flex flex-col">
      <h3 class="text-lg font-bold text-gray-800 mb-2 truncate">{{ game.name }}</h3>
      <div class="flex items-center mb-3">
        <el-rate v-model="ratingDisplay" disabled :max="10" show-text text-color="#ff9900" />
      </div>
      <div class="flex flex-wrap gap-1 mb-3">
        <el-tag 
          v-for="genre in game.genres" 
          :key="genre" 
          size="small" 
          type="info"
          effect="light"
        >
          {{ genre }}
        </el-tag>
      </div>
      <p class="text-gray-500 text-sm flex-1 line-clamp-3">{{ game.summary }}</p>
      <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span><el-icon><Calendar /></el-icon> {{ formatDate(game.releaseDate) }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Game } from '@/types'

interface Props {
  game: Game
  showRank?: boolean
  rank?: number
  showVotes?: boolean
  votes?: number
}

const props = withDefaults(defineProps<Props>(), {
  showRank: false,
  rank: 0,
  showVotes: false,
  votes: 0
})

const ratingDisplay = computed(() => props.game.rating)

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.game-card:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
