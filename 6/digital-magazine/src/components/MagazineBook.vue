<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface MagazinePage {
  id: number
  title: string
  subtitle?: string
  content: string
  image?: string
  type: 'cover' | 'content' | 'image' | 'back'
}

const props = defineProps<{
  pages: MagazinePage[]
}>()

const currentPage = ref(0)
const isAnimating = ref(false)

const totalPages = computed(() => props.pages.length)

const currentSpread = computed(() => {
  const leftIndex = currentPage.value
  const rightIndex = currentPage.value + 1
  
  return {
    left: props.pages[leftIndex] || null,
    right: props.pages[rightIndex] || null
  }
})

const canGoNext = computed(() => {
  return currentPage.value < totalPages.value - 2
})

const canGoPrev = computed(() => {
  return currentPage.value > 0
})

const goToPage = (pageIndex: number) => {
  if (isAnimating.value) return
  if (pageIndex < 0 || pageIndex >= totalPages.value) return
  if (pageIndex % 2 !== 0) return
  
  isAnimating.value = true
  currentPage.value = pageIndex
  
  setTimeout(() => {
    isAnimating.value = false
  }, 600)
}

const nextPage = () => {
  if (!canGoNext.value || isAnimating.value) return
  goToPage(currentPage.value + 2)
}

const prevPage = () => {
  if (!canGoPrev.value || isAnimating.value) return
  goToPage(currentPage.value - 2)
}

const handlePageClick = (side: 'left' | 'right') => {
  if (side === 'right' && canGoNext.value) {
    nextPage()
  } else if (side === 'left' && canGoPrev.value) {
    prevPage()
  }
}

const progress = computed(() => {
  return ((currentPage.value + 1) / totalPages.value) * 100
})

onMounted(() => {
  // 键盘导航
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      nextPage()
    } else if (e.key === 'ArrowLeft') {
      prevPage()
    }
  }
  
  window.addEventListener('keydown', handleKeyDown)
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<template>
  <div class="book-container relative">
    <!-- Navigation Controls -->
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
      <button 
        @click="prevPage"
        :disabled="!canGoPrev || isAnimating"
        :class="[
          'p-2 rounded-full transition-all duration-300',
          canGoPrev ? 'bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-600' : 'bg-gray-50 text-gray-300 cursor-not-allowed'
        ]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <div class="text-sm font-medium text-gray-700">
        第 {{ Math.ceil(currentPage / 2) + 1 }} 页 / 共 {{ Math.ceil(totalPages / 2) }} 页
      </div>
      
      <button 
        @click="nextPage"
        :disabled="!canGoNext || isAnimating"
        :class="[
          'p-2 rounded-full transition-all duration-300',
          canGoNext ? 'bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-600' : 'bg-gray-50 text-gray-300 cursor-not-allowed'
        ]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
    
    <!-- Progress Bar -->
    <div class="absolute bottom-4 left-4 right-4 z-10">
      <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
    
    <!-- Book -->
    <div class="book flex h-full">
      <!-- Left Page -->
      <div 
        class="page page-left border-r border-gray-200"
        @click="handlePageClick('left')"
        :class="{ 'cursor-pointer': canGoPrev }"
      >
        <div v-if="currentSpread.left" class="page-front p-8">
          <template v-if="currentSpread.left.type === 'cover'">
            <div class="h-full flex flex-col justify-center items-center text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6">
                <span class="text-white font-bold text-3xl">M</span>
              </div>
              <h1 class="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
                {{ currentSpread.left.title }}
              </h1>
              <p v-if="currentSpread.left.subtitle" class="text-xl text-gray-600 mb-8">
                {{ currentSpread.left.subtitle }}
              </p>
              <div class="text-gray-500">
                <p class="mb-2">点击右侧翻页</p>
                <p class="text-sm">或使用键盘方向键</p>
              </div>
            </div>
          </template>
          
          <template v-else-if="currentSpread.left.type === 'image'">
            <div class="h-full flex flex-col">
              <div class="h-1/2 relative overflow-hidden rounded-lg mb-4">
                <img 
                  v-if="currentSpread.left.image"
                  :src="currentSpread.left.image" 
                  :alt="currentSpread.left.title"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h2 class="text-2xl font-display font-bold text-gray-800 mb-2">
                {{ currentSpread.left.title }}
              </h2>
              <p class="text-gray-600 leading-relaxed flex-grow">
                {{ currentSpread.left.content }}
              </p>
            </div>
          </template>
          
          <template v-else>
            <div class="h-full flex flex-col">
              <h2 class="text-2xl font-display font-bold text-gray-800 mb-4">
                {{ currentSpread.left.title }}
              </h2>
              <div v-if="currentSpread.left.image" class="h-48 relative overflow-hidden rounded-lg mb-4">
                <img 
                  :src="currentSpread.left.image" 
                  :alt="currentSpread.left.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <p class="text-gray-600 leading-relaxed flex-grow text-justify">
                {{ currentSpread.left.content }}
              </p>
            </div>
          </template>
        </div>
        <div v-else class="page-front bg-gray-50 flex items-center justify-center">
          <span class="text-gray-400">空白页</span>
        </div>
      </div>
      
      <!-- Right Page -->
      <div 
        class="page page-right"
        @click="handlePageClick('right')"
        :class="{ 'cursor-pointer': canGoNext }"
      >
        <div v-if="currentSpread.right" class="page-front p-8">
          <template v-if="currentSpread.right.type === 'image'">
            <div class="h-full flex flex-col">
              <div class="h-1/2 relative overflow-hidden rounded-lg mb-4">
                <img 
                  v-if="currentSpread.right.image"
                  :src="currentSpread.right.image" 
                  :alt="currentSpread.right.title"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h2 class="text-2xl font-display font-bold text-gray-800 mb-2">
                {{ currentSpread.right.title }}
              </h2>
              <p class="text-gray-600 leading-relaxed flex-grow">
                {{ currentSpread.right.content }}
              </p>
            </div>
          </template>
          
          <template v-else-if="currentSpread.right.type === 'back'">
            <div class="h-full flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary-50 to-accent-50">
              <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6">
                <span class="text-white font-bold text-2xl">M</span>
              </div>
              <h2 class="text-3xl font-display font-bold text-gray-800 mb-4">
                {{ currentSpread.right.title }}
              </h2>
              <p class="text-gray-600 max-w-xs">
                {{ currentSpread.right.content }}
              </p>
              <div class="mt-8 text-sm text-gray-500">
                <p>感谢阅读</p>
                <p>点击左侧返回</p>
              </div>
            </div>
          </template>
          
          <template v-else>
            <div class="h-full flex flex-col">
              <h2 class="text-2xl font-display font-bold text-gray-800 mb-4">
                {{ currentSpread.right.title }}
              </h2>
              <div v-if="currentSpread.right.image" class="h-48 relative overflow-hidden rounded-lg mb-4">
                <img 
                  :src="currentSpread.right.image" 
                  :alt="currentSpread.right.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <p class="text-gray-600 leading-relaxed flex-grow text-justify">
                {{ currentSpread.right.content }}
              </p>
            </div>
          </template>
        </div>
        <div v-else class="page-front bg-gray-50 flex items-center justify-center">
          <span class="text-gray-400">空白页</span>
        </div>
      </div>
    </div>
    
    <!-- Book Spine -->
    <div class="absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 transform -translate-x-1/2 shadow-inner"></div>
  </div>
</template>

<style scoped>
</style>
