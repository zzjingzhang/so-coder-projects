<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const menuItems = [
  { path: '/', name: '首页', label: '这座城' },
  { path: '/tourism', name: '旅游', label: '旅游' },
  { path: '/history', name: '历史', label: '历史' },
  { path: '/economy', name: '经济', label: '经济' },
  { path: '/culture', name: '文化', label: '文化' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const navigateTo = (path: string) => {
  router.push(path)
  mobileMenuOpen.value = false
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
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center cursor-pointer" @click="navigateTo('/')">
          <span
            :class="[
              'text-xl font-bold transition-colors duration-300',
              isScrolled ? 'text-emerald-700' : 'text-white'
            ]"
          >
            🌸 昆明印象
          </span>
        </div>

        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center',
              route.path === item.path
                ? (isScrolled
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-white/20 text-white')
                : (isScrolled
                    ? 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                    : 'text-white/90 hover:bg-white/10 hover:text-white')
            ]"
          >
            {{ item.label }}
          </router-link>
        </div>

        <button
          class="md:hidden p-2 rounded-lg transition-colors"
          :class="[
            isScrolled
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          ]"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white rounded-lg shadow-xl mt-2 overflow-hidden mb-4"
      >
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'block px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center',
            route.path === item.path
              ? 'bg-emerald-50 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
          @click="mobileMenuOpen = false"
        >
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </nav>
</template>
