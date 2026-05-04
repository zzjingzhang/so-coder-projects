<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-black z-0">
      <img 
        src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=urban%20streetwear%20fashion%20model%20black%20and%20white%20photography%20dramatic%20lighting&image_size=landscape_16_9" 
        alt="街头服饰" 
        class="w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
    </div>
    
    <div class="container-custom relative z-10">
      <div class="max-w-3xl">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          街头<br />
          <span class="text-red">态度</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
          探索城市街头文化，定义你的独特风格。Urban Threads - 源于街头，忠于自我。
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            @click="navigateTo('/products')"
            class="group bg-red text-white px-10 py-4 text-lg font-bold hover:bg-red-hover transition-all duration-300 relative overflow-hidden"
          >
            <span class="relative z-10">探索系列</span>
            <span class="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          <button 
            @click="navigateTo('/about')"
            class="group bg-transparent text-white border-2 border-white px-10 py-4 text-lg font-bold hover:bg-white hover:text-black transition-all duration-300"
          >
            了解更多
          </button>
        </div>
      </div>
    </div>
    
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
      <div class="w-8 h-14 border-2 border-white rounded-full flex justify-center">
        <div class="w-2 h-2 bg-red rounded-full mt-2 animate-bounce"></div>
      </div>
    </div>
    
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-5"></div>
  </section>
</template>
