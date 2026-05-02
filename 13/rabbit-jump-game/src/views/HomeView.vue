<template>
  <div class="min-h-screen py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- 标题区域 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-pink-500 mb-4">
          🐰 兔子跳台阶 🥕
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          小朋友们，让我们帮助小兔子跳上台阶吧！小兔子一次可以跳 1 级或 2 级台阶，
          看看它跳完 n 级台阶有多少种不同的跳法呢？
        </p>
      </div>

      <!-- 主要游戏区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧：控制区域 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-purple-600 mb-4">🎮 游戏设置</h2>
            
            <!-- 台阶数量输入 -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                选择台阶数量 (1-10):
              </label>
              <div class="flex items-center gap-3">
                <button 
                  @click="decreaseStairs"
                  class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold text-xl hover:bg-purple-200 transition-colors"
                >
                  -
                </button>
                <span class="text-3xl font-bold text-purple-500 min-w-[60px] text-center">
                  {{ stairCount }}
                </span>
                <button 
                  @click="increaseStairs"
                  class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold text-xl hover:bg-purple-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <!-- 开始/重置按钮 -->
            <button 
              @click="startGame"
              class="w-full py-3 px-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold rounded-xl hover:from-pink-500 hover:to-purple-600 transition-all shadow-lg"
            >
              {{ gameStarted ? '🔄 重新开始' : '🚀 开始游戏' }}
            </button>

            <!-- 当前状态显示 -->
            <div v-if="gameStarted" class="mt-6">
              <h3 class="text-lg font-bold text-orange-500 mb-3">📊 当前状态</h3>
              <div class="space-y-2 text-gray-700">
                <div class="flex justify-between items-center bg-orange-50 p-3 rounded-lg">
                  <span>当前位置:</span>
                  <span class="font-bold text-orange-600">{{ currentPosition }} / {{ stairCount }}</span>
                </div>
                <div class="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                  <span>当前跳跃轨迹:</span>
                  <span class="font-bold text-blue-600">{{ currentPath.length > 0 ? currentPath.join(' → ') : '还没开始跳哦！' }}</span>
                </div>
                <div class="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                  <span>已找到的跳法:</span>
                  <span class="font-bold text-green-600">{{ foundPaths.length }} / {{ totalPaths }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 中间：游戏舞台 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-green-600 mb-4 text-center">🎯 游戏舞台</h2>
            
            <!-- 台阶显示区域 -->
            <div class="relative min-h-[400px] bg-gradient-to-b from-sky-100 to-green-100 rounded-xl overflow-hidden">
              <!-- 草地 -->
              <div class="absolute bottom-0 left-0 right-0 h-16 bg-green-400 flex items-end">
                <div class="w-full h-4 bg-green-500"></div>
              </div>
              
              <!-- 台阶和兔子 -->
              <div class="absolute bottom-16 left-0 right-0 flex flex-col-reverse items-center pb-4">
                <div 
                  v-for="stair in stairCount" 
                  :key="stair"
                  class="flex items-end mb-1"
                  :style="{ marginLeft: `${(stair - 1) * 20}px` }"
                >
                  <!-- 台阶 -->
                  <div 
                    class="stair w-20 h-8 bg-gradient-to-r from-amber-300 to-amber-400 rounded-t-lg border-2 border-amber-500 flex items-center justify-center text-amber-800 font-bold shadow-md"
                    :class="{ 'active': currentPosition >= stair }"
                  >
                    {{ stair }}
                  </div>
                  
                  <!-- 兔子 -->
                  <div 
                    v-if="currentPosition === stair"
                    class="ml-2 rabbit-icon"
                    :class="{ 'rabbit-jump': isJumping }"
                  >
                    <div class="text-4xl">🐰</div>
                  </div>
                </div>
              </div>
              
              <!-- 起点兔子 -->
              <div 
                v-if="currentPosition === 0"
                class="absolute bottom-20 left-1/2 transform -translate-x-1/2"
                :class="{ 'rabbit-jump': isJumping }"
              >
                <div class="text-4xl">🐰</div>
                <div class="text-center text-sm text-gray-600 mt-1">起点</div>
              </div>
              
              <!-- 终点旗帜 -->
              <div 
                class="absolute"
                :style="{ 
                  bottom: `${16 + stairCount * 36}px`, 
                  left: `${50 + (stairCount - 1) * 10}px`,
                  transform: 'translateX(-50%)'
                }"
              >
                <div class="text-3xl">🚩</div>
                <div class="text-center text-sm text-gray-600">终点</div>
              </div>
              
              <!-- 庆祝效果 -->
              <div v-if="showCelebration" class="absolute inset-0 pointer-events-none">
                <div v-for="i in 20" :key="i" class="confetti" :style="getConfettiStyle(i)">
                  {{ ['🎉', '🎊', '⭐', '🌟', '✨', '💫'][i % 6] }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：跳法记录 -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-blue-600 mb-4">📝 跳法记录</h2>
            
            <!-- 跳跃按钮 -->
            <div v-if="gameStarted && !isFinished" class="mb-6">
              <h3 class="text-lg font-bold text-pink-500 mb-3">🎮 让兔子跳一跳！</h3>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  @click="jump(1)"
                  :disabled="currentPosition + 1 > stairCount"
                  class="btn-jump py-4 px-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center"
                >
                  <span class="text-2xl mb-1">⬆️</span>
                  <span>跳 1 级</span>
                </button>
                <button 
                  @click="jump(2)"
                  :disabled="currentPosition + 2 > stairCount"
                  class="btn-jump py-4 px-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center"
                >
                  <span class="text-2xl mb-1">⬆️⬆️</span>
                  <span>跳 2 级</span>
                </button>
              </div>
              
              <!-- 撤销按钮 -->
              <button 
                @click="undoJump"
                :disabled="currentPath.length === 0"
                class="w-full mt-3 py-3 px-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↩️ 撤销上一步
              </button>
            </div>
            
            <!-- 完成提示 -->
            <div v-if="isFinished && gameStarted" class="mb-6">
              <div class="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-2 border-yellow-300">
                <h3 class="text-lg font-bold text-orange-600 mb-2 text-center">🎉 太棒了！</h3>
                <p class="text-center text-gray-700 mb-3">
                  兔子成功跳到了第 {{ stairCount }} 级台阶！
                </p>
                <div class="flex gap-2">
                  <button 
                    @click="continueGame"
                    class="flex-1 py-2 px-3 bg-gradient-to-r from-purple-400 to-purple-500 text-white font-bold rounded-lg text-sm"
                  >
                    🔄 再试一次
                  </button>
                  <button 
                    @click="showHint"
                    class="flex-1 py-2 px-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold rounded-lg text-sm"
                  >
                    💡 看看提示
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 已找到的跳法 -->
            <div v-if="foundPaths.length > 0" class="mb-4">
              <h3 class="text-lg font-bold text-green-600 mb-3">✅ 已找到的跳法:</h3>
              <div class="space-y-2 max-h-[250px] overflow-y-auto">
                <div 
                  v-for="(path, index) in foundPaths" 
                  :key="index"
                  class="path-card bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-green-600 font-bold">方法 {{ index + 1 }}:</span>
                    <span class="text-gray-700">{{ path.join(' → ') }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 提示区域 -->
            <div v-if="showHintModal" class="mb-4">
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
                <h3 class="text-lg font-bold text-purple-600 mb-2">💡 数学小知识</h3>
                <p class="text-gray-700 mb-2">
                  这个问题其实就是著名的"斐波那契数列"问题哦！
                </p>
                <p class="text-gray-700 mb-2">
                  跳上 n 级台阶的方法数 = 跳上 (n-1) 级台阶的方法数 + 跳上 (n-2) 级台阶的方法数
                </p>
                <p class="text-gray-700">
                  因为最后一步要么是从第 n-1 级跳 1 级上来，要么是从第 n-2 级跳 2 级上来。
                </p>
                <button 
                  @click="showHintModal = false"
                  class="mt-3 w-full py-2 px-3 bg-purple-500 text-white font-bold rounded-lg text-sm"
                >
                  知道了！
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部说明 -->
      <div class="mt-8 text-center text-gray-500 text-sm">
        <p>🎓 这是一个经典的组合数学问题，帮助小朋友们理解"递推"和"组合"的概念。</p>
        <p>🐰 让小兔子跳一跳，亲自探索不同的跳跃路径吧！</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 游戏状态
const stairCount = ref(5)
const gameStarted = ref(false)
const currentPosition = ref(0)
const currentPath = ref([])
const foundPaths = ref([])
const isJumping = ref(false)
const isFinished = ref(false)
const showCelebration = ref(false)
const showHintModal = ref(false)

// 计算总跳法数（斐波那契数列）
const totalPaths = computed(() => {
  if (stairCount.value <= 0) return 0
  if (stairCount.value === 1) return 1
  if (stairCount.value === 2) return 2
  
  let a = 1, b = 2
  for (let i = 3; i <= stairCount.value; i++) {
    const temp = a + b
    a = b
    b = temp
  }
  return b
})

// 增加台阶数量
const increaseStairs = () => {
  if (stairCount.value < 10) {
    stairCount.value++
    resetGame()
  }
}

// 减少台阶数量
const decreaseStairs = () => {
  if (stairCount.value > 1) {
    stairCount.value--
    resetGame()
  }
}

// 重置游戏
const resetGame = () => {
  gameStarted.value = false
  currentPosition.value = 0
  currentPath.value = []
  foundPaths.value = []
  isFinished.value = false
  showCelebration.value = false
}

// 开始游戏
const startGame = () => {
  resetGame()
  gameStarted.value = true
}

// 跳跃
const jump = (steps) => {
  if (currentPosition.value + steps > stairCount.value) return
  
  isJumping.value = true
  currentPosition.value += steps
  currentPath.value.push(steps)
  
  setTimeout(() => {
    isJumping.value = false
    checkFinish()
  }, 500)
}

// 撤销跳跃
const undoJump = () => {
  if (currentPath.value.length === 0) return
  
  const lastStep = currentPath.value.pop()
  currentPosition.value -= lastStep
  isFinished.value = false
  showCelebration.value = false
}

// 检查是否完成
const checkFinish = () => {
  if (currentPosition.value === stairCount.value) {
    isFinished.value = true
    showCelebration.value = true
    
    // 检查是否是新的跳法
    const pathString = currentPath.value.join(',')
    const isNewPath = !foundPaths.value.some(p => p.join(',') === pathString)
    
    if (isNewPath) {
      foundPaths.value.push([...currentPath.value])
    }
    
    // 3秒后隐藏庆祝效果
    setTimeout(() => {
      showCelebration.value = false
    }, 3000)
  }
}

// 继续游戏（保留已找到的跳法，重新开始新的尝试）
const continueGame = () => {
  currentPosition.value = 0
  currentPath.value = []
  isFinished.value = false
  showCelebration.value = false
}

// 显示提示
const showHint = () => {
  showHintModal.value = true
}

// 获取彩带样式
const getConfettiStyle = (index) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8', '#a29bfe']
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 50}%`,
    animationDelay: `${Math.random() * 1}s`,
    color: colors[index % colors.length],
    fontSize: `${20 + Math.random() * 20}px`
  }
}
</script>

<style scoped>
</style>
