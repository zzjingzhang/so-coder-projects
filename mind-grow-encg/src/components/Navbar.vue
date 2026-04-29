<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
            <el-icon class="text-white text-xl"><Brain /></el-icon>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Mind & Grow ENCG
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-3 py-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium text-sm"
            :class="{ 'text-primary-600 bg-primary-50': isActive(link.path) }"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- Right Side Actions -->
        <div class="hidden md:flex items-center space-x-3">
          <el-button type="primary" size="small" class="rounded-lg">
            <el-icon><User /></el-icon>
            Sign In
          </el-button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <el-icon :size="24" v-if="!mobileMenuOpen"><Menu /></el-icon>
          <el-icon :size="24" v-else><Close /></el-icon>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition name="slide-up">
        <div v-if="mobileMenuOpen" class="md:hidden pb-4">
          <div class="flex flex-col space-y-1">
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="mobileMenuOpen = false"
              class="px-4 py-3 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium flex items-center space-x-3"
              :class="{ 'text-primary-600 bg-primary-50': isActive(link.path) }"
            >
              <el-icon><component :is="link.icon" /></el-icon>
              <span>{{ link.name }}</span>
            </router-link>
            <div class="pt-3">
              <el-button type="primary" size="default" class="w-full rounded-lg">
                <el-icon><User /></el-icon>
                Sign In
              </el-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/', icon: 'HomeFilled' },
  { name: 'Health & Balance', path: '/health-balance', icon: 'Heart' },
  { name: 'Student Recipes', path: '/student-recipes', icon: 'KnifeFork' },
  { name: 'Community', path: '/community', icon: 'User' },
  { name: 'Well-Being Store', path: '/store', icon: 'ShoppingBag' },
  { name: 'Zen Studio', path: '/zen-studio', icon: 'VideoCamera' }
]

const isActive = (path) => {
  return route.path === path
}
</script>

<style scoped>
</style>
