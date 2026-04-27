<script setup>
import { ref, onMounted } from 'vue'

const stats = ref([
  { title: '在线设备', value: 12, icon: 'settings-outline', color: '#4ade80' },
  { title: '活跃场景', value: 5, icon: 'layers-outline', color: '#60a5fa' },
  { title: '自动化规则', value: 8, icon: 'flash-outline', color: '#f472b6' },
  { title: '今日能耗', value: '15.2 kWh', icon: 'battery-half-outline', color: '#fbbf24' }
])

const recentActivities = ref([
  { id: 1, device: '客厅灯光', action: '已开启', time: '5分钟前', type: 'success' },
  { id: 2, device: '智能空调', action: '温度调整至24°C', time: '15分钟前', type: 'info' },
  { id: 3, device: '安全系统', action: '已布防', time: '1小时前', type: 'warning' },
  { id: 4, device: '智能窗帘', action: '已关闭', time: '2小时前', type: 'success' }
])

const quickActions = ref([
  { name: '回家模式', icon: 'home-outline', color: '#4ade80' },
  { name: '离家模式', icon: 'log-out-outline', color: '#f87171' },
  { name: '睡眠模式', icon: 'moon-outline', color: '#a78bfa' },
  { name: '观影模式', icon: 'film-outline', color: '#60a5fa' }
])
</script>

<template>
  <div class="space-y-6">
    <n-row :gutter="[16, 16]">
      <n-col :span="6" v-for="stat in stats" :key="stat.title">
        <n-card hoverable>
          <div class="flex items-center">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              :style="{ backgroundColor: stat.color + '20' }"
            >
              <n-icon :size="24" :color="stat.color">
                <component :is="stat.icon" />
              </n-icon>
            </div>
            <div>
              <div class="text-2xl font-bold text-gray-800">{{ stat.value }}</div>
              <div class="text-sm text-gray-500">{{ stat.title }}</div>
            </div>
          </div>
        </n-card>
      </n-col>
    </n-row>

    <n-row :gutter="[16, 16]">
      <n-col :span="16">
        <n-card title="快捷场景">
          <n-row :gutter="[16, 16]">
            <n-col :span="6" v-for="action in quickActions" :key="action.name">
              <n-card hoverable class="text-center cursor-pointer">
                <div 
                  class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                  :style="{ backgroundColor: action.color + '20' }"
                >
                  <n-icon :size="28" :color="action.color">
                    <component :is="action.icon" />
                  </n-icon>
                </div>
                <div class="font-medium text-gray-800">{{ action.name }}</div>
              </n-card>
            </n-col>
          </n-row>
        </n-card>
      </n-col>

      <n-col :span="8">
        <n-card title="最近活动">
          <n-timeline>
            <n-timeline-item
              v-for="activity in recentActivities"
              :key="activity.id"
              :type="activity.type"
            >
              <template #time>
                {{ activity.time }}
              </template>
              <div class="font-medium">{{ activity.device }}</div>
              <div class="text-sm text-gray-500">{{ activity.action }}</div>
            </n-timeline-item>
          </n-timeline>
        </n-card>
      </n-col>
    </n-row>
  </div>
</template>

<script>
import {
  SettingsOutline,
  LayersOutline,
  FlashOutline,
  BatteryHalfOutline,
  HomeOutline,
  LogOutOutline,
  MoonOutline,
  FilmOutline
} from '@vicons/ionicons5'

export default {
  components: {
    SettingsOutline,
    LayersOutline,
    FlashOutline,
    BatteryHalfOutline,
    HomeOutline,
    LogOutOutline,
    MoonOutline,
    FilmOutline
  }
}
</script>
