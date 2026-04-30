<script setup lang="ts">
import { ref } from 'vue'
import Common from '../components/Common.vue'

const formData = ref({
  fullName: '',
  phone: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = (event: Event) => {
  event.preventDefault()
  
  isSubmitting.value = true
  
  setTimeout(() => {
    console.log('表单提交数据:', formData.value)
    isSubmitting.value = false
    isSubmitted.value = true
    
    formData.value = {
      fullName: '',
      phone: '',
      email: '',
      message: ''
    }
    
    setTimeout(() => {
      isSubmitted.value = false
    }, 3000)
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen">
    <Common 
      title="联系我们"
      subtitle="有任何问题或想了解更多？请随时联系我们，我们的团队将在 24 小时内回复您。"
      :showButton="false"
      imageUrl="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=customer%20service%20support%20team%20helping%20clients%20modern%20communication%20technology&image_size=landscape_16_9"
    />

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-text mb-6">
              让我们开始对话
            </h2>
            <p class="text-lg text-text-light mb-8 leading-relaxed">
              无论您有项目想法、业务咨询还是只是想了解我们的服务，我们都很乐意与您交流。填写下方表单，我们会尽快与您联系。
            </p>

            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-text mb-1">办公地址</h3>
                  <p class="text-text-light">北京市朝阳区科技园区创新大厦 A 座 2001</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-text mb-1">联系电话</h3>
                  <p class="text-text-light">+86 400-123-4567</p>
                  <p class="text-text-light">+86 138-1234-5678</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-text mb-1">电子邮箱</h3>
                  <p class="text-text-light">contact@growmore.com</p>
                  <p class="text-text-light">support@growmore.com</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-text mb-1">工作时间</h3>
                  <p class="text-text-light">周一至周五: 9:00 - 18:00</p>
                  <p class="text-text-light">周末及节假日: 休息</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-background rounded-2xl p-8 shadow-xl">
            <h3 class="text-2xl font-bold text-text mb-6">发送消息</h3>
            
            <div 
              v-if="isSubmitted"
              class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-medium">消息已成功发送！我们会尽快与您联系。</span>
              </div>
            </div>

            <form @submit="handleSubmit" class="space-y-6">
              <div>
                <label for="fullName" class="block text-sm font-medium text-text mb-2">
                  全名 <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="fullName" 
                  v-model="formData.fullName"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="请输入您的姓名"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-text mb-2">
                  联系电话 <span class="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="formData.phone"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="请输入您的电话号码"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-text mb-2">
                  电子邮件 <span class="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="请输入您的邮箱地址"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-text mb-2">
                  消息内容 <span class="text-red-500">*</span>
                </label>
                <textarea 
                  id="message" 
                  v-model="formData.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder-text-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                  placeholder="请输入您想咨询的内容..."
                ></textarea>
              </div>

              <button 
                type="submit"
                :disabled="isSubmitting"
                class="w-full inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span v-if="!isSubmitting">提交消息</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  提交中...
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
