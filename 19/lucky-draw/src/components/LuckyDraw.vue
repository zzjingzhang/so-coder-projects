<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center p-4 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-16 h-16 bg-pink-300 rounded-full opacity-60 animate-pulse"></div>
      <div class="absolute top-32 right-20 w-12 h-12 bg-purple-300 rounded-full opacity-50 animate-bounce"></div>
      <div class="absolute bottom-20 left-20 w-20 h-20 bg-yellow-200 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute bottom-40 right-10 w-8 h-8 bg-blue-300 rounded-full opacity-50 animate-bounce"></div>
      <div class="absolute top-1/4 left-1/4 text-4xl opacity-30">🌸</div>
      <div class="absolute top-1/3 right-1/3 text-3xl opacity-30">🎀</div>
      <div class="absolute bottom-1/4 left-1/3 text-4xl opacity-30">⭐</div>
      <div class="absolute bottom-1/3 right-1/4 text-3xl opacity-30">💖</div>
      <div class="absolute top-1/2 left-10 text-3xl opacity-25">✨</div>
      <div class="absolute top-1/2 right-10 text-3xl opacity-25">✨</div>
    </div>

    <div class="z-10 flex flex-col items-center w-full max-w-2xl">
      <div class="text-center mb-8 pt-6">
        <h1 class="text-4xl md:text-5xl font-bold text-pink-600 drop-shadow-lg bg-white/60 px-8 py-4 rounded-3xl backdrop-blur-sm">
          🎉 洪老师抽奖，勇敢你就来 🎉
        </h1>
      </div>

      <div class="w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6 border-4 border-pink-200">
        <div class="text-center py-12">
          <div 
            class="text-3xl md:text-4xl font-bold transition-all duration-100 min-h-[80px] flex items-center justify-center text-center"
            :class="isWinner ? 'text-blue-600 text-5xl' : 'text-pink-600'"
          >
            {{ currentPrize }}
          </div>
          <div v-if="isWinner" class="mt-4 text-2xl text-green-600 font-bold animate-bounce">
            🎊 恭喜获得奖品！🎊
          </div>
        </div>
      </div>

      <div class="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border-2 border-purple-200">
        <div class="mb-2 flex justify-between text-sm font-medium">
          <span class="text-purple-600">⏳ 慢速</span>
          <span class="text-pink-600">快速 ⚡</span>
        </div>
        <el-slider
          v-model="speed"
          :min="20"
          :max="200"
          :step="10"
          show-input
          input-size="small"
          class="mt-2"
        >
          <template #tooltip="{ value }">
            <span>{{ value }} ms</span>
          </template>
        </el-slider>
        <div class="mt-2 text-center text-gray-500 text-sm">
          速度越低，滚动越快；速度越高，滚动越慢
        </div>
      </div>

      <el-button
        type="primary"
        size="large"
        :class="[
          'w-full max-w-xs h-16 text-xl font-bold rounded-full shadow-lg transition-all hover:scale-105',
          isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-pink-500 hover:bg-pink-600'
        ]"
        @click="toggleDraw"
      >
        <span v-if="!isRunning && !isWinner">🎰 开始抽奖</span>
        <span v-else-if="isRunning">⏸️ 停止抽奖</span>
        <span v-else>🎰 再次抽奖</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const prizes = [
  "棒棒糖", "小薯片", "小挂扣", "铅笔", "班级群表扬券",
  "一项作业指定券", "小辣条", "小软糖", "便利贴", "棒棒糖",
  "小薯片", "小挂扣", "铅笔", "班级群表扬券", "一项作业指定券",
  "小辣条", "小软糖", "便利贴", "涂改带", "免作业券",
  "中性笔", "免值日一次", "为自己和任选3位好朋友各加2分",
  "选择班内任意位置体验1天", "批评免责卡", "涂改带",
  "免作业券", "中性笔", "免值日一次", "为自己和任选3位好朋友各加2分",
  "选择班内任意位置体验1天", "批评免责卡"
]

const currentPrize = ref("准备抽奖...")
const isRunning = ref(false)
const isWinner = ref(false)
const speed = ref(100)
let timer = null

const toggleDraw = () => {
  if (isRunning.value) {
    stopDraw()
  } else {
    startDraw()
  }
}

const startDraw = () => {
  isRunning.value = true
  isWinner.value = false
  
  if (timer) clearInterval(timer)
  
  timer = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * prizes.length)
    currentPrize.value = prizes[randomIndex]
  }, speed.value)
}

const stopDraw = () => {
  isRunning.value = false
  
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  
  const randomIndex = Math.floor(Math.random() * prizes.length)
  currentPrize.value = prizes[randomIndex]
  isWinner.value = true
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 3s ease-in-out infinite;
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

:deep(.el-slider__runway) {
  background-color: #e9d5ff;
}

:deep(.el-slider__bar) {
  background-color: #ec4899;
}

:deep(.el-slider__button) {
  border-color: #ec4899;
}

:deep(.el-slider__button:hover) {
  background-color: #ec4899;
}

:deep(.el-input-number) {
  width: 100px;
}

:deep(.el-input-number .el-input__wrapper) {
  background-color: #fdf2f8;
}

:deep(.el-button--primary) {
  border: none;
}
</style>
