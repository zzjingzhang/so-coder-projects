<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white shadow-lg' : 'bg-transparent'"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">S</span>
          </div>
          <span class="text-xl font-bold" :class="scrolled ? 'text-dark' : 'text-white'">SecureVPN</span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a 
            v-for="item in navItems" 
            :key="item.name"
            :href="item.href"
            class="font-medium transition-colors duration-200 relative"
            :class="[
              scrolled ? 'text-dark hover:text-primary' : 'text-white hover:text-primary/80',
              isActive(item.id) ? (scrolled ? 'text-primary' : 'text-blue-300') : ''
            ]"
          >
            {{ item.name }}
            <!-- 高亮指示器 -->
            <span 
              v-if="isActive(item.id)"
              class="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
              :class="scrolled ? 'bg-primary' : 'bg-blue-300'"
            ></span>
          </a>
          <a-button type="primary" size="large" class="bg-primary hover:bg-secondary border-none">
            开始使用
          </a-button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden p-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :class="scrolled ? 'text-dark' : 'text-white'"
        >
          <svg 
            v-if="!mobileMenuOpen"
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg 
            v-else
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden mt-4 pb-4"
      >
        <div class="flex flex-col space-y-4">
          <a 
            v-for="item in navItems" 
            :key="item.name"
            :href="item.href"
            class="font-medium py-2 px-3 rounded-lg transition-colors duration-200"
            :class="[
              scrolled ? 'text-dark hover:text-primary hover:bg-blue-50' : 'text-white hover:text-primary/80 hover:bg-white/10',
              isActive(item.id) ? (scrolled ? 'bg-blue-50 text-primary' : 'bg-white/20 text-blue-300') : ''
            ]"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </a>
          <a-button type="primary" size="large" block class="bg-primary hover:bg-secondary border-none">
            开始使用
          </a-button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Button as AButton } from 'ant-design-vue'

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeSection = ref('hero')

const navItems = [
  { name: '首页', href: '#hero', id: 'hero' },
  { name: '功能', href: '#features', id: 'features' },
  { name: '价格', href: '#pricing', id: 'pricing' },
  { name: '评价', href: '#testimonials', id: 'testimonials' },
  { name: '联系我们', href: '#footer', id: 'footer' }
]

const isActive = (itemId) => {
  return activeSection.value === itemId
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  
  // 检测当前激活的section
  const sections = ['hero', 'features', 'pricing', 'testimonials', 'footer']
  let currentActive = 'hero'
  
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      // 当section的顶部进入视口的1/3时，认为是当前激活的section
      if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
        currentActive = section
        break
      }
      // 当section的顶部在视口上方，但底部还在视口中时
      if (rect.top < 0 && rect.bottom > 0) {
        currentActive = section
      }
    }
  }
  
  activeSection.value = currentActive
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始调用一次，确保页面加载时也能正确高亮
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
nav {
  backdrop-filter: blur(10px);
}
</style>
