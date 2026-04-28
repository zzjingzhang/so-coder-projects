<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <AppHeader :is-dark="isDark" @toggle-theme="toggleTheme" />
    <main class="pt-16">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useTheme } from './composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>