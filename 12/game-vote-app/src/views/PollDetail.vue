<template>
  <div class="space-y-6">
    <div v-if="poll">
      <div class="flex items-center justify-between mb-4">
        <el-button @click="goBack" :icon="ArrowLeft">
          返回列表
        </el-button>
        <router-link :to="`/poll/${poll.id}/results`">
          <el-button type="info" :icon="TrendCharts">
            查看结果
          </el-button>
        </router-link>
      </div>
      
      <el-card class="mb-6">
        <template #header>
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-800">{{ poll.title }}</h1>
            <el-tag :type="poll.isActive ? 'success' : 'info'" size="large">
              {{ poll.isActive ? '进行中' : '已结束' }}
            </el-tag>
          </div>
        </template>
        
        <p class="text-gray-600 text-lg mb-4">{{ poll.description }}</p>
        
        <div class="flex flex-wrap gap-3">
          <el-tag type="primary" effect="light">
            <el-icon class="mr-1"><Trophy /></el-icon>
            选出 Top {{ poll.maxGames }}
          </el-tag>
          <el-tag effect="light">
            <el-icon class="mr-1"><User /></el-icon>
            创建者: {{ poll.creatorName }}
          </el-tag>
          <el-tag effect="light">
            <el-icon class="mr-1"><Calendar /></el-icon>
            {{ formatDate(poll.createdAt) }}
          </el-tag>
          <el-tag v-if="poll.allowedGenres && poll.allowedGenres.length > 0" type="warning" effect="light">
            <el-icon class="mr-1"><CollectionTag /></el-icon>
            类型限制
          </el-tag>
        </div>
        
        <div v-if="poll.allowedGenres && poll.allowedGenres.length > 0" class="mt-4 p-4 bg-yellow-50 rounded-lg">
          <span class="text-yellow-800 font-medium">仅限以下类型：</span>
          <div class="flex flex-wrap gap-2 mt-2">
            <el-tag 
              v-for="genre in poll.allowedGenres" 
              :key="genre" 
              type="warning"
            >
              {{ genre }}
            </el-tag>
          </div>
        </div>
      </el-card>
      
      <el-alert 
        v-if="hasVoted" 
        type="success" 
        title="您已参与此投票"
        :closable="false"
        show-icon
        class="mb-6"
      >
        <template #default>
          感谢您的参与！您可以 <router-link :to="`/poll/${poll.id}/results`" class="text-blue-600">查看投票结果</router-link>
        </template>
      </el-alert>
      
      <div v-if="poll.options.length === 0">
        <el-empty description="该投票暂无游戏选项" />
      </div>
      
      <div v-else>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            <el-icon class="mr-2"><VideoPlay /></el-icon>
            候选游戏 ({{ poll.options.length }}款)
          </h2>
          <el-tag v-if="!hasVoted && poll.isActive" type="primary">
            点击游戏卡片投票
          </el-tag>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="option in poll.options" 
            :key="option.game.id"
            class="relative"
          >
            <el-card 
              class="game-vote-card cursor-pointer"
              :class="{ 'ring-4 ring-green-400': votedGameId === option.game.id }"
              shadow="hover"
              @click="handleVote(option)"
            >
              <div class="relative">
                <el-image 
                  :src="option.game.cover" 
                  :alt="option.game.name"
                  class="w-full h-48 object-cover"
                  fit="cover"
                >
                  <template #placeholder>
                    <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <el-icon class="text-gray-400" :size="40"><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                <div class="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {{ option.votes }} 票
                </div>
                <div 
                  v-if="votedGameId === option.game.id" 
                  class="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center"
                >
                  <el-icon class="mr-1"><CircleCheckFilled /></el-icon>
                  已投票
                </div>
              </div>
              
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2 truncate">{{ option.game.name }}</h3>
                
                <div class="flex items-center mb-3">
                  <el-rate v-model="option.game.rating" disabled :max="10" show-text text-color="#ff9900" />
                </div>
                
                <div class="flex flex-wrap gap-1 mb-3">
                  <el-tag 
                    v-for="genre in option.game.genres" 
                    :key="genre" 
                    size="small" 
                    type="info"
                    effect="light"
                  >
                    {{ genre }}
                  </el-tag>
                </div>
                
                <p class="text-gray-500 text-sm line-clamp-2">{{ option.game.summary }}</p>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      
      <div v-if="authStore.isLoggedIn && (poll.creatorId === authStore.state.currentUser?.id)" class="mt-8">
        <el-card>
          <template #header>
            <h3 class="font-bold text-lg">
              <el-icon class="mr-2"><Plus /></el-icon>
              管理员：添加更多游戏到此投票
            </h3>
          </template>
          
          <div class="flex gap-3">
            <el-autocomplete
              v-model="addGameKeyword"
              :fetch-suggestions="searchGamesToAdd"
              placeholder="搜索游戏并添加到此投票..."
              size="large"
              style="flex: 1"
              @select="addGameToPoll"
              clearable
            >
              <template #default="{ item }">
                <div class="flex items-center">
                  <el-avatar :src="item.cover" size="small" class="mr-3" />
                  <div>
                    <div class="font-medium">{{ item.name }}</div>
                    <div class="text-xs text-gray-500">{{ item.genres?.join(', ') }}</div>
                  </div>
                </div>
              </template>
            </el-autocomplete>
          </div>
        </el-card>
      </div>
    </div>
    
    <el-empty v-else description="投票不存在或已被删除" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useGameStore } from '@/stores/game'
import { useAuthStore } from '@/stores/auth'
import type { Poll, Game, VoteOption } from '@/types'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()
const authStore = useAuthStore()

const poll = ref<Poll | undefined>()
const votedGameId = ref<string | null>(null)
const addGameKeyword = ref('')

const mockGames: Game[] = [
  {
    id: 'g1',
    name: '艾尔登法环',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elden%20ring%20game%20cover%20dark%20fantasy&image_size=square',
    rating: 9.6,
    releaseDate: '2022-02-25',
    genres: ['角色扮演', '动作', '开放世界'],
    summary: 'FromSoftware开发的开放世界动作RPG游戏'
  },
  {
    id: 'g2',
    name: '博德之门3',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=baldurs%20gate%203%20game%20cover%20fantasy%20RPG&image_size=square',
    rating: 9.7,
    releaseDate: '2023-08-03',
    genres: ['角色扮演', '回合制'],
    summary: 'Larian Studios开发的龙与地下城世界观RPG'
  },
  {
    id: 'g3',
    name: '赛博朋克2077',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cyberpunk%202077%20game%20cover%20neon%20city&image_size=square',
    rating: 8.5,
    releaseDate: '2020-12-10',
    genres: ['角色扮演', '开放世界', '动作'],
    summary: 'CD Projekt Red开发的赛博朋克世界观RPG'
  },
  {
    id: 'g4',
    name: '战神：诸神黄昏',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=god%20of%20war%20ragnarok%20game%20cover%20nordic%20mythology&image_size=square',
    rating: 9.4,
    releaseDate: '2022-11-09',
    genres: ['动作', '冒险'],
    summary: 'Santa Monica Studio开发的北欧神话动作游戏'
  }
]

const hasVoted = computed(() => {
  const userId = authStore.state.currentUser?.id
  if (!userId || !poll.value) return false
  return gameStore.hasUserVoted(poll.value.id, userId)
})

onMounted(() => {
  gameStore.loadData()
  authStore.loadUser()
  
  const pollId = route.params.id as string
  poll.value = gameStore.getPollById(pollId)
})

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goBack = () => {
  router.push('/')
}

const handleVote = async (option: VoteOption) => {
  if (!authStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push(`/login?redirect=${route.fullPath}`)
    return
  }
  
  if (!poll.value || !poll.value.isActive) {
    ElMessage.warning('该投票已结束')
    return
  }
  
  if (hasVoted.value) {
    ElMessage.warning('您已投过票了')
    return
  }
  
  await ElMessageBox.confirm(
    `确定要为「${option.game.name}」投票吗？`,
    '确认投票',
    {
      confirmButtonText: '确定投票',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
  
  const userId = authStore.state.currentUser!.id
  const success = gameStore.voteForGame(
    poll.value.id,
    option.game.id,
    userId,
    option.game.name,
    poll.value.title
  )
  
  if (success) {
    votedGameId.value = option.game.id
    ElMessage.success('投票成功！')
  }
}

const searchGamesToAdd = (keyword: string, callback: (items: Game[]) => void) => {
  if (!keyword.trim()) {
    callback([])
    return
  }
  
  setTimeout(() => {
    const existingGameIds = poll.value?.options.map(o => o.game.id) || []
    const results = mockGames.filter(g => 
      g.name.toLowerCase().includes(keyword.toLowerCase()) &&
      !existingGameIds.includes(g.id)
    )
    callback(results)
  }, 300)
}

const addGameToPoll = (item: Game) => {
  if (!poll.value) return
  
  if (poll.value.allowedGenres && poll.value.allowedGenres.length > 0) {
    const hasAllowedGenre = item.genres.some(g => poll.value!.allowedGenres!.includes(g))
    if (!hasAllowedGenre) {
      ElMessage.warning(`该游戏类型不在允许范围内，仅限: ${poll.value.allowedGenres.join(', ')}`)
      return
    }
  }
  
  const success = gameStore.addGameToPoll(poll.value.id, item)
  
  if (success) {
    addGameKeyword.value = ''
    ElMessage.success(`已添加: ${item.name}`)
  }
}
</script>

<style scoped>
.game-vote-card:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
