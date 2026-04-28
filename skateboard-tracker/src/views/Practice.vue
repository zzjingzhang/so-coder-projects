<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { mockPracticeRecords, mockTricks } from '@/mock/data'
import type { PracticeRecord, Trick } from '@/types'

const practiceRecords = ref<PracticeRecord[]>([...mockPracticeRecords])
const tricks = ref<Trick[]>([...mockTricks])
const searchKeyword = ref('')
const filterDateRange = ref<[string, string] | null>(null)

const dialogVisible = ref(false)
const detailVisible = ref(false)
const isEdit = ref(false)
const loading = ref(false)
const selectedRecord = ref<PracticeRecord | null>(null)

const formRef = ref<FormInstance>()

const defaultForm: Omit<PracticeRecord, 'id'> = {
  date: new Date().toISOString().split('T')[0],
  duration: 60,
  location: '',
  tricks: [],
  notes: '',
  overallRating: 3
}

const form = reactive<Omit<PracticeRecord, 'id'>>({ ...defaultForm })

const rules: FormRules = {
  date: [
    { required: true, message: '请选择日期', trigger: 'change' }
  ],
  duration: [
    { required: true, message: '请输入练习时长', trigger: 'blur' },
    { type: 'number', min: 1, max: 480, message: '时长应在 1-480 分钟之间', trigger: 'blur' }
  ],
  location: [
    { required: true, message: '请输入练习地点', trigger: 'blur' }
  ]
}

const filteredRecords = computed(() => {
  return practiceRecords.value.filter(record => {
    const matchKeyword = searchKeyword.value
      ? record.location.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        record.notes.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        record.tricks.some(t => t.trickName.toLowerCase().includes(searchKeyword.value.toLowerCase()))
      : true
    
    let matchDate = true
    if (filterDateRange.value && filterDateRange.value.length === 2) {
      const recordDate = new Date(record.date)
      const startDate = new Date(filterDateRange.value[0])
      const endDate = new Date(filterDateRange.value[1])
      endDate.setHours(23, 59, 59, 999)
      matchDate = recordDate >= startDate && recordDate <= endDate
    }
    
    return matchKeyword && matchDate
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}小时${mins > 0 ? mins + '分钟' : ''}`
  }
  return `${mins}分钟`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

const getSuccessRate = (attempts: number, successful: number) => {
  if (attempts === 0) return 0
  return Math.round((successful / attempts) * 100)
}

const getSuccessRateColor = (rate: number) => {
  if (rate >= 70) return '#67c23a'
  if (rate >= 40) return '#e6a23c'
  return '#f56c6c'
}

const getRatingText = (rating: number) => {
  const texts = ['非常差', '较差', '一般', '不错', '非常好']
  return texts[rating - 1] || '未知'
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, {
    ...defaultForm,
    date: new Date().toISOString().split('T')[0],
    tricks: []
  })
  dialogVisible.value = true
}

const handleEdit = (row: PracticeRecord) => {
  isEdit.value = true
  Object.assign(form, {
    date: row.date,
    duration: row.duration,
    location: row.location,
    tricks: [...row.tricks],
    notes: row.notes,
    overallRating: row.overallRating
  })
  dialogVisible.value = true
}

const handleViewDetail = (row: PracticeRecord) => {
  selectedRecord.value = row
  detailVisible.value = true
}

const handleDelete = async (row: PracticeRecord) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除 ${row.date} 在 ${row.location} 的练习记录吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const index = practiceRecords.value.findIndex(r => r.id === row.id)
    if (index > -1) {
      practiceRecords.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  } catch {
    // 用户取消
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      
      try {
        if (isEdit.value) {
          const index = practiceRecords.value.findIndex(r => r.id === (practiceRecords.value as PracticeRecord[])[0]?.id)
          if (index > -1) {
            practiceRecords.value[index] = {
              ...practiceRecords.value[index],
              ...form
            }
          }
          ElMessage.success('更新成功')
        } else {
          const newRecord: PracticeRecord = {
            id: Date.now().toString(),
            ...form
          }
          practiceRecords.value.unshift(newRecord)
          ElMessage.success('添加成功')
        }
        dialogVisible.value = false
      } finally {
        loading.value = false
      }
    }
  })
}

const addTrickToForm = () => {
  form.tricks.push({
    trickId: '',
    trickName: '',
    attempts: 0,
    successfulAttempts: 0,
    progressNotes: ''
  })
}

const removeTrickFromForm = (index: number) => {
  form.tricks.splice(index, 1)
}

const onTrickSelect = (index: number, trickId: string) => {
  const trick = tricks.value.find(t => t.id === trickId)
  if (trick) {
    form.tricks[index].trickName = trick.name
  }
}

const resetFilters = () => {
  searchKeyword.value = ''
  filterDateRange.value = null
}

onMounted(() => {
  // 按日期倒序排列
  practiceRecords.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <div class="practice-page">
    <div class="page-header flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">练习记录</h1>
        <p class="text-gray-500 mt-1">记录你的滑板训练时间和技巧进步</p>
      </div>
      <el-button type="primary" @click="handleAdd">
        <el-icon class="mr-1"><Plus /></el-icon>
        新增记录
      </el-button>
    </div>

    <el-card class="mb-6">
      <el-form :inline="true" :model="{ searchKeyword, filterDateRange }">
        <el-form-item label="搜索">
          <el-input
            v-model="searchKeyword"
            placeholder="地点、备注、技巧名称"
            clearable
            class="w-56"
          />
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="filterDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            class="w-64"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetFilters">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="records-list" v-if="filteredRecords.length > 0">
      <el-card
        v-for="record in filteredRecords"
        :key="record.id"
        class="record-card mb-4 hover:shadow-lg transition-shadow"
      >
        <div class="record-header flex items-start justify-between mb-4">
          <div>
            <div class="flex items-center mb-2">
              <el-icon class="text-xl text-orange-500 mr-2">
                <Calendar />
              </el-icon>
              <span class="text-lg font-semibold text-gray-800">{{ formatDate(record.date) }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-500">
              <el-icon class="mr-1"><Location /></el-icon>
              <span>{{ record.location }}</span>
              <span class="mx-2">·</span>
              <el-icon class="mr-1"><Timer /></el-icon>
              <span>{{ formatDuration(record.duration) }}</span>
              <span class="mx-2">·</span>
              <el-rate v-model="record.overallRating" disabled :max="5" size="small" />
              <span class="ml-2 text-gray-600">{{ getRatingText(record.overallRating) }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <el-button type="primary" link size="small" @click="handleViewDetail(record)">
              详情
            </el-button>
            <el-button type="primary" link size="small" @click="handleEdit(record)">
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="handleDelete(record)">
              删除
            </el-button>
          </div>
        </div>
        
        <div class="record-tricks mb-4">
          <div class="text-sm font-medium text-gray-700 mb-2">练习的技巧：</div>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="(t, index) in record.tricks"
              :key="index"
              class="trick-item bg-gray-50 rounded-lg p-3 border border-gray-100"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-gray-800">{{ t.trickName }}</span>
                <span 
                  class="text-sm font-bold"
                  :style="{ color: getSuccessRateColor(getSuccessRate(t.attempts, t.successfulAttempts)) }"
                >
                  {{ getSuccessRate(t.attempts, t.successfulAttempts) }}%
                </span>
              </div>
              <div class="text-xs text-gray-500">
                尝试 {{ t.attempts }} 次，成功 {{ t.successfulAttempts }} 次
              </div>
              <el-progress
                :percentage="getSuccessRate(t.attempts, t.successfulAttempts)"
                :stroke-width="6"
                :show-text="false"
                :color="getSuccessRateColor(getSuccessRate(t.attempts, t.successfulAttempts))"
                class="mt-2"
              />
            </div>
          </div>
        </div>
        
        <div v-if="record.notes" class="record-notes bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div class="flex items-start">
            <el-icon class="text-blue-500 mr-2 mt-0.5"><InfoFilled /></el-icon>
            <div>
              <span class="text-sm font-medium text-blue-700">备注：</span>
              <span class="text-sm text-blue-800">{{ record.notes }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    
    <el-empty v-else :description="searchKeyword || filterDateRange ? '没有找到匹配的练习记录' : '暂无练习记录，点击上方按钮添加第一条记录'" />

    <el-dialog
      :title="isEdit ? '编辑练习记录' : '新增练习记录'"
      v-model="dialogVisible"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="mt-4"
      >
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
            class="w-full"
          />
        </el-form-item>
        <el-form-item label="时长" prop="duration">
          <el-input-number
            v-model="form.duration"
            :min="1"
            :max="480"
            :step="15"
            placeholder="练习时长（分钟）"
            class="w-full"
          />
          <span class="text-xs text-gray-500 ml-2">建议单次练习 30-120 分钟</span>
        </el-form-item>
        <el-form-item label="地点" prop="location">
          <el-input v-model="form.location" placeholder="如：城市滑板公园、社区广场" />
        </el-form-item>
        <el-form-item label="评分">
          <el-rate v-model="form.overallRating" :max="5" show-text :texts="['非常差', '较差', '一般', '不错', '非常好']" />
        </el-form-item>
        
        <el-form-item label="练习技巧">
          <div class="w-full">
            <div
              v-for="(t, index) in form.tricks"
              :key="index"
              class="trick-form-item bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200"
            >
              <div class="flex items-start gap-3">
                <div class="flex-1">
                  <el-select
                    v-model="t.trickId"
                    placeholder="选择技巧"
                    class="w-full mb-2"
                    @change="(val: string) => onTrickSelect(index, val)"
                  >
                    <el-option
                      v-for="trick in tricks"
                      :key="trick.id"
                      :label="trick.name"
                      :value="trick.id"
                    />
                  </el-select>
                  <div class="flex gap-3">
                    <el-form-item class="mb-0 flex-1">
                      <label class="text-xs text-gray-500 block mb-1">尝试次数</label>
                      <el-input-number
                        v-model="t.attempts"
                        :min="0"
                        :max="200"
                        size="small"
                        class="w-full"
                      />
                    </el-form-item>
                    <el-form-item class="mb-0 flex-1">
                      <label class="text-xs text-gray-500 block mb-1">成功次数</label>
                      <el-input-number
                        v-model="t.successfulAttempts"
                        :min="0"
                        :max="t.attempts"
                        size="small"
                        class="w-full"
                      />
                    </el-form-item>
                  </div>
                  <el-form-item class="mb-0 mt-2">
                    <el-input
                      v-model="t.progressNotes"
                      type="textarea"
                      :rows="1"
                      placeholder="进步备注（可选）"
                      size="small"
                    />
                  </el-form-item>
                </div>
                <el-button type="danger" text @click="removeTrickFromForm(index)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
            <el-button type="primary" link @click="addTrickToForm">
              <el-icon class="mr-1"><Plus /></el-icon>添加技巧
            </el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="备注">
          <el-input
            v-model="form.notes"
            type="textarea"
            :rows="3"
            placeholder="记录今天的练习感受、进步或需要改进的地方..."
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      title="练习详情"
      v-model="detailVisible"
      width="600px"
    >
      <div v-if="selectedRecord" class="detail-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="日期">{{ formatDate(selectedRecord.date) }}</el-descriptions-item>
          <el-descriptions-item label="时长">{{ formatDuration(selectedRecord.duration) }}</el-descriptions-item>
          <el-descriptions-item label="地点" :span="2">{{ selectedRecord.location }}</el-descriptions-item>
          <el-descriptions-item label="总体评价" :span="2">
            <el-rate v-model="selectedRecord.overallRating" disabled :max="5" />
            <span class="ml-2 text-gray-600">{{ getRatingText(selectedRecord.overallRating) }}</span>
          </el-descriptions-item>
        </el-descriptions>
        
        <div class="mt-6">
          <h4 class="font-medium text-gray-800 mb-3">练习的技巧详情</h4>
          <div class="space-y-4">
            <div
              v-for="(t, index) in selectedRecord.tricks"
              :key="index"
              class="bg-gray-50 rounded-lg p-4 border border-gray-100"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="font-semibold text-gray-800">{{ t.trickName }}</span>
                <span 
                  class="text-lg font-bold px-3 py-1 rounded-full"
                  :style="{ 
                    color: getSuccessRateColor(getSuccessRate(t.attempts, t.successfulAttempts)),
                    backgroundColor: getSuccessRateColor(getSuccessRate(t.attempts, t.successfulAttempts)) + '20'
                  }"
                >
                  成功率 {{ getSuccessRate(t.attempts, t.successfulAttempts) }}%
                </span>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div class="text-sm">
                  <span class="text-gray-500">尝试次数：</span>
                  <span class="font-medium text-gray-800">{{ t.attempts }} 次</span>
                </div>
                <div class="text-sm">
                  <span class="text-gray-500">成功次数：</span>
                  <span class="font-medium text-gray-800">{{ t.successfulAttempts }} 次</span>
                </div>
              </div>
              <el-progress
                :percentage="getSuccessRate(t.attempts, t.successfulAttempts)"
                :stroke-width="10"
                :color="getSuccessRateColor(getSuccessRate(t.attempts, t.successfulAttempts))"
              />
              <div v-if="t.progressNotes" class="mt-3 text-sm text-gray-600 bg-white rounded p-2 border border-gray-200">
                <span class="text-gray-500">备注：</span>{{ t.progressNotes }}
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="selectedRecord.notes" class="mt-6">
          <h4 class="font-medium text-gray-800 mb-2">练习备注</h4>
          <div class="bg-blue-50 rounded-lg p-4 border border-blue-100 text-blue-800">
            {{ selectedRecord.notes }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.practice-page {
  min-height: calc(100vh - 120px);
}

.record-card :deep(.el-card__body) {
  padding: 20px;
}

.trick-form-item {
  transition: all 0.2s;
}

.trick-form-item:hover {
  border-color: #409eff;
}
</style>
