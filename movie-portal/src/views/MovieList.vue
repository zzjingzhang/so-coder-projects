<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import MovieCard from '../components/MovieCard.vue'
import { movies, searchMovies } from '../data/mockData'
import type { Movie } from '../types'

const route = useRoute()

const searchQuery = ref('')
const selectedGenre = ref<string>('全部')
const selectedYear = ref<string>('全部')
const isLoading = ref(false)

const genres = ['全部', '科幻', '动作', '剧情', '爱情', '冒险', '悬疑', '犯罪', '奇幻', '动画', '音乐', '灾难']
const years = ['全部', '2024', '2023', '2022', '2021', '2020', '2010-2019', '2000-2009', '更早']

const filteredMovies = computed<Movie[]>(() => {
  let result = movies
  
  // 搜索过滤
  if (searchQuery.value.trim()) {
    result = searchMovies(searchQuery.value)
  }
  
  // 类型过滤
  if (selectedGenre.value !== '全部') {
    result = result.filter(movie => movie.genres.includes(selectedGenre.value))
  }
  
  // 年份过滤
  if (selectedYear.value !== '全部') {
    if (selectedYear.value === '更早') {
      result = result.filter(movie => movie.year < 2000)
    } else if (selectedYear.value.includes('-')) {
      const [start, end] = selectedYear.value.split('-').map(Number)
      result = result.filter(movie => movie.year >= start && movie.year <= end)
    } else {
      result = result.filter(movie => movie.year === Number(selectedYear.value))
    }
  }
  
  return result
})

// 监听路由查询参数变化
watch(() => route.query.search, (newSearch) => {
  if (newSearch && typeof newSearch === 'string') {
    searchQuery.value = newSearch
  }
}, { immediate: true })

const clearFilters = () => {
  searchQuery.value = ''
  selectedGenre.value = '全部'
  selectedYear.value = '全部'
}

const handleSearch = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}
</script>

<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
          <i class="pi pi-film text-accent"></i>
          电影列表
        </h1>
        <p class="text-gray-400 mt-2">探索我们的电影库，找到您喜欢的电影</p>
      </div>

      <!-- 搜索和筛选区域 -->
      <div class="bg-secondary/50 rounded-2xl p-6 mb-8 border border-gray-700">
        <!-- 搜索框 -->
        <div class="mb-6">
          <div class="relative max-w-2xl">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="搜索电影名称、类型或导演..."
              class="w-full bg-primary text-white placeholder-gray-400 px-5 py-4 pl-12 rounded-xl border border-gray-700 focus:outline-none focus:border-accent transition-all text-base"
            />
            <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
            <button
              @click="handleSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-all"
            >
              搜索
            </button>
          </div>
        </div>

        <!-- 筛选器 -->
        <div class="flex flex-col md:flex-row gap-4">
          <!-- 类型筛选 -->
          <div class="flex-1">
            <label class="block text-gray-300 text-sm font-medium mb-2">
              <i class="pi pi-tags mr-1 text-accent"></i>
              类型
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="genre in genres"
                :key="genre"
                @click="selectedGenre = genre"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="selectedGenre === genre 
                  ? 'bg-accent text-white' 
                  : 'bg-primary text-gray-300 hover:bg-primary/80 border border-gray-700'"
              >
                {{ genre }}
              </button>
            </div>
          </div>

          <!-- 年份筛选 -->
          <div class="w-full md:w-72">
            <label class="block text-gray-300 text-sm font-medium mb-2">
              <i class="pi pi-calendar mr-1 text-accent"></i>
              年份
            </label>
            <select
              v-model="selectedYear"
              class="w-full bg-primary text-gray-300 px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <!-- 清除筛选按钮 -->
        <div v-if="selectedGenre !== '全部' || selectedYear !== '全部' || searchQuery" class="mt-4 pt-4 border-t border-gray-700">
          <button
            @click="clearFilters"
            class="text-accent hover:text-accent/80 transition-colors text-sm font-medium flex items-center gap-1"
          >
            <i class="pi pi-times-circle"></i>
            清除所有筛选条件
          </button>
        </div>
      </div>

      <!-- 结果统计 -->
      <div class="flex items-center justify-between mb-6">
        <p class="text-gray-400">
          共找到 <span class="text-white font-bold">{{ filteredMovies.length }}</span> 部电影
        </p>
        <div class="text-gray-400 text-sm">
          <span v-if="isLoading" class="flex items-center gap-2">
            <i class="pi pi-spin pi-spinner text-accent"></i>
            加载中...
          </span>
        </div>
      </div>

      <!-- 电影网格 -->
      <div v-if="filteredMovies.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-20">
        <div class="text-6xl mb-6 text-gray-600">
          <i class="pi pi-film"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">未找到匹配的电影</h3>
        <p class="text-gray-400 mb-6">尝试使用不同的搜索关键词或调整筛选条件</p>
        <button
          @click="clearFilters"
          class="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2"
        >
          <i class="pi pi-refresh"></i>
          重置筛选
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
