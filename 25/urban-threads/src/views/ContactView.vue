<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { Button, Form, Input, message } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const formRef = ref<FormInstance>()

const modelRef = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const rulesRef = ref<Record<string, Rule[]>>({
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入您的邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  message: [
    { required: true, message: '请输入您的留言', trigger: 'blur' }
  ]
})

const onSubmit = () => {
  formRef.value?.validate()
    .then(() => {
      message.success('留言提交成功！我们会尽快与您联系。')
      modelRef.value = {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    })
    .catch(() => {
      message.error('请填写所有必填项')
    })
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComponent :is-menu-open="isMenuOpen" @toggle-menu="toggleMenu" />
    
    <main class="flex-grow pt-28">
      <section class="bg-black text-white py-16">
        <div class="container-custom text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">联系我们</h1>
          <p class="text-gray-300 text-lg">有任何问题？随时与我们联系</p>
        </div>
      </section>
      
      <section class="py-16 bg-white">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 class="text-3xl font-bold mb-8 text-black">发送消息</h2>
              <Form
                ref="formRef"
                :model="modelRef"
                :rules="rulesRef"
                layout="vertical"
                class="space-y-6"
              >
                <Form.Item label="姓名" name="name">
                  <Input 
                    v-model:value="modelRef.name" 
                    placeholder="请输入您的姓名" 
                    class="h-12 text-lg"
                  />
                </Form.Item>
                
                <Form.Item label="邮箱" name="email">
                  <Input 
                    v-model:value="modelRef.email" 
                    placeholder="请输入您的邮箱" 
                    class="h-12 text-lg"
                  />
                </Form.Item>
                
                <Form.Item label="电话（选填）" name="phone">
                  <Input 
                    v-model:value="modelRef.phone" 
                    placeholder="请输入您的电话" 
                    class="h-12 text-lg"
                  />
                </Form.Item>
                
                <Form.Item label="留言" name="message">
                  <Input.TextArea 
                    v-model:value="modelRef.message" 
                    placeholder="请输入您的留言" 
                    :rows="5"
                    class="text-lg"
                  />
                </Form.Item>
                
                <Form.Item>
                  <Button 
                    type="primary" 
                    @click="onSubmit"
                    class="w-full h-14 text-lg font-bold bg-red border-red hover:bg-red-hover hover:border-red-hover"
                  >
                    发送消息
                  </Button>
                </Form.Item>
              </Form>
            </div>
            
            <div>
              <h2 class="text-3xl font-bold mb-8 text-black">联系信息</h2>
              <div class="space-y-8">
                <div class="flex items-start space-x-4 group">
                  <div class="w-12 h-12 bg-red text-white flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors duration-300">
                    <span class="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-red transition-colors duration-300">地址</h3>
                    <p class="text-gray-600">上海市静安区南京西路1788号</p>
                    <p class="text-gray-600">国际中心A座23层</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4 group">
                  <div class="w-12 h-12 bg-red text-white flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors duration-300">
                    <span class="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-red transition-colors duration-300">电话</h3>
                    <p class="text-gray-600">+86 21 8888 8888</p>
                    <p class="text-gray-600">+86 138 8888 8888</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4 group">
                  <div class="w-12 h-12 bg-red text-white flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors duration-300">
                    <span class="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-red transition-colors duration-300">邮箱</h3>
                    <p class="text-gray-600">info@urbanthreads.com</p>
                    <p class="text-gray-600">support@urbanthreads.com</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4 group">
                  <div class="w-12 h-12 bg-red text-white flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors duration-300">
                    <span class="text-xl">⏰</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-red transition-colors duration-300">营业时间</h3>
                    <p class="text-gray-600">周一至周五：9:00 - 18:00</p>
                    <p class="text-gray-600">周六至周日：10:00 - 17:00</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-12">
                <h3 class="text-xl font-bold mb-4 text-black">关注我们</h3>
                <div class="flex space-x-4">
                  <a 
                    href="#" 
                    class="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-red transition-colors duration-300"
                  >
                    <span class="text-xl">微</span>
                  </a>
                  <a 
                    href="#" 
                    class="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-red transition-colors duration-300"
                  >
                    <span class="text-xl">博</span>
                  </a>
                  <a 
                    href="#" 
                    class="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-red transition-colors duration-300"
                  >
                    <span class="text-xl">抖</span>
                  </a>
                  <a 
                    href="#" 
                    class="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-red transition-colors duration-300"
                  >
                    <span class="text-xl">红</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <FooterComponent />
  </div>
</template>
