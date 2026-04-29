<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4">
    <div class="text-center mb-12">
      <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
        🎮 游戏中心
      </h1>
      <p class="text-xl text-purple-300">选择您想玩的游戏</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
      <router-link 
        to="/shooter" 
        class="group"
      >
        <div class="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/50">
          <div class="text-center">
            <div class="text-6xl mb-4">🔫</div>
            <h2 class="text-3xl font-bold text-white mb-3">射击游戏</h2>
            <p class="text-red-200 mb-4">控制角色射击敌人，收集金币！</p>
            <div class="flex flex-wrap justify-center gap-2 mb-4">
              <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm">触摸控制</span>
              <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm">玩家对战</span>
              <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm">关卡系统</span>
            </div>
            <el-button type="primary" size="large" class="w-full bg-white text-red-600 hover:bg-gray-100 border-none font-bold">
              开始游戏 →
            </el-button>
          </div>
        </div>
      </router-link>

      <router-link 
        to="/ladder" 
        class="group"
      >
        <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
          <div class="text-center">
            <div class="text-6xl mb-4">🤖</div>
            <h2 class="text-3xl font-bold text-white mb-3">梯子游戏</h2>
            <p class="text-blue-200 mb-4">观察机器人自动收集金币攀登！</p>
            <div class="flex flex-wrap justify-center gap-2 mb-4">
              <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm">AI 控制</span>
              <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm">自动导航</span>
              <span class="bg-white/20 text-white px-3 py-1 rounded-full text-sm">路径寻找</span>
            </div>
            <el-button type="primary" size="large" class="w-full bg-white text-blue-600 hover:bg-gray-100 border-none font-bold">
              开始观察 →
            </el-button>
          </div>
        </div>
      </router-link>
    </div>

    <div class="mt-12 text-center">
      <p class="text-gray-400 text-sm">
        💡 提示：射击游戏支持触摸控制，梯子游戏由 AI 机器人自动游玩
      </p>
      <p class="text-gray-500 text-xs mt-2">
        移动优先设计，支持手机和平板设备
      </p>
    </div>

    <div class="absolute bottom-4 text-center">
      <p class="text-gray-600 text-xs">
        Vue 3 + TypeScript + Tailwind CSS + Element Plus
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  text-decoration: none;
}
</style>
