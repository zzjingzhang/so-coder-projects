<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const email = ref('')
const isSubmitting = ref(false)

const handleSubscribe = () => {
  if (!email.value) {
    message.error('请输入您的邮箱地址')
    return
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    message.error('请输入有效的邮箱地址')
    return
  }
  
  isSubmitting.value = true
  
  setTimeout(() => {
    message.success('订阅成功！感谢您关注 Urban Threads')
    email.value = ''
    isSubmitting.value = false
  }, 1000)
}
</script>

<template>
  <section class="py-20 bg-black relative overflow-hidden">
    <div class="absolute top-0 left-0 w-64 h-64 bg-red opacity-10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-red opacity-5 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
    
    <div class="container-custom relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          加入<span class="text-red">街头</span>
        </h2>
        <p class="text-gray-400 text-lg mb-10 leading-relaxed">
          订阅我们的邮件，第一时间获取新品发布、独家优惠和街头文化资讯。成为 Urban Threads 社区的一员。
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input 
            v-model="email"
            type="email" 
            placeholder="输入您的邮箱地址" 
            class="flex-grow bg-white bg-opacity-10 border border-gray-700 text-white px-6 py-4 text-lg focus:outline-none focus:border-red transition-colors duration-300 placeholder-gray-500"
            @keyup.enter="handleSubscribe"
          />
          <button 
            @click="handleSubscribe"
            :disabled="isSubmitting"
            class="group bg-red text-white px-10 py-4 text-lg font-bold hover:bg-red-hover transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="relative z-10">
              {{ isSubmitting ? '订阅中...' : '立即订阅' }}
            </span>
            <span class="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span class="absolute inset-0 flex items-center justify-center text-red font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              立即订阅
            </span>
          </button>
        </div>
        
        <p class="text-gray-500 text-sm mt-6">
          我们尊重您的隐私，绝不会向第三方分享您的信息。
        </p>
      </div>
    </div>
  </section>
</template>
