<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { mockTricks, mockPracticeRecords, difficultyLevelNames } from '@/mock/data'
import type { Trick, PracticeRecord, DashboardStats } from '@/types'

const tricks = ref<Trick[]>([...mockTricks])
const practiceRecords = ref<PracticeRecord[]>([...mockPracticeRecords])

const stats = computed<DashboardStats>(() => {
  const totalTricks = tricks.value.length
  const masteredTricks = tricks.value.filter(t => t.mastered).length
  const totalPracticeSessions = practiceRecords.value.length
  const totalPracticeMinutes = practiceRecords.value.reduce((sum, r) => sum + r.duration, 0)
  
  const trickPracticeCount: Record<string, { trickId: string; trickName: string; practiceCount: number }> = {}
  practiceRecords.value.forEach(record => {
    record.tricks.forEach(t => {
      if (!trickPracticeCount[t.trickId]) {
        trickPracticeCount[t.trickId] = { trickId: t.trickId, trickName: t.trickName, practiceCount: 0 }
      }
      trickPracticeCount[t.trickId].practiceCount++
    })
  })
  
  const trendingTricks = Object.values(trickPracticeCount)
    .sort((a, b) => b.practiceCount - a.practiceCount)
    .slice(0, 5)

  return {
    totalTricks,
    masteredTricks,
    totalPracticeSessions,
    totalPracticeMinutes,
    recentSessions: practiceRecords.value.slice(0, 3),
    trendingTricks
  }
})

const getDifficultyName = (level: number) => difficultyLevelNames[level] || '未知'

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}小时${mins > 0 ? mins + '分钟' : ''}`
  }
  return `${mins}分钟`
}

const getMasteryColor = (level: number) => {
  if (level >= 80) return '#67c23a'
  if (level >= 60) return '#409eff'
  if (level >= 40) return '#e6a23c'
  return '#f56c6c'
}

onMounted(() => {
  ElMessage({
    message: '欢迎回来！',
    type: 'success',
    duration: 2000
  })
})
</script>

<template>
  <div class="dashboard-page">
    <div class="page-header mb-6">
      <h1 class="text-2xl font-bold text-gray-800">仪表盘</h1>
      <p class="text-gray-500 mt-1">查看你的滑板运动概览</p>
    </div>

    <div class="stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <el-card class="stat-card">
        <div class="flex items-center">
          <div class="icon-box bg-blue-100 p-3 rounded-lg mr-4">
            <el-icon class="text-2xl text-blue-500">
              <Collection />
            </el-icon>
          </div>
          <div>
            <div class="text-3xl font-bold text-gray-800">{{ stats.totalTricks }}</div>
            <div class="text-sm text-gray-500">技巧总数</div>
          </div>
        </div>
      </el-card>

      <el-card class="stat-card">
        <div class="flex items-center">
          <div class="icon-box bg-green-100 p-3 rounded-lg mr-4">
            <el-icon class="text-2xl text-green-500">
              <CircleCheck />
            </el-icon>
          </div>
          <div>
            <div class="text-3xl font-bold text-gray-800">{{ stats.masteredTricks }}</div>
            <div class="text-sm text-gray-500">已掌握</div>
          </div>
        </div>
      </el-card>

      <el-card class="stat-card">
        <div class="flex items-center">
          <div class="icon-box bg-orange-100 p-3 rounded-lg mr-4">
            <el-icon class="text-2xl text-orange-500">
              <Timer />
            </el-icon>
          </div>
          <div>
            <div class="text-3xl font-bold text-gray-800">{{ stats.totalPracticeSessions }}</div>
            <div class="text-sm text-gray-500">练习次数</div>
          </div>
        </div>
      </el-card>

      <el-card class="stat-card">
        <div class="flex items-center">
          <div class="icon-box bg-purple-100 p-3 rounded-lg mr-4">
            <el-icon class="text-2xl text-purple-500">
              <Clock />
            </el-icon>
          </div>
          <div>
            <div class="text-3xl font-bold text-gray-800">{{ formatDuration(stats.totalPracticeMinutes) }}</div>
            <div class="text-sm text-gray-500">总练习时长</div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <el-card>
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-semibold text-gray-800">最近练习记录</span>
            <el-button type="primary" link size="small" @click="$router.push('/practice')">
              查看全部
            </el-button>
          </div>
        </template>
        <div class="recent-sessions" v-if="stats.recentSessions.length > 0">
          <div 
            v-for="session in stats.recentSessions" 
            :key="session.id"
            class="session-item p-4 bg-gray-50 rounded-lg mb-3 last:mb-0 hover:bg-gray-100 transition-colors cursor-pointer"
            @click="$router.push('/practice')"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-gray-800">{{ session.date }}</span>
              <div class="flex items-center">
                <el-rate v-model="session.overallRating" disabled :max="5" size="small" />
              </div>
            </div>
            <div class="flex items-center text-sm text-gray-500 mb-2">
              <el-icon class="mr-1">
                <Location />
              </el-icon>
              <span>{{ session.location }}</span>
              <span class="mx-2">·</span>
              <el-icon class="mr-1">
                <Timer />
              </el-icon>
              <span>{{ formatDuration(session.duration) }}</span>
            </div>
            <div class="flex flex-wrap gap-1">
              <el-tag 
                v-for="t in session.tricks.slice(0, 3)" 
                :key="t.trickId" 
                size="small" 
                type="info"
              >
                {{ t.trickName }}
              </el-tag>
              <el-tag v-if="session.tricks.length > 3" size="small" type="info">
                +{{ session.tricks.length - 3 }}
              </el-tag>
            </div>
          </div>
        </div>
        <el-empty v-else description="暂无练习记录" :image-size="80" />
      </el-card>

      <el-card>
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-semibold text-gray-800">技巧掌握进度</span>
            <el-button type="primary" link size="small" @click="$router.push('/tricks')">
              管理技巧
            </el-button>
          </div>
        </template>
        <div class="tricks-progress" v-if="tricks.length > 0">
          <div 
            v-for="trick in tricks.slice(0, 6)" 
            :key="trick.id"
            class="trick-item mb-4 last:mb-0"
          >
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center">
                <span class="font-medium text-gray-800 mr-2">{{ trick.name }}</span>
                <el-tag :type="trick.mastered ? 'success' : 'info'" size="small">
                  {{ trick.mastered ? '已掌握' : '学习中' }}
                </el-tag>
              </div>
              <span class="text-sm font-medium" :style="{ color: getMasteryColor(trick.masteryLevel) }">
                {{ trick.masteryLevel }}%
              </span>
            </div>
            <el-progress 
              :percentage="trick.masteryLevel" 
              :stroke-width="8"
              :color="getMasteryColor(trick.masteryLevel)"
              :show-text="false"
            />
            <div class="flex items-center text-xs text-gray-500 mt-1">
              <span>难度: {{ getDifficultyName(trick.difficulty) }}</span>
              <span class="mx-2">·</span>
              <span>{{ trick.category }}</span>
            </div>
          </div>
        </div>
        <el-empty v-else description="暂无技巧记录" :image-size="80" />
      </el-card>
    </div>

    <div class="mt-6">
      <el-card v-if="stats.trendingTricks.length > 0">
        <template #header>
          <span class="font-semibold text-gray-800">热门练习技巧</span>
        </template>
        <div class="trending-tricks flex flex-wrap gap-3">
          <div 
            v-for="(item, index) in stats.trendingTricks" 
            :key="item.trickId"
            class="trending-item flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-full border border-orange-200"
          >
            <span class="w-6 h-6 flex items-center justify-center bg-orange-500 text-white rounded-full text-xs font-bold mr-2">
              {{ index + 1 }}
            </span>
            <span class="font-medium text-gray-800">{{ item.trickName }}</span>
            <span class="text-xs text-gray-500 ml-2">练习 {{ item.practiceCount }} 次</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.stat-card :deep(.el-card__body) {
  padding: 20px;
}

.session-item {
  transition: all 0.2s ease;
}
</style>
