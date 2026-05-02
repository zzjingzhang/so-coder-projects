<template>
  <div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">游戏投票推荐平台</h1>
          <p class="text-blue-100 text-lg">参与投票，发现最受欢迎的游戏</p>
        </div>
        <router-link v-if="authStore.isLoggedIn" to="/create-poll">
          <el-button type="primary" size="large" :icon="Plus">
            创建投票
          </el-button>
        </router-link>
      </div>
    </div>
    
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-800">
        <el-icon class="mr-2"><TrendCharts /></el-icon>
        热门投票
      </h2>
      <el-tag type="info" effect="light">
        共 {{ polls.length }} 个投票
      </el-tag>
    </div>
    
    <el-empty v-if="polls.length === 0" description="暂无投票，快来创建第一个吧！" />
    
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <el-card 
        v-for="poll in polls" 
        :key="poll.id"
        class="poll-card hover:shadow-xl transition-all duration-300 cursor-pointer"
        @click="goToPoll(poll.id)"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-bold text-lg text-gray-800 truncate flex-1 mr-4">
              {{ poll.title }}
            </span>
            <el-tag :type="poll.isActive ? 'success' : 'info'" size="small">
              {{ poll.isActive ? '进行中' : '已结束' }}
            </el-tag>
          </div>
        </template>
        
        <p class="text-gray-600 mb-4 line-clamp-2">{{ poll.description }}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <el-tag size="small" type="primary" effect="light">
            Top {{ poll.maxGames }}
          </el-tag>
          <el-tag v-if="poll.allowedGenres" size="small" type="warning" effect="light">
            类型限制
          </el-tag>
          <el-tag size="small" effect="light">
            {{ poll.options.length }} 款游戏
          </el-tag>
        </div>
        
        <div v-if="poll.allowedGenres && poll.allowedGenres.length > 0" class="mb-4">
          <span class="text-sm text-gray-500">仅限类型：</span>
          <div class="flex flex-wrap gap-1 mt-1">
            <el-tag 
              v-for="genre in poll.allowedGenres" 
              :key="genre" 
              size="small" 
              type="warning"
            >
              {{ genre }}
            </el-tag>
          </div>
        </div>
        
        <el-divider class="my-4" />
        
        <div class="flex items-center justify-between text-sm text-gray-500">
          <div class="flex items-center space-x-1">
            <el-icon><User /></el-icon>
            <span>{{ poll.creatorName }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <el-icon><Calendar /></el-icon>
            <span>{{ formatDate(poll.createdAt) }}</span>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-end space-x-3">
            <el-button size="small" type="primary" @click.stop="goToPoll(poll.id)">
              参与投票
            </el-button>
            <el-button size="small" @click.stop="goToResults(poll.id)">
              查看结果
            </el-button>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { useAuthStore } from '@/stores/auth'
import type { Poll } from '@/types'

const router = useRouter()
const gameStore = useGameStore()
const authStore = useAuthStore()

const polls = ref<Poll[]>([])

onMounted(() => {
  gameStore.loadData()
  authStore.loadUser()
  polls.value = gameStore.getPolls()
})

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('zh-CN')
}

const goToPoll = (pollId: string) => {
  router.push(`/poll/${pollId}`)
}

const goToResults = (pollId: string) => {
  router.push(`/poll/${pollId}/results`)
}
</script>

<style scoped>
.poll-card {
  min-height: 280px;
  display: flex;
  flex-direction: column;
}

.poll-card :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
