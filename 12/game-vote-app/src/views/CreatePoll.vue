<template>
  <div class="space-y-6">
    <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
      <h1 class="text-3xl font-bold mb-2">创建新投票</h1>
      <p class="text-purple-100 text-lg">创建一个游戏投票，让大家一起参与讨论</p>
    </div>
    
    <el-card>
      <el-form 
        ref="formRef" 
        :model="pollForm" 
        :rules="rules" 
        label-position="top"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="投票标题" prop="title">
              <el-input 
                v-model="pollForm.title" 
                placeholder="例如：2026年最受期待的动作游戏"
                size="large"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="显示数量" prop="maxGames">
              <el-select v-model="pollForm.maxGames" size="large" style="width: 100%">
                <el-option :value="5" label="Top 5" />
                <el-option :value="10" label="Top 10" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="投票描述" prop="description">
          <el-input 
            v-model="pollForm.description" 
            type="textarea"
            :rows="3"
            placeholder="描述这个投票的目的和规则..."
          />
        </el-form-item>
        
        <el-form-item label="限制游戏类型（可选）">
          <el-checkbox-group v-model="pollForm.allowedGenres">
            <el-checkbox v-for="genre in availableGenres" :key="genre" :label="genre">
              {{ genre }}
            </el-checkbox>
          </el-checkbox-group>
          <div class="text-gray-500 text-sm mt-2">
            <el-icon><InfoFilled /></el-icon>
            不选择则不限制类型，所有游戏都可参与
          </div>
        </el-form-item>
        
        <el-divider>添加投票游戏（从IGDB搜索）</el-divider>
        
        <el-form-item label="搜索游戏">
          <div class="flex gap-3">
            <el-autocomplete
              v-model="searchKeyword"
              :fetch-suggestions="searchGames"
              placeholder="输入游戏名称搜索..."
              size="large"
              style="flex: 1"
              @select="handleGameSelect"
              clearable
            >
              <template #default="{ item }">
                <div class="flex items-center">
                  <el-avatar :src="item.cover" size="small" class="mr-3" />
                  <div>
                    <div class="font-medium">{{ item.name }}</div>
                    <div class="text-xs text-gray-500">
                      {{ item.genres?.join(', ') }} | 评分: {{ item.rating }}
                    </div>
                  </div>
                </div>
              </template>
            </el-autocomplete>
            <el-button type="primary" size="large" :icon="Search" :loading="searching">
              搜索
            </el-button>
          </div>
          <div class="text-gray-500 text-sm mt-2">
            <el-icon><InfoFilled /></el-icon>
            AJAX搜索 - 输入游戏名称实时搜索，点击结果添加到投票
          </div>
        </el-form-item>
        
        <el-form-item label="已添加的游戏">
          <div v-if="selectedGames.length === 0" class="text-gray-400 text-center py-8 bg-gray-50 rounded-lg">
            <el-icon :size="48"><Game /></el-icon>
            <p class="mt-2">暂无游戏，请在上方搜索并添加</p>
          </div>
          
          <div v-else class="space-y-3">
            <div 
              v-for="(game, index) in selectedGames" 
              :key="game.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center space-x-4">
                <el-tag type="primary" size="large">#{{ index + 1 }}</el-tag>
                <el-avatar :src="game.cover" size="large" />
                <div>
                  <div class="font-medium text-gray-800">{{ game.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ game.genres?.join(', ') }} | 评分: {{ game.rating }}
                  </div>
                </div>
              </div>
              <el-button 
                type="danger" 
                :icon="Delete"
                circle
                @click="removeGame(game.id)"
              />
            </div>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            size="large" 
            :loading="submitting"
            :icon="Check"
            @click="handleSubmit"
          >
            创建投票
          </el-button>
          <el-button size="large" @click="resetForm">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useGameStore } from '@/stores/game'
import { useAuthStore } from '@/stores/auth'
import type { Game } from '@/types'

const router = useRouter()
const gameStore = useGameStore()
const authStore = useAuthStore()

const formRef = ref<FormInstance>()
const searching = ref(false)
const submitting = ref(false)
const searchKeyword = ref('')
const selectedGames = ref<Game[]>([])

const availableGenres = [
  '角色扮演', '动作', '冒险', '射击', '策略', 
  '模拟', '体育', '竞速', '益智', '卡牌',
  'MOBA', '多人竞技', '回合制', '开放世界'
]

interface PollForm {
  title: string
  description: string
  maxGames: 5 | 10
  allowedGenres: string[]
}

const pollForm = reactive<PollForm>({
  title: '',
  description: '',
  maxGames: 5,
  allowedGenres: []
})

const rules: FormRules = {
  title: [
    { required: true, message: '请输入投票标题', trigger: 'blur' },
    { min: 5, max: 50, message: '标题长度在5到50个字符之间', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入投票描述', trigger: 'blur' },
    { min: 10, message: '描述至少10个字符', trigger: 'blur' }
  ]
}

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
  },
  {
    id: 'g5',
    name: '英雄联盟',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=league%20of%20legends%20game%20cover%20moba&image_size=square',
    rating: 9.2,
    releaseDate: '2009-10-27',
    genres: ['MOBA', '多人竞技'],
    summary: 'Riot Games开发的多人在线战术竞技游戏'
  },
  {
    id: 'g6',
    name: '文明6',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=civilization%206%20game%20cover%20strategy&image_size=square',
    rating: 8.8,
    releaseDate: '2016-10-21',
    genres: ['策略', '回合制'],
    summary: 'Firaxis Games开发的回合制策略游戏'
  },
  {
    id: 'g7',
    name: '最终幻想16',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=final%20fantasy%2016%20game%20cover%20crystal&image_size=square',
    rating: 9.0,
    releaseDate: '2023-06-22',
    genres: ['角色扮演', '动作'],
    summary: '史克威尔艾尼克斯开发的最终幻想系列新作'
  },
  {
    id: 'g8',
    name: '塞尔达传说：王国之泪',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zelda%20tears%20of%20the%20kingdom%20game%20cover%20hyrule&image_size=square',
    rating: 9.8,
    releaseDate: '2023-05-12',
    genres: ['冒险', '动作', '开放世界'],
    summary: '任天堂开发的塞尔达传说系列最新作'
  }
]

onMounted(() => {
  gameStore.loadData()
  authStore.loadUser()
})

const searchGames = (keyword: string, callback: (items: Game[]) => void) => {
  if (!keyword.trim()) {
    callback([])
    return
  }
  
  searching.value = true
  
  setTimeout(() => {
    const results = mockGames.filter(g => 
      g.name.toLowerCase().includes(keyword.toLowerCase()) ||
      g.genres.some(genre => genre.includes(keyword))
    )
    searching.value = false
    callback(results)
  }, 300)
}

const handleGameSelect = (item: Game) => {
  const exists = selectedGames.value.some(g => g.id === item.id)
  if (exists) {
    ElMessage.warning('该游戏已添加')
    return
  }
  
  if (pollForm.allowedGenres.length > 0) {
    const hasAllowedGenre = item.genres.some(g => pollForm.allowedGenres.includes(g))
    if (!hasAllowedGenre) {
      ElMessage.warning(`该游戏类型不在允许范围内，仅限: ${pollForm.allowedGenres.join(', ')}`)
      return
    }
  }
  
  selectedGames.value.push({ ...item })
  searchKeyword.value = ''
  ElMessage.success(`已添加: ${item.name}`)
}

const removeGame = (gameId: string) => {
  selectedGames.value = selectedGames.value.filter(g => g.id !== gameId)
  ElMessage.info('已移除游戏')
}

const resetForm = () => {
  formRef.value?.resetFields()
  pollForm.allowedGenres = []
  selectedGames.value = []
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      if (selectedGames.value.length < 2) {
        ElMessage.warning('至少需要添加2款游戏才能创建投票')
        return
      }
      
      submitting.value = true
      
      setTimeout(() => {
        const currentUser = authStore.getCurrentUser()
        if (!currentUser) {
          ElMessage.error('请先登录')
          submitting.value = false
          return
        }
        
        const newPoll = gameStore.createPoll(
          pollForm.title,
          pollForm.description,
          currentUser.id,
          currentUser.username,
          pollForm.maxGames,
          pollForm.allowedGenres.length > 0 ? pollForm.allowedGenres : null
        )
        
        selectedGames.value.forEach(game => {
          gameStore.addGameToPoll(newPoll.id, game)
        })
        
        ElMessage.success('投票创建成功！')
        submitting.value = false
        router.push(`/poll/${newPoll.id}`)
      }, 500)
    }
  })
}
</script>
