<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSleepStore } from '../stores/sleep'
import { calculateSleepDuration, formatDuration, getQualityLevel, SleepStage } from '../data/models'
import { useToast } from 'primevue/usetoast'

const store = useSleepStore()
const router = useRouter()
const toast = useToast()

const recordDate = ref(new Date().toISOString().split('T')[0])
const bedTime = ref('23:00')
const wakeTime = ref('07:00')
const notes = ref('')

const environmentFactors = ref({
  temperature: 18,
  humidity: 50,
  noise: 'quiet',
  light: 'dark',
  caffeine: false,
  exercise: false,
  stress: 'low'
})

const isDragging = ref(false)
const dragType = ref(null)

const sleepDuration = computed(() => {
  return calculateSleepDuration(bedTime.value, wakeTime.value)
})

const formattedDuration = computed(() => {
  return formatDuration(sleepDuration.value)
})

const estimatedScore = computed(() => {
  const record = {
    bedTime: bedTime.value,
    wakeTime: wakeTime.value,
    environmentFactors: environmentFactors.value
  }
  
  let score = 50
  const hours = sleepDuration.value / 60
  
  if (hours >= 7 && hours <= 9) {
    score += 30
  } else if (hours >= 6 && hours < 7) {
    score += 15
  } else if (hours >= 9 && hours < 10) {
    score += 15
  } else if (hours < 5 || hours > 11) {
    score -= 10
  }
  
  if (environmentFactors.value.noise === 'quiet') score += 5
  if (environmentFactors.value.light === 'dark') score += 5
  if (environmentFactors.value.temperature >= 16 && environmentFactors.value.temperature <= 20) score += 5
  if (environmentFactors.value.humidity >= 40 && environmentFactors.value.humidity <= 60) score += 5
  
  return Math.max(0, Math.min(100, score))
})

const qualityLevel = computed(() => {
  return getQualityLevel(estimatedScore.value)
})

const timelineBedPosition = computed(() => {
  const [hour, minute] = bedTime.value.split(':').map(Number)
  let totalMinutes = hour * 60 + minute
  if (totalMinutes < 12 * 60) {
    totalMinutes += 24 * 60
  }
  const relativeMinutes = totalMinutes - 18 * 60
  return (relativeMinutes / (12 * 60)) * 100
})

const timelineWakePosition = computed(() => {
  const [hour, minute] = wakeTime.value.split(':').map(Number)
  let totalMinutes = hour * 60 + minute
  if (totalMinutes < 12 * 60) {
    totalMinutes += 24 * 60
  }
  const relativeMinutes = totalMinutes - 18 * 60
  return (relativeMinutes / (12 * 60)) * 100
})

function handleTimelineClick(event) {
  const timeline = event.currentTarget
  const rect = timeline.getBoundingClientRect()
  const percentage = (event.clientX - rect.left) / rect.width * 100
  const minutes = 18 * 60 + (percentage / 100) * 12 * 60
  
  let adjustedMinutes = minutes
  if (minutes > 24 * 60) {
    adjustedMinutes = minutes - 24 * 60
  }
  
  const hour = Math.floor(adjustedMinutes / 60) % 24
  const minute = Math.round((adjustedMinutes % 60) / 15) * 15
  const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  
  const bedMin = bedTime.value.split(':').map(Number)[0] * 60 + bedTime.value.split(':').map(Number)[1]
  const wakeMin = wakeTime.value.split(':').map(Number)[0] * 60 + wakeTime.value.split(':').map(Number)[1]
  const clickMin = hour * 60 + minute
  
  let bedTotalMin = bedMin
  let wakeTotalMin = wakeMin
  if (wakeMin <= bedMin) wakeTotalMin += 24 * 60
  
  let clickTotalMin = clickMin
  if (clickMin < 12 * 60) clickTotalMin += 24 * 60
  
  const bedDist = Math.abs(clickTotalMin - bedTotalMin)
  const wakeDist = Math.abs(clickTotalMin - wakeTotalMin)
  
  if (bedDist < wakeDist) {
    bedTime.value = timeString
  } else {
    wakeTime.value = timeString
  }
}

function startDrag(event, type) {
  isDragging.value = true
  dragType.value = type
  event.preventDefault()
}

function handleMouseMove(event) {
  if (!isDragging.value) return
  
  const timeline = document.getElementById('sleep-timeline')
  if (!timeline) return
  
  const rect = timeline.getBoundingClientRect()
  const percentage = Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100))
  const minutes = 18 * 60 + (percentage / 100) * 12 * 60
  
  let adjustedMinutes = minutes
  if (minutes > 24 * 60) {
    adjustedMinutes = minutes - 24 * 60
  }
  
  const hour = Math.floor(adjustedMinutes / 60) % 24
  const minute = Math.round((adjustedMinutes % 60) / 15) * 15
  const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  
  if (dragType.value === 'bed') {
    bedTime.value = timeString
  } else if (dragType.value === 'wake') {
    wakeTime.value = timeString
  }
}

function handleMouseUp() {
  isDragging.value = false
  dragType.value = null
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    saveRecord()
  }
}

function saveRecord() {
  const existingRecord = store.getRecordByDate(recordDate.value)
  
  const recordData = {
    date: new Date(recordDate.value).toISOString(),
    bedTime: bedTime.value,
    wakeTime: wakeTime.value,
    notes: notes.value,
    environmentFactors: { ...environmentFactors.value }
  }
  
  if (existingRecord) {
    store.updateRecord(existingRecord.id, recordData)
    toast.add({
      severity: 'success',
      summary: '更新成功',
      detail: '睡眠记录已更新',
      life: 3000
    })
  } else {
    store.addRecord(recordData)
    toast.add({
      severity: 'success',
      summary: '保存成功',
      detail: '睡眠记录已保存',
      life: 3000
    })
  }
  
  const newAchievements = store.checkAchievements()
  if (newAchievements.length > 0) {
    newAchievements.forEach(a => {
      toast.add({
        severity: 'info',
        summary: '🎉 成就解锁!',
        detail: a.name + ': ' + a.description,
        life: 5000
      })
    })
  }
  
  router.push('/')
}

onMounted(() => {
  store.initialize()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">
        <i class="pi pi-plus-circle mr-2"></i>
        记录睡眠
      </h1>
      <div class="flex items-center text-sm text-gray-500">
        <kbd class="px-2 py-1 bg-gray-100 rounded text-gray-600 mr-2">Enter</kbd>
        保存记录
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          选择日期
        </label>
        <input 
          type="date" 
          v-model="recordDate"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          tabindex="1"
        />
      </div>

      <div class="mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          <i class="pi pi-clock mr-2"></i>
          睡眠时间段
        </h3>
        <p class="text-sm text-gray-500 mb-4">
          点击时间轴或拖拽滑块调整睡眠时间
        </p>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <i class="pi pi-moon text-indigo-500 mr-1"></i>
              上床时间
            </label>
            <input 
              type="time" 
              v-model="bedTime"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              tabindex="2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <i class="pi pi-sun text-yellow-500 mr-1"></i>
              起床时间
            </label>
            <input 
              type="time" 
              v-model="wakeTime"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              tabindex="3"
            />
          </div>
        </div>

        <div 
          id="sleep-timeline"
          class="relative h-16 bg-gray-100 rounded-lg overflow-hidden cursor-pointer select-none"
          @click="handleTimelineClick"
        >
          <div class="absolute inset-0 flex">
            <div v-for="i in 12" :key="i" class="flex-1 border-r border-gray-200 last:border-r-0 relative">
              <span class="absolute -top-5 left-0 text-xs text-gray-500">
                {{ String((17 + i) % 24).padStart(2, '0') }}:00
              </span>
            </div>
          </div>
          
          <div 
            class="absolute top-2 bottom-2 bg-indigo-500 bg-opacity-20 rounded"
            :style="{ 
              left: `${Math.min(timelineBedPosition, timelineWakePosition)}%`, 
              width: `${Math.abs(timelineWakePosition - timelineBedPosition)}%` 
            }"
          >
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-sm font-medium text-indigo-700">
                {{ formattedDuration }}
              </span>
            </div>
          </div>
          
          <div 
            class="absolute top-0 bottom-0 w-1 bg-indigo-600 rounded cursor-ew-resize z-10"
            :style="{ left: `${timelineBedPosition}%` }"
            @mousedown="startDrag($event, 'bed')"
          >
            <div class="absolute -left-3 -top-1 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <i class="pi pi-moon text-white text-xs"></i>
            </div>
          </div>
          
          <div 
            class="absolute top-0 bottom-0 w-1 bg-yellow-500 rounded cursor-ew-resize z-10"
            :style="{ left: `${timelineWakePosition}%` }"
            @mousedown="startDrag($event, 'wake')"
          >
            <div class="absolute -left-3 -top-1 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <i class="pi pi-sun text-white text-xs"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4">
          <div class="text-sm text-gray-600">预计睡眠时长</div>
          <div class="text-2xl font-bold text-indigo-700">{{ formattedDuration }}</div>
        </div>
        <div class="bg-gradient-to-r" :class="qualityLevel.bg + ' rounded-lg p-4'">
          <div class="text-sm text-gray-600">预计质量评分</div>
          <div class="text-2xl font-bold" :class="qualityLevel.color">{{ estimatedScore }}/100</div>
          <div class="text-sm" :class="qualityLevel.color">{{ qualityLevel.label }}</div>
        </div>
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
          <div class="text-sm text-gray-600">状态</div>
          <div class="text-lg font-semibold text-gray-700">
            <span v-if="sleepDuration >= 420 && sleepDuration <= 540" class="text-green-600">
              <i class="pi pi-check-circle mr-1"></i>理想时长
            </span>
            <span v-else-if="sleepDuration < 420" class="text-orange-600">
              <i class="pi pi-exclamation-triangle mr-1"></i>时长不足
            </span>
            <span v-else class="text-blue-600">
              <i class="pi pi-info-circle mr-1"></i>时长较长
            </span>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          <i class="pi pi-sliders-h mr-2"></i>
          睡眠环境因素
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              卧室温度 (°C)
            </label>
            <input 
              type="range" 
              v-model.number="environmentFactors.temperature"
              min="10" 
              max="30" 
              step="1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              tabindex="4"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>10°C</span>
              <span class="font-medium text-gray-700">{{ environmentFactors.temperature }}°C</span>
              <span>30°C</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              室内湿度 (%)
            </label>
            <input 
              type="range" 
              v-model.number="environmentFactors.humidity"
              min="20" 
              max="80" 
              step="5"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              tabindex="5"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>20%</span>
              <span class="font-medium text-gray-700">{{ environmentFactors.humidity }}%</span>
              <span>80%</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              环境噪音
            </label>
            <select 
              v-model="environmentFactors.noise"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              tabindex="6"
            >
              <option value="quiet">安静 - 几乎没有声音</option>
              <option value="moderate">适中 - 轻微背景噪音</option>
              <option value="loud">嘈杂 - 明显干扰</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              卧室光线
            </label>
            <select 
              v-model="environmentFactors.light"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              tabindex="7"
            >
              <option value="dark">黑暗 - 完全无光</option>
              <option value="dim">昏暗 - 微弱光线</option>
              <option value="bright">明亮 - 有明显光源</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              压力水平
            </label>
            <select 
              v-model="environmentFactors.stress"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              tabindex="8"
            >
              <option value="low">低 - 放松状态</option>
              <option value="medium">中 - 有些焦虑</option>
              <option value="high">高 - 压力较大</option>
            </select>
          </div>

          <div class="space-y-4">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                v-model="environmentFactors.caffeine"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                tabindex="9"
              />
              <span class="ml-2 text-sm text-gray-700">
                <i class="pi pi-coffee mr-1"></i>
                睡前6小时内摄入咖啡因
              </span>
            </label>
            <label class="flex items-center">
              <input 
                type="checkbox" 
                v-model="environmentFactors.exercise"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                tabindex="10"
              />
              <span class="ml-2 text-sm text-gray-700">
                <i class="pi pi-heart mr-1"></i>
                睡前3小时内有运动
              </span>
            </label>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          <i class="pi pi-comment mr-2"></i>
          备注
        </label>
        <textarea 
          v-model="notes"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          placeholder="记录任何可能影响睡眠的因素..."
          tabindex="11"
        ></textarea>
      </div>

      <div class="flex justify-end space-x-4">
        <router-link 
          to="/"
          class="inline-flex items-center px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          取消
        </router-link>
        <button 
          @click="saveRecord"
          class="inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          tabindex="12"
        >
          <i class="pi pi-save mr-2"></i>
          保存记录
        </button>
      </div>
    </div>
  </div>
</template>
