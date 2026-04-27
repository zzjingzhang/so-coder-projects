<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import MovieCard from '../components/MovieCard.vue'
import { movies, carouselItems } from '../data/mockData'
import type { Movie } from '../types'

const router = useRouter()
const searchQuery = ref('')
const currentSlide = ref(0)
const autoPlayInterval = ref<number | null>(null)

const featuredMovies = ref<Movie[]>(movies.slice(0, 6))

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/movies', query: { search: searchQuery.value } })
    searchQuery.value = ''
  }
}

const goToMovie = (movieId: number) => {
  router.push(`/movies/${movieId}`)
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselItems.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselItems.length) % carouselItems.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoPlay = () => {
  autoPlayInterval.value = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero 区域 - 大幅背景图 -->
    <div class="relative h-[80vh] md:h-screen overflow-hidden">
      <!-- 轮播背景图 -->
      <div class="absolute inset-0">
        <TransitionGroup name="slide-fade" tag="div">
          <div
            v-for="(item, index) in carouselItems"
            :key="item.id"
            v-show="index === currentSlide"
            class="absolute inset-0"
          >
            <img
              :src="item.backdrop"
              :alt="item.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Hero 内容 -->
      <div class="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="max-w-2xl">
          <!-- 当前轮播电影信息 -->
          <TransitionGroup name="fade" tag="div">
            <div
              v-for="(item, index) in carouselItems"
              :key="item.id"
              v-show="index === currentSlide"
            >
              <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {{ item.title }}
              </h1>
              <p class="text-lg md:text-xl text-gray-300 mb-6 line-clamp-2">
                {{ item.subtitle }}
              </p>
            </div>
          </TransitionGroup>

          <!-- 搜索框 -->
          <div class="mt-8">
            <h2 class="text-white text-lg md:text-xl mb-3 font-medium">
              <i class="pi pi-search mr-2 text-accent"></i>
              搜索您喜欢的电影
            </h2>
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="relative flex-grow">
                <input
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="输入电影名称、类型或导演..."
                  class="w-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 px-5 py-4 pl-12 rounded-xl border border-white/20 focus:outline-none focus:border-accent focus:bg-white/20 transition-all text-base"
                />
                <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              </div>
              <button
                @click="handleSearch"
                class="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-base shadow-lg shadow-accent/30"
              >
                <i class="pi pi-search"></i>
                搜索
              </button>
            </div>
          </div>

          <!-- 轮播控制按钮 -->
          <div class="mt-8 flex items-center gap-4">
            <button
              @click="goToMovie(carouselItems[currentSlide].movieId)"
              class="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg shadow-accent/30"
            >
              <i class="pi pi-play"></i>
              查看详情
            </button>
            <button
              @click="() => router.push('/movies')"
              class="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 border border-white/20"
            >
              <i class="pi pi-list"></i>
              浏览全部
            </button>
          </div>
        </div>

        <!-- 轮播指示器 -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
          <button
            @click="prevSlide"
            @mouseenter="stopAutoPlay"
            @mouseleave="startAutoPlay"
            class="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all"
          >
            <i class="pi pi-chevron-left"></i>
          </button>
          <div class="flex gap-2">
            <button
              v-for="(item, index) in carouselItems"
              :key="item.id"
              @click="goToSlide(index)"
              @mouseenter="stopAutoPlay"
              @mouseleave="startAutoPlay"
              class="h-2 rounded-full transition-all"
              :class="index === currentSlide ? 'w-8 bg-accent' : 'w-2 bg-white/40 hover:bg-white/60'"
            ></button>
          </div>
          <button
            @click="nextSlide"
            @mouseenter="stopAutoPlay"
            @mouseleave="startAutoPlay"
            class="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all"
          >
            <i class="pi pi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 热门电影推荐 -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <i class="pi pi-fire text-accent"></i>
            热门推荐
          </h2>
          <p class="text-gray-400 mt-2">精选最受欢迎的电影</p>
        </div>
        <button
          @click="() => router.push('/movies')"
          class="hidden sm:flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
        >
          查看全部
          <i class="pi pi-arrow-right"></i>
        </button>
      </div>

      <!-- 电影网格 -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        <MovieCard
          v-for="movie in featuredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <!-- 移动端查看全部按钮 -->
      <div class="mt-8 text-center sm:hidden">
        <button
          @click="() => router.push('/movies')"
          class="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
        >
          查看全部电影
          <i class="pi pi-arrow-right"></i>
        </button>
      </div>
    </section>

    <!-- 分类浏览 -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-3">
            <i class="pi pi-tags text-accent"></i>
            按类型浏览
          </h2>
          <p class="text-gray-400 mt-2">根据您的心情选择电影类型</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            v-for="genre in ['科幻', '动作', '剧情', '爱情', '冒险', '动画']"
            :key="genre"
            @click="() => router.push({ path: '/movies', query: { search: genre } })"
            class="bg-primary hover:bg-secondary group p-6 rounded-xl transition-all border border-gray-700 hover:border-accent"
          >
            <div class="text-3xl mb-3 text-accent group-hover:scale-110 transition-transform">
              <i 
                :class="[
                  genre === '科幻' ? 'pi pi-rocket' :
                  genre === '动作' ? 'pi pi-bolt' :
                  genre === '剧情' ? 'pi pi-book' :
                  genre === '爱情' ? 'pi pi-heart' :
                  genre === '冒险' ? 'pi pi-compass' :
                  'pi pi-palette'
                ]"
              ></i>
            </div>
            <span class="text-white font-medium">{{ genre }}</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.slide-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
