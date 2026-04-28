<template>
  <div class="fixed inset-0 z-50 md:hidden">
    <div class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>
    <div class="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl">
      <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <span class="text-lg font-bold text-gray-900 dark:text-white">菜单</span>
        <button 
          @click="$emit('close')"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="p-4">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.path">
            <RouterLink 
              :to="item.path"
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              @click="$emit('close')"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button 
            @click="$emit('toggle-theme'); $emit('close')"
            class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span>{{ isDark ? '切换到浅色模式' : '切换到深色模式' }}</span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  navItems: Array<{ path: string; label: string }>
  isDark: boolean
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'toggle-theme'): void
}>()
</script>