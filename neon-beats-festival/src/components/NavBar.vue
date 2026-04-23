<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', href: '#hero' },
  { name: '阵容', href: '#lineup' },
  { name: '舞台', href: '#stage' },
  { name: '票务', href: '#tickets' },
  { name: '关于', href: '#about' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (href: string) => {
  isMobileMenuOpen.value = false
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
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
        ? 'bg-deep-purple/95 backdrop-blur-md shadow-lg shadow-purple-medium/20'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <div class="flex-shrink-0">
          <a
            href="#"
            class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink text-gradient glow-text"
          >
            NEON<span class="text-electric-blue">BEATS</span>
          </a>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click.prevent="scrollToSection(item.href)"
            class="text-glow-white/80 hover:text-electric-blue transition-colors duration-300 font-medium relative group"
          >
            {{ item.name }}
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-blue transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
          <button
            class="px-6 py-2 bg-gradient-to-r from-electric-blue to-purple-light rounded-full font-bold text-glow-white hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 transform hover:scale-105"
          >
            立即购票
          </button>
        </div>

        <button
          class="md:hidden text-glow-white p-2"
          @click="toggleMobileMenu"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-purple-dark/95 backdrop-blur-md border-t border-purple-medium/30"
    >
      <div class="px-4 py-4 space-y-3">
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          @click.prevent="scrollToSection(item.href)"
          class="block text-glow-white/80 hover:text-electric-blue py-2 transition-colors duration-300"
        >
          {{ item.name }}
        </a>
        <button
          class="w-full mt-4 px-6 py-3 bg-gradient-to-r from-electric-blue to-purple-light rounded-full font-bold text-glow-white"
        >
          立即购票
        </button>
      </div>
    </div>
  </nav>
</template>
