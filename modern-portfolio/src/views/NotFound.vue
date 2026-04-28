<template>
  <div class="min-h-screen flex items-center justify-center py-20">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="relative mb-8">
        <div class="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-none">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>

      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        页面不存在
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
        抱歉，您访问的页面不存在或已被移除。
        让我们带您回到正轨。
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          返回首页
        </RouterLink>
        <RouterLink
          to="/contact"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          联系我们
        </RouterLink>
      </div>

      <div class="mt-16">
        <p class="text-gray-500 dark:text-gray-400 mb-6">或者访问这些页面：</p>
        <div class="flex flex-wrap justify-center gap-4">
          <RouterLink
            to="/projects"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            项目展示
          </RouterLink>
          <RouterLink
            to="/blog"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            博客
          </RouterLink>
          <RouterLink
            to="/about"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            关于我
          </RouterLink>
        </div>
      </div>

      <div class="mt-16 relative">
        <div class="relative">
          <div class="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
          <div class="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              需要帮助找到什么？
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              如果您认为这是一个错误，请告诉我，我会尽快修复。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
