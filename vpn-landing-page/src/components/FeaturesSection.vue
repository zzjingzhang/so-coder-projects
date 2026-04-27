<template>
  <section id="features" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- 标题部分 -->
      <div class="text-center mb-16 scroll-animate" v-scroll-animate>
        <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">为什么选择 SecureVPN？</h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          我们提供最先进的VPN技术，确保您的在线安全和隐私得到最佳保护
        </p>
      </div>

      <!-- 功能卡片 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 scroll-animate"
          :style="{ transitionDelay: `${index * 100}ms` }"
          v-scroll-animate
        >
          <!-- 图标 -->
          <div 
            class="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
            :class="feature.iconBg"
          >
            <component :is="feature.icon" class="w-8 h-8 text-white" />
          </div>

          <!-- 标题 -->
          <h3 class="text-xl font-semibold text-dark mb-3">{{ feature.title }}</h3>

          <!-- 描述 -->
          <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'

// 定义图标组件
const ShieldIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      })
    ])
  }
}

const SpeedIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M13 10V3L4 14h7v7l9-11h-7z'
      })
    ])
  }
}

const GlobeIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  }
}

const LockIcon = {
  render() {
    return h('svg', {
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      })
    ])
  }
}

const features = [
  {
    title: '军事级加密',
    description: '采用256位AES加密技术，确保您的数据在传输过程中完全安全，即使在公共WiFi网络上也能放心使用。',
    icon: ShieldIcon,
    iconBg: 'bg-blue-500'
  },
  {
    title: '极速连接',
    description: '我们的高速服务器网络遍布全球，确保您在任何地点都能享受流畅的浏览体验，无卡顿、无延迟。',
    icon: SpeedIcon,
    iconBg: 'bg-green-500'
  },
  {
    title: '全球服务器',
    description: '拥有100+个国家和地区的服务器节点，让您轻松访问全球内容，突破地理限制，畅享自由互联网。',
    icon: GlobeIcon,
    iconBg: 'bg-purple-500'
  },
  {
    title: '零日志政策',
    description: '我们严格遵守隐私保护政策，不记录您的任何浏览活动或个人信息，确保您的在线行为完全匿名。',
    icon: LockIcon,
    iconBg: 'bg-red-500'
  }
]
</script>

<style scoped>
/* 滚动动画相关样式已在全局style.css中定义 */
</style>
