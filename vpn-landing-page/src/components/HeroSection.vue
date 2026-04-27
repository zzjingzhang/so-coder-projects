<template>
  <section id="hero" class="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-primary to-blue-700 overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-4 py-32 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- 左侧内容 -->
        <div class="text-center lg:text-left">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            保护您的
            <span class="text-blue-300">在线隐私</span>
            <br />
            与安全
          </h1>
          <p class="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
            SecureVPN 提供快速、安全、可靠的VPN服务，让您在任何地方都能自由访问互联网，保护您的个人信息免受威胁。
          </p>
          
          <!-- CTA 按钮 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <a-button type="primary" href="#pricing" size="large" class="bg-white text-primary hover:bg-blue-50 border-none text-lg px-8 py-6 h-auto">
              免费试用 7 天
            </a-button>
            <a-button href="#features" size="large" class="border-none bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto font-semibold">
              了解更多
            </a-button>
          </div>

          <!-- 统计卡片 -->
          <div class="grid grid-cols-3 gap-4">
            <div 
              v-for="stat in stats" 
              :key="stat.label"
              class="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center transition-transform hover:scale-105"
            >
              <div class="text-2xl md:text-3xl font-bold text-white mb-1">{{ stat.value }}</div>
              <div class="text-sm text-blue-200">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- 右侧图片/图形 -->
        <div class="relative hidden lg:block">
          <div class="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
            <div class="flex items-center justify-center h-64">
              <div class="text-center">
                <div class="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">安全连接已建立</h3>
                <p class="text-blue-200">您的 IP: 192.168.1.xxx (已加密)</p>
              </div>
            </div>
          </div>
          
          <!-- 装饰元素 -->
          <div class="absolute -top-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
          <div class="absolute -bottom-4 -left-4 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-xl"></div>
        </div>
      </div>
    </div>

    <!-- 滚动指示器 -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <a href="#features" class="text-white/70 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup>
import { Button as AButton } from 'ant-design-vue'

const stats = [
  { value: '10M+', label: '全球用户' },
  { value: '100+', label: '服务器位置' },
  { value: '99.9%', label: '可用性' }
]
</script>

<style scoped>
/* 背景渐变动画 */
section {
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
