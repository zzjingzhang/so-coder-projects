<template>
  <div class="game-over-container relative w-full h-full bg-gradient-to-b from-racing-dark via-gray-900 to-black flex flex-col items-center justify-center overflow-hidden">
    <div class="absolute inset-0">
      <div 
        v-for="i in 30" 
        :key="i"
        class="absolute w-1 bg-racing-red opacity-20"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          height: `${20 + Math.random() * 40}px`,
          animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`
        }"
      />
    </div>

    <div class="relative z-10 text-center mb-8">
      <h1 class="text-5xl md:text-7xl font-black text-racing-red mb-4 tracking-wider animate-pulse">
        游戏结束
      </h1>
      <p class="text-xl md:text-2xl text-gray-400 font-light tracking-widest">
        GAME OVER
      </p>
    </div>

    <div class="relative z-10 mb-12">
      <n-card class="bg-gray-800 bg-opacity-80 border-racing-red rounded-xl p-8 min-w-80">
        <div class="text-center">
          <p class="text-gray-400 text-lg mb-2">最终分数</p>
          <p class="text-6xl font-black text-yellow-400 mb-4">
            {{ finalScore }}
          </p>
          
          <div class="flex justify-center gap-8 mt-6">
            <div class="text-center">
              <p class="text-gray-500 text-sm">最高速度</p>
              <p class="text-2xl font-bold text-green-400">{{ maxSpeed }} km/h</p>
            </div>
          </div>
        </div>
      </n-card>
    </div>

    <div class="relative z-10 mb-8">
      <n-alert type="info" class="bg-blue-900 bg-opacity-50 border-blue-500">
        <template #icon>
          <span>💡</span>
        </template>
        <template #header>
          <span class="text-blue-300">提示</span>
        </template>
        <span class="text-blue-200">收集金币可以获得额外分数！空格键可以短暂加速！</span>
      </n-alert>
    </div>

    <div class="relative z-10 flex flex-col md:flex-row gap-4">
      <n-button 
        type="primary" 
        size="large" 
        @click="playAgain"
        class="racing-button text-lg px-12 py-4"
      >
        再玩一次
      </n-button>
      
      <n-button 
        type="default" 
        size="large" 
        @click="goHome"
        class="racing-button-secondary text-lg px-12 py-4"
      >
        返回主页
      </n-button>
    </div>

    <div class="absolute bottom-8 text-gray-600 text-sm">
      <p>按 R 键重新开始 | 按 Enter 键返回主页</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const finalScore = ref(0)
const maxSpeed = ref(0)

const playAgain = () => {
  router.push('/game')
}

const goHome = () => {
  router.push('/')
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'r' || e.key === 'R') {
    playAgain()
  }
  if (e.key === 'Enter') {
    goHome()
  }
}

onMounted(() => {
  const score = route.query.score
  if (score && typeof score === 'string') {
    finalScore.value = parseInt(score)
    maxSpeed.value = Math.floor(100 + finalScore.value / 500 * 10)
  }
  
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 0.2; transform: scaleY(1); }
  50% { opacity: 0.4; transform: scaleY(1.2); }
}
</style>
