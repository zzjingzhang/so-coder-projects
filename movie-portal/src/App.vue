<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/movies', query: { search: searchQuery.value } })
    searchQuery.value = ''
  }
}

const goToHome = () => {
  router.push('/')
  isMobileMenuOpen.value = false
}

const goToMovies = () => {
  router.push('/movies')
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <div class="min-h-screen bg-dark">
    <!-- 导航栏 -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center cursor-pointer" @click="goToHome">
            <i class="pi pi-play-circle text-accent text-2xl mr-2"></i>
            <span class="text-xl font-bold text-white">MoviePortal</span>
          </div>

          <!-- 桌面端导航 -->
          <div class="hidden md:flex items-center space-x-8">
            <button 
              @click="goToHome" 
              class="text-white hover:text-accent transition-colors font-medium"
              :class="{ 'text-accent': isActive('/') }"
            >
              首页
            </button>
            <button 
              @click="goToMovies" 
              class="text-white hover:text-accent transition-colors font-medium"
              :class="{ 'text-accent': isActive('/movies') }"
            >
              电影列表
            </button>
          </div>

          <!-- 搜索框 -->
          <div class="hidden md:flex items-center">
            <div class="relative">
              <input 
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text" 
                placeholder="搜索电影..." 
                class="bg-secondary/50 text-white pl-10 pr-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:border-accent transition-colors w-64"
              />
              <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <!-- 移动端菜单按钮 -->
          <button 
            class="md:hidden text-white p-2"
            @click="toggleMobileMenu"
          >
            <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-xl"></i>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden bg-primary border-t border-gray-700"
      >
        <div class="px-4 py-4 space-y-3">
          <button 
            @click="goToHome" 
            class="block w-full text-left text-white hover:text-accent transition-colors py-2 px-4 rounded-lg hover:bg-secondary/50"
            :class="{ 'text-accent bg-secondary/50': isActive('/') }"
          >
            <i class="pi pi-home mr-2"></i>首页
          </button>
          <button 
            @click="goToMovies" 
            class="block w-full text-left text-white hover:text-accent transition-colors py-2 px-4 rounded-lg hover:bg-secondary/50"
            :class="{ 'text-accent bg-secondary/50': isActive('/movies') }"
          >
            <i class="pi pi-film mr-2"></i>电影列表
          </button>
          
          <!-- 移动端搜索框 -->
          <div class="pt-3 border-t border-gray-700">
            <div class="relative">
              <input 
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text" 
                placeholder="搜索电影..." 
                class="w-full bg-secondary/50 text-white pl-10 pr-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:border-accent transition-colors"
              />
              <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="pt-16 flex-grow">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="bg-primary py-8 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center mb-4 md:mb-0">
            <i class="pi pi-play-circle text-accent text-xl mr-2"></i>
            <span class="text-lg font-bold text-white">MoviePortal</span>
          </div>
          <div class="flex space-x-6 text-gray-400">
            <a href="#" class="hover:text-accent transition-colors">关于我们</a>
            <a href="#" class="hover:text-accent transition-colors">联系方式</a>
            <a href="#" class="hover:text-accent transition-colors">隐私政策</a>
          </div>
        </div>
        <div class="mt-6 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>© 2024 MoviePortal. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
</style>
