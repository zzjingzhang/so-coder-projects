<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { path: '/', name: '首页', icon: '🏠' },
  { path: '/professionals', name: '专业指导', icon: '👨‍⚕️' },
  { path: '/tools', name: '自助工具', icon: '🎮' },
  { path: '/community', name: '社区交流', icon: '👥' },
  { path: '/parents', name: '家长资源', icon: '👨‍👩‍👧' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateTo = (path) => {
  router.push(path)
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center cursor-pointer" @click="navigateTo('/')">
          <div class="flex items-center gap-2">
            <span class="text-3xl">🌻</span>
            <span class="text-xl font-bold gradient-text">SafeHaven</span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="nav-link flex items-center gap-1"
            :class="{ 'nav-link-active': route.path === link.path }"
          >
            <span>{{ link.icon }}</span>
            <span>{{ link.name }}</span>
          </router-link>
        </div>

        <!-- Login/Register Buttons -->
        <div class="hidden md:flex items-center gap-4">
          <router-link
            to="/login"
            class="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            登录
          </router-link>
          <router-link
            to="/login"
            class="btn-primary text-sm px-4 py-2"
          >
            免费注册
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          @click="toggleMobileMenu"
        >
          <span class="text-2xl">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden pb-4 border-t border-gray-100"
      >
        <div class="flex flex-col space-y-2 pt-4">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="nav-link flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-50"
            :class="{ 'nav-link-active bg-primary-50': route.path === link.path }"
            @click="toggleMobileMenu"
          >
            <span>{{ link.icon }}</span>
            <span>{{ link.name }}</span>
          </router-link>
          <div class="flex flex-col gap-2 mt-4 px-4">
            <router-link
              to="/login"
              class="text-center py-2 text-primary-600 font-medium"
              @click="toggleMobileMenu"
            >
              登录
            </router-link>
            <router-link
              to="/login"
              class="btn-primary text-center"
              @click="toggleMobileMenu"
            >
              免费注册
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
