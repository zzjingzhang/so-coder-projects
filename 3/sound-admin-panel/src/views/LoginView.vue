<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()

const rememberMe = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const isSubmitting = computed(() => authStore.isLoading)

const validateEmail = () => {
  if (!form.email.trim()) {
    errors.email = '请输入邮箱地址'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = '请输入有效的邮箱地址'
    return false
  }
  errors.email = ''
  return true
}

const validatePassword = () => {
  if (!form.password) {
    errors.password = '请输入密码'
    return false
  }
  if (form.password.length < 6) {
    errors.password = '密码至少6个字符'
    return false
  }
  errors.password = ''
  return true
}

const handleSubmit = async () => {
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()

  if (!isEmailValid || !isPasswordValid) {
    return
  }

  const result = await authStore.login(form.email, form.password)

  if (result.success) {
    toast.show({
      severity: 'success',
      summary: '登录成功',
      detail: '欢迎回来，管理员',
      life: 3000
    })

    const redirect = route.query.redirect as string || '/dashboard'
    router.push(redirect)
  } else {
    toast.show({
      severity: 'error',
      summary: '登录失败',
      detail: result.message,
      life: 5000
    })
  }
}
</script>

<template>
  <div class="login-gradient min-h-screen flex items-center justify-center p-4">
    <div class="login-card rounded-2xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <i class="pi pi-volume-up text-3xl text-white"></i>
        </div>
        <h1 class="text-2xl font-bold mb-2">Sound Admin</h1>
        <p class="opacity-70">请登录以访问管理面板</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div :class="{ 'field-error': errors.email }">
          <label class="block font-medium mb-2">
            邮箱地址
            <span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="form.email"
            type="email"
            placeholder="admin@example.com"
            class="w-full"
            :class="{ 'p-invalid': errors.email }"
            @blur="validateEmail"
          />
          <InlineMessage 
            v-if="errors.email" 
            severity="error" 
            class="mt-1"
          >
            {{ errors.email }}
          </InlineMessage>
        </div>

        <div :class="{ 'field-error': errors.password }">
          <label class="block font-medium mb-2">
            密码
            <span class="text-red-500">*</span>
          </label>
          <Password
            v-model="form.password"
            placeholder="请输入密码"
            class="w-full"
            :class="{ 'p-invalid': errors.password }"
            :feedback="false"
            toggleMask
            @blur="validatePassword"
          />
          <InlineMessage 
            v-if="errors.password" 
            severity="error" 
            class="mt-1"
          >
            {{ errors.password }}
          </InlineMessage>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Checkbox v-model:checked="rememberMe" inputId="remember" />
            <label for="remember" class="ml-2 text-sm">记住我</label>
          </div>
          <a href="#" class="text-sm text-blue-500 hover:text-blue-600">
            忘记密码？
          </a>
        </div>

        <Button
          type="submit"
          label="登录"
          class="w-full"
          size="large"
          :loading="isSubmitting"
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;"
        />
      </form>

      <Divider>演示账户</Divider>

      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <p class="text-sm text-center opacity-70 mb-2">使用以下凭据登录：</p>
        <div class="text-center text-sm">
          <p><strong>邮箱：</strong>admin@example.com</p>
          <p><strong>密码：</strong>admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>
