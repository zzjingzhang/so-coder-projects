<template>
  <div class="space-y-6">
    <div v-if="poll">
      <div class="flex items-center justify-between mb-4">
        <el-button @click="goBack" :icon="ArrowLeft">
          返回
        </el-button>
        <div class="flex gap-3">
          <el-radio-group v-model="displayCount" size="large">
            <el-radio-button :label="5">Top 5</el-radio-button>
            <el-radio-button :label="10">Top 10</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
        <h1 class="text-3xl font-bold mb-2">{{ poll.title }}</h1>
        <p class="text-amber-100 text-lg">{{ poll.description }}</p>
        <div class="flex items-center gap-4 mt-4">
          <el-tag type="info" effect="dark">
            共 {{ poll.options.length }} 款游戏参选
          </el-tag>
          <el-tag type="info" effect="dark">
            总票数: {{ totalVotes }}
          </el-tag>
        </div>
      </div>
      
      <el-empty v-if="results.length === 0" description="暂无投票数据" />
      
      <div v-else class="space-y-6">
        <div v-if="results.length >= 3" class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <div class="relative inline-block">
              <el-card class="w-full text-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-gray-400">
                <div class="text-6xl mb-4">🥈</div>
                <el-image 
                  :src="results[1]?.game.cover" 
                  class="w-24 h-24 mx-auto rounded-lg mb-4 object-cover"
                  fit="cover"
                />
                <h3 class="font-bold text-lg text-gray-800 truncate">{{ results[1]?.game.name }}</h3>
                <div class="text-2xl font-bold text-gray-600 mt-2">{{ results[1]?.votes }} 票</div>
              </el-card>
              <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="relative inline-block">
              <el-card class="w-full text-center p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-yellow-400 transform scale-105">
                <div class="text-7xl mb-4">🏆</div>
                <el-image 
                  :src="results[0]?.game.cover" 
                  class="w-32 h-32 mx-auto rounded-lg mb-4 object-cover"
                  fit="cover"
                />
                <h3 class="font-bold text-xl text-gray-800 truncate">{{ results[0]?.game.name }}</h3>
                <div class="text-3xl font-bold text-yellow-600 mt-2">{{ results[0]?.votes }} 票</div>
              </el-card>
              <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold">
                1
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <div class="relative inline-block">
              <el-card class="w-full text-center p-6 bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-500">
                <div class="text-6xl mb-4">🥉</div>
                <el-image 
                  :src="results[2]?.game.cover" 
                  class="w-24 h-24 mx-auto rounded-lg mb-4 object-cover"
                  fit="cover"
                />
                <h3 class="font-bold text-lg text-gray-800 truncate">{{ results[2]?.game.name }}</h3>
                <div class="text-2xl font-bold text-amber-600 mt-2">{{ results[2]?.votes }} 票</div>
              </el-card>
              <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
            </div>
          </div>
        </div>
        
        <div class="pt-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            <el-icon class="mr-2"><List /></el-icon>
            完整排名 (Top {{ displayCount }})
          </h2>
          
          <div class="space-y-3">
            <div 
              v-for="(result, index) in results" 
              :key="result.game.id"
              class="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition-shadow"
              :class="{
                'bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500': result.rank === 1,
                'bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400': result.rank === 2,
                'bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500': result.rank === 3
              }"
            >
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                :class="getRankColor(result.rank)"
              >
                {{ result.rank }}
              </div>
              
              <el-avatar :src="result.game.cover" size="large" />
              
              <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-800">{{ result.game.name }}</h3>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <el-rate v-model="result.game.rating" disabled :max="10" show-text text-color="#ff9900" size="small" />
                  <span class="mx-2">|</span>
                  <span>{{ result.game.genres?.join(', ') }}</span>
                </div>
              </div>
              
              <div class="text-center">
                <div class="text-3xl font-bold" :class="getVoteColor(result.rank)">
                  {{ result.votes }}
                </div>
                <div class="text-sm text-gray-500">票</div>
              </div>
              
              <div class="w-40">
                <el-progress 
                  :percentage="getPercentage(result.votes)" 
                  :color="getProgressColor(result.rank)"
                  :stroke-width="10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <el-empty v-else description="投票不存在或已被删除" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { useAuthStore } from '@/stores/auth'
import type { Poll } from '@/types'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()
const authStore = useAuthStore()

const poll = ref<Poll | undefined>()
const displayCount = ref<5 | 10>(5)

const results = computed(() => {
  if (!poll.value) return []
  return gameStore.getPollResults(poll.value.id, displayCount.value)
})

const totalVotes = computed(() => {
  if (!poll.value) return 0
  return poll.value.options.reduce((sum, opt) => sum + opt.votes, 0)
})

onMounted(() => {
  gameStore.loadData()
  authStore.loadUser()
  
  const pollId = route.params.id as string
  poll.value = gameStore.getPollById(pollId)
  
  if (poll.value) {
    displayCount.value = poll.value.maxGames
  }
})

const goBack = () => {
  const pollId = route.params.id as string
  router.push(`/poll/${pollId}`)
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return 'bg-yellow-500 text-white'
    case 2: return 'bg-gray-400 text-white'
    case 3: return 'bg-amber-600 text-white'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const getVoteColor = (rank: number) => {
  switch (rank) {
    case 1: return 'text-yellow-600'
    case 2: return 'text-gray-600'
    case 3: return 'text-amber-600'
    default: return 'text-blue-600'
  }
}

const getProgressColor = (rank: number) => {
  switch (rank) {
    case 1: return '#eab308'
    case 2: return '#9ca3af'
    case 3: return '#d97706'
    default: return '#3b82f6'
  }
}

const getPercentage = (votes: number) => {
  if (totalVotes.value === 0) return 0
  return Math.round((votes / totalVotes.value) * 100)
}
</script>
