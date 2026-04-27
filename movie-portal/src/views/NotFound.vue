<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <!-- 404 图标 -->
      <div class="mb-8">
        <div class="relative inline-block">
          <h1 class="text-[120px] md:text-[180px] font-bold text-accent/20 leading-none">
            404
          </h1>
          <div class="absolute inset-0 flex items-center justify-center">
            <i class="pi pi-film text-6xl md:text-8xl text-accent"></i>
          </div>
        </div>
      </div>

      <!-- 标题 -->
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        页面未找到
      </h2>

      <!-- 描述 -->
      <p class="text-gray-400 text-lg mb-8 max-w-md mx-auto">
        抱歉，您访问的页面不存在或已被移除。
        请检查网址是否正确，或返回首页继续浏览。
      </p>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="goToHome"
          class="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/30"
        >
          <i class="pi pi-home text-lg"></i>
          返回首页
        </button>
        <button
          @click="goBack"
          class="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-white/20"
        >
          <i class="pi pi-arrow-left text-lg"></i>
          返回上一页
        </button>
      </div>

      <!-- 推荐内容 -->
      <div class="mt-12 pt-12 border-t border-gray-700">
        <p class="text-gray-400 mb-6">或者尝试以下热门电影：</p>
        <div class="flex justify-center gap-4">
          <button
            @click="router.push('/movies/1')"
            class="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded-lg text-sm transition-all"
          >
            星际穿越
          </button>
          <button
            @click="router.push('/movies/2')"
            class="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded-lg text-sm transition-all"
          >
            盗梦空间
          </button>
          <button
            @click="router.push('/movies/5')"
            class="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded-lg text-sm transition-all"
          >
            黑暗骑士
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
