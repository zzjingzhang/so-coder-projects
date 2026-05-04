<template>
  <div
    class="home-container flex flex-col items-center justify-center min-h-screen p-8"
  >
    <div class="title-section mb-12 text-center">
      <h1 class="text-5xl font-bold mb-4 neon-title">RETRO PINBALL</h1>
      <p
        class="text-xl mb-2"
        style="color: white; text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)"
      >
        经典弹球机游戏
      </p>
      <p 
        class="text-sm"
        style="color: #e5e7eb; text-shadow: 0 0 5px rgba(229, 231, 235, 0.6)"
      >
        复古霓虹风格 · 真实物理引擎
      </p>
    </div>

    <div
      class="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl"
    >
      <div
        class="feature-card bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center hover:border-cyan-400 transition-all duration-300"
      >
        <div class="feature-icon text-4xl mb-3">🎮</div>
        <h3 
          class="text-lg font-bold mb-2"
          style="color: #22d3ee; text-shadow: 0 0 10px rgba(34, 211, 238, 0.6)"
        >
          翻转控制
        </h3>
        <p 
          class="text-sm"
          style="color: white; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5)"
        >
          使用键盘控制左右挡板，精准弹射弹球
        </p>
      </div>

      <div
        class="feature-card bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center hover:border-pink-400 transition-all duration-300"
      >
        <div class="feature-icon text-4xl mb-3">⚡</div>
        <h3 
          class="text-lg font-bold mb-2"
          style="color: #f472b6; text-shadow: 0 0 10px rgba(244, 114, 182, 0.6)"
        >
          真实物理
        </h3>
        <p 
          class="text-sm"
          style="color: white; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5)"
        >
          碰撞检测、重力模拟、弹跳效果
        </p>
      </div>

      <div
        class="feature-card bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center hover:border-yellow-400 transition-all duration-300"
      >
        <div class="feature-icon text-4xl mb-3">💎</div>
        <h3 
          class="text-lg font-bold mb-2"
          style="color: #facc15; text-shadow: 0 0 10px rgba(250, 204, 21, 0.6)"
        >
          得分系统
        </h3>
        <p 
          class="text-sm"
          style="color: white; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5)"
        >
          得分乘数、多球模式、连击奖励
        </p>
      </div>
    </div>

    <div
      class="controls-info bg-gray-900/30 border border-gray-700 rounded-lg p-6 mb-8 max-w-md"
    >
      <h3 
        class="text-lg font-bold mb-4 text-center"
        style="color: white; text-shadow: 0 0 10px rgba(255, 255, 255, 0.6)"
      >
        操作说明
      </h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span 
            class="text-sm"
            style="color: white; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5)"
          >
            左挡板
          </span>
          <span 
            class="font-mono bg-gray-800 px-3 py-1 rounded"
            style="color: #22d3ee; text-shadow: 0 0 5px rgba(34, 211, 238, 0.5)"
          >
            ← 左箭头
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span 
            class="text-sm"
            style="color: white; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5)"
          >
            右挡板
          </span>
          <span 
            class="font-mono bg-gray-800 px-3 py-1 rounded"
            style="color: #22d3ee; text-shadow: 0 0 5px rgba(34, 211, 238, 0.5)"
          >
            → 右箭头
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span 
            class="text-sm"
            style="color: white; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5)"
          >
            发射弹球
          </span>
          <span 
            class="font-mono bg-gray-800 px-3 py-1 rounded"
            style="color: #f472b6; text-shadow: 0 0 5px rgba(244, 114, 182, 0.5)"
          >
            空格键
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span 
            class="text-sm"
            style="color: white; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5)"
          >
            暂停游戏
          </span>
          <span 
            class="font-mono bg-gray-800 px-3 py-1 rounded"
            style="color: #facc15; text-shadow: 0 0 5px rgba(250, 204, 21, 0.5)"
          >
            P 键
          </span>
        </div>
      </div>
    </div>

    <div class="button-group flex gap-4">
      <el-button
        type="primary"
        size="large"
        @click="startGame"
        class="start-button px-8 py-3 text-lg font-bold"
      >
        开始游戏
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const startGame = () => {
  router.push("/game");
};
</script>

<style scoped>
.neon-title {
  color: #ff00ff;
  text-shadow:
    0 0 5px #ff00ff,
    0 0 10px #ff00ff,
    0 0 20px #ff00ff,
    0 0 40px #ff00ff;
  font-family: "Press Start 2P", cursive;
  letter-spacing: 4px;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
}

.start-button {
  background: linear-gradient(180deg, #ff00ff 0%, #9900ff 100%) !important;
  border: none !important;
  color: white !important;
  font-family: "Press Start 2P", cursive;
  transition: all 0.3s ease;
}

.start-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
}
</style>
