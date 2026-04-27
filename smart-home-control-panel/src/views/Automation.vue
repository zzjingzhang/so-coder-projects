<script setup>
import { ref } from 'vue'

const rules = ref([
  {
    id: 1,
    name: '温度过高自动开空调',
    description: '当室内温度超过28°C时，自动开启空调',
    enabled: true,
    trigger: {
      type: 'temperature',
      condition: '>',
      value: 28,
      unit: '°C'
    },
    actions: [
      { device: '智能空调', action: '开启', temperature: 24 }
    ],
    lastTriggered: '今天 14:30'
  },
  {
    id: 2,
    name: '日落自动关窗帘',
    description: '根据日落时间自动关闭窗帘',
    enabled: true,
    trigger: {
      type: 'sunset',
      time: '18:30'
    },
    actions: [
      { device: '智能窗帘', action: '关闭' }
    ],
    lastTriggered: '昨天 18:32'
  },
  {
    id: 3,
    name: '有人进入自动开灯',
    description: '检测到有人进入房间时自动开启灯光',
    enabled: true,
    trigger: {
      type: 'motion',
      location: '客厅'
    },
    actions: [
      { device: '客厅灯光', action: '开启' }
    ],
    lastTriggered: '今天 09:15'
  },
  {
    id: 4,
    name: '早上7点唤醒模式',
    description: '工作日早上7点自动开启唤醒场景',
    enabled: false,
    trigger: {
      type: 'schedule',
      time: '07:00',
      days: ['周一', '周二', '周三', '周四', '周五']
    },
    actions: [
      { device: '卧室灯光', action: '逐渐亮起' },
      { device: '智能窗帘', action: '打开' }
    ],
    lastTriggered: null
  },
  {
    id: 5,
    name: 'PM2.5超标自动净化',
    description: '当PM2.5指数超过100时自动开启空气净化器',
    enabled: true,
    trigger: {
      type: 'pm25',
      condition: '>',
      value: 100,
      unit: 'μg/m³'
    },
    actions: [
      { device: '空气净化器', action: '开启', speed: 3 }
    ],
    lastTriggered: '3天前'
  }
])

const showAddModal = ref(false)
const editingRule = ref(null)

const toggleRule = (rule) => {
  rule.enabled = !rule.enabled
}

const deleteRule = (rule) => {
  const index = rules.value.indexOf(rule)
  if (index > -1) {
    rules.value.splice(index, 1)
  }
}

const editRule = (rule) => {
  editingRule.value = rule
  showAddModal.value = true
}

const getTriggerText = (trigger) => {
  switch (trigger.type) {
    case 'temperature':
      return `温度 ${trigger.condition} ${trigger.value}${trigger.unit}`
    case 'sunset':
      return `日落时间 (${trigger.time})`
    case 'motion':
      return `${trigger.location} 检测到移动`
    case 'schedule':
      return `${trigger.days.join('、')} ${trigger.time}`
    case 'pm25':
      return `PM2.5 ${trigger.condition} ${trigger.value}${trigger.unit}`
    default:
      return '未知触发器'
  }
}

const getTriggerIcon = (type) => {
  const icons = {
    temperature: 'thermometer-outline',
    sunset: 'moon-outline',
    motion: 'eye-outline',
    schedule: 'alarm-outline',
    pm25: 'cloud-outline'
  }
  return icons[type] || 'help-circle-outline'
}
</script>

<template>
  <div class="space-y-6">
    <n-card>
      <div class="flex items-center justify-between">
        <n-text class="text-lg font-medium">自动化规则</n-text>
        <n-button type="primary" @click="showAddModal = true; editingRule = null">
          <template #icon>
            <n-icon>
              <add-outline />
            </n-icon>
          </template>
          添加规则
        </n-button>
      </div>
    </n-card>

    <n-card>
      <n-data-table
        :columns="columns"
        :data="rules"
        :row-key="(row) => row.id"
      >
        <template #name="{ row }">
          <div class="flex items-center">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              :style="{ backgroundColor: row.enabled ? '#dcfce7' : '#f3f4f6' }"
            >
              <n-icon :size="18" :color="row.enabled ? '#166534' : '#6b7280'">
                <component :is="getTriggerIcon(row.trigger.type)" />
              </n-icon>
            </div>
            <div>
              <div class="font-medium text-gray-800">{{ row.name }}</div>
              <div class="text-xs text-gray-500">{{ row.description }}</div>
            </div>
          </div>
        </template>
        
        <template #trigger="{ row }">
          <div class="text-sm">
            <span class="text-gray-600">触发条件：</span>
            <span class="text-gray-800 font-medium">{{ getTriggerText(row.trigger) }}</span>
          </div>
          <div class="text-xs text-gray-500 mt-1">
            执行动作：{{ row.actions.length }} 个设备
          </div>
        </template>
        
        <template #status="{ row }">
          <n-space>
            <n-switch 
              :value="row.enabled" 
              @update:value="toggleRule(row)"
            />
            <n-tag :type="row.enabled ? 'success' : 'default'" :bordered="false" size="small">
              {{ row.enabled ? '已启用' : '已禁用' }}
            </n-tag>
          </n-space>
        </template>
        
        <template #lastTriggered="{ row }">
          <n-text v-if="row.lastTriggered" type="secondary" depth="3">
            {{ row.lastTriggered }}
          </n-text>
          <n-text v-else type="secondary" depth="3">
            从未触发
          </n-text>
        </template>
        
        <template #actions="{ row }">
          <n-space>
            <n-button size="small" quaternary @click="editRule(row)">
              编辑
            </n-button>
            <n-popconfirm
              positive-text="确认"
              negative-text="取消"
              @positive-click="deleteRule(row)"
            >
              <template #trigger>
                <n-button size="small" quaternary type="error">
                  删除
                </n-button>
              </template>
              确认删除该规则？
            </n-popconfirm>
          </n-space>
        </template>
      </n-data-table>
    </n-card>

    <n-modal v-model:show="showAddModal" preset="dialog" :title="editingRule ? '编辑规则' : '添加新规则'" style="width: 600px">
      <div class="space-y-4">
        <n-form label-placement="left" label-width="100">
          <n-form-item label="规则名称">
            <n-input placeholder="请输入规则名称" :value="editingRule?.name" />
          </n-form-item>
          <n-form-item label="规则描述">
            <n-input placeholder="请输入规则描述" :value="editingRule?.description" />
          </n-form-item>
          <n-form-item label="触发类型">
            <n-select 
              placeholder="请选择触发类型"
              :options="[
                { label: '温度触发', value: 'temperature' },
                { label: '日落触发', value: 'sunset' },
                { label: '移动检测', value: 'motion' },
                { label: '定时触发', value: 'schedule' },
                { label: 'PM2.5触发', value: 'pm25' }
              ]"
            />
          </n-form-item>
          <n-form-item label="执行动作">
            <n-button size="small">
              <template #icon>
                <n-icon>
                  <add-outline />
                </n-icon>
              </template>
              添加动作
            </n-button>
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
import { h } from 'vue'
import {
  AddOutline,
  ThermometerOutline,
  MoonOutline,
  EyeOutline,
  AlarmOutline,
  CloudOutline,
  HelpCircleOutline
} from '@vicons/ionicons5'

export default {
  components: {
    AddOutline,
    ThermometerOutline,
    MoonOutline,
    EyeOutline,
    AlarmOutline,
    CloudOutline,
    HelpCircleOutline
  },
  setup() {
    const columns = [
      {
        title: '规则名称',
        key: 'name',
        width: 250,
        render: (row) => h('div', { style: 'white-space: nowrap' }, row.name)
      },
      {
        title: '触发条件',
        key: 'trigger',
        width: 250,
        render: (row) => h('div', { style: 'white-space: nowrap' }, row.trigger)
      },
      {
        title: '状态',
        key: 'status',
        width: 120,
        align: 'center'
      },
      {
        title: '上次触发',
        key: 'lastTriggered',
        width: 150,
        align: 'center'
      },
      {
        title: '操作',
        key: 'actions',
        width: 150,
        align: 'center',
        fixed: 'right'
      }
    ]
    
    return { columns }
  }
}
</script>
