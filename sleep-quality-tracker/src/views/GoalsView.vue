<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSleepStore } from '../stores/sleep'
import { useToast } from 'primevue/usetoast'
import { AchievementType } from '../data/models'

const store = useSleepStore()
const toast = useToast()

const targetSleepHours = ref(8)
const targetBedTime = ref('23:00')
const targetWakeTime = ref('07:00')
const idealTemperature = ref(18)
const idealHumidity = ref(50)
const avoidCaffeineAfter = ref('14:00')
const exerciseBeforeSleep = ref(false)

const allAchievements = computed(() => [
  {
    type: AchievementType.FIRST_WEEK,
    name: '第一周',
    description: '连续记录睡眠一周',
    icon: 'pi pi-calendar',
    unlocked: store.hasAchievement(AchievementType.FIRST_WEEK),
    progress: Math.min(store.records.length, 7),
    total: 7
  },
  {
    type: AchievementType.GOOD_SLEEP_STREAK_7,
    name: '周优质睡眠',
    description: '连续7天获得良好睡眠质量',
    icon: 'pi pi-star',
    unlocked: store.hasAchievement(AchievementType.GOOD_SLEEP_STREAK_7),
    progress: Math.min(store.goodSleepStreak, 7),
    total: 7
  },
  {
    type: AchievementType.GOOD_SLEEP_STREAK_30,
    name: '月优质睡眠',
    description: '连续30天获得良好睡眠质量',
    icon: 'pi pi-trophy',
    unlocked: store.hasAchievement(AchievementType.GOOD_SLEEP_STREAK_30),
    progress: Math.min(store.goodSleepStreak, 30),
    total: 30
  },
  {
    type: AchievementType.PERFECT_SLEEP,
    name: '完美睡眠',
    description: '获得一次95分以上的完美睡眠',
    icon: 'pi pi-crown',
    unlocked: store.hasAchievement(AchievementType.PERFECT_SLEEP),
    progress: store.records.filter(r => r.qualityScore >= 95).length > 0 ? 1 : 0,
    total: 1
  },
  {
    type: AchievementType.EARLY_BIRD_7,
    name: '早起达人',
    description: '7天在5-7点之间起床',
    icon: 'pi pi-sun',
    unlocked: store.hasAchievement(AchievementType.EARLY_BIRD_7),
    progress: Math.min(store.records.filter(r => {
      const wakeHour = parseInt(r.wakeTime.split(':')[0])
      return wakeHour >= 5 && wakeHour <= 7
    }).length, 7),
    total: 7
  },
  {
    type: AchievementType.ENVIRONMENT_EXPERT,
    name: '环境专家',
    description: '记录10次完整的睡眠环境数据',
    icon: 'pi pi-sliders-h',
    unlocked: store.hasAchievement(AchievementType.ENVIRONMENT_EXPERT),
    progress: Math.min(store.records.filter(r => 
      r.environmentFactors && Object.keys(r.environmentFactors).length >= 5
    ).length, 10),
    total: 10
  }
])

function saveGoals() {
  store.setGoals({
    targetSleepHours: targetSleepHours.value,
    targetBedTime: targetBedTime.value,
    targetWakeTime: targetWakeTime.value,
    idealTemperature: idealTemperature.value,
    idealHumidity: idealHumidity.value,
    avoidCaffeineAfter: avoidCaffeineAfter.value,
    exerciseBeforeSleep: exerciseBeforeSleep.value
  })
  
  toast.add({
    severity: 'success',
    summary: '保存成功',
    detail: '睡眠目标已保存',
    life: 3000
  })
}

onMounted(() => {
  store.initialize()
  
  if (store.goals) {
    targetSleepHours.value = store.goals.targetSleepHours
    targetBedTime.value = store.goals.targetBedTime
    targetWakeTime.value = store.goals.targetWakeTime
    idealTemperature.value = store.goals.idealTemperature
    idealHumidity.value = store.goals.idealHumidity
    avoidCaffeineAfter.value = store.goals.avoidCaffeineAfter
    exerciseBeforeSleep.value = store.goals.exerciseBeforeSleep
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-900">
      <i class="pi pi-flag mr-2"></i>
      目标与成就
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          <i class="pi pi-bullseye mr-2"></i>
          睡眠目标设置
        </h2>
        
        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              目标睡眠时长 (小时/晚)
            </label>
            <div class="flex items-center space-x-4">
              <input 
                type="range" 
                v-model.number="targetSleepHours"
                min="5" 
                max="12" 
                step="0.5"
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span class="text-lg font-semibold text-indigo-600 w-16 text-center">
                {{ targetSleepHours }}h
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="pi pi-moon text-indigo-500 mr-1"></i>
                目标上床时间
              </label>
              <input 
                type="time" 
                v-model="targetBedTime"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="pi pi-sun text-yellow-500 mr-1"></i>
                目标起床时间
              </label>
              <input 
                type="time" 
                v-model="targetWakeTime"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              理想卧室温度 (°C)
            </label>
            <div class="flex items-center space-x-4">
              <input 
                type="range" 
                v-model.number="idealTemperature"
                min="10" 
                max="30" 
                step="1"
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span class="text-lg font-semibold text-indigo-600 w-16 text-center">
                {{ idealTemperature }}°C
              </span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              理想室内湿度 (%)
            </label>
            <div class="flex items-center space-x-4">
              <input 
                type="range" 
                v-model.number="idealHumidity"
                min="20" 
                max="80" 
                step="5"
                class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span class="text-lg font-semibold text-indigo-600 w-16 text-center">
                {{ idealHumidity }}%
              </span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              避免咖啡因摄入的时间 (之后)
            </label>
            <input 
              type="time" 
              v-model="avoidCaffeineAfter"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
            />
          </div>

          <div>
            <label class="flex items-center">
              <input 
                type="checkbox" 
                v-model="exerciseBeforeSleep"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700">
                我会在睡前3小时内进行运动
              </span>
            </label>
          </div>

          <div class="pt-4 border-t">
            <button 
              @click="saveGoals"
              class="w-full inline-flex items-center justify-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-150"
            >
              <i class="pi pi-save mr-2"></i>
              保存目标设置
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          <i class="pi pi-trophy mr-2"></i>
          成就系统
        </h2>

        <div class="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">成就解锁进度</span>
            <span class="text-sm font-semibold text-indigo-600">
              {{ store.achievements.length }} / {{ allAchievements.length }}
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              class="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              :style="{ width: `${(store.achievements.length / allAchievements.length) * 100}%` }"
            ></div>
          </div>
        </div>

        <div class="space-y-3">
          <div 
            v-for="achievement in allAchievements" 
            :key="achievement.type"
            class="relative overflow-hidden rounded-lg border-2 transition-all duration-300"
            :class="{
              'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300': achievement.unlocked,
              'bg-gray-50 border-gray-200': !achievement.unlocked
            }"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div 
                  class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  :class="{
                    'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg': achievement.unlocked,
                    'bg-gray-300': !achievement.unlocked
                  }"
                >
                  <i 
                    :class="[
                      achievement.icon,
                      'text-xl transition-all',
                      achievement.unlocked ? 'text-white' : 'text-gray-500'
                    ]"
                  ></i>
                </div>
                <div class="ml-4 flex-1">
                  <div class="flex items-center justify-between">
                    <h4 
                      class="text-sm font-semibold"
                      :class="{
                        'text-gray-900': achievement.unlocked,
                        'text-gray-500': !achievement.unlocked
                      }"
                    >
                      {{ achievement.name }}
                    </h4>
                    <i 
                      v-if="achievement.unlocked"
                      class="pi pi-check-circle text-green-500"
                    ></i>
                    <i 
                      v-else
                      class="pi pi-lock text-gray-400"
                    ></i>
                  </div>
                  <p 
                    class="text-xs mt-1"
                    :class="{
                      'text-gray-600': achievement.unlocked,
                      'text-gray-400': !achievement.unlocked
                    }"
                  >
                    {{ achievement.description }}
                  </p>
                  
                  <div class="mt-2">
                    <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>进度</span>
                      <span>{{ achievement.progress }} / {{ achievement.total }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        class="h-1.5 rounded-full transition-all duration-500"
                        :class="achievement.unlocked ? 'bg-green-500' : 'bg-indigo-500'"
                        :style="{ width: `${Math.min((achievement.progress / achievement.total) * 100, 100)}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="store.achievements.length > 0" class="mt-6 pt-4 border-t">
          <h3 class="text-sm font-medium text-gray-700 mb-3">已解锁的成就</h3>
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="a in store.achievements" 
              :key="a.type"
              class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200"
            >
              <i :class="a.icon" class="mr-1.5"></i>
              {{ a.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        <i class="pi pi-chart-bar mr-2"></i>
        目标达成追踪
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-3xl font-bold text-indigo-600 mb-1">
            {{ store.currentStreak }}
          </div>
          <div class="text-sm text-gray-600">连续记录天数</div>
          <div class="mt-2 text-xs text-gray-500">
            当前目标: {{ targetSleepHours }}小时/晚
          </div>
        </div>
        
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-3xl font-bold text-green-600 mb-1">
            {{ store.goodSleepStreak }}
          </div>
          <div class="text-sm text-gray-600">连续优质睡眠</div>
          <div class="mt-2 text-xs text-gray-500">
            优质睡眠: 70分以上
          </div>
        </div>
        
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-3xl font-bold text-purple-600 mb-1">
            {{ store.records.length }}
          </div>
          <div class="text-sm text-gray-600">总记录天数</div>
          <div class="mt-2 text-xs text-gray-500">
            继续坚持记录更多数据
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
