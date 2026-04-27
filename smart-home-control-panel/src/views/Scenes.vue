<script setup>
import { ref } from 'vue'

const scenes = ref([
  {
    id: 1,
    name: '回家模式',
    description: '打开客厅灯光，调整空调温度',
    icon: 'home-outline',
    color: '#4ade80',
    active: true,
    devices: [
      { name: '客厅灯光', action: '开启' },
      { name: '智能空调', action: '设置为24°C' },
      { name: '智能窗帘', action: '打开至70%' }
    ]
  },
  {
    id: 2,
    name: '离家模式',
    description: '关闭所有灯光，开启安全系统',
    icon: 'log-out-outline',
    color: '#f87171',
    active: false,
    devices: [
      { name: '所有灯光', action: '关闭' },
      { name: '智能空调', action: '关闭' },
      { name: '智能门锁', action: '上锁' },
      { name: '安全系统', action: '布防' }
    ]
  },
  {
    id: 3,
    name: '睡眠模式',
    description: '调暗灯光，设置舒适温度',
    icon: 'moon-outline',
    color: '#a78bfa',
    active: false,
    devices: [
      { name: '卧室灯光', action: '调暗至30%' },
      { name: '智能空调', action: '设置为26°C' },
      { name: '智能窗帘', action: '关闭' }
    ]
  },
  {
    id: 4,
    name: '观影模式',
    description: '关闭灯光，打开电视',
    icon: 'film-outline',
    color: '#60a5fa',
    active: false,
    devices: [
      { name: '客厅灯光', action: '调暗至20%' },
      { name: '智能窗帘', action: '关闭' },
      { name: '电视', action: '打开' },
      { name: '智能空调', action: '设置为25°C' }
    ]
  },
  {
    id: 5,
    name: '早晨模式',
    description: '定时开启，迎接新的一天',
    icon: 'sunny-outline',
    color: '#fbbf24',
    active: false,
    devices: [
      { name: '卧室灯光', action: '逐渐亮起' },
      { name: '智能窗帘', action: '打开' },
      { name: '智能空调', action: '设置为24°C' }
    ],
    scheduled: true,
    scheduleTime: '07:00'
  },
  {
    id: 6,
    name: '工作模式',
    description: '开启书房设备，专注工作',
    icon: 'briefcase-outline',
    color: '#fb923c',
    active: false,
    devices: [
      { name: '书房灯光', action: '开启' },
      { name: '智能插座', action: '开启' },
      { name: '智能空调', action: '设置为23°C' }
    ]
  }
])

const showAddModal = ref(false)
const selectedScene = ref(null)

const activateScene = (scene) => {
  scenes.value.forEach(s => s.active = false)
  scene.active = true
  selectedScene.value = scene
}

const toggleSceneSchedule = (scene) => {
  scene.scheduled = !scene.scheduled
}

const deleteScene = (scene) => {
  const index = scenes.value.indexOf(scene)
  if (index > -1) {
    scenes.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="space-y-6">
    <n-card>
      <div class="flex items-center justify-between">
        <n-text class="text-lg font-medium">场景管理</n-text>
        <n-button type="primary" @click="showAddModal = true">
          <template #icon>
            <n-icon>
              <add-outline />
            </n-icon>
          </template>
          添加场景
        </n-button>
      </div>
    </n-card>

    <n-row :gutter="[16, 16]">
      <n-col :xs="24" :md="12" :lg="8" v-for="scene in scenes" :key="scene.id">
        <n-card 
          hoverable 
          :bordered="scene.active"
          :style="{ borderColor: scene.active ? scene.color : undefined }"
        >
          <div class="space-y-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <div 
                  class="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                  :style="{ backgroundColor: scene.color + '20' }"
                >
                  <n-icon :size="24" :color="scene.color">
                    <component :is="scene.icon" />
                  </n-icon>
                </div>
                <div>
                  <div class="font-medium text-gray-800">{{ scene.name }}</div>
                  <div class="text-xs text-gray-500">{{ scene.description }}</div>
                </div>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="text-xs font-medium text-gray-600">关联设备：</div>
              <div 
                v-for="device in scene.devices.slice(0, 3)" 
                :key="device.name"
                class="text-xs text-gray-500 flex items-center"
              >
                <n-icon size="12" class="mr-1">
                  <checkmark-circle-outline />
                </n-icon>
                {{ device.name }} - {{ device.action }}
              </div>
              <div v-if="scene.devices.length > 3" class="text-xs text-gray-400">
                还有 {{ scene.devices.length - 3 }} 个设备...
              </div>
            </div>
            
            <div class="flex items-center justify-between pt-2 border-t border-gray-100">
              <div class="flex items-center space-x-2">
                <n-switch 
                  :value="scene.active" 
                  @update:value="activateScene(scene)"
                />
                <n-text :tag="scene.active" type="success" v-if="scene.active">
                  已激活
                </n-text>
              </div>
              
              <n-space>
                <n-tooltip v-if="scene.scheduleTime" placement="top">
                  <template #trigger>
                    <n-button 
                      quaternary 
                      size="small" 
                      circle
                      @click="toggleSceneSchedule(scene)"
                      :type="scene.scheduled ? 'primary' : 'default'"
                    >
                      <template #icon>
                        <n-icon>
                          <alarm-outline />
                        </n-icon>
                      </template>
                    </n-button>
                  </template>
                  {{ scene.scheduleTime }}
                </n-tooltip>
                
                <n-dropdown :options="[{ label: '编辑', key: 'edit' }, { label: '删除', key: 'delete' }]" @select="(key) => key === 'delete' && deleteScene(scene)">
                  <n-button quaternary size="small" circle>
                    <template #icon>
                      <n-icon>
                        <ellipsis-horizontal-outline />
                      </n-icon>
                    </template>
                  </n-button>
                </n-dropdown>
              </n-space>
            </div>
          </div>
        </n-card>
      </n-col>
    </n-row>

    <n-modal v-model:show="showAddModal" preset="dialog" title="添加新场景" style="width: 500px">
      <div class="space-y-4">
        <n-form label-placement="left" label-width="80">
          <n-form-item label="场景名称">
            <n-input placeholder="请输入场景名称" />
          </n-form-item>
          <n-form-item label="场景描述">
            <n-input placeholder="请输入场景描述" />
          </n-form-item>
          <n-form-item label="选择图标">
            <n-space>
              <n-button circle>
                <template #icon>
                  <n-icon><home-outline /></n-icon>
                </template>
              </n-button>
              <n-button circle>
                <template #icon>
                  <n-icon><moon-outline /></n-icon>
                </template>
              </n-button>
              <n-button circle>
                <template #icon>
                  <n-icon><film-outline /></n-icon>
                </template>
              </n-button>
              <n-button circle>
                <template #icon>
                  <n-icon><sunny-outline /></n-icon>
                </template>
              </n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <n-space justify="end">
          <n-button @click="showAddModal = false">取消</n-button>
          <n-button type="primary" @click="showAddModal = false">确认</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script>
import {
  HomeOutline,
  LogOutOutline,
  MoonOutline,
  FilmOutline,
  SunnyOutline,
  BriefcaseOutline,
  AddOutline,
  CheckmarkCircleOutline,
  AlarmOutline,
  EllipsisHorizontalOutline
} from '@vicons/ionicons5'

export default {
  components: {
    HomeOutline,
    LogOutOutline,
    MoonOutline,
    FilmOutline,
    SunnyOutline,
    BriefcaseOutline,
    AddOutline,
    CheckmarkCircleOutline,
    AlarmOutline,
    EllipsisHorizontalOutline
  }
}
</script>
