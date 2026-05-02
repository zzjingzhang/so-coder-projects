<template>
  <div class="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-10">
    <el-card class="w-full max-w-md shadow-2xl">
      <template #header>
        <div class="text-center">
          <el-icon class="text-green-600 mb-2" :size="48">
            <UserPlus />
          </el-icon>
          <h2 class="text-2xl font-bold text-gray-800">用户注册</h2>
          <p class="text-gray-500 text-sm mt-1">创建账号开始游戏投票之旅</p>
        </div>
      </template>
      
      <el-form 
        ref="formRef" 
        :model="registerForm" 
        :rules="rules" 
        label-position="top"
        @submit.prevent="handleRegister"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="registerForm.username" 
            placeholder="请输入用户名（3-20个字符）"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="registerForm.email" 
            placeholder="请输入邮箱地址"
            prefix-icon="Message"
            size="large"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="registerForm.password" 
            type="password"
            placeholder="请输入密码（至少6位）"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            v-model="registerForm.confirmPassword" 
            type="password"
            placeholder="请再次输入密码"
            prefix-icon="Lock"
            size="large"
            show-password
            @keyup.enter="handleRegister"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="success" 
            size="large" 
            :loading="loading" 
            class="w-full h-12 text-lg"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="text-center text-gray-500">
        <span>已有账号？</span>
        <router-link to="/login" class="text-blue-600 hover:text-blue-800 font-medium">
          立即登录
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules, type FormRule } from 'element-plus'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const gameStore = useGameStore()

const formRef = ref<FormInstance>()
const loading = ref(false)

interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const registerForm = reactive<RegisterForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateConfirmPassword: FormRule = (_rule, value, callback) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const validateUsername: FormRule = (_rule, value, callback) => {
  if (gameStore.usernameExists(value)) {
    callback(new Error('用户名已被使用'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20个字符之间', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

const handleRegister = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      
      setTimeout(() => {
        const newUser = gameStore.registerUser(
          registerForm.username,
          registerForm.password,
          registerForm.email
        )
        
        ElMessage.success('注册成功！请登录')
        loading.value = false
        router.push('/login')
      }, 500)
    }
  })
}
</script>
