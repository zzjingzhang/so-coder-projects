<template>
  <section id="pricing" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <!-- 标题部分 -->
      <div class="text-center mb-16 scroll-animate" v-scroll-animate>
        <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">选择您的套餐</h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          无论您是个人用户还是企业用户，我们都有适合您的VPN解决方案
        </p>
      </div>

      <!-- 价格卡片 -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- 免费套餐 -->
        <div class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 scroll-animate" v-scroll-animate>
          <div class="text-center mb-8">
            <div class="inline-block bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              适合初学者
            </div>
            <h3 class="text-2xl font-bold text-dark mb-2">免费版</h3>
            <div class="flex items-baseline justify-center">
              <span class="text-4xl font-bold text-dark">¥0</span>
              <span class="text-gray-500 ml-2">/月</span>
            </div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">3 个服务器位置</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">1 台设备同时连接</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">基础加密保护</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="text-gray-400">无高级功能</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="text-gray-400">有限带宽</span>
            </li>
          </ul>

          <a-button size="large" block class="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 h-12">
            开始使用
          </a-button>
        </div>

        <!-- Standard 套餐 -->
        <div class="bg-primary rounded-2xl p-8 shadow-2xl transform scale-105 relative scroll-animate" v-scroll-animate>
          <!-- 推荐标签 -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-yellow-400 text-dark text-sm font-bold px-4 py-1 rounded-full">
              最受欢迎
            </span>
          </div>

          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-white mb-2">标准版</h3>
            <div class="flex items-baseline justify-center">
              <span class="text-4xl font-bold text-white">¥29</span>
              <span class="text-blue-200 ml-2">/月</span>
            </div>
            <p class="text-blue-200 text-sm mt-2">按年付费只需 ¥19/月</p>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-white">50+ 个服务器位置</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-white">5 台设备同时连接</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-white">高级加密保护</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-white">Kill Switch 功能</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-white">无限带宽</span>
            </li>
          </ul>

          <a-button type="primary" size="large" block class="bg-white text-primary hover:bg-blue-50 border-none h-12 font-semibold">
            立即购买
          </a-button>
        </div>

        <!-- Premium 套餐 -->
        <div class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 scroll-animate" v-scroll-animate>
          <div class="text-center mb-8">
            <div class="inline-block bg-blue-100 text-primary text-sm font-semibold px-4 py-1 rounded-full mb-4">
              企业级
            </div>
            <h3 class="text-2xl font-bold text-dark mb-2">高级版</h3>
            <div class="flex items-baseline justify-center">
              <span class="text-4xl font-bold text-dark">¥99</span>
              <span class="text-gray-500 ml-2">/月</span>
            </div>
            <p class="text-gray-500 text-sm mt-2">按年付费只需 ¥69/月</p>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">100+ 个服务器位置</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">无限设备同时连接</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">军事级加密</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">专属 IP 地址</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">24/7 专属技术支持</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">无限带宽 + 优先流量</span>
            </li>
          </ul>

          <a-button type="primary" size="large" block class="bg-primary hover:bg-secondary border-none h-12">
            联系销售
          </a-button>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="text-center mt-12">
        <p class="text-gray-600">
          所有套餐均支持 <span class="font-semibold">30天无理由退款保证</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Button as AButton } from 'ant-design-vue'
</script>

<style scoped>
/* 滚动动画相关样式已在全局style.css中定义 */
</style>
