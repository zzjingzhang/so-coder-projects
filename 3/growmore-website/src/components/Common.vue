<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  imageUrl?: string
  showButton?: boolean
}>()

const router = useRouter()

const defaultImage = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20business%20office%20interior%20with%20large%20windows%20professional%20workspace%20team%20collaboration&image_size=landscape_16_9'

const imageUrl = computed(() => props.imageUrl || defaultImage)

const shouldShowButton = computed(() => {
  if (props.showButton === false) return false
  return !!(props.buttonText && props.buttonLink)
})

const handleButtonClick = () => {
  if (props.buttonLink) {
    router.push(props.buttonLink)
  }
}
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <div class="absolute inset-0">
      <img 
        :src="imageUrl" 
        :alt="title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-indigo-600/70 to-indigo-600/40"></div>
    </div>

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float-delay"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slide-up">
          {{ title }}
        </h1>
        
        <p 
          v-if="subtitle"
          class="mt-6 text-lg md:text-xl text-white/90 leading-relaxed"
        >
          {{ subtitle }}
        </p>
        
        <button 
          v-if="shouldShowButton"
          @click="handleButtonClick"
          class="mt-8 inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <span>{{ buttonText }}</span>
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <div class="flex flex-col items-center text-white/70 animate-bounce">
        <span class="text-sm mb-2">向下滚动</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>
