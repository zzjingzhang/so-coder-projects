<script setup>
import { ref, onMounted } from 'vue'
import { useSleepStore } from '../stores/sleep'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { exportData, importData, clearAllData } from '../data/storage'

const store = useSleepStore()
const toast = useToast()
const confirm = useConfirm()

const fileInput = ref(null)

function handleExport() {
  exportData()
  toast.add({
    severity: 'success',
    summary: '导出成功',
    detail: '睡眠数据已导出为JSON文件',
    life: 3000
  })
}

function triggerImport() {
  fileInput.value?.click()
}

function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const success = importData(e.target.result)
      if (success) {
        store.initialize()
        toast.add({
          severity: 'success',
          summary: '导入成功',
          detail: '睡眠数据已导入',
          life: 3000
        })
      } else {
        toast.add({
          severity: 'error',
          summary: '导入失败',
          detail: '数据格式不正确',
          life: 3000
        })
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: '导入失败',
        detail: '无法解析文件',
        life: 3000
      })
    }
  }
  reader.readAsText(file)
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function handleClearData() {
  confirm.require({
    message: '确定要清除所有睡眠数据吗？此操作不可撤销。',
    header: '清除所有数据',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      clearAllData()
      store.initialize()
      toast.add({
        severity: 'info',
        summary: '已清除',
        detail: '所有睡眠数据已清除',
        life: 3000
      })
    },
    reject: () => {
      toast.add({
        severity: 'info',
        summary: '已取消',
        detail: '操作已取消',
        life: 3000
      })
    }
  })
}

function loadSampleData() {
  const sampleRecords = generateSampleRecords()
  sampleRecords.forEach(r => store.addRecord(r))
  toast.add({
    severity: 'success',
    summary: '加载成功',
    detail: '已加载30条示例数据',
    life: 3000
  })
}

function generateSampleRecords() {
  const records = []
  const now = new Date()
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    const baseBedHour = 22 + Math.floor(Math.random() * 3)
    const baseBedMin = Math.floor(Math.random() * 4) * 15
    const baseWakeHour = 6 + Math.floor(Math.random() * 2)
    const baseWakeMin = Math.floor(Math.random() * 4) * 15
    
    const baseScore = 55 + Math.floor(Math.random() * 40)
    
    records.push({
      date: date.toISOString(),
      bedTime: `${String(baseBedHour).padStart(2, '0')}:${String(baseBedMin).padStart(2, '0')}`,
      wakeTime: `${String(baseWakeHour).padStart(2, '0')}:${String(baseWakeMin).padStart(2, '0')}`,
      qualityScore: baseScore,
      notes: i < 3 ? '昨晚做了一个好梦' : '',
      environmentFactors: {
        temperature: 16 + Math.floor(Math.random() * 8),
        humidity: 40 + Math.floor(Math.random() * 30),
        noise: ['quiet', 'moderate'][Math.floor(Math.random() * 2)],
        light: ['dark', 'dim'][Math.floor(Math.random() * 2)],
        caffeine: Math.random() > 0.8,
        exercise: Math.random() > 0.6,
        stress: ['low', 'medium'][Math.floor(Math.random() * 2)]
      }
    })
  }
  
  return records
}

onMounted(() => {
  store.initialize()
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-900">
      <i class="pi pi-cog mr-2"></i>
      设置
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          <i class="pi pi-database mr-2"></i>
          数据管理
        </h2>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="text-sm font-medium text-gray-900">睡眠记录</h3>
              <p class="text-xs text-gray-500 mt-1">当前共有 {{ store.records.length }} 条记录</p>
            </div>
            <span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
              {{ store.records.length }} 条
            </span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="text-sm font-medium text-gray-900">成就解锁</h3>
              <p class="text-xs text-gray-500 mt-1">已解锁 {{ store.achievements.length }} 个成就</p>
            </div>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
              {{ store.achievements.length }} 个
            </span>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          <i class="pi pi-download mr-2"></i>
          导入/导出
        </h2>
        
        <div class="space-y-4">
          <button 
            @click="handleExport"
            class="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <i class="pi pi-download mr-2"></i>
            导出睡眠数据 (JSON)
          </button>

          <input 
            ref="fileInput"
            type="file" 
            accept=".json"
            class="hidden"
            @change="handleFileChange"
          />
          <button 
            @click="triggerImport"
            class="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <i class="pi pi-upload mr-2"></i>
            导入睡眠数据
          </button>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          <i class="pi pi-star mr-2"></i>
          快捷操作
        </h2>
        
        <div class="space-y-4">
          <button 
            @click="loadSampleData"
            class="w-full inline-flex items-center justify-center px-4 py-3 border border-green-300 shadow-sm text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <i class="pi pi-plus-circle mr-2"></i>
            加载示例数据 (30条)
          </button>

          <p class="text-xs text-gray-500 text-center">
            加载示例数据可以帮助您体验应用的完整功能
          </p>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          <i class="pi pi-exclamation-triangle mr-2 text-red-500"></i>
          危险操作
        </h2>
        
        <div class="space-y-4">
          <button 
            @click="handleClearData"
            class="w-full inline-flex items-center justify-center px-4 py-3 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <i class="pi pi-trash mr-2"></i>
            清除所有数据
          </button>

          <p class="text-xs text-red-500 text-center">
            此操作将永久删除所有睡眠数据，且无法恢复
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        <i class="pi pi-keyboard mr-2"></i>
        键盘快捷键
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono shadow-sm">
            Ctrl + S
          </kbd>
          <span class="text-sm text-gray-700">快速导航到记录页面</span>
        </div>
        
        <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono shadow-sm">
            Tab
          </kbd>
          <span class="text-sm text-gray-700">在表单字段间切换</span>
        </div>
        
        <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono shadow-sm">
            Enter
          </kbd>
          <span class="text-sm text-gray-700">保存睡眠记录</span>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        <i class="pi pi-info-circle mr-2"></i>
        关于
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">睡眠质量追踪器</h3>
          <p class="text-sm text-gray-600 mb-4">
            一款帮助您记录、分析和改善睡眠质量的应用。通过追踪睡眠时间、睡眠阶段和环境因素，提供个性化的睡眠建议。
          </p>
          <div class="text-xs text-gray-500">
            <p>版本: 1.0.0</p>
            <p>技术栈: Vue 3 + Tailwind CSS + PrimeVue</p>
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">功能特性</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><i class="pi pi-check text-green-500 mr-2"></i>拖拽调整睡眠时间段</li>
            <li><i class="pi pi-check text-green-500 mr-2"></i>睡眠阶段图表分析</li>
            <li><i class="pi pi-check text-green-500 mr-2"></i>环境因素记录</li>
            <li><i class="pi pi-check text-green-500 mr-2"></i>个性化睡眠建议</li>
            <li><i class="pi pi-check text-green-500 mr-2"></i>目标设置与成就系统</li>
            <li><i class="pi pi-check text-green-500 mr-2"></i>数据导入/导出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
