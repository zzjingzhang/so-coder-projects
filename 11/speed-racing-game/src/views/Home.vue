<template>
  <div class="home-container relative w-full h-full bg-gradient-to-b from-racing-dark via-gray-900 to-black flex flex-col items-center justify-center overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div 
        v-for="line in 20" 
        :key="line" 
        class="absolute w-1 bg-racing-yellow opacity-20"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          height: `${30 + Math.random() * 50}px`,
          animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`
        }"
      />
    </div>

    <div class="relative z-10 text-center mb-12">
      <h1 class="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-racing-red via-yellow-500 to-racing-red mb-4 tracking-wider">
        极速赛车
      </h1>
      <p class="text-xl md:text-2xl text-gray-400 font-light tracking-widest">
        SPEED RACING GAME
      </p>
    </div>

    <div class="relative z-10 mb-12">
      <div class="w-32 h-48 relative">
        <div class="absolute inset-0 flex flex-col items-center">
          <div class="w-24 h-8 bg-racing-red rounded-t-lg relative">
            <div class="absolute top-1 left-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
            <div class="absolute top-1 right-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
          </div>
          <div class="w-20 h-16 bg-racing-red relative">
            <div class="absolute inset-x-2 top-1 h-4 bg-blue-400 rounded-t-sm opacity-80" />
          </div>
          <div class="w-24 h-10 bg-racing-red rounded-b-lg relative">
            <div class="absolute bottom-2 left-2 w-4 h-2 bg-red-800 rounded-sm" />
            <div class="absolute bottom-2 right-2 w-4 h-2 bg-red-800 rounded-sm" />
          </div>
        </div>
        <div class="absolute -left-2 top-6 w-5 h-8 bg-gray-800 rounded-sm" />
        <div class="absolute -right-2 top-6 w-5 h-8 bg-gray-800 rounded-sm" />
        <div class="absolute -left-2 bottom-6 w-5 h-8 bg-gray-800 rounded-sm" />
        <div class="absolute -right-2 bottom-6 w-5 h-8 bg-gray-800 rounded-sm" />
      </div>
    </div>

    <div class="relative z-10 flex flex-col gap-4">
      <n-button 
        type="primary" 
        size="large" 
        @click="startGame"
        class="racing-button text-lg px-12 py-4"
      >
        开始游戏
      </n-button>
      
      <n-button 
        type="default" 
        size="large" 
        @click="showInstructions = true"
        class="racing-button-secondary text-lg px-12 py-4"
      >
        游戏说明
      </n-button>
    </div>

    <div class="absolute bottom-8 text-gray-500 text-sm">
      <p>使用 ← → 键控制赛车方向 | 空格键加速</p>
    </div>

    <n-modal 
      v-model:show="showInstructions" 
      preset="dialog"
      title="游戏说明"
      :style="{ width: '400px' }"
      positive-text="知道了"
      content="🚗 控制你的赛车在高速公路上飞驰！
      
操作方式：
• ← 方向键：向左移动
• → 方向键：向右移动
• 空格键：加速（短暂提升速度）

游戏目标：
• 躲避迎面而来的车辆
• 收集金币获得额外分数
• 尽可能坚持更长时间
• 随着时间推移，难度会逐渐增加

注意：
• 撞到其他车辆游戏结束
• 安全第一，祝你好运！"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showInstructions = ref(false)

const startGame = () => {
  router.push('/game')
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 0.2; transform: scaleY(1); }
  50% { opacity: 0.5; transform: scaleY(1.2); }
}
</style>
