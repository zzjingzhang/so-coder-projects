<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Props {
  isMenuOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle-menu'): void
}>()

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '商品', path: '/products' },
  { name: '关于', path: '/about' },
  { name: '联系', path: '/contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const updateBodyOverflow = (isOpen: boolean) => {
  if (typeof document !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}

watch(() => props.isMenuOpen, (newVal) => {
  updateBodyOverflow(newVal)
}, { immediate: true })

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  updateBodyOverflow(false)
})

const navigateTo = (path: string) => {
  router.push(path)
  emit('toggle-menu')
}
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'bg-black shadow-lg' : 'bg-black/70 backdrop-blur-sm'"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        <div 
          class="text-2xl font-bold text-white cursor-pointer hover:text-red transition-colors duration-300"
          @click="navigateTo('/')"
        >
          URBAN<span class="text-red">THREADS</span>
        </div>
        
        <nav class="hidden md:flex items-center space-x-8">
          <a 
            v-for="item in navItems" 
            :key="item.path"
            @click="navigateTo(item.path)"
            class="text-white font-medium cursor-pointer hover:text-red transition-colors duration-300 relative group"
            :class="{ 'text-red': route.path === item.path }"
          >
            {{ item.name }}
            <span 
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-red transition-all duration-300 group-hover:w-full"
              :class="{ 'w-full': route.path === item.path }"
            ></span>
          </a>
        </nav>
        
        <div class="flex items-center space-x-4">
          <button class="text-white hover:text-red transition-colors duration-300">
            <span class="text-xl">🔍</span>
          </button>
          <button class="text-white hover:text-red transition-colors duration-300 relative">
            <span class="text-xl">🛒</span>
            <span class="absolute -top-2 -right-2 w-5 h-5 bg-red text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          
          <button 
            class="md:hidden text-white hover:text-red transition-colors duration-300"
            @click="emit('toggle-menu')"
          >
            <span class="text-2xl" v-if="!isMenuOpen">☰</span>
            <span class="text-2xl" v-else>✕</span>
          </button>
        </div>
      </div>
    </div>
    
    <div 
      v-if="isMenuOpen"
      class="md:hidden fixed inset-0 top-20 bg-black z-40"
    >
      <div class="container-custom py-8">
        <nav class="flex flex-col space-y-6">
          <a 
            v-for="item in navItems" 
            :key="item.path"
            @click="navigateTo(item.path)"
            class="text-white text-2xl font-bold cursor-pointer hover:text-red transition-colors duration-300 py-2 border-b border-gray-800"
            :class="{ 'text-red': route.path === item.path }"
          >
            {{ item.name }}
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>
