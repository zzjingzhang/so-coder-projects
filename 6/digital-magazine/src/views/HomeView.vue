<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const isVisible = ref(false)

// 模拟数据
const magazineIssues = ref([
  {
    id: 1,
    title: '创意设计',
    subtitle: '2024年春季刊',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magazine%20cover%20creative%20design%20vibrant%20colors%20modern%20typography&image_size=portrait_4_3',
    description: '探索最新的设计趋势和创意灵感',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: '技术前沿',
    subtitle: '2024年夏季刊',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20magazine%20cover%20futuristic%20innovation%20blue%20cyan%20modern&image_size=portrait_4_3',
    description: '了解最新的技术发展和创新趋势',
    date: '2024-06-20'
  },
  {
    id: 3,
    title: '生活方式',
    subtitle: '2024年秋季刊',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lifestyle%20magazine%20cover%20elegant%20modern%20lifestyle%20warm%20colors&image_size=portrait_4_3',
    description: '品味生活，享受精致人生',
    date: '2024-09-10'
  }
])

const features = ref([
  {
    icon: '📚',
    title: '交互式翻页',
    description: '体验真实的翻页效果，仿佛在阅读实体杂志'
  },
  {
    icon: '✨',
    title: '精美动画',
    description: '流畅的过渡动画，提升阅读体验'
  },
  {
    icon: '🎨',
    title: '现代设计',
    description: '高对比度文本，鲜艳图像，视觉效果出色'
  },
  {
    icon: '📱',
    title: '响应式布局',
    description: '完美适配各种设备屏幕尺寸'
  }
])

// 触发动画
setTimeout(() => {
  isVisible.value = true
}, 100)

const handleReadMagazine = () => {
  router.push('/magazine')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    
    <main class="flex-grow">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-primary-600 via-accent-500 to-primary-400 text-white py-20 px-4 overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-20 left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div class="absolute bottom-20 right-20 w-80 h-80 bg-accent-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div class="max-w-6xl mx-auto relative z-10">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div :class="['transition-all duration-700 delay-100', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
              <h1 class="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                Digital <span class="text-accent-200">Magazine</span>
              </h1>
              <p class="text-xl text-white/90 mb-8 leading-relaxed">
                探索现代数字阅读体验，交互式翻页效果，精美动画过渡，让阅读成为一种享受。
              </p>
              <div class="flex flex-wrap gap-4">
                <button 
                  @click="handleReadMagazine"
                  class="px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  开始阅读
                </button>
                <button class="px-8 py-4 bg-transparent border-2 border-white/50 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                  了解更多
                </button>
              </div>
            </div>
            
            <div :class="['transition-all duration-700 delay-300', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16']">
              <div class="relative">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20digital%20magazine%20display%20mockup%20elegant%20professional&image_size=portrait_4_3" 
                  alt="Digital Magazine" 
                  class="rounded-xl shadow-2xl w-full transform rotate-3 hover:rotate-0 transition-transform duration-500"
                />
                <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-400 rounded-lg opacity-80 -z-10"></div>
                <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary-300 rounded-lg opacity-80 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="py-20 px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-display font-bold mb-4 text-gray-800">为什么选择我们</h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              精心设计的阅读体验，让每一次翻阅都充满惊喜
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="(feature, index) in features" 
              :key="index"
              :class="[
                'bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2',
                `transition-all duration-700 delay-${(index + 1) * 100}`,
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              ]"
            >
              <div class="text-5xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-xl font-display font-semibold mb-3 text-gray-800">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Magazine Issues Section -->
      <section class="py-20 px-4 bg-gray-100">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-display font-bold mb-4 text-gray-800">精选期刊</h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              探索我们丰富的杂志内容，每一期都是精心策划
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div 
              v-for="(issue, index) in magazineIssues" 
              :key="issue.id"
              :class="[
                'bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer',
                `transition-all duration-700 delay-${(index + 1) * 100}`,
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              ]"
              @click="handleReadMagazine"
            >
              <div class="relative overflow-hidden">
                <img 
                  :src="issue.cover" 
                  :alt="issue.title"
                  class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span class="text-white font-semibold">点击阅读 →</span>
                </div>
              </div>
              <div class="p-6">
                <div class="flex justify-between items-center mb-3">
                  <span class="text-sm text-primary-600 font-medium">{{ issue.subtitle }}</span>
                  <span class="text-xs text-gray-500">{{ issue.date }}</span>
                </div>
                <h3 class="text-2xl font-display font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors">
                  {{ issue.title }}
                </h3>
                <p class="text-gray-600">{{ issue.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="py-20 px-4 bg-gradient-to-r from-accent-600 to-primary-500 text-white">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-display font-bold mb-6">准备好开始阅读了吗？</h2>
          <p class="text-xl text-white/90 mb-8">
            立即体验交互式数字杂志，让阅读成为一种享受
          </p>
          <button 
            @click="handleReadMagazine"
            class="px-10 py-5 bg-white text-primary-700 font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            立即体验
          </button>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>

<style scoped>
</style>
