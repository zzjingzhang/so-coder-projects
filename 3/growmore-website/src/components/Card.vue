<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  description: string
  imageUrl: string
  buttonText?: string
  buttonLink?: string
}>()

const router = useRouter()

const handleButtonClick = () => {
  if (props.buttonLink) {
    router.push(props.buttonLink)
  }
}
</script>

<template>
  <div class="group bg-card-bg rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-border">
    <div class="relative overflow-hidden h-56">
      <img 
        :src="imageUrl" 
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <div class="p-6">
      <h3 class="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300">
        {{ title }}
      </h3>
      
      <p class="text-text-light leading-relaxed mb-6">
        {{ description }}
      </p>
      
      <button 
        v-if="buttonText && buttonLink"
        @click="handleButtonClick"
        class="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        <span>{{ buttonText }}</span>
        <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  </div>
</template>
