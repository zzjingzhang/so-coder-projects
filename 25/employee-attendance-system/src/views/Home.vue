<script setup>
import { useRouter } from 'vue-router'
import {
  NButton,
  NCard,
  NGrid,
  NGi,
  NModal,
  NInput,
  useMessage,
  useDialog
} from 'naive-ui'
import { verifyPassword, clearAllData } from '@/store/data'
import { ref } from 'vue'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()

const showClearModal = ref(false)
const clearPassword = ref('')

const navigateTo = (path) => {
  router.push(path)
}

const handleClearClick = () => {
  showClearModal.value = true
  clearPassword.value = ''
}

const confirmClear = () => {
  if (verifyPassword(clearPassword.value)) {
    dialog.warning({
      title: '确认清除',
      content: '确定要清除所有数据吗？此操作不可恢复！',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        clearAllData()
        message.success('数据已清除')
        showClearModal.value = false
      }
    })
  } else {
    message.error('密码错误')
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8">
    <NCard class="w-full max-w-4xl shadow-2xl bg-white/95 backdrop-blur-sm">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">员工签到系统</h1>
        <p class="text-gray-500">请选择您要进行的操作</p>
      </div>
      
      <NGrid :cols="3" :x-gap="20" :y-gap="20">
        <NGi>
          <NButton
            type="primary"
            size="large"
            block
            class="h-24 text-lg font-semibold"
            @click="navigateTo('/employee-info')"
          >
            <div class="flex flex-col items-center justify-center">
              <span class="text-2xl mb-1">👥</span>
              <span>员工信息</span>
            </div>
          </NButton>
        </NGi>
        
        <NGi>
          <NButton
            type="info"
            size="large"
            block
            class="h-24 text-lg font-semibold"
            @click="navigateTo('/leave-management')"
          >
            <div class="flex flex-col items-center justify-center">
              <span class="text-2xl mb-1">🏖️</span>
              <span>请假人员</span>
            </div>
          </NButton>
        </NGi>
        
        <NGi>
          <NButton
            type="success"
            size="large"
            block
            class="h-24 text-lg font-semibold"
            @click="navigateTo('/attendance')"
          >
            <div class="flex flex-col items-center justify-center">
              <span class="text-2xl mb-1">✅</span>
              <span>签到</span>
            </div>
          </NButton>
        </NGi>
        
        <NGi>
          <NButton
            type="warning"
            size="large"
            block
            class="h-24 text-lg font-semibold"
            @click="navigateTo('/summary')"
          >
            <div class="flex flex-col items-center justify-center">
              <span class="text-2xl mb-1">📊</span>
              <span>汇总</span>
            </div>
          </NButton>
        </NGi>
        
        <NGi>
          <NButton
            type="error"
            size="large"
            block
            class="h-24 text-lg font-semibold"
            @click="handleClearClick"
          >
            <div class="flex flex-col items-center justify-center">
              <span class="text-2xl mb-1">🗑️</span>
              <span>一键清除</span>
            </div>
          </NButton>
        </NGi>
      </NGrid>
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
        <p class="text-gray-600 mb-4">请输入清除密码以确认操作：</p>
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
