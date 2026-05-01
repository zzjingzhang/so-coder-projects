<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import MagazineBook from '../components/MagazineBook.vue'

interface MagazinePage {
  id: number
  title: string
  subtitle?: string
  content: string
  image?: string
  type: 'cover' | 'content' | 'image' | 'back'
}

const isLoading = ref(true)
const magazinePages = ref<MagazinePage[]>([])

onMounted(() => {
  // 模拟加载数据
  setTimeout(() => {
    magazinePages.value = [
      {
        id: 1,
        title: 'Digital Magazine',
        subtitle: '2024年创意设计特刊',
        content: '探索现代设计的无限可能，让创意点亮生活',
        type: 'cover'
      },
      {
        id: 2,
        title: '本期导读',
        content: '欢迎阅读本期《Digital Magazine》！这一期我们将带您探索现代设计的最新趋势、技术创新以及生活方式的精彩内容。从极简主义设计到人工智能的艺术应用，从城市建筑到可持续生活方式，我们为您精心准备了丰富的内容。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20magazine%20table%20of%20contents%20elegant%20minimalist%20design&image_size=landscape_4_3',
        type: 'content'
      },
      {
        id: 3,
        title: '设计趋势 2024',
        content: '2024年的设计趋势正在向着更加自然、有机的方向发展。设计师们正在将自然元素与数字技术完美融合，创造出既现代又温暖的视觉体验。渐变色彩、3D元素、微交互设计正在成为主流。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20design%20trends%202024%20vibrant%20colors%20creative%20abstract&image_size=portrait_4_3',
        type: 'image'
      },
      {
        id: 4,
        title: '极简主义美学',
        content: '少即是多。极简主义不仅仅是一种设计风格，更是一种生活态度。通过去除不必要的元素，我们让真正重要的内容得以凸显。这种设计哲学正在影响从网页设计到产品设计的各个领域。简洁的线条、充足的留白、精心选择的色彩搭配，构成了极简主义的核心美学。',
        type: 'content'
      },
      {
        id: 5,
        title: 'AI 艺术革命',
        content: '人工智能正在彻底改变艺术创作的方式。从文字生成图像到风格迁移，AI 工具为艺术家们提供了前所未有的创作可能性。本期我们深入探讨 AI 艺术的现状与未来发展。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=artificial%20intelligence%20art%20futuristic%20creative%20digital%20art&image_size=portrait_4_3',
        type: 'image'
      },
      {
        id: 6,
        title: '色彩心理学',
        content: '色彩不仅仅是视觉元素，更是情感的载体。不同的色彩能够唤起不同的情感反应：红色代表激情与能量，蓝色传达信任与平静，绿色象征自然与成长。理解色彩心理学是设计成功的关键之一。设计师通过巧妙的色彩搭配，可以引导用户的情绪和行为。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=color%20psychology%20design%20vibrant%20colors%20palette%20creative&image_size=landscape_4_3',
        type: 'content'
      },
      {
        id: 7,
        title: '城市建筑之美',
        content: '现代城市建筑正在以前所未有的方式重新定义我们的生活空间。从可持续发展的绿色建筑到令人惊叹的地标建筑，建筑师们正在创造既实用又美观的城市景观。玻璃幕墙、自然采光、绿植融入，这些元素共同构成了现代建筑的独特魅力。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20urban%20architecture%20beautiful%20city%20buildings%20sleek&image_size=portrait_4_3',
        type: 'image'
      },
      {
        id: 8,
        title: '感谢阅读',
        content: '感谢您阅读本期《Digital Magazine》！我们希望本期的内容能够为您带来灵感和启发。请继续关注我们的下一期，我们将为您带来更多精彩内容。',
        type: 'back'
      }
    ]
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    
    <main class="flex-grow pt-20">
      <!-- Magazine Header -->
      <div class="bg-gradient-to-r from-primary-600 to-accent-500 text-white py-8 px-4">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-3xl md:text-4xl font-display font-bold mb-2">创意设计特刊</h1>
          <p class="text-white/90 text-lg">2024年春季刊 · 探索现代设计的无限可能</p>
        </div>
      </div>
      
      <!-- Magazine Book -->
      <div class="py-8 px-4">
        <div v-if="isLoading" class="flex justify-center items-center h-96">
          <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 border-opacity-50 mx-auto mb-4"></div>
            <p class="text-gray-600">加载杂志中...</p>
          </div>
        </div>
        
        <div v-else class="max-w-6xl mx-auto">
          <MagazineBook :pages="magazinePages" />
          
          <!-- Instructions -->
          <div class="mt-8 bg-white rounded-xl p-6 shadow-md">
            <h3 class="text-xl font-display font-bold mb-4 text-gray-800">操作指南</h3>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="flex items-start">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">点击翻页</h4>
                  <p class="text-sm text-gray-600">点击页面左侧或右侧进行翻页</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">键盘导航</h4>
                  <p class="text-sm text-gray-600">使用方向键 ← → 或空格键进行翻页</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">进度显示</h4>
                  <p class="text-sm text-gray-600">顶部显示当前页码，底部显示阅读进度</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<style scoped>
</style>
