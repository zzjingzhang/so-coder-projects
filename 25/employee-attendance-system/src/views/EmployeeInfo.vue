<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  NButton,
  NCard,
  NDataTable,
  NInput,
  NSelect,
  NModal,
  NUpload,
  NUploadDragger,
  useMessage,
  NSpin,
  NEmpty,
  NIcon,
  NBackTop
} from 'naive-ui'
import { getEmployees, setEmployees, initSummary } from '@/store/data'
import * as XLSX from 'xlsx'

const router = useRouter()
const message = useMessage()

const employees = ref([])
const loading = ref(false)
const showUploadModal = ref(false)
const fileInput = ref(null)
const selectedFile = ref(null)
const previewData = ref([])

const createColumns = () => [
  {
    title: '工号',
    key: 'id',
    width: 120,
    align: 'center'
  },
  {
    title: '姓名',
    key: 'name',
    width: 120,
    align: 'center'
  },
  {
    title: '年级',
    key: 'grade',
    width: 120,
    align: 'center'
  },
  {
    title: '职位',
    key: 'position',
    width: 150,
    align: 'center'
  }
]

const columns = createColumns()

const loadEmployees = () => {
  employees.value = getEmployees()
}

onMounted(() => {
  loadEmployees()
})

const handleFileChange = (file) => {
  const fileObj = file.file.file
  if (!fileObj) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)
      
      if (jsonData.length === 0) {
        message.error('Excel文件为空')
        return
      }
      
      previewData.value = jsonData.map((row, index) => ({
        id: String(row['工号'] || row['id'] || index + 1).trim(),
        name: String(row['姓名'] || row['name'] || '').trim(),
        grade: String(row['年级'] || row['grade'] || '').trim(),
        position: String(row['职位'] || row['position'] || '').trim()
      })).filter(row => row.id && row.name)
      
      if (previewData.value.length === 0) {
        message.error('未找到有效的员工数据，请确保Excel包含"工号"和"姓名"列')
        return
      }
      
      message.info(`已读取 ${previewData.value.length} 条记录，请确认后导入`)
      selectedFile.value = file
    } catch (error) {
      message.error('文件解析失败，请确保是有效的Excel文件')
      console.error(error)
    }
  }
  reader.readAsArrayBuffer(fileObj)
}

const confirmImport = () => {
  if (previewData.value.length === 0) {
    message.warning('没有可导入的数据')
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    setEmployees(previewData.value)
    initSummary()
    loadEmployees()
    loading.value = false
    showUploadModal.value = false
    previewData.value = []
    selectedFile.value = null
    message.success(`成功导入 ${previewData.value.length || employees.value.length} 条员工信息`)
  }, 500)
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen p-6">
    <NBackTop />
    
    <NCard class="shadow-xl bg-white/95 backdrop-blur-sm">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <NButton @click="goBack">
            <span class="text-lg">←</span> 返回
          </NButton>
          <h2 class="text-2xl font-bold text-gray-800">员工信息管理</h2>
        </div>
        <NButton type="primary" size="large" @click="showUploadModal = true">
          <span class="mr-2">📤</span> 信息录入（Excel导入）
        </NButton>
      </div>
      
      <div class="mt-4">
        <NSpin :show="loading">
          <div v-if="employees.length > 0">
            <NDataTable
              :columns="columns"
              :data="employees"
              :bordered="true"
              :single-line="false"
              size="large"
              class="w-full"
            />
            <div class="mt-4 text-center text-gray-500">
              共 <span class="font-bold text-blue-600">{{ employees.length }}</span> 条记录
            </div>
          </div>
          <div v-else class="py-20">
            <NEmpty description="暂无员工数据，请导入Excel文件">
              <template #icon>
                <NIcon size="48" class="text-gray-400">
                  <span>📋</span>
                </NIcon>
              </template>
            </NEmpty>
          </div>
        </NSpin>
      </div>
    </NCard>
    
    <NModal
      v-model:show="showUploadModal"
      preset="card"
      title="导入员工信息"
      style="width: 700px"
    >
      <div class="py-4">
        <div class="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 class="font-semibold text-blue-800 mb-2">Excel格式要求：</h4>
          <p class="text-sm text-blue-700 mb-1">• 第一行为表头，包含：工号、姓名、年级、职位</p>
          <p class="text-sm text-blue-700 mb-1">• 年级可选值：高一、高二、高三</p>
          <p class="text-sm text-blue-700">• 职位可选值：班主任、副班主任、中层领导、其他职位</p>
        </div>
        
        <NUpload
          :max="1"
          accept=".xlsx,.xls"
          :show-file-list="false"
          @change="handleFileChange"
        >
          <NUploadDragger class="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <div class="text-center">
              <span class="text-4xl block mb-2">📁</span>
              <p class="text-gray-600">点击或拖拽Excel文件到此处上传</p>
              <p class="text-sm text-gray-400 mt-1">支持 .xlsx, .xls 格式</p>
            </div>
          </NUploadDragger>
        </NUpload>
        
        <div v-if="previewData.length > 0" class="mt-6">
          <h4 class="font-semibold text-gray-700 mb-3">数据预览（仅显示前10条）：</h4>
          <NDataTable
            :columns="columns"
            :data="previewData.slice(0, 10)"
            :bordered="true"
            size="small"
          />
          <p class="text-sm text-gray-500 mt-2 text-center">
            共 {{ previewData.length }} 条记录
            <span v-if="previewData.length > 10">，仅显示前10条</span>
          </p>
        </div>
      </div>
      
      <template #action>
        <div class="flex justify-end gap-3">
          <NButton @click="showUploadModal = false">取消</NButton>
          <NButton
            type="primary"
            :disabled="previewData.length === 0"
            :loading="loading"
            @click="confirmImport"
          >
            确认导入
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>
