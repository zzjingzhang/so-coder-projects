<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useSleepStore } from '../stores/sleep'
import { calculateSleepDuration, formatDuration, getQualityLevel, SleepStage } from '../data/models'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const store = useSleepStore()
const route = useRoute()

const selectedDate = ref(new Date())
const selectedRecord = ref(null)
const stageChart = ref(null)

const currentMonth = ref(new Date())

const stageColors = {
  [SleepStage.AWAKE]: '#EF4444',
  [SleepStage.LIGHT]: '#60A5FA',
  [SleepStage.DEEP]: '#3B82F6',
  [SleepStage.REM]: '#8B5CF6'
}

const stageLabels = {
  [SleepStage.AWAKE]: '清醒',
  [SleepStage.LIGHT]: '浅睡',
  [SleepStage.DEEP]: '深睡',
  [SleepStage.REM]: 'REM'
}

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()
  
  const days = []
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ date: null, record: null, isOtherMonth: true })
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    const dateStr = date.toISOString().split('T')[0]
    const record = store.records.find(r => {
      const recordDate = new Date(r.date).toISOString().split('T')[0]
      return recordDate === dateStr
    })
    days.push({
      date,
      dateStr,
      record,
      isOtherMonth: false,
      isToday: date.toDateString() === new Date().toDateString(),
      isSelected: date.toDateString() === selectedDate.value.toDateString()
    })
  }
  
  return days
})

const displaySelectedRecord = computed(() => {
  if (!selectedRecord.value) return null
  const record = selectedRecord.value
  return {
    ...record,
    duration: calculateSleepDuration(record.bedTime, record.wakeTime),
    formattedDuration: formatDuration(calculateSleepDuration(record.bedTime, record.wakeTime)),
    quality: getQualityLevel(record.qualityScore)
  }
})

function selectDay(day) {
  if (day.date) {
    selectedDate.value = day.date
    selectedRecord.value = day.record
    nextTick(() => {
      if (selectedRecord.value) {
        renderStageChart()
      }
    })
  }
}

function prevMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1)
}

function renderStageChart() {
  if (!selectedRecord.value) return
  
  const canvas = document.getElementById('stage-chart')
  if (!canvas) return
  
  if (stageChart.value) {
    stageChart.value.destroy()
  }
  
  const stages = selectedRecord.value.sleepStages || []
  const labels = []
  const data = []
  const backgroundColors = []
  
  stages.forEach((stage, index) => {
    labels.push(`${stageLabels[stage.stage]} (${stage.duration}m)`)
    data.push(stage.duration)
    backgroundColors.push(stageColors[stage.stage])
  })
  
  stageChart.value = new Chart(canvas, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        title: {
          display: true,
          text: '睡眠阶段分布'
        }
      }
    }
  })
}

function deleteSelectedRecord() {
  if (selectedRecord.value) {
    store.deleteRecord(selectedRecord.value.id)
    selectedRecord.value = null
  }
}

onMounted(() => {
  store.initialize()
  
  if (route.query.date) {
    const date = new Date(route.query.date)
    if (!isNaN(date.getTime())) {
      selectedDate.value = date
      currentMonth.value = new Date(date.getFullYear(), date.getMonth(), 1)
      selectedRecord.value = store.getRecordByDate(route.query.date)
      nextTick(() => {
        if (selectedRecord.value) {
          renderStageChart()
        }
      })
    }
  }
})

watch(() => route.query.date, (newDate) => {
  if (newDate) {
    const date = new Date(newDate)
    if (!isNaN(date.getTime())) {
      selectedDate.value = date
      currentMonth.value = new Date(date.getFullYear(), date.getMonth(), 1)
      selectedRecord.value = store.getRecordByDate(newDate)
      nextTick(() => {
        if (selectedRecord.value) {
          renderStageChart()
        }
      })
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-900">
      <i class="pi pi-history mr-2"></i>
      睡眠历史
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <button 
              @click="prevMonth"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i class="pi pi-chevron-left"></i>
            </button>
            <h2 class="text-lg font-semibold text-gray-900">
              {{ currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' }) }}
            </h2>
            <button 
              @click="nextMonth"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>

          <div class="grid grid-cols-7 gap-1 mb-2">
            <div class="text-center text-sm font-medium text-gray-500 py-2">日</div>
            <div class="text-center text-sm font-medium text-gray-500 py-2">一</div>
            <div class="text-center text-sm font-medium text-gray-500 py-2">二</div>
            <div class="text-center text-sm font-medium text-gray-500 py-2">三</div>
            <div class="text-center text-sm font-medium text-gray-500 py-2">四</div>
            <div class="text-center text-sm font-medium text-gray-500 py-2">五</div>
            <div class="text-center text-sm font-medium text-gray-500 py-2">六</div>
          </div>

          <div class="grid grid-cols-7 gap-1">
            <div 
              v-for="(day, index) in calendarDays" 
              :key="index"
              class="aspect-square p-1 rounded-lg cursor-pointer transition-all"
              :class="{
                'bg-indigo-50 ring-2 ring-indigo-500': day.isSelected,
                'bg-yellow-50': day.isToday && !day.isSelected,
                'hover:bg-gray-50': !day.isOtherMonth,
                'opacity-50': day.isOtherMonth
              }"
              @click="selectDay(day)"
            >
              <div v-if="day.date" class="h-full flex flex-col items-center justify-center">
                <span class="text-sm" :class="{ 'font-bold text-indigo-600': day.isToday }">
                  {{ day.date.getDate() }}
                </span>
                <div v-if="day.record" class="mt-1">
                  <div 
                    class="w-2 h-2 rounded-full"
                    :class="getQualityLevel(day.record.qualityScore).bg.replace('bg-', 'bg-').replace('-100', '-500')"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-center space-x-4 text-sm">
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span class="text-gray-600">优秀</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span class="text-gray-600">良好</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span class="text-gray-600">一般</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span class="text-gray-600">较差</span>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div v-if="displaySelectedRecord" class="bg-white shadow rounded-lg p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ new Date(displaySelectedRecord.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) }}
            </h3>
            <span 
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="displaySelectedRecord.quality.bg + ' ' + displaySelectedRecord.quality.color"
            >
              {{ displaySelectedRecord.qualityScore }}分
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="text-xs text-gray-500">上床时间</div>
              <div class="text-lg font-semibold text-indigo-600">
                <i class="pi pi-moon mr-1"></i>
                {{ displaySelectedRecord.bedTime }}
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="text-xs text-gray-500">起床时间</div>
              <div class="text-lg font-semibold text-yellow-600">
                <i class="pi pi-sun mr-1"></i>
                {{ displaySelectedRecord.wakeTime }}
              </div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 col-span-2">
              <div class="text-xs text-gray-500">睡眠时长</div>
              <div class="text-xl font-semibold text-gray-900">
                {{ displaySelectedRecord.formattedDuration }}
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">睡眠阶段</h4>
            <div class="h-64">
              <canvas id="stage-chart"></canvas>
            </div>
          </div>

          <div v-if="displaySelectedRecord.environmentFactors && Object.keys(displaySelectedRecord.environmentFactors).length > 0">
            <h4 class="text-sm font-medium text-gray-700 mb-2">环境因素</h4>
            <div class="space-y-2 text-sm">
              <div v-if="displaySelectedRecord.environmentFactors.temperature" class="flex justify-between">
                <span class="text-gray-500">温度</span>
                <span class="font-medium">{{ displaySelectedRecord.environmentFactors.temperature }}°C</span>
              </div>
              <div v-if="displaySelectedRecord.environmentFactors.humidity" class="flex justify-between">
                <span class="text-gray-500">湿度</span>
                <span class="font-medium">{{ displaySelectedRecord.environmentFactors.humidity }}%</span>
              </div>
              <div v-if="displaySelectedRecord.environmentFactors.noise" class="flex justify-between">
                <span class="text-gray-500">噪音</span>
                <span class="font-medium">{{ displaySelectedRecord.environmentFactors.noise === 'quiet' ? '安静' : displaySelectedRecord.environmentFactors.noise === 'moderate' ? '适中' : '嘈杂' }}</span>
              </div>
              <div v-if="displaySelectedRecord.environmentFactors.light" class="flex justify-between">
                <span class="text-gray-500">光线</span>
                <span class="font-medium">{{ displaySelectedRecord.environmentFactors.light === 'dark' ? '黑暗' : displaySelectedRecord.environmentFactors.light === 'dim' ? '昏暗' : '明亮' }}</span>
              </div>
              <div v-if="displaySelectedRecord.environmentFactors.caffeine" class="flex justify-between">
                <span class="text-gray-500">咖啡因</span>
                <span class="font-medium text-orange-600"><i class="pi pi-exclamation-triangle mr-1"></i>有摄入</span>
              </div>
              <div v-if="displaySelectedRecord.environmentFactors.exercise" class="flex justify-between">
                <span class="text-gray-500">睡前运动</span>
                <span class="font-medium text-blue-600"><i class="pi pi-check mr-1"></i>有运动</span>
              </div>
            </div>
          </div>

          <div v-if="displaySelectedRecord.notes" class="pt-4 border-t">
            <h4 class="text-sm font-medium text-gray-700 mb-2">备注</h4>
            <p class="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              {{ displaySelectedRecord.notes }}
            </p>
          </div>

          <div class="pt-4 border-t flex space-x-2">
            <router-link 
              :to="`/record?date=${new Date(displaySelectedRecord.date).toISOString().split('T')[0]}`"
              class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <i class="pi pi-pencil mr-1"></i>
              编辑
            </router-link>
            <button 
              @click="deleteSelectedRecord"
              class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
            >
              <i class="pi pi-trash mr-1"></i>
              删除
            </button>
          </div>
        </div>

        <div v-else class="bg-white shadow rounded-lg p-8 text-center">
          <i class="pi pi-calendar text-4xl text-gray-300 mb-3"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-1">选择日期</h3>
          <p class="text-gray-500">点击日历中的日期查看睡眠详情</p>
        </div>
      </div>
    </div>

    <div v-if="store.records.length > 0" class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        <i class="pi pi-chart-line mr-2"></i>
        睡眠趋势
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">睡眠时长趋势</h3>
          <div class="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <span class="text-gray-400">图表区域</span>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">质量评分趋势</h3>
          <div class="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <span class="text-gray-400">图表区域</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
