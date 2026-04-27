<template>
  <section id="testimonials" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- 标题部分 -->
      <div class="text-center mb-16 scroll-animate" v-scroll-animate>
        <h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">用户的真实评价</h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          看看我们的用户如何评价 SecureVPN 的服务体验
        </p>
      </div>

      <!-- 评价轮播 -->
      <div class="relative max-w-4xl mx-auto scroll-animate" v-scroll-animate>
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <!-- 评价内容 -->
          <div class="relative">
            <!-- 引号图标 -->
            <div class="absolute -top-4 -left-4 text-primary opacity-20">
              <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <!-- 评分 -->
            <div class="flex items-center justify-center mb-6">
              <div v-for="i in 5" :key="i" class="text-yellow-400">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>

            <!-- 评价文本 -->
            <p class="text-xl text-gray-700 text-center leading-relaxed mb-8">
              {{ currentTestimonial.content }}
            </p>

            <!-- 用户信息 -->
            <div class="flex items-center justify-center">
              <div 
                class="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xl font-bold mr-4"
              >
                {{ currentTestimonial.name.charAt(0) }}
              </div>
              <div class="text-center md:text-left">
                <h4 class="font-semibold text-dark text-lg">{{ currentTestimonial.name }}</h4>
                <p class="text-gray-500">{{ currentTestimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 轮播指示器 -->
        <div class="flex justify-center mt-8 space-x-2">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="index"
            @click="currentIndex = index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="currentIndex === index ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'"
          ></button>
        </div>

        <!-- 左右导航按钮 -->
        <button
          @click="prevTestimonial"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextTestimonial"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const testimonials = [
  {
    name: '张明',
    role: '自由职业设计师',
    content: '作为一名经常需要访问国际设计资源的设计师，SecureVPN 给了我极大的帮助。连接速度快，稳定性高，而且价格非常合理。强烈推荐给所有需要稳定VPN服务的朋友！'
  },
  {
    name: '李华',
    role: '跨境电商运营',
    content: '我们公司使用 SecureVPN 已经两年了，服务一直非常稳定。无论是管理海外店铺还是与国际客户沟通，都没有出现过任何问题。客服响应也很及时，非常专业。'
  },
  {
    name: '王芳',
    role: '海外留学生',
    content: '在国外留学期间，SecureVPN 是我最常用的软件之一。不仅可以轻松访问国内的视频网站和学习资源，还能保护我的网络安全。价格对学生来说也很友好。'
  },
  {
    name: '陈伟',
    role: 'IT 安全工程师',
    content: '从技术角度来看，SecureVPN 的加密技术和安全策略都做得非常到位。作为一个专业人士，我很放心使用他们的服务。零日志政策也让我对隐私保护更有信心。'
  }
]

const currentIndex = ref(0)
const autoPlayInterval = ref(null)

const currentTestimonial = ref(testimonials[0])

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
  currentTestimonial.value = testimonials[currentIndex.value]
}

const prevTestimonial = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length
  currentTestimonial.value = testimonials[currentIndex.value]
}

// 自动轮播
onMounted(() => {
  autoPlayInterval.value = setInterval(() => {
    nextTestimonial()
  }, 5000)
})

onUnmounted(() => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
})
</script>

<style scoped>
/* 滚动动画相关样式已在全局style.css中定义 */
</style>
