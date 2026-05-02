<script setup lang="ts">
import { ref } from 'vue'
import { Form, Input, Button, Card, message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

const formRef = ref()

const formState = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter your name' }],
  email: [
    { required: true, message: 'Please enter your email' },
    { type: 'email', message: 'Please enter a valid email' }
  ],
  subject: [{ required: true, message: 'Please enter a subject' }],
  message: [{ required: true, message: 'Please enter your message' }]
}

const handleSubmit = () => {
  message.success('Message sent successfully! (This is a demo)')
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="min-h-full p-6 md:p-10">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">📧 Contact</h1>
        <p class="text-gray-400">Let's get in touch</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <Card class="bg-gray-800/50 border-gray-700">
          <h2 class="text-xl font-semibold text-white mb-6">Send a Message</h2>
          <Form
            ref="formRef"
            :model="formState"
            :rules="rules"
            layout="vertical"
            @finish="handleSubmit"
          >
            <Form.Item name="name" label="Name">
              <Input
                v-model:value="formState.name"
                placeholder="Your name"
                class="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input
                v-model:value="formState.email"
                placeholder="your@email.com"
                class="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </Form.Item>
            <Form.Item name="subject" label="Subject">
              <Input
                v-model:value="formState.subject"
                placeholder="What's this about?"
                class="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </Form.Item>
            <Form.Item name="message" label="Message">
              <Input.TextArea
                v-model:value="formState.message"
                placeholder="Your message..."
                :rows="5"
                class="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" html-type="submit" class="w-full h-10">
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <div class="space-y-6">
          <Card class="bg-gray-800/50 border-gray-700">
            <h2 class="text-xl font-semibold text-white mb-6">Contact Info</h2>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center text-2xl">
                  📧
                </div>
                <div>
                  <p class="text-sm text-gray-400">Email</p>
                  <p class="text-white">developer@example.com</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <p class="text-sm text-gray-400">Location</p>
                  <p class="text-white">San Francisco, CA</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center text-2xl">
                  🌐
                </div>
                <div>
                  <p class="text-sm text-gray-400">Website</p>
                  <p class="text-white">portfolio.example.com</p>
                </div>
              </div>
            </div>
          </Card>

          <Card class="bg-gray-800/50 border-gray-700">
            <h2 class="text-xl font-semibold text-white mb-6">Social Links</h2>
            <div class="grid grid-cols-2 gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <span class="text-2xl">📦</span>
                <span class="text-white">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <span class="text-2xl">💼</span>
                <span class="text-white">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <span class="text-2xl">🐦</span>
                <span class="text-white">Twitter</span>
              </a>
              <a
                href="https://codepen.io"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <span class="text-2xl">✏️</span>
                <span class="text-white">CodePen</span>
              </a>
            </div>
          </Card>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-500 text-sm">
          Feel free to reach out! I'm always open to new opportunities and interesting projects.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-form-item-label > label) {
  color: #d1d5db !important;
}

:deep(.ant-form-item-required::before) {
  color: #ef4444 !important;
}

:deep(.ant-input, .ant-input-textarea) {
  background-color: #374151 !important;
  border-color: #4b5563 !important;
  color: #f3f4f6 !important;
}

:deep(.ant-input::placeholder, .ant-input-textarea::placeholder) {
  color: #9ca3af !important;
}

:deep(.ant-input:hover, .ant-input-textarea:hover) {
  border-color: #6b7280 !important;
}

:deep(.ant-input:focus, .ant-input-textarea:focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
}
</style>
