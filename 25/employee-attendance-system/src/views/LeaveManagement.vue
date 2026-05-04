<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  NButton,
  NCard,
  NInput,
  NModal,
  useMessage,
  NDescriptions,
  NDescriptionsItem,
  NTag,
  NAlert
} from 'naive-ui'
import { getEmployeeById, setEmployeeOnLeave, getSummary } from '@/store/data'

const router = useRouter()
const message = useMessage()

const employeeId = ref('')
const selectedEmployee = ref(null)
const showConfirmModal = ref(false)
const showSuccessAlert = ref(false)

const isEmployeeOnLeave = computed(() => {
  if (!selectedEmployee.value) return false
  const summary = getSummary()
  const empSummary = summary.find(s => s.id === selectedEmployee.value.id)
  return empSummary ? empSummary.onLeave : false
})

const searchEmployee = () => {
  if (!employeeId.value.trim()) {
    message.warning('请输入工号')
    return
  }
  
  const emp = getEmployeeById(employeeId.value.trim())
  if (emp) {
    selectedEmployee.value = emp
    showSuccessAlert.value = false
    message.success('找到员工信息')
  } else {
    message.error('未找到该工号的员工')
    selectedEmployee.value = null
  }
}

const handleSubmit = () => {
  if (isEmployeeOnLeave.value) {
    message.warning('该员工已在请假状态')
    return
  }
  showConfirmModal.value = true
}

const confirmLeave = () => {
  setEmployeeOnLeave(selectedEmployee.value.id, true)
  showConfirmModal.value = false
  showSuccessAlert.value = true
  message.success(`${selectedEmployee.value.name} 已标记为请假状态`)
}

const cancelLeave = () => {
  if (!isEmployeeOnLeave.value) {
    message.warning('该员工不在请假状态')
    return
  }
  setEmployeeOnLeave(selectedEmployee.value.id, false)
  showSuccessAlert.value = false
  message.success(`${selectedEmployee.value.name} 已取消请假状态`)
}

const goBack = () => {
  router.push('/')
}

const resetForm = () => {
  employeeId.value = ''
  selectedEmployee.value = null
  showSuccessAlert.value = false
}
</script>

<template>
  <div class="min-h-screen p-6">
    <NCard class="shadow-xl bg-white/95 backdrop-blur-sm max-w-2xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <NButton @click="goBack">
          <span class="text-lg">←</span> 返回
        </NButton>
        <h2 class="text-2xl font-bold text-gray-800">请假人员管理</h2>
      </div>
      
      <div class="mb-8">
        <label class="block text-gray-700 font-semibold mb-3">请输入员工工号：</label>
        <div class="flex gap-3">
          <NInput
            v-model:value="employeeId"
            placeholder="请输入工号"
            size="large"
            @keyup.enter="searchEmployee"
          />
          <NButton type="primary" size="large" @click="searchEmployee">
            确认查询
          </NButton>
        </div>
      </div>
      
      <div v-if="showSuccessAlert" class="mb-6">
        <NAlert type="success" title="操作成功">
          该员工已成功标记为请假状态
        </NAlert>
      </div>
      
      <div v-if="selectedEmployee">
        <div class="border-t pt-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>📋</span> 员工信息
            <NTag :type="isEmployeeOnLeave ? 'warning' : 'success'" size="small">
              {{ isEmployeeOnLeave ? '请假中' : '正常状态' }}
            </NTag>
          </h3>
          
          <NDescriptions :bordered="true" :column="2" size="large">
            <NDescriptionsItem label="工号">
              <span class="font-semibold">{{ selectedEmployee.id }}</span>
            </NDescriptionsItem>
            <NDescriptionsItem label="姓名">
              <span class="font-semibold">{{ selectedEmployee.name }}</span>
            </NDescriptionsItem>
            <NDescriptionsItem label="年级">
              {{ selectedEmployee.grade }}
            </NDescriptionsItem>
            <NDescriptionsItem label="职位">
              {{ selectedEmployee.position }}
            </NDescriptionsItem>
          </NDescriptions>
          
          <div class="mt-8 flex justify-center gap-4">
            <NButton
              type="error"
              size="large"
              @click="handleSubmit"
              :disabled="isEmployeeOnLeave"
            >
              <span class="mr-2">🏖️</span> 提交请假
            </NButton>
            <NButton
              type="warning"
              size="large"
              @click="cancelLeave"
              :disabled="!isEmployeeOnLeave"
            >
              <span class="mr-2">🔄</span> 取消请假
            </NButton>
            <NButton size="large" @click="resetForm">
              重新查询
            </NButton>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-16 text-gray-400">
        <span class="text-6xl block mb-4">🔍</span>
        <p>输入工号后点击"确认查询"查看员工信息</p>
      </div>
    </NCard>
    
    <NModal
      v-model:show="showConfirmModal"
      preset="dialog"
      title="确认请假"
      positive-text="确认提交"
      negative-text="取消"
      type="warning"
      @positive-click="confirmLeave"
    >
      <div class="py-4">
        <p class="text-gray-600 mb-4">确认将以下员工标记为请假状态？</p>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p><span class="font-semibold">工号：</span>{{ selectedEmployee?.id }}</p>
          <p><span class="font-semibold">姓名：</span>{{ selectedEmployee?.name }}</p>
          <p><span class="font-semibold">年级：</span>{{ selectedEmployee?.grade }}</p>
          <p><span class="font-semibold">职位：</span>{{ selectedEmployee?.position }}</p>
        </div>
      </div>
    </NModal>
  </div>
</template>
