<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  NButton,
  NCard,
  NInput,
  NSelect,
  NModal,
  useMessage,
  NDataTable,
  NEmpty,
  NTag,
  NAlert,
  NBackTop,
  NSpin
} from 'naive-ui'
import { getEmployeesByFilter, processAttendance, getSummary } from '@/store/data'

const router = useRouter()
const message = useMessage()

const selectedGrade = ref(null)
const selectedPosition = ref(null)
const employeeIds = ref('')
const loading = ref(false)
const absentList = ref([])
const showResult = ref(false)

const gradeOptions = [
  { label: '全部年级', value: null },
  { label: '高一', value: '高一' },
  { label: '高二', value: '高二' },
  { label: '高三', value: '高三' }
]

const positionOptions = [
  { label: '全部职位', value: null },
  { label: '班主任', value: '班主任' },
  { label: '副班主任', value: '副班主任' },
  { label: '中层领导', value: '中层领导' },
  { label: '其他职位', value: '其他职位' }
]

const targetEmployees = computed(() => {
  return getEmployeesByFilter(selectedGrade.value, selectedPosition.value)
})

const leaveEmployees = computed(() => {
  const summary = getSummary()
  return summary.filter(s => 
    s.onLeave && 
    targetEmployees.value.some(e => e.id === s.id)
  )
})

const columns = [
  {
    title: '工号',
    key: 'id',
    width: 150,
    align: 'center'
  },
  {
    title: '姓名',
    key: 'name',
    width: 150,
    align: 'center'
  }
]

const statsColumns = [
  {
    title: '类别',
    key: 'category',
    width: 150,
    align: 'center'
  },
  {
    title: '人数',
    key: 'count',
    width: 100,
    align: 'center'
  }
]

const stats = computed(() => {
  if (!showResult.value) return []
  const total = targetEmployees.value.length
  const leaveCount = leaveEmployees.value.length
  const absentCount = absentList.value.length
  const attendedCount = total - leaveCount - absentCount
  
  return [
    { category: '总人数', count: total },
    { category: '请假人数', count: leaveCount },
    { category: '签到人数', count: attendedCount },
    { category: '未签到人数', count: absentCount }
  ]
})

const handleAttendance = () => {
  if (targetEmployees.value.length === 0) {
    message.warning('当前筛选条件下没有员工，请先导入员工信息或调整筛选条件')
    return
  }
  
  if (!employeeIds.value.trim()) {
    message.warning('请输入签到人员的工号')
    return
  }
  
  const ids = employeeIds.value.split('.').map(id => id.trim()).filter(id => id)
  
  if (ids.length === 0) {
    message.warning('未检测到有效工号')
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    absentList.value = processAttendance(ids, selectedGrade.value, selectedPosition.value)
    showResult.value = true
    loading.value = false
    message.success(`签到处理完成，未签到人数：${absentList.value.length}`)
  }, 500)
}

const copyAbsentList = () => {
  const text = absentList.value.map(item => `${item.id} - ${item.name}`).join('\n')
  navigator.clipboard.writeText(text).then(() => {
    message.success('已复制到剪贴板')
  }).catch(() => {
    message.error('复制失败，请手动复制')
  })
}

const goBack = () => {
  router.push('/')
}

const resetForm = () => {
  employeeIds.value = ''
  showResult.value = false
  absentList.value = []
}

const getGradeLabel = (value) => {
  return gradeOptions.find(o => o.value === value)?.label || '全部年级'
}

const getPositionLabel = (value) => {
  return positionOptions.find(o => o.value === value)?.label || '全部职位'
}
</script>

<template>
  <div class="min-h-screen p-6">
    <NBackTop />
    
    <NCard class="shadow-xl bg-white/95 backdrop-blur-sm">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <NButton @click="goBack">
            <span class="text-lg">←</span> 返回
          </NButton>
          <h2 class="text-2xl font-bold text-gray-800">签到管理</h2>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label class="block text-gray-700 font-semibold mb-3">选择年级：</label>
          <NSelect
            v-model:value="selectedGrade"
            :options="gradeOptions"
            placeholder="请选择年级"
            size="large"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-3">选择职位：</label>
          <NSelect
            v-model:value="selectedPosition"
            :options="positionOptions"
            placeholder="请选择职位"
            size="large"
          />
        </div>
      </div>
      
      <div class="mb-6 p-4 bg-blue-50 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-gray-600">当前筛选条件：</span>
            <NTag type="info" class="ml-2">{{ getGradeLabel(selectedGrade) }}</NTag>
            <NTag type="info" class="ml-2">{{ getPositionLabel(selectedPosition) }}</NTag>
          </div>
          <div class="text-gray-700">
            共 <span class="font-bold text-blue-600 text-lg">{{ targetEmployees.length }}</span> 人
            <span v-if="leaveEmployees.length > 0">，其中请假 
              <span class="font-bold text-orange-600">{{ leaveEmployees.length }}</span> 人
            </span>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <label class="block text-gray-700 font-semibold mb-3">
          输入签到人员工号（工号之间用"."隔开）：
        </label>
        <NInput
          v-model:value="employeeIds"
          type="textarea"
          placeholder="例如：001.002.003.004"
          :rows="5"
          size="large"
          :disabled="showResult"
        />
        <p class="text-sm text-gray-500 mt-2">
          💡 提示：请假人员不需要输入，系统会自动处理
        </p>
      </div>
      
      <div class="flex justify-center gap-4 mb-8">
        <NButton
          type="primary"
          size="large"
          :loading="loading"
          :disabled="showResult"
          @click="handleAttendance"
        >
          <span class="mr-2">✅</span> 确认签到
        </NButton>
        <NButton
          type="default"
          size="large"
          @click="resetForm"
        >
          重新签到
        </NButton>
      </div>
      
      <div v-if="showResult" class="border-t pt-8">
        <NAlert type="info" class="mb-6">
          <template #icon>
            <span class="text-xl">📊</span>
          </template>
          <div class="font-semibold">签到统计</div>
        </NAlert>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">统计数据：</h3>
            <NDataTable
              :columns="statsColumns"
              :data="stats"
              :bordered="true"
              size="large"
              :single-line="false"
            />
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                未签到人员名单：
                <NTag type="error" size="large" class="ml-2">{{ absentList.length }} 人</NTag>
              </h3>
              <NButton
                v-if="absentList.length > 0"
                type="warning"
                size="medium"
                @click="copyAbsentList"
              >
                <span class="mr-1">📋</span> 一键复制
              </NButton>
            </div>
            
            <NSpin :show="loading">
              <div v-if="absentList.length > 0">
                <NDataTable
                  :columns="columns"
                  :data="absentList"
                  :bordered="true"
                  size="large"
                />
              </div>
              <div v-else class="py-12">
                <NEmpty description="太棒了！所有人都已签到">
                  <template #icon>
                    <span class="text-4xl">🎉</span>
                  </template>
                </NEmpty>
              </div>
            </NSpin>
          </div>
        </div>
        
        <div v-if="leaveEmployees.length > 0" class="mt-8">
          <NAlert type="warning" title="请假人员（已自动排除在签到统计外）">
            <div class="flex flex-wrap gap-2 mt-2">
              <NTag
                v-for="emp in leaveEmployees"
                :key="emp.id"
                type="warning"
                size="large"
              >
                {{ emp.id }} - {{ emp.name }}
              </NTag>
            </div>
          </NAlert>
        </div>
      </div>
    </NCard>
  </div>
</template>
