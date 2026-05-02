<template>
  <div class="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
    <el-card class="w-full max-w-md shadow-2xl">
      <template #header>
        <div class="text-center">
          <el-icon class="text-blue-600 mb-2" :size="48">
            <User />
          </el-icon>
          <h2 class="text-2xl font-bold text-gray-800">用户登录</h2>
          <p class="text-gray-500 text-sm mt-1">登录以参与游戏投票</p>
        </div>
      </template>
      
      <el-form 
        ref="formRef" 
        :model="loginForm" 
        :rules="rules" 
        label-position="top"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="loginForm.username" 
            placeholder="请输入用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="loginForm.password" 
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            size="large" 
            :loading="loading" 
            class="w-full h-12 text-lg"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="text-center text-gray-500">
        <span>还没有账号？</span>
        <router-link to="/register" class="text-blue-600 hover:text-blue-800 font-medium">
          立即注册
        </router-link>
      </div>
      
      <el-divider>演示账号</el-divider>
      <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <p><strong>管理员：</strong> admin / 123456</p>
        <p><strong>普通用户：</strong> game_lover / 123456</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const gameStore = useGameStore()

const formRef = ref<FormInstance>()
const loading = ref(false)

interface LoginForm {
  username: string
  password: string
}

const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

onMounted(() => {
  gameStore.loadData()
  authStore.loadUser()
  if (authStore.isLoggedIn) {
    router.push('/')
  }
})

const handleLogin = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      
      setTimeout(() => {
        const user = gameStore.findUser(loginForm.username, loginForm.password)
        
        if (user) {
          authStore.login(user)
          ElMessage.success('登录成功！')
          
          const redirect = route.query.redirect as string
          router.push(redirect || '/')
        } else {
          ElMessage.error('用户名或密码错误')
        }
        
        loading.value = false
      }, 500)
    }
  })
}
</script>
