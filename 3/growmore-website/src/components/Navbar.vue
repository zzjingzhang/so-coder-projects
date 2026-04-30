<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: '主页', path: '/' },
  { name: '服务', path: '/services' },
  { name: '关于我们', path: '/about' },
  { name: '联系我们', path: '/contact' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div 
          class="flex items-center cursor-pointer"
          @click="navigateTo('/')"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">G</span>
          </div>
          <span 
            :class="[
              'ml-3 text-xl font-bold transition-colors duration-300',
              isScrolled ? 'text-text' : 'text-white'
            ]"
          >
            GrowMore Inc.
          </span>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a 
            v-for="link in navLinks" 
            :key="link.path"
            @click="navigateTo(link.path)"
            :class="[
              'cursor-pointer font-medium transition-all duration-300 relative',
              route.path === link.path 
                ? (isScrolled ? 'text-primary' : 'text-secondary') 
                : (isScrolled ? 'text-text hover:text-primary' : 'text-white hover:text-secondary'),
              'after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300',
              route.path === link.path ? 'after:w-full' : 'after:w-0 hover:after:w-full'
            ]"
          >
            {{ link.name }}
          </a>
        </div>

        <button 
          class="md:hidden p-2 rounded-lg transition-colors duration-300"
          :class="isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'"
          @click="toggleMenu"
        >
          <svg 
            :class="['w-6 h-6 transition-colors duration-300', isScrolled ? 'text-text' : 'text-white']"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              v-if="!isMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              :stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              :stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div 
        v-if="isMenuOpen"
        class="md:hidden mt-4 pb-4 bg-white rounded-xl shadow-xl"
      >
        <div class="flex flex-col space-y-2 px-4 py-2">
          <a 
            v-for="link in navLinks" 
            :key="link.path"
            @click="navigateTo(link.path)"
            :class="[
              'px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-200',
              route.path === link.path 
                ? 'bg-primary/10 text-primary' 
                : 'text-text hover:bg-gray-50'
            ]"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
