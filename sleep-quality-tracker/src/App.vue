<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const router = useRouter()
const toast = useToast()

function handleKeydown(event) {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 's' || event.key === 'S') {
      event.preventDefault()
      router.push('/record')
      toast.add({
        severity: 'info',
        summary: '快捷键',
        detail: '已导航到记录页面 (Ctrl+S)',
        life: 3000
      })
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Toast position="top-right" />
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center text-indigo-600 font-bold text-xl">
              <i class="pi pi-moon mr-2"></i>
              睡眠追踪器
            </router-link>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link 
                to="/" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                :class="router.currentRoute.value.path === '/' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
              >
                <i class="pi pi-home mr-1"></i> 仪表盘
              </router-link>
              <router-link 
                to="/record" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                :class="router.currentRoute.value.path === '/record' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
              >
                <i class="pi pi-plus mr-1"></i> 记录睡眠
              </router-link>
              <router-link 
                to="/history" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                :class="router.currentRoute.value.path === '/history' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
              >
                <i class="pi pi-history mr-1"></i> 历史记录
              </router-link>
              <router-link 
                to="/goals" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                :class="router.currentRoute.value.path === '/goals' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
              >
                <i class="pi pi-flag mr-1"></i> 目标与成就
              </router-link>
              <router-link 
                to="/settings" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                :class="router.currentRoute.value.path === '/settings' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'"
              >
                <i class="pi pi-cog mr-1"></i> 设置
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-xs text-gray-400 hidden sm:block">
              快捷键: <kbd class="px-1 py-0.5 bg-gray-100 rounded text-gray-600">Ctrl+S</kbd> 快速记录
            </span>
          </div>
        </div>
      </div>
      
      <div class="sm:hidden border-t">
        <div class="flex justify-around py-2">
          <router-link to="/" class="flex flex-col items-center text-xs" :class="router.currentRoute.value.path === '/' ? 'text-indigo-600' : 'text-gray-500'">
            <i class="pi pi-home text-lg"></i>
            仪表盘
          </router-link>
          <router-link to="/record" class="flex flex-col items-center text-xs" :class="router.currentRoute.value.path === '/record' ? 'text-indigo-600' : 'text-gray-500'">
            <i class="pi pi-plus text-lg"></i>
            记录
          </router-link>
          <router-link to="/history" class="flex flex-col items-center text-xs" :class="router.currentRoute.value.path === '/history' ? 'text-indigo-600' : 'text-gray-500'">
            <i class="pi pi-history text-lg"></i>
            历史
          </router-link>
          <router-link to="/goals" class="flex flex-col items-center text-xs" :class="router.currentRoute.value.path === '/goals' ? 'text-indigo-600' : 'text-gray-500'">
            <i class="pi pi-flag text-lg"></i>
            目标
          </router-link>
          <router-link to="/settings" class="flex flex-col items-center text-xs" :class="router.currentRoute.value.path === '/settings' ? 'text-indigo-600' : 'text-gray-500'">
            <i class="pi pi-cog text-lg"></i>
            设置
          </router-link>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>
