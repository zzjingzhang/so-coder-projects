<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span>Portfolio</span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-8">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400': $route.path === item.path }"
          >
            {{ item.label }}
          </RouterLink>
          
          <button 
            @click="$emit('toggle-theme')"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </nav>

        <button 
          @click="mobileMenuOpen = true"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <MobileNavigation 
      v-if="mobileMenuOpen" 
      :nav-items="navItems"
      :is-dark="isDark"
      @close="mobileMenuOpen = false"
      @toggle-theme="$emit('toggle-theme')"
    />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MobileNavigation from './MobileNavigation.vue'

defineProps<{
  isDark: boolean
}>()

defineEmits<{
  (e: 'toggle-theme'): void
}>()

const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '项目' },
  { path: '/blog', label: '博客' },
  { path: '/about', label: '关于我' },
  { path: '/contact', label: '联系' }
]
</script>