<template>
  <div class="login-container">
    <v-card class="login-card" elevation="8">
      <v-card-title class="text-center pa-8">
        <h1 class="text-h4 font-weight-bold primary--text">后台管理系统</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="valid">
          <v-text-field
            v-model="username"
            label="用户名"
            prepend-icon="mdi-account"
            variant="outlined"
            :rules="[rules.required]"
            class="mb-4"
          ></v-text-field>
          
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="密码"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            variant="outlined"
            :rules="[rules.required]"
            class="mb-4"
          ></v-text-field>
          
          <div class="captcha-wrapper">
            <v-text-field
              v-model="captchaInput"
              label="验证码"
              prepend-icon="mdi-shield-check"
              variant="outlined"
              :rules="[rules.required, rules.captcha]"
              class="flex-1"
            ></v-text-field>
            <div class="ml-3">
              <Captcha v-model="captchaCode" ref="captchaRef" />
            </div>
          </div>
          
          <v-btn
            color="primary"
            block
            size="large"
            class="mt-6"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn variant="text" color="white" @click="snackbar.show = false">
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import Captcha from './Captcha.vue'

const router = useRouter()
const userStore = useUserStore()

const formRef = ref(null)
const captchaRef = ref(null)
const valid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const username = ref('')
const password = ref('')
const captchaInput = ref('')
const captchaCode = ref('')

const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
})

const rules = reactive({
  required: [value => !!value || '此项为必填项'],
  captcha: [value => {
    if (!value) return '请输入验证码'
    if (value.toLowerCase() !== captchaCode.value.toLowerCase()) {
      return '验证码错误'
    }
    return true
  }]
})

const showSnackbar = (text, color = 'success') => {
  snackbar.text = text
  snackbar.color = color
  snackbar.show = true
}

const handleLogin = async () => {
  if (!formRef.value.validate()) return
  
  loading.value = true
  
  try {
    await userStore.login({
      username: username.value,
      password: password.value
    })
    
    showSnackbar('登录成功', 'success')
    
    router.push('/dashboard')
  } catch (error) {
    showSnackbar(error.message || '登录失败', 'error')
    captchaRef.value.refresh()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 450px;
}

.captcha-wrapper {
  display: flex;
  align-items: flex-end;
}
</style>