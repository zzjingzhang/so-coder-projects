<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center" 
       style="padding-left: 48px; padding-right: 48px; padding-top: 64px; padding-bottom: 64px;">
    
    <div class="text-center" style="margin-bottom: 80px;">
      <h1 class="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl" 
          style="margin-bottom: 32px; line-height: 1.25;">
        🎮 游戏中心
      </h1>
      <p class="text-xl md:text-2xl text-purple-300" 
         style="margin-top: 24px; line-height: 1.75;">
        选择您想玩的游戏
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full" 
         style="gap: 48px; margin-bottom: 80px;">
      
      <router-link 
        to="/shooter" 
        class="group block"
      >
        <div class="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/50"
             style="padding: 48px;">
          <div class="text-center">
            
            <div class="text-7xl md:text-8xl" style="margin-bottom: 32px;">
              🔫
            </div>
            
            <h2 class="text-3xl md:text-4xl font-bold text-white" 
                style="margin-bottom: 16px; line-height: 1.25;">
              射击游戏
            </h2>
            
            <p class="text-red-200 text-lg md:text-xl" 
               style="margin-top: 16px; margin-bottom: 32px; line-height: 1.75;">
              控制角色射击敌人，收集金币！
            </p>
            
            <div class="flex flex-wrap justify-center" 
                 style="gap: 16px; margin-top: 16px; margin-bottom: 40px;">
              <span class="bg-white/25 text-white rounded-full text-sm md:text-base font-medium"
                    style="padding-left: 20px; padding-right: 20px; padding-top: 12px; padding-bottom: 12px;">
                触摸控制
              </span>
              <span class="bg-white/25 text-white rounded-full text-sm md:text-base font-medium"
                    style="padding-left: 20px; padding-right: 20px; padding-top: 12px; padding-bottom: 12px;">
                关卡系统
              </span>
              <span class="bg-white/25 text-white rounded-full text-sm md:text-base font-medium"
                    style="padding-left: 20px; padding-right: 20px; padding-top: 12px; padding-bottom: 12px;">
                物理引擎
              </span>
            </div>
            
            <div style="margin-top: 32px;">
              <el-button type="primary" size="large" 
                         class="w-full bg-white text-red-600 hover:bg-gray-100 border-none font-bold rounded-2xl shadow-lg"
                         style="padding-top: 24px; padding-bottom: 24px; font-size: 18px;">
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
        <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50"
             style="padding: 48px;">
          <div class="text-center">
            
            <div class="text-7xl md:text-8xl" style="margin-bottom: 32px;">
              🤖
            </div>
            
            <h2 class="text-3xl md:text-4xl font-bold text-white" 
                style="margin-bottom: 16px; line-height: 1.25;">
              梯子游戏
            </h2>
            
            <p class="text-blue-200 text-lg md:text-xl" 
               style="margin-top: 16px; margin-bottom: 32px; line-height: 1.75;">
              观察机器人自动收集金币攀登！
            </p>
            
            <div class="flex flex-wrap justify-center" 
                 style="gap: 16px; margin-top: 16px; margin-bottom: 40px;">
              <span class="bg-white/25 text-white rounded-full text-sm md:text-base font-medium"
                    style="padding-left: 20px; padding-right: 20px; padding-top: 12px; padding-bottom: 12px;">
                AI 控制
              </span>
              <span class="bg-white/25 text-white rounded-full text-sm md:text-base font-medium"
                    style="padding-left: 20px; padding-right: 20px; padding-top: 12px; padding-bottom: 12px;">
                自动导航
              </span>
              <span class="bg-white/25 text-white rounded-full text-sm md:text-base font-medium"
                    style="padding-left: 20px; padding-right: 20px; padding-top: 12px; padding-bottom: 12px;">
                路径寻找
              </span>
            </div>
            
            <div style="margin-top: 32px;">
              <el-button type="primary" size="large" 
                         class="w-full bg-white text-blue-600 hover:bg-gray-100 border-none font-bold rounded-2xl shadow-lg"
                         style="padding-top: 24px; padding-bottom: 24px; font-size: 18px;">
                开始观察 →
              </el-button>
            </div>
            
          </div>
        </div>
      </router-link>
      
    </div>

    <div class="text-center max-w-3xl" style="margin-top: 48px;">
      <p class="text-gray-400 text-base md:text-lg" 
         style="margin-bottom: 16px; line-height: 1.75;">
        💡 提示：射击游戏支持触摸控制，梯子游戏由 AI 机器人自动游玩
      </p>
      <p class="text-gray-500 text-sm md:text-base" 
         style="margin-top: 16px; line-height: 1.75;">
        移动优先设计，支持手机和平板设备
      </p>
    </div>

    <div class="absolute bottom-8 text-center w-full" style="margin-top: 48px;">
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
