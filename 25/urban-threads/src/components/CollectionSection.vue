<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const collections = [
  {
    id: 1,
    title: '街头经典',
    description: '回归街头本质，打造永恒经典',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=urban%20streetwear%20classic%20collection%20black%20hoodies%20and%20tshirts%20dramatic%20lighting&image_size=landscape_4_3',
    bgColor: 'bg-black'
  },
  {
    id: 2,
    title: '城市机能',
    description: '融合功能与时尚，应对都市挑战',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=urban%20techwear%20collection%20black%20functional%20clothing%20modern%20aesthetic&image_size=landscape_4_3',
    bgColor: 'bg-gray-900'
  },
  {
    id: 3,
    title: '复古运动',
    description: '重温90年代街头运动风潮',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%2090s%20streetwear%20sport%20collection%20black%20and%20white%20retro%20style&image_size=landscape_4_3',
    bgColor: 'bg-gray-800'
  }
]

const navigateToProducts = () => {
  router.push('/products')
}
</script>

<template>
  <section class="py-0">
    <div class="grid grid-cols-1 lg:grid-cols-3">
      <div 
        v-for="collection in collections" 
        :key="collection.id"
        class="relative h-96 lg:h-screen/2 group cursor-pointer overflow-hidden"
        :class="collection.bgColor"
      >
        <div class="absolute inset-0 z-0">
          <img 
            :src="collection.image" 
            :alt="collection.title" 
            class="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        
        <div class="absolute inset-0 z-20 flex flex-col justify-end p-8">
          <div class="transform transition-transform duration-500 group-hover:-translate-y-4">
            <h3 class="text-3xl font-bold text-white mb-3 group-hover:text-red transition-colors duration-300">
              {{ collection.title }}
            </h3>
            <p class="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {{ collection.description }}
            </p>
            <button 
              @click="navigateToProducts"
              class="inline-flex items-center space-x-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
            >
              <span class="border-b-2 border-red pb-1 group-hover:border-white transition-colors duration-300">
                探索系列
              </span>
              <span class="text-red group-hover:text-white transition-colors duration-300">→</span>
            </button>
          </div>
        </div>
        
        <div class="absolute top-0 right-0 w-20 h-20 bg-red transform translate-x-10 -translate-y-10 rotate-45 group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:rotate-0 transition-all duration-500 z-30"></div>
      </div>
    </div>
  </section>
</template>
