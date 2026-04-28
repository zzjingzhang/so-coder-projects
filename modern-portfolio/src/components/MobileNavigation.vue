<template>
  <div class="fixed inset-0 z-[100] md:hidden">
    <div 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
      @click="handleClose"
    ></div>
    <div 
      class="fixed top-0 right-0 h-full w-72 sm:w-80 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
    >
      <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <span class="text-lg font-bold text-gray-900 dark:text-white">菜单</span>
        <button 
          @click="handleClose"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close menu"
        >
          <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="p-4 overflow-y-auto h-[calc(100%-64px)]">
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.path">
            <RouterLink 
              :to="item.path"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              :class="{ 
                'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium': isActiveRoute(item.path) 
              }"
              @click="handleClose"
            >
              <span class="text-lg">{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>

        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button 
            @click="handleToggleTheme"
            class="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span>{{ isDark ? '切换到浅色模式' : '切换到深色模式' }}</span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  navItems: Array<{ path: string; label: string }>
  isDark: boolean
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'toggle-theme'): void
}>()

const route = useRoute()

const isActiveRoute = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const handleClose = () => {
  emit('close')
}

const handleToggleTheme = () => {
  emit('toggle-theme')
  emit('close')
}

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = '0'
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }
)

onMounted(() => {
  if (props.isOpen) {
    lockScroll()
  }
})

onUnmounted(() => {
  unlockScroll()
})
</script>
