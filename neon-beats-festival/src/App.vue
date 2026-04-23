<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import LineupSection from './components/LineupSection.vue'
import StageSection from './components/StageSection.vue'
import TicketSection from './components/TicketSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen">
    <NavBar />
    <main>
      <HeroSection />
      <LineupSection />
      <StageSection />
      <TicketSection />
    </main>
    <FooterSection />
  </div>
</template>
