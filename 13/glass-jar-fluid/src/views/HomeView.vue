<template>
  <div class="home-view">
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          玻璃罐子流体效果
        </h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          三个优雅的透明玻璃罐子，每个都装有独特颜色的波动液体
        </p>
      </div>

      <div class="flex flex-wrap justify-center items-end gap-8 md:gap-12">
        <GlassJar 
          liquidColor="#00d4ff" 
          liquidName="蓝色梦幻" 
          :fillLevel="0.7"
        />
        <GlassJar 
          liquidColor="#ff6b6b" 
          liquidName="红色热情" 
          :fillLevel="0.6"
        />
        <GlassJar 
          liquidColor="#4ecdc4" 
          liquidName="绿色清新" 
          :fillLevel="0.8"
        />
      </div>

      <div class="mt-16 text-center">
        <v-btn 
          color="primary" 
          size="large" 
          class="px-8 min-h-[56px] text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          @click="refreshAnimation"
          style="display: flex; align-items: center; justify-content: center; line-height: normal;"
        >
          重新加载动画
        </v-btn>
      </div>

      <div class="mt-12 text-center text-gray-400 text-sm">
        <p>© 2024 玻璃罐子流体效果演示 | 使用 Vue 3 + Tailwind CSS + Vuetify 构建</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlassJar from '../components/GlassJar.vue'
import { ref } from 'vue'

const refreshAnimation = () => {
  window.location.reload()
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>