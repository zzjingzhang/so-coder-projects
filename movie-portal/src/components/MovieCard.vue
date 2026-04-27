<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Movie } from '../types'

const props = defineProps<{
  movie: Movie
}>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/movies/${props.movie.id}`)
}
</script>

<template>
  <div 
    class="movie-card bg-secondary rounded-xl overflow-hidden cursor-pointer shadow-lg"
    @click="goToDetail"
  >
    <div class="relative aspect-[2/3] overflow-hidden">
      <img 
        :src="movie.poster" 
        :alt="movie.title"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      
      <!-- 评分标签 -->
      <div class="absolute top-3 right-3 bg-accent/90 text-white px-2 py-1 rounded-md text-sm font-bold flex items-center">
        <i class="pi pi-star-fill text-yellow-400 mr-1 text-xs"></i>
        {{ movie.rating.toFixed(1) }}
      </div>
      
      <!-- 年份标签 -->
      <div class="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
        {{ movie.year }}
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-white font-bold text-lg mb-1 truncate">{{ movie.title }}</h3>
      <p class="text-gray-400 text-sm mb-2">{{ movie.originalTitle }}</p>
      
      <!-- 类型标签 -->
      <div class="flex flex-wrap gap-1">
        <span 
          v-for="(genre, index) in movie.genres.slice(0, 2)" 
          :key="index"
          class="text-xs bg-primary text-gray-300 px-2 py-1 rounded-full"
        >
          {{ genre }}
        </span>
        <span 
          v-if="movie.genres.length > 2"
          class="text-xs bg-primary text-gray-300 px-2 py-1 rounded-full"
        >
          +{{ movie.genres.length - 2 }}
        </span>
      </div>
      
      <!-- 时长 -->
      <div class="mt-3 flex items-center text-gray-400 text-sm">
        <i class="pi pi-clock mr-1"></i>
        {{ movie.duration }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
