<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center px-6 py-12 md:px-12 md:py-16">
    
    <div class="text-center mb-12 md:mb-20">
      <h1 class="text-5xl md:text-7xl font-bold text-white mb-8 md:mb-10 drop-shadow-2xl leading-tight">
        🎮 游戏中心
      </h1>
      <p class="text-xl md:text-2xl text-purple-300 mt-4 md:mt-6 leading-relaxed">
        选择您想玩的游戏
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl w-full mb-12 md:mb-20">
      
      <router-link 
        to="/shooter" 
        class="group block"
      >
        <div class="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 md:p-12 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/50">
          <div class="text-center">
            
            <div class="text-7xl md:text-8xl mb-8 md:mb-10">
              🔫
            </div>
            
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
              射击游戏
            </h2>
            
            <p class="text-red-200 mb-8 md:mb-10 text-lg md:text-xl leading-relaxed mt-4 md:mt-6">
              控制角色射击敌人，收集金币！
            </p>
            
            <div class="flex flex-wrap justify-center gap-4 mb-10 md:mb-12 mt-4 md:mt-6">
              <span class="bg-white/25 text-white px-5 py-3 rounded-full text-sm md:text-base font-medium">
                触摸控制
              </span>
              <span class="bg-white/25 text-white px-5 py-3 rounded-full text-sm md:text-base font-medium">
                关卡系统
              </span>
              <span class="bg-white/25 text-white px-5 py-3 rounded-full text-sm md:text-base font-medium">
                物理引擎
              </span>
            </div>
            
            <div class="mt-8 md:mt-10">
              <el-button type="primary" size="large" class="w-full bg-white text-red-600 hover:bg-gray-100 border-none font-bold py-6 md:py-8 text-lg md:text-xl rounded-2xl shadow-lg">
                开始游戏 →
              </el-button>
            </div>
            
          </div>
        </div>
      </router-link>

      <router-link 
        to="/ladder" 
        class="group block"
      >
        <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
          <div class="text-center">
            
            <div class="text-7xl md:text-8xl mb-8 md:mb-10">
              🤖
            </div>
            
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
              梯子游戏
            </h2>
            
            <p class="text-blue-200 mb-8 md:mb-10 text-lg md:text-xl leading-relaxed mt-4 md:mt-6">
              观察机器人自动收集金币攀登！
            </p>
            
            <div class="flex flex-wrap justify-center gap-4 mb-10 md:mb-12 mt-4 md:mt-6">
              <span class="bg-white/25 text-white px-5 py-3 rounded-full text-sm md:text-base font-medium">
                AI 控制
              </span>
              <span class="bg-white/25 text-white px-5 py-3 rounded-full text-sm md:text-base font-medium">
                自动导航
              </span>
              <span class="bg-white/25 text-white px-5 py-3 rounded-full text-sm md:text-base font-medium">
                路径寻找
              </span>
            </div>
            
            <div class="mt-8 md:mt-10">
              <el-button type="primary" size="large" class="w-full bg-white text-blue-600 hover:bg-gray-100 border-none font-bold py-6 md:py-8 text-lg md:text-xl rounded-2xl shadow-lg">
                开始观察 →
              </el-button>
            </div>
            
          </div>
        </div>
      </router-link>
      
    </div>

    <div class="text-center max-w-3xl mt-12 md:mt-20">
      <p class="text-gray-400 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
        💡 提示：射击游戏支持触摸控制，梯子游戏由 AI 机器人自动游玩
      </p>
      <p class="text-gray-500 text-sm md:text-base leading-relaxed mt-4 md:mt-6">
        移动优先设计，支持手机和平板设备
      </p>
    </div>

    <div class="absolute bottom-8 text-center w-full mt-12">
      <p class="text-gray-600 text-xs md:text-sm">
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
