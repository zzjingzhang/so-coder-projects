<script>
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
import Architecture from './components/Architecture.vue';
import Performance from './components/Performance.vue';

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    Features,
    Architecture,
    Performance
  }
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <Header />
    <main>
      <Hero />
      <Features />
      <Architecture />
      <Performance />
    </main>
    <footer class="bg-gray-900 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-400">
          © 2026 Alibaba Group. Qwen 3 大语言模型.
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
/* 自定义滚动行为 */
html {
  scroll-behavior: smooth;
}

/* 全局样式 */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
