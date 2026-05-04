<script setup>
import { ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import {
  NButton,
  NCard,
  NDataTable,
  NModal,
  NInput,
  useMessage,
  useDialog,
  NEmpty,
  NTag,
  NSelect,
  NBackTop
} from 'naive-ui'
import { getSummary, verifyPassword, clearAllData, getEmployees } from '@/store/data'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()

const summaryData = ref([])
const showClearModal = ref(false)
const clearPassword = ref('')
const selectedGrade = ref(null)
const selectedPosition = ref(null)

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

const columns = [
  {
    title: '工号',
    key: 'id',
    width: 120,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '姓名',
    key: 'name',
    width: 120,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '年级',
    key: 'grade',
    width: 100,
    align: 'center'
  },
  {
    title: '职务',
    key: 'position',
    width: 120,
    align: 'center'
  },
  {
    title: '状态',
    key: 'onLeave',
    width: 100,
    align: 'center',
    render(row) {
      return row.onLeave
        ? h(NTag, { type: 'warning', size: 'small' }, { default: () => '请假中' })
        : h(NTag, { type: 'success', size: 'small' }, { default: () => '正常' })
    }
  },
  {
    title: '成功签到次数',
    key: 'attendanceCount',
    width: 130,
    align: 'center',
    render(row) {
      return h('span', { class: 'font-semibold text-green-600' }, row.attendanceCount)
    }
  },
  {
    title: '未签到次数',
    key: 'absentCount',
    width: 120,
    align: 'center',
    render(row) {
      return h('span', { class: 'font-semibold text-red-600' }, row.absentCount)
    }
  },
  {
    title: '请假次数',
    key: 'leaveCount',
    width: 120,
    align: 'center',
    render(row) {
      return h('span', { class: 'font-semibold text-orange-600' }, row.leaveCount)
    }
  }
]

const filteredData = ref([])

const loadData = () => {
  const employees = getEmployees()
  const summary = getSummary()
  
  if (summary.length === 0 && employees.length > 0) {
    summaryData.value = employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      grade: emp.grade,
      position: emp.position,
      attendanceCount: 0,
      absentCount: 0,
      leaveCount: 0,
      onLeave: false
    }))
  } else {
    summaryData.value = summary
  }
  
  applyFilter()
}

const applyFilter = () => {
  filteredData.value = summaryData.value.filter(item => {
    let match = true
    if (selectedGrade.value) {
      match = match && item.grade === selectedGrade.value
    }
    if (selectedPosition.value) {
      match = match && item.position === selectedPosition.value
    }
    return match
  })
}

onMounted(() => {
  loadData()
})

const handleFilter = () => {
  applyFilter()
}

const handleClearClick = () => {
  showClearModal.value = true
  clearPassword.value = ''
}

const confirmClear = () => {
  if (verifyPassword(clearPassword.value)) {
    dialog.warning({
      title: '确认清除',
      content: '确定要清除所有汇总数据吗？此操作不可恢复！',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        clearAllData()
        loadData()
        message.success('数据已清除')
        showClearModal.value = false
      }
    })
  } else {
    message.error('密码错误')
  }
}

const goBack = () => {
  router.push('/')
}

const getTotalStats = () => {
  const totalAttendance = filteredData.value.reduce((sum, item) => sum + item.attendanceCount, 0)
  const totalAbsent = filteredData.value.reduce((sum, item) => sum + item.absentCount, 0)
  const totalLeave = filteredData.value.reduce((sum, item) => sum + item.leaveCount, 0)
  return { totalAttendance, totalAbsent, totalLeave }
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
          <h2 class="text-2xl font-bold text-gray-800">数据汇总</h2>
        </div>
        <NButton type="error" size="large" @click="handleClearClick">
          <span class="mr-2">🗑️</span> 一键清除
        </NButton>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label class="block text-gray-700 font-semibold mb-3">筛选年级：</label>
          <NSelect
            v-model:value="selectedGrade"
            :options="gradeOptions"
            placeholder="请选择年级"
            size="large"
            @update:value="handleFilter"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-3">筛选职位：</label>
          <NSelect
            v-model:value="selectedPosition"
            :options="positionOptions"
            placeholder="请选择职位"
            size="large"
            @update:value="handleFilter"
          />
        </div>
        <div class="flex items-end">
          <NButton type="primary" size="large" @click="loadData">
            <span class="mr-2">🔄</span> 刷新数据
          </NButton>
        </div>
      </div>
      
      <div v-if="filteredData.length > 0" class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 class="font-semibold text-gray-800 mb-3">📊 汇总统计（当前筛选条件下）：</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-white rounded-lg shadow-sm">
            <p class="text-gray-500 text-sm">总人数</p>
            <p class="text-3xl font-bold text-gray-800 mt-1">{{ filteredData.length }}</p>
          </div>
          <div class="text-center p-4 bg-white rounded-lg shadow-sm">
            <p class="text-gray-500 text-sm">总签到次数</p>
            <p class="text-3xl font-bold text-green-600 mt-1">{{ getTotalStats().totalAttendance }}</p>
          </div>
          <div class="text-center p-4 bg-white rounded-lg shadow-sm">
            <p class="text-gray-500 text-sm">总未签到次数</p>
            <p class="text-3xl font-bold text-red-600 mt-1">{{ getTotalStats().totalAbsent }}</p>
          </div>
          <div class="text-center p-4 bg-white rounded-lg shadow-sm">
            <p class="text-gray-500 text-sm">总请假次数</p>
            <p class="text-3xl font-bold text-orange-600 mt-1">{{ getTotalStats().totalLeave }}</p>
          </div>
        </div>
      </div>
      
      <div v-if="filteredData.length > 0">
        <NDataTable
          :columns="columns"
          :data="filteredData"
          :bordered="true"
          :single-line="false"
          size="large"
          :scroll-x="1000"
          class="w-full"
        />
        <div class="mt-4 text-center text-gray-500">
          共 <span class="font-bold text-blue-600">{{ filteredData.length }}</span> 条记录
        </div>
      </div>
      
      <div v-else class="py-20">
        <NEmpty description="暂无数据，请先导入员工信息并进行签到">
          <template #icon>
            <span class="text-5xl">📊</span>
          </template>
        </NEmpty>
      </div>
    </NCard>
    
    <NModal
      v-model:show="showClearModal"
      preset="dialog"
      title="数据清除确认"
      positive-text="确认"
      negative-text="取消"
      @positive-click="confirmClear"
      @negative-click="showClearModal = false"
    >
      <div class="py-4">
        <p class="text-gray-600 mb-4">请输入清除密码以确认操作（密码：2816M）：</p>
        <NInput
          v-model:value="clearPassword"
          type="password"
          placeholder="请输入密码"
          @keyup.enter="confirmClear"
        />
      </div>
    </NModal>
  </div>
</template>
