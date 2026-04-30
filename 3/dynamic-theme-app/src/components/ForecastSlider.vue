<template>
  <el-card class="theme-transition h-full">
    <template #header>
      <div class="flex items-center gap-2">
        <el-icon><Timer /></el-icon>
        <span class="font-semibold">天气预报</span>
      </div>
    </template>
    
    <div class="space-y-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm opacity-70">选择日期</span>
        <span class="font-medium">{{ selectedDateLabel }}</span>
      </div>
      
      <el-slider
        v-model="selectedDay"
        :min="0"
        :max="forecastData.length - 1"
        :marks="sliderMarks"
        show-tooltip
        :format-tooltip="formatTooltip"
      />
      
      <el-divider />
      
      <div class="mt-4">
        <h4 class="font-medium mb-3">未来7天预报</h4>
        <el-list>
          <el-list-item
            v-for="(item, index) in forecastData"
            :key="index"
            class="cursor-pointer rounded-lg transition-all"
            :class="{ 'bg-blue-50 dark:bg-blue-900/30': selectedDay === index }"
            @click="selectedDay = index"
          >
            <template #default>
              <div class="flex items-center justify-between w-full py-2">
                <div class="flex items-center gap-3">
                  <el-icon
                    class="text-2xl"
                    :style="{ color: getWeatherColor(item.type) }"
                  >
                    <component :is="getWeatherIcon(item.type)" />
                  </el-icon>
                  <div>
                    <div class="font-medium">{{ item.day }}</div>
                    <div class="text-xs opacity-70">{{ item.date }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-medium">{{ item.tempHigh }}° / {{ item.tempLow }}°</div>
                  <div class="text-xs opacity-70">{{ item.description }}</div>
                </div>
              </div>
            </template>
          </el-list-item>
        </el-list>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Sunny, Cloudy, Cloudy as Rainy } from '@element-plus/icons-vue'

const getWeatherIcon = (type) => {
  const icons = {
    sunny: Sunny,
    cloudy: Cloudy,
    rainy: Rainy,
    partlyCloudy: Sunny
  }
  return icons[type] || Sunny
}

const getWeatherColor = (type) => {
  const colors = {
    sunny: '#fbbf24',
    cloudy: '#94a3b8',
    rainy: '#60a5fa',
    partlyCloudy: '#f59e0b'
  }
  return colors[type] || '#fbbf24'
}

const generateForecastData = () => {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const today = new Date()
  const data = []
  
  const weatherTypes = ['sunny', 'partlyCloudy', 'cloudy', 'rainy']
  const descriptions = {
    sunny: '晴朗',
    partlyCloudy: '多云转晴',
    cloudy: '阴天',
    rainy: '小雨'
  }
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const type = weatherTypes[Math.floor(Math.random() * weatherTypes.length)]
    
    data.push({
      day: i === 0 ? '今天' : i === 1 ? '明天' : days[date.getDay()],
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      tempHigh: Math.floor(Math.random() * 15) + 20,
      tempLow: Math.floor(Math.random() * 10) + 10,
      type: type,
      description: descriptions[type]
    })
  }
  
  return data
}

const forecastData = ref(generateForecastData())
const selectedDay = ref(0)

const selectedDateLabel = computed(() => {
  const item = forecastData.value[selectedDay.value]
  return `${item.day} ${item.date}`
})

const sliderMarks = computed(() => {
  const marks = {}
  forecastData.value.forEach((item, index) => {
    marks[index] = item.day
  })
  return marks
})

const formatTooltip = (value) => {
  return forecastData.value[value].day
}
</script>
