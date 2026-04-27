<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sidebarVisible = ref(false)

const menuItems = [
  { label: '首页', icon: 'pi pi-home', to: '/' },
  { label: '创建问题', icon: 'pi pi-plus', to: '/problem/create' }
]

function navigateTo(path) {
  router.push(path)
  sidebarVisible.value = false
}

function isActive(path) {
  return route.path === path
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="flex">
      <div 
        v-if="sidebarVisible" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="sidebarVisible = false"
      ></div>
      
      <aside 
        :class="[
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out',
          sidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <i class="pi pi-slot-machine text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-lg font-bold text-gray-800">Bandit DM</h1>
              <p class="text-xs text-gray-500">智能决策助手</p>
            </div>
          </div>
        </div>
        
        <nav class="p-4">
          <ul class="space-y-2">
            <li v-for="item in menuItems" :key="item.to">
              <button
                @click="navigateTo(item.to)"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive(item.to) 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                ]"
              >
                <i :class="[item.icon, 'text-lg']"></i>
                <span class="font-medium">{{ item.label }}</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <p class="text-sm text-gray-600 mb-2">关于汤普森采样</p>
            <p class="text-xs text-gray-500">
              汤普森采样是一种概率算法，通过贝叶斯推理来平衡探索与利用，帮助您找到最优决策。
            </p>
          </div>
        </div>
      </aside>
      
      <main class="flex-1 min-h-screen">
        <header class="bg-white border-b border-gray-100 px-6 py-4 lg:px-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button 
                @click="sidebarVisible = true"
                class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i class="pi pi-bars text-gray-600 text-xl"></i>
              </button>
              
              <div>
                <h2 class="text-xl font-bold text-gray-800">
                  {{ route.path === '/' ? '我的决策问题' : 
                     route.path === '/problem/create' ? '创建新问题' : '问题详情' }}
                </h2>
                <p class="text-sm text-gray-500">
                  {{ new Date().toLocaleDateString('zh-CN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <button 
                @click="router.push('/problem/create')"
                class="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200"
              >
                <i class="pi pi-plus"></i>
                <span>新建问题</span>
              </button>
            </div>
          </div>
        </header>
        
        <div class="p-6 lg:p-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
