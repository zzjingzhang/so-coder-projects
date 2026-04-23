<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

const subscribe = () => {
  if (email.value && email.value.includes('@')) {
    subscribed.value = true
    setTimeout(() => {
      email.value = ''
      subscribed.value = false
    }, 3000)
  }
}

const socialLinks = [
  {
    name: '微信',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
  {
    name: '微博',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
  {
    name: '抖音',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
  {
    name: 'B站',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
]

const quickLinks = [
  { name: '首页', href: '#hero' },
  { name: '演出阵容', href: '#lineup' },
  { name: '舞台体验', href: '#stage' },
  { name: '购票', href: '#tickets' },
]

const supportLinks = [
  { name: '常见问题', href: '#' },
  { name: '联系方式', href: '#' },
  { name: '退款政策', href: '#' },
  { name: '隐私条款', href: '#' },
]
</script>

<template>
  <footer id="about" class="bg-deep-purple border-t border-purple-medium/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div class="lg:col-span-1">
          <a
            href="#"
            class="inline-block text-2xl font-extrabold bg-gradient-to-r from-electric-blue via-purple-light to-neon-pink text-gradient glow-text mb-4"
          >
            NEON<span class="text-electric-blue">BEATS</span>
          </a>
          <p class="text-glow-white/60 mb-6 leading-relaxed">
            2026年度最震撼的电子音乐盛宴，集结全球顶级艺人，打造沉浸式视听体验。
          </p>
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              href="#"
              class="w-10 h-10 rounded-xl bg-purple-dark/50 border border-purple-medium/30 flex items-center justify-center text-glow-white/60 hover:text-electric-blue hover:border-electric-blue/50 hover:bg-electric-blue/10 transition-all duration-300"
              :title="social.name"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path :d="social.icon" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-bold text-glow-white mb-6">快速链接</h4>
          <ul class="space-y-4">
            <li v-for="link in quickLinks" :key="link.name">
              <a
                :href="link.href"
                class="text-glow-white/60 hover:text-electric-blue transition-colors duration-300"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold text-glow-white mb-6">支持</h4>
          <ul class="space-y-4">
            <li v-for="link in supportLinks" :key="link.name">
              <a
                :href="link.href"
                class="text-glow-white/60 hover:text-electric-blue transition-colors duration-300"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-bold text-glow-white mb-6">订阅最新动态</h4>
          <p class="text-glow-white/60 mb-4 text-sm">
            第一时间获取音乐节最新消息、艺人阵容更新和独家优惠。
          </p>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="输入您的邮箱"
              class="w-full px-4 py-3 bg-purple-dark/50 border border-purple-medium/30 rounded-xl text-glow-white placeholder-glow-white/40 focus:outline-none focus:border-electric-blue/50 transition-colors duration-300"
            />
            <button
              @click="subscribe"
              :class="[
                'absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300',
                subscribed
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gradient-to-r from-electric-blue to-purple-light text-glow-white hover:shadow-lg hover:shadow-electric-blue/30'
              ]"
            >
              {{ subscribed ? '✓ 已订阅' : '订阅' }}
            </button>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-purple-medium/30">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-glow-white/40 text-sm">
            © 2026 NEONBEATS Festival. All rights reserved.
          </p>
          <div class="flex items-center gap-6 text-glow-white/40 text-sm">
            <a href="#" class="hover:text-electric-blue transition-colors duration-300">服务条款</a>
            <a href="#" class="hover:text-electric-blue transition-colors duration-300">隐私政策</a>
            <a href="#" class="hover:text-electric-blue transition-colors duration-300">Cookie设置</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
