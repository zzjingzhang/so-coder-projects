<script setup>
import { ref, computed } from 'vue'
import {
  BulbOutline,
  SnowOutline,
  ContractOutline,
  LockClosedOutline,
  CloudOutline,
  PowerOutline,
  TvOutline,
  EllipseOutline
} from '@vicons/ionicons5'

const iconMap = {
  'bulb-outline': BulbOutline,
  'snow-outline': SnowOutline,
  'contract-outline': ContractOutline,
  'lock-closed-outline': LockClosedOutline,
  'cloud-outline': CloudOutline,
  'power-outline': PowerOutline,
  'tv-outline': TvOutline
}

const devices = ref([
  {
    id: 1,
    name: '客厅灯光',
    room: '客厅',
    type: 'light',
    status: true,
    brightness: 80,
    color: '#ffffff',
    icon: BulbOutline,
    iconName: 'bulb-outline'
  },
  {
    id: 2,
    name: '卧室灯光',
    room: '卧室',
    type: 'light',
    status: false,
    brightness: 50,
    color: '#ffeb3b',
    icon: BulbOutline,
    iconName: 'bulb-outline'
  },
  {
    id: 3,
    name: '智能空调',
    room: '客厅',
    type: 'ac',
    status: true,
    temperature: 24,
    mode: 'cool',
    icon: SnowOutline,
    iconName: 'snow-outline'
  },
  {
    id: 4,
    name: '智能窗帘',
    room: '客厅',
    type: 'curtain',
    status: true,
    position: 70,
    icon: ContractOutline,
    iconName: 'contract-outline'
  },
  {
    id: 5,
    name: '智能门锁',
    room: '门口',
    type: 'lock',
    status: true,
    icon: LockClosedOutline,
    iconName: 'lock-closed-outline'
  },
  {
    id: 6,
    name: '空气净化器',
    room: '卧室',
    type: 'purifier',
    status: false,
    speed: 2,
    icon: CloudOutline,
    iconName: 'cloud-outline'
  },
  {
    id: 7,
    name: '智能插座',
    room: '书房',
    type: 'socket',
    status: true,
    icon: PowerOutline,
    iconName: 'power-outline'
  },
  {
    id: 8,
    name: '电视',
    room: '客厅',
    type: 'tv',
    status: false,
    icon: TvOutline,
    iconName: 'tv-outline'
  }
])

const selectedRoom = ref('全部')
const rooms = computed(() => {
  const roomSet = new Set(devices.value.map(d => d.room))
  return ['全部', ...roomSet]
})

const filteredDevices = computed(() => {
  if (selectedRoom.value === '全部') {
    return devices.value
  }
  return devices.value.filter(d => d.room === selectedRoom.value)
})

const toggleDevice = (device) => {
  device.status = !device.status
}

const getStatusColor = (status) => {
  return status ? '#10b981' : '#9ca3af'
}

const getStatusBgColor = (status) => {
  return status ? '#d1fae5' : '#f3f4f6'
}

const getStatusText = (status) => {
  return status ? '开启' : '关闭'
}
</script>

<template>
  <div class="space-y-6">
    <n-card>
      <n-space>
        <n-text class="text-lg font-medium">房间筛选：</n-text>
        <n-radio-group v-model:value="selectedRoom">
          <n-space>
            <n-radio-button v-for="room in rooms" :key="room" :value="room">
              {{ room }}
            </n-radio-button>
          </n-space>
        </n-radio-group>
      </n-space>
    </n-card>

    <n-row :gutter="[16, 16]">
      <n-col :xs="24" :sm="12" :md="8" :lg="6" v-for="device in filteredDevices" :key="device.id">
        <n-card hoverable>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center"
                :style="{ backgroundColor: getStatusBgColor(device.status) }"
              >
                <n-icon :size="24" :color="getStatusColor(device.status)">
                  <component :is="device.icon" />
                </n-icon>
              </div>
              <n-switch 
                :value="device.status" 
                @update:value="toggleDevice(device)"
              />
            </div>
            
            <div>
              <div class="font-medium" style="color: #1f2937">{{ device.name }}</div>
              <div class="text-sm" style="color: #6b7280">{{ device.room }}</div>
            </div>
            
            <div 
              class="inline-flex items-center px-2 py-1 rounded-full text-xs"
              :style="{ 
                backgroundColor: getStatusBgColor(device.status),
                color: getStatusColor(device.status)
              }"
            >
              <n-icon :size="12" class="mr-1">
                <ellipse-outline />
              </n-icon>
              {{ getStatusText(device.status) }}
            </div>
            
            <div v-if="device.status" class="space-y-2">
              <div v-if="device.type === 'light'">
                <div class="text-xs mb-1" style="color: #6b7280">亮度: {{ device.brightness }}%</div>
                <n-slider v-model:value="device.brightness" :min="0" :max="100" />
              </div>
              
              <div v-if="device.type === 'ac'">
                <div class="text-xs mb-1" style="color: #6b7280">温度: {{ device.temperature }}°C</div>
                <n-slider v-model:value="device.temperature" :min="16" :max="30" :step="1" />
              </div>
              
              <div v-if="device.type === 'curtain'">
                <div class="text-xs mb-1" style="color: #6b7280">开合度: {{ device.position }}%</div>
                <n-slider v-model:value="device.position" :min="0" :max="100" />
              </div>
              
              <div v-if="device.type === 'purifier'">
                <div class="text-xs mb-1" style="color: #6b7280">风速</div>
                <n-radio-group v-model:value="device.speed" size="small">
                  <n-radio :value="1">低</n-radio>
                  <n-radio :value="2">中</n-radio>
                  <n-radio :value="3">高</n-radio>
                </n-radio-group>
              </div>
            </div>
          </div>
        </n-card>
      </n-col>
    </n-row>
  </div>
</template>

<script>
import {
  BulbOutline,
  SnowOutline,
  ContractOutline,
  LockClosedOutline,
  CloudOutline,
  PowerOutline,
  TvOutline,
  EllipseOutline
} from '@vicons/ionicons5'

export default {
  components: {
    BulbOutline,
    SnowOutline,
    ContractOutline,
    LockClosedOutline,
    CloudOutline,
    PowerOutline,
    TvOutline,
    EllipseOutline
  }
}
</script>
