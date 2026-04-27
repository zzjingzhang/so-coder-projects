<template>
  <div class="home-page">
    <NavBar />
    <HeroSection />
    <FeaturesSection />
    <PricingSection />
    <TestimonialsSection />
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import PricingSection from '../components/PricingSection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<style scoped>
.home-page {
  width: 100%;
  overflow-x: hidden;
}
</style>
