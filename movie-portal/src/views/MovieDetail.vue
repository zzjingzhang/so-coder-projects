<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VideoModal from '../components/VideoModal.vue'
import { getMovieById, movies } from '../data/mockData'
import type { Movie } from '../types'

const route = useRoute()
const router = useRouter()

const movieId = computed(() => Number(route.params.id))
const movie = ref<Movie | undefined>(undefined)
const isVideoModalVisible = ref(false)
const isLoading = ref(true)

// 星级评分（转换为5星制）
const starRating = computed(() => {
  if (!movie.value) return 0
  return Math.round(movie.value.rating / 2)
})

const fullStars = computed(() => Array(starRating.value).fill(0))
const emptyStars = computed(() => Array(5 - starRating.value).fill(0))

// 相关推荐电影
const relatedMovies = computed(() => {
  if (!movie.value) return movies.slice(0, 3)
  return movies.filter(m => m.id !== movie.value!.id).slice(0, 3)
})

// 加载电影数据
const loadMovie = () => {
  isLoading.value = true
  setTimeout(() => {
    movie.value = getMovieById(movieId.value)
    isLoading.value = false
  }, 300)
}

watch(movieId, () => {
  loadMovie()
})

onMounted(() => {
  loadMovie()
})

const openVideoModal = () => {
  isVideoModalVisible.value = true
}

const goBack = () => {
  router.back()
}

const goToHome = () => {
  router.push('/')
}

// 获取下载按钮颜色
const getQualityColor = (quality: string) => {
  switch (quality) {
    case '480p':
      return 'bg-gray-600 hover:bg-gray-500'
    case '720p':
      return 'bg-blue-600 hover:bg-blue-500'
    case '1080p':
      return 'bg-accent hover:bg-accent/90'
    default:
      return 'bg-gray-600 hover:bg-gray-500'
  }
}
</script>

<template>
  <div class="min-h-screen">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <i class="pi pi-spin pi-spinner text-accent text-5xl mb-4"></i>
        <p class="text-gray-400">加载中...</p>
      </div>
    </div>

    <!-- 电影未找到 -->
    <div v-else-if="!movie" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <i class="pi pi-exclamation-circle text-accent text-5xl mb-4"></i>
        <h2 class="text-2xl font-bold text-white mb-2">电影未找到</h2>
        <p class="text-gray-400 mb-6">您访问的电影不存在或已被移除</p>
        <button
          @click="goToHome"
          class="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2"
        >
          <i class="pi pi-home"></i>
          返回首页
        </button>
      </div>
    </div>

    <!-- 电影详情 -->
    <template v-else>
      <!-- Hero 背景区域 -->
      <div class="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <!-- 背景图 -->
        <div class="absolute inset-0">
          <img
            :src="movie.backdrop"
            :alt="movie.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
        </div>

        <!-- 内容区域 -->
        <div class="relative z-10 h-full flex items-end px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
          <div class="max-w-7xl mx-auto w-full">
            <div class="flex flex-col md:flex-row gap-6 md:gap-8">
              <!-- 海报 -->
              <div class="hidden md:block flex-shrink-0">
                <div class="w-56 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <img
                    :src="movie.poster"
                    :alt="movie.title"
                    class="w-full aspect-[2/3] object-cover"
                  />
                </div>
              </div>

              <!-- 信息 -->
              <div class="flex-1">
                <!-- 标题 -->
                <div class="mb-4">
                  <h1 class="text-3xl md:text-5xl font-bold text-white mb-2">
                    {{ movie.title }}
                  </h1>
                  <p class="text-gray-400 text-lg">{{ movie.originalTitle }}</p>
                </div>

                <!-- 评分和元信息 -->
                <div class="flex flex-wrap items-center gap-4 mb-4">
                  <!-- 星级评分 -->
                  <div class="flex items-center gap-2">
                    <div class="star-rating">
                      <i 
                        v-for="(_star, index) in fullStars" 
                        :key="`full-${index}`"
                        class="pi pi-star-fill star text-yellow-400 text-xl"
                      ></i>
                      <i 
                        v-for="(_star, index) in emptyStars" 
                        :key="`empty-${index}`"
                        class="pi pi-star star empty text-xl"
                      ></i>
                    </div>
                    <span class="text-white font-bold text-xl">{{ movie.rating }}</span>
                    <span class="text-gray-400">/ 10</span>
                  </div>

                  <div class="h-6 w-px bg-gray-600"></div>

                  <span class="text-gray-300">
                    <i class="pi pi-calendar mr-1 text-accent"></i>
                    {{ movie.year }}
                  </span>

                  <div class="h-6 w-px bg-gray-600"></div>

                  <span class="text-gray-300">
                    <i class="pi pi-clock mr-1 text-accent"></i>
                    {{ movie.duration }}
                  </span>
                </div>

                <!-- 类型标签 -->
                <div class="flex flex-wrap gap-2 mb-6">
                  <span
                    v-for="(genre, index) in movie.genres"
                    :key="index"
                    class="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30"
                  >
                    {{ genre }}
                  </span>
                </div>

                <!-- 操作按钮 -->
                <div class="flex flex-wrap gap-3">
                  <button
                    @click="openVideoModal"
                    class="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-accent/30"
                  >
                    <i class="pi pi-play text-lg"></i>
                    播放预告片
                  </button>
                  <button
                    class="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 border border-white/20"
                  >
                    <i class="pi pi-heart text-lg"></i>
                    收藏
                  </button>
                  <button
                    @click="goBack"
                    class="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 border border-white/20"
                  >
                    <i class="pi pi-arrow-left text-lg"></i>
                    返回
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 详情内容 -->
      <div class="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- 左侧内容 -->
            <div class="lg:col-span-2 space-y-8">
              <!-- 电影简介 -->
              <section class="bg-secondary/30 rounded-2xl p-6 md:p-8 border border-gray-700">
                <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <i class="pi pi-info-circle text-accent"></i>
                  剧情简介
                </h2>
                <p class="text-gray-300 leading-relaxed text-lg">
                  {{ movie.description }}
                </p>

                <!-- 详细信息 -->
                <div class="mt-6 pt-6 border-t border-gray-700">
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p class="text-gray-400 text-sm mb-1">导演</p>
                      <p class="text-white font-medium">{{ movie.director }}</p>
                    </div>
                    <div>
                      <p class="text-gray-400 text-sm mb-1">上映日期</p>
                      <p class="text-white font-medium">{{ movie.releaseDate }}</p>
                    </div>
                    <div>
                      <p class="text-gray-400 text-sm mb-1">国家/地区</p>
                      <p class="text-white font-medium">{{ movie.country }}</p>
                    </div>
                    <div>
                      <p class="text-gray-400 text-sm mb-1">片长</p>
                      <p class="text-white font-medium">{{ movie.duration }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 演员阵容 -->
              <section class="bg-secondary/30 rounded-2xl p-6 md:p-8 border border-gray-700">
                <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <i class="pi pi-users text-accent"></i>
                  演员阵容
                </h2>
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
                  <div
                    v-for="actor in movie.actors"
                    :key="actor.id"
                    class="text-center group cursor-pointer"
                  >
                    <div class="relative mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-accent transition-all">
                      <img
                        :src="actor.avatar"
                        :alt="actor.name"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 class="text-white font-medium text-sm mb-1 truncate">{{ actor.name }}</h3>
                    <p class="text-gray-400 text-xs truncate">{{ actor.role }}</p>
                  </div>
                </div>
              </section>
            </div>

            <!-- 右侧内容 -->
            <div class="space-y-8">
              <!-- 下载链接 -->
              <section class="bg-secondary/30 rounded-2xl p-6 border border-gray-700">
                <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <i class="pi pi-download text-accent"></i>
                  下载资源
                </h2>
                <div class="space-y-3">
                  <button
                    v-for="link in movie.downloadLinks"
                    :key="link.quality"
                    class="w-full flex items-center justify-between p-4 rounded-xl transition-all group"
                    :class="getQualityColor(link.quality)"
                  >
                    <div class="flex items-center gap-3">
                      <i class="pi pi-download text-white text-lg"></i>
                      <div class="text-left">
                        <p class="text-white font-bold">{{ link.quality }}</p>
                        <p class="text-white/70 text-sm">{{ link.size }}</p>
                      </div>
                    </div>
                    <i class="pi pi-external-link text-white/70 group-hover:text-white transition-colors"></i>
                  </button>
                </div>
                <p class="text-gray-500 text-xs mt-4 text-center">
                  点击按钮即可开始下载
                </p>
              </section>

              <!-- 相关电影 -->
              <section class="bg-secondary/30 rounded-2xl p-6 border border-gray-700">
                <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <i class="pi pi-th-large text-accent"></i>
                  相关推荐
                </h2>
                <div class="space-y-4">
                  <div
                    v-for="relatedMovie in relatedMovies"
                    :key="relatedMovie.id"
                    @click="router.push(`/movies/${relatedMovie.id}`)"
                    class="flex gap-3 p-3 rounded-xl hover:bg-primary/50 transition-all cursor-pointer group"
                  >
                    <img
                      :src="relatedMovie.poster"
                      :alt="relatedMovie.title"
                      class="w-16 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div class="flex-1 min-w-0">
                      <h3 class="text-white font-medium truncate group-hover:text-accent transition-colors">
                        {{ relatedMovie.title }}
                      </h3>
                      <p class="text-gray-400 text-sm">{{ relatedMovie.year }}</p>
                      <div class="flex items-center gap-1 mt-1">
                        <i class="pi pi-star-fill text-yellow-400 text-xs"></i>
                        <span class="text-white text-sm">{{ relatedMovie.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 视频弹窗 -->
    <VideoModal
      v-model:visible="isVideoModalVisible"
      :video-url="movie?.videoUrl || ''"
      :title="movie?.title || ''"
    />
  </div>
</template>

<style scoped>
</style>
