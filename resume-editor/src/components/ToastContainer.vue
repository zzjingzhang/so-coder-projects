<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in state.toasts" :key="toast.id"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-64',
          'transform transition-all duration-300 ease-in-out',
          toastClass(toast.type)
        ]"
      >
        <component :is="toastIcon(toast.type)" class="text-lg" />
        <span class="flex-1 text-sm">{{ toast.message }}</span>
        <button
          @click="removeToast(toast.id)"
          class="ml-2 hover:opacity-70 transition-opacity"
        >
          <CloseOutlined />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseOutlined
} from '@ant-design/icons-vue'
import { useStore } from '@/store'
import type { Toast } from '@/types'

const { state, removeToast } = useStore()

const toastClass = (type: Toast['type']) => {
  const classes: Record<Toast['type'], string> = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  }
  return classes[type] || classes.info
}

const toastIcon = (type: Toast['type']) => {
  const icons: Record<Toast['type'], any> = {
    success: CheckCircleOutlined,
    error: CloseCircleOutlined,
    warning: ExclamationCircleOutlined,
    info: InfoCircleOutlined
  }
  return icons[type] || icons.info
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
