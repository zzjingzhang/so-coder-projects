<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '杂志', path: '/magazine' },
  { name: '关于', path: '/about' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateTo = (path: string) => {
  isMobileMenuOpen.value = false
  router.push(path)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center cursor-pointer" @click="navigateTo('/')">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mr-3">
            <span class="text-white font-bold text-xl">M</span>
          </div>
          <span class="text-2xl font-display font-bold" :class="isScrolled ? 'text-gray-800' : 'text-white'">
            Digital <span class="text-primary-500">Magazine</span>
          </span>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a 
            v-for="item in navItems" 
            :key="item.path"
            @click="navigateTo(item.path)"
            :class="[
              'font-medium transition-colors duration-200 cursor-pointer',
              route.path === item.path 
                ? 'text-primary-600 font-semibold' 
                : isScrolled ? 'text-gray-700 hover:text-primary-500' : 'text-white/90 hover:text-white'
            ]"
          >
            {{ item.name }}
          </a>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden p-2 rounded-lg transition-colors"
          :class="isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
          @click="toggleMobileMenu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        :class="[
          'md:hidden transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
        ]"
      >
        <nav class="flex flex-col space-y-3 py-4">
          <a 
            v-for="item in navItems" 
            :key="item.path"
            @click="navigateTo(item.path)"
            :class="[
              'font-medium py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer',
              route.path === item.path 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ item.name }}
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>
