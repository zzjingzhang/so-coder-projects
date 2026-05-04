<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturedSection from '../components/FeaturedSection.vue'
import CollectionSection from '../components/CollectionSection.vue'
import NewsletterSection from '../components/NewsletterSection.vue'
import FooterComponent from '../components/FooterComponent.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComponent :is-menu-open="isMenuOpen" @toggle-menu="toggleMenu" />
    
    <main class="flex-grow">
      <HeroSection />
      <FeaturedSection />
      <CollectionSection />
      <NewsletterSection />
    </main>
    
    <FooterComponent />
  </div>
</template>
