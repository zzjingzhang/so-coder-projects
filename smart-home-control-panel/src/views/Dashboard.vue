<script setup>
import { ref, h } from 'vue'
import { NIcon } from 'naive-ui'
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

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const stats = ref([
  { 
    title: '在线设备', 
    value: 12, 
    icon: SettingsOutline, 
    iconName: 'settings-outline',
    color: '#10b981',
    bgColor: '#d1fae5'
  },
  { 
    title: '活跃场景', 
    value: 5, 
    icon: LayersOutline, 
    iconName: 'layers-outline',
    color: '#3b82f6',
    bgColor: '#dbeafe'
  },
  { 
    title: '自动化规则', 
    value: 8, 
    icon: FlashOutline, 
    iconName: 'flash-outline',
    color: '#ec4899',
    bgColor: '#fce7f3'
  },
  { 
    title: '今日能耗', 
    value: '15.2 kWh', 
    icon: BatteryHalfOutline, 
    iconName: 'battery-half-outline',
    color: '#f59e0b',
    bgColor: '#fef3c7'
  }
])

const recentActivities = ref([
  { id: 1, device: '客厅灯光', action: '已开启', time: '5分钟前', type: 'success' },
  { id: 2, device: '智能空调', action: '温度调整至24°C', time: '15分钟前', type: 'info' },
  { id: 3, device: '安全系统', action: '已布防', time: '1小时前', type: 'warning' },
  { id: 4, device: '智能窗帘', action: '已关闭', time: '2小时前', type: 'success' }
])

const quickActions = ref([
  { name: '回家模式', icon: HomeOutline, iconName: 'home-outline', color: '#10b981', bgColor: '#d1fae5' },
  { name: '离家模式', icon: LogOutOutline, iconName: 'log-out-outline', color: '#ef4444', bgColor: '#fee2e2' },
  { name: '睡眠模式', icon: MoonOutline, iconName: 'moon-outline', color: '#8b5cf6', bgColor: '#ede9fe' },
  { name: '观影模式', icon: FilmOutline, iconName: 'film-outline', color: '#3b82f6', bgColor: '#dbeafe' }
])
</script>

<template>
  <div class="space-y-6">
    <n-row :gutter="[16, 16]">
      <n-col :xs="24" :sm="12" :md="6" v-for="stat in stats" :key="stat.title">
        <n-card hoverable>
          <div class="flex items-center">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center mr-4"
              :style="{ backgroundColor: stat.bgColor }"
            >
              <n-icon :size="24" :color="stat.color">
                <component :is="stat.icon" />
              </n-icon>
            </div>
            <div>
              <div class="text-2xl font-bold" style="color: #1f2937">{{ stat.value }}</div>
              <div class="text-sm" style="color: #6b7280">{{ stat.title }}</div>
            </div>
          </div>
        </n-card>
      </n-col>
    </n-row>

    <n-row :gutter="[16, 16]">
      <n-col :span="16">
        <n-card title="快捷场景">
          <n-row :gutter="[16, 16]">
            <n-col :xs="24" :sm="12" :md="6" v-for="action in quickActions" :key="action.name">
              <n-card hoverable class="text-center cursor-pointer">
                <div 
                  class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                  :style="{ backgroundColor: action.bgColor }"
                >
                  <n-icon :size="28" :color="action.color">
                    <component :is="action.icon" />
                  </n-icon>
                </div>
                <div class="font-medium" style="color: #1f2937">{{ action.name }}</div>
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
              <div class="font-medium" style="color: #1f2937">{{ activity.device }}</div>
              <div class="text-sm" style="color: #6b7280">{{ activity.action }}</div>
            </n-timeline-item>
          </n-timeline>
        </n-card>
      </n-col>
    </n-row>
  </div>
</template>
