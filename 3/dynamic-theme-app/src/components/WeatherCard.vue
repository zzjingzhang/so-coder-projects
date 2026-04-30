<template>
  <el-card class="theme-transition h-full">
    <template #header>
      <div class="flex items-center gap-2">
        <el-icon><PartlyCloudy /></el-icon>
        <span class="font-semibold">天气信息</span>
      </div>
    </template>
    
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-2xl font-bold">{{ weather.location }}</div>
          <div class="text-sm opacity-70">{{ weather.date }}</div>
        </div>
        <el-icon class="text-5xl" :style="{ color: weather.iconColor }">
          <component :is="weather.icon" />
        </el-icon>
      </div>
      
      <div class="text-center py-4">
        <span class="text-5xl font-bold">{{ weather.temperature }}</span>
        <span class="text-2xl">°C</span>
        <div class="text-lg mt-2">{{ weather.description }}</div>
      </div>
      
      <el-divider />
      
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-2">
          <el-icon class="text-lg"><WindPower /></el-icon>
          <div>
            <div class="text-xs opacity-70">风速</div>
            <div class="font-medium">{{ weather.windSpeed }} km/h</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <el-icon class="text-lg"><WaterMelon /></el-icon>
          <div>
            <div class="text-xs opacity-70">湿度</div>
            <div class="font-medium">{{ weather.humidity }}%</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue'
import { Sunny, Cloudy, Cloudy as Rainy, PartlyCloudy } from '@element-plus/icons-vue'

const weatherIcons = {
  sunny: Sunny,
  cloudy: Cloudy,
  rainy: Rainy,
  partlyCloudy: PartlyCloudy
}

const weather = reactive({
  location: '北京',
  date: new Date().toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  }),
  temperature: 24,
  description: '晴朗',
  icon: weatherIcons.sunny,
  iconColor: '#fbbf24',
  windSpeed: 12,
  humidity: 65
})
</script>
