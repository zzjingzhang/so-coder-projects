<script setup>
import { onMounted, computed } from 'vue'
import { useSleepStore } from '../stores/sleep'
import { calculateSleepDuration, formatDuration, getQualityLevel } from '../data/models'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const store = useSleepStore()

const displayLatestRecord = computed(() => {
  if (!store.latestRecord) return null
  const record = store.latestRecord
  return {
    ...record,
    duration: calculateSleepDuration(record.bedTime, record.wakeTime),
    formattedDuration: formatDuration(calculateSleepDuration(record.bedTime, record.wakeTime)),
    quality: getQualityLevel(record.qualityScore)
  }
})

onMounted(() => {
  store.initialize()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">睡眠仪表盘</h1>
      <router-link 
        to="/record" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-150"
      >
        <i class="pi pi-plus mr-2"></i>
        记录今天的睡眠
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i class="pi pi-clock text-3xl text-indigo-600"></i>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  昨夜睡眠时长
                </dt>
                <dd>
                  <div class="text-lg font-semibold text-gray-900">
                    {{ displayLatestRecord?.formattedDuration || '暂无数据' }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i class="pi pi-star text-3xl text-yellow-500"></i>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  睡眠质量评分
                </dt>
                <dd>
                  <div class="text-lg font-semibold">
                    <span :class="displayLatestRecord?.quality.color || 'text-gray-400'">
                      {{ displayLatestRecord?.qualityScore || 0 }}/100
                    </span>
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ displayLatestRecord?.quality.label || '暂无数据' }}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i class="pi pi-chart-line text-3xl text-green-600"></i>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  本周平均评分
                </dt>
                <dd>
                  <div class="text-lg font-semibold text-gray-900">
                    {{ store.weeklyAverage.score || 0 }}/100
                  </div>
                  <div class="text-xs text-gray-500">
                    共 {{ store.weeklyAverage.count }} 天数据
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i class="pi pi-fire text-3xl text-orange-500"></i>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  连续记录天数
                </dt>
                <dd>
                  <div class="text-lg font-semibold text-gray-900">
                    {{ store.currentStreak }} 天
                  </div>
                  <div class="text-xs text-gray-500">
                    最长优质: {{ store.goodSleepStreak }} 天
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">
          <i class="pi pi-bell mr-2"></i> 睡眠建议
        </h2>
        <div class="space-y-4">
          <div 
            v-for="(rec, index) in store.getRecommendations()" 
            :key="index"
            class="flex items-start p-4 rounded-lg"
            :class="{
              'bg-yellow-50 border border-yellow-200': rec.severity === 'warning',
              'bg-blue-50 border border-blue-200': rec.severity === 'info',
              'bg-green-50 border border-green-200': rec.severity === 'success'
            }"
          >
            <div 
              class="flex-shrink-0 mt-0.5"
              :class="{
                'text-yellow-500': rec.severity === 'warning',
                'text-blue-500': rec.severity === 'info',
                'text-green-500': rec.severity === 'success'
              }"
            >
              <i :class="rec.icon" class="text-xl"></i>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-gray-900">{{ rec.title }}</h3>
              <p class="text-sm text-gray-600 mt-1 whitespace-pre-line">{{ rec.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">
          <i class="pi pi-trophy mr-2"></i> 成就进度
        </h2>
        <div v-if="store.achievements.length > 0" class="space-y-3">
          <div 
            v-for="achievement in store.achievements" 
            :key="achievement.type"
            class="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
          >
            <div class="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <i :class="achievement.icon" class="text-white"></i>
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-gray-900">{{ achievement.name }}</h4>
              <p class="text-xs text-gray-500">{{ achievement.description }}</p>
            </div>
            <div class="ml-auto">
              <i class="pi pi-check-circle text-green-500"></i>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <i class="pi pi-lock text-4xl text-gray-300 mb-2"></i>
          <p class="text-gray-500">还没有解锁任何成就</p>
          <p class="text-sm text-gray-400 mt-1">坚持记录睡眠数据来解锁成就</p>
        </div>
        <div class="mt-4 pt-4 border-t">
          <router-link to="/goals" class="text-sm text-indigo-600 hover:text-indigo-500">
            查看所有成就 →
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="store.records.length > 0" class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        <i class="pi pi-history mr-2"></i> 最近记录
      </h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上床时间</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">起床时间</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时长</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">评分</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="record in store.records.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7)" 
              :key="record.id"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(record.date).toLocaleDateString('zh-CN') }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                <i class="pi pi-moon text-indigo-500 mr-1"></i>
                {{ record.bedTime }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                <i class="pi pi-sun text-yellow-500 mr-1"></i>
                {{ record.wakeTime }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {{ formatDuration(calculateSleepDuration(record.bedTime, record.wakeTime)) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span 
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getQualityLevel(record.qualityScore).bg + ' ' + getQualityLevel(record.qualityScore).color"
                >
                  {{ record.qualityScore }}分
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm">
                <router-link 
                  :to="`/history?date=${new Date(record.date).toISOString().split('T')[0]}`"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  查看详情
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="bg-white shadow rounded-lg p-8 text-center">
      <i class="pi pi-moon text-5xl text-gray-300 mb-4"></i>
      <h3 class="text-lg font-medium text-gray-900 mb-2">还没有睡眠记录</h3>
      <p class="text-gray-500 mb-4">开始记录您的睡眠数据，以获得更好的睡眠质量分析</p>
      <router-link 
        to="/record"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-150"
      >
        <i class="pi pi-plus mr-2"></i>
        开始记录
      </router-link>
    </div>
  </div>
</template>
