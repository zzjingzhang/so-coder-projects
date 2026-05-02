<template>
  <div class="space-y-6">
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
      <div class="flex items-center space-x-4">
        <el-avatar :size="64" class="bg-white/20">
          <el-icon :size="36"><UserFilled /></el-icon>
        </el-avatar>
        <div>
          <h1 class="text-3xl font-bold">{{ currentUser?.username }}</h1>
          <p class="text-indigo-100 text-lg mt-1">我的投票记录</p>
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-800">
        <el-icon class="mr-2"><List /></el-icon>
        投票历史
      </h2>
      <el-tag type="info" effect="light" size="large">
        共 {{ userVotes.length }} 次投票
      </el-tag>
    </div>
    
    <el-empty v-if="userVotes.length === 0" description="您还没有参与任何投票">
      <template #action>
        <router-link to="/">
          <el-button type="primary">去投票</el-button>
        </router-link>
      </template>
    </el-empty>
    
    <div v-else class="space-y-4">
      <el-timeline>
        <el-timeline-item
          v-for="vote in userVotes"
          :key="vote.id"
          :timestamp="formatDate(vote.votedAt)"
          placement="top"
          type="primary"
        >
          <el-card class="shadow hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <el-tag type="primary" effect="light">
                    <el-icon class="mr-1"><TrendCharts /></el-icon>
                    {{ vote.pollTitle }}
                  </el-tag>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-500">投给了：</span>
                    <el-tag type="success" size="large">
                      <el-icon class="mr-1"><CircleCheckFilled /></el-icon>
                      {{ vote.gameName }}
                    </el-tag>
                  </div>
                </div>
              </div>
              
              <div class="flex space-x-2">
                <router-link :to="`/poll/${vote.pollId}`">
                  <el-button size="small">
                    <el-icon class="mr-1"><View /></el-icon>
                    查看投票
                  </el-button>
                </router-link>
                <router-link :to="`/poll/${vote.pollId}/results`">
                  <el-button size="small" type="primary">
                    <el-icon class="mr-1"><TrendCharts /></el-icon>
                    查看结果
                  </el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    
    <el-card class="mt-8">
      <template #header>
        <h3 class="font-bold text-lg">
          <el-icon class="mr-2"><TrendCharts /></el-icon>
          投票统计
        </h3>
      </template>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-6 bg-blue-50 rounded-xl">
          <div class="text-4xl font-bold text-blue-600 mb-2">{{ userVotes.length }}</div>
          <div class="text-gray-600">参与投票数</div>
        </div>
        
        <div class="text-center p-6 bg-green-50 rounded-xl">
          <div class="text-4xl font-bold text-green-600 mb-2">{{ uniqueGames }}</div>
          <div class="text-gray-600">支持的不同游戏</div>
        </div>
        
        <div class="text-center p-6 bg-purple-50 rounded-xl">
          <div class="text-4xl font-bold text-purple-600 mb-2">{{ uniquePolls }}</div>
          <div class="text-gray-600">参与的不同投票</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useAuthStore } from '@/stores/auth'
import type { UserVote, User } from '@/types'

const gameStore = useGameStore()
const authStore = useAuthStore()

const currentUser = ref<User | null>(null)
const userVotes = ref<UserVote[]>([])

const uniqueGames = computed(() => {
  const gameIds = new Set(userVotes.value.map(v => v.gameId))
  return gameIds.size
})

const uniquePolls = computed(() => {
  const pollIds = new Set(userVotes.value.map(v => v.pollId))
  return pollIds.size
})

onMounted(() => {
  gameStore.loadData()
  authStore.loadUser()
  
  currentUser.value = authStore.getCurrentUser()
  
  if (currentUser.value) {
    userVotes.value = gameStore.getUserVotes(currentUser.value.id)
  }
})

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
