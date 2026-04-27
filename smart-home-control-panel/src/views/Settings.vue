<script setup>
import { ref } from 'vue'

const theme = ref('light')
const language = ref('zh-CN')
const notifications = ref(true)
const autoSync = ref(true)
const dataRetention = ref('30')
const brightness = ref(100)

const saveSettings = () => {
  // 模拟保存设置
  console.log('保存设置:', {
    theme,
    language,
    notifications,
    autoSync,
    dataRetention,
    brightness
  })
}
</script>

<template>
  <div class="space-y-6">
    <n-row :gutter="[16, 16]">
      <n-col :span="16">
        <n-card title="基本设置" class="mb-6">
          <n-form label-placement="left" label-width="120">
            <n-form-item label="主题模式">
              <n-radio-group v-model:value="theme">
                <n-radio-button value="light">浅色</n-radio-button>
                <n-radio-button value="dark">深色</n-radio-button>
                <n-radio-button value="auto">跟随系统</n-radio-button>
              </n-radio-group>
            </n-form-item>
            
            <n-form-item label="语言设置">
              <n-select 
                v-model:value="language"
                :options="[
                  { label: '简体中文', value: 'zh-CN' },
                  { label: '繁體中文', value: 'zh-TW' },
                  { label: 'English', value: 'en-US' }
                ]"
                style="width: 200px"
              />
            </n-form-item>
            
            <n-form-item label="通知设置">
              <n-space align="center">
                <n-switch v-model:value="notifications" />
                <n-text type="secondary">接收设备状态变更通知</n-text>
              </n-space>
            </n-form-item>
            
            <n-form-item label="自动同步">
              <n-space align="center">
                <n-switch v-model:value="autoSync" />
                <n-text type="secondary">自动同步设备状态到云端</n-text>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>

        <n-card title="数据设置" class="mb-6">
          <n-form label-placement="left" label-width="120">
            <n-form-item label="数据保留">
              <n-select 
                v-model:value="dataRetention"
                :options="[
                  { label: '7 天', value: '7' },
                  { label: '30 天', value: '30' },
                  { label: '90 天', value: '90' },
                  { label: '永久', value: 'forever' }
                ]"
                style="width: 200px"
              />
              <n-text type="secondary" depth="3" class="ml-3">
                历史数据保留时长
              </n-text>
            </n-form-item>
            
            <n-form-item label="界面亮度">
              <n-space align="center" style="width: 100%">
                <n-icon size="18">
                  <sunny-outline />
                </n-icon>
                <n-slider v-model:value="brightness" :min="0" :max="100" style="flex: 1; max-width: 300px" />
                <n-text type="secondary">{{ brightness }}%</n-text>
              </n-space>
            </n-form-item>
          </n-form>
        </n-card>

        <n-card title="危险操作">
          <n-space vertical>
            <n-alert type="warning" title="注意">
              以下操作不可恢复，请谨慎操作
            </n-alert>
            <n-space>
              <n-button type="warning">
                <template #icon>
                  <n-icon>
                    <refresh-outline />
                  </n-icon>
                </template>
                清除缓存
              </n-button>
              <n-button type="error">
                <template #icon>
                  <n-icon>
                    <trash-outline />
                  </n-icon>
                </template>
                重置所有设置
              </n-button>
            </n-space>
          </n-space>
        </n-card>
      </n-col>

      <n-col :span="8">
        <n-card title="关于" class="mb-6">
          <div class="text-center space-y-4">
            <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto">
              <n-icon size="40" color="white">
                <home-outline />
              </n-icon>
            </div>
            <div>
              <div class="text-xl font-bold text-gray-800">智能家居控制面板</div>
              <div class="text-sm text-gray-500">Smart Home Control Panel</div>
            </div>
            <n-divider />
            <div class="space-y-2 text-left">
              <div class="flex justify-between">
                <n-text type="secondary">版本号</n-text>
                <n-text>v1.0.0</n-text>
              </div>
              <div class="flex justify-between">
                <n-text type="secondary">构建时间</n-text>
                <n-text>2024-01-15</n-text>
              </div>
              <div class="flex justify-between">
                <n-text type="secondary">设备数量</n-text>
                <n-text>12 台</n-text>
              </div>
            </div>
          </div>
        </n-card>

        <n-card title="快速操作">
          <n-space vertical style="width: 100%">
            <n-button block type="primary" @click="saveSettings">
              <template #icon>
                <n-icon>
                  <save-outline />
                </n-icon>
              </template>
              保存设置
            </n-button>
            <n-button block>
              <template #icon>
                <n-icon>
                  <help-circle-outline />
                </n-icon>
              </template>
              帮助中心
            </n-button>
            <n-button block>
              <template #icon>
                <n-icon>
                  <chatbox-outline />
                </n-icon>
              </template>
              联系客服
            </n-button>
          </n-space>
        </n-card>
      </n-col>
    </n-row>
  </div>
</template>

<script>
import {
  SunnyOutline,
  RefreshOutline,
  TrashOutline,
  HomeOutline,
  SaveOutline,
  HelpCircleOutline,
  ChatboxOutline
} from '@vicons/ionicons5'

export default {
  components: {
    SunnyOutline,
    RefreshOutline,
    TrashOutline,
    HomeOutline,
    SaveOutline,
    HelpCircleOutline,
    ChatboxOutline
  }
}
</script>
