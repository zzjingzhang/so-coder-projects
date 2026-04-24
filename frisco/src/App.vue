<template>
  <div class="app">
    <HeaderNav />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue'
import Footer from './components/Footer.vue'
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
