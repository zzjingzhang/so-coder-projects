<template>
  <div class="min-h-screen bg-cold-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm border-b border-cold-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <div class="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold">E</span>
              </div>
              <span class="ml-2 text-xl font-semibold text-cold-gray-900">EventFlow</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="isActive('/') ? 'bg-accent-100 text-accent-700' : 'text-cold-gray-600 hover:text-cold-gray-900 hover:bg-cold-gray-100'"
            >
              首页
            </router-link>
            <router-link 
              to="/schedule" 
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="isActive('/schedule') ? 'bg-accent-100 text-accent-700' : 'text-cold-gray-600 hover:text-cold-gray-900 hover:bg-cold-gray-100'"
            >
              日程安排
            </router-link>
            <el-button type="primary" class="bg-accent-500 hover:bg-accent-600 border-none">
              登录
            </el-button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区域 -->
    <main>
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="bg-cold-gray-800 text-white mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center mb-4 md:mb-0">
            <div class="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">E</span>
            </div>
            <span class="ml-2 text-lg font-semibold">EventFlow</span>
          </div>
          <div class="text-cold-gray-400 text-sm">
            © 2026 EventFlow. 保留所有权利。
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
</style>