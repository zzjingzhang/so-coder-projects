<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLogin = ref(true)
const userType = ref('teen')
const showPassword = ref(false)
const agreeToTerms = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  parentEmail: ''
})

const userTypes = [
  { label: '👦 我是青少年', value: 'teen' },
  { label: '👨‍👩‍👧 我是家长', value: 'parent' }
]

const toggleMode = () => {
  isLogin.value = !isLogin.value
}

const handleLogin = () => {
  alert('登录功能演示\n\n在实际项目中，这里会连接后端进行身份验证。\n\n现在将跳转到首页...')
  router.push('/')
}

const handleRegister = () => {
  if (!agreeToTerms.value) {
    alert('请同意用户协议和隐私政策')
    return
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  alert('注册功能演示\n\n在实际项目中，这里会发送验证邮件并创建账号。\n\n现在将跳转到首页...')
  router.push('/')
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="login-page min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
    <div class="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="hidden lg:flex flex-col justify-center">
        <div class="text-center lg:text-left">
          <div class="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🌻</span>
            <span>欢迎来到 SafeHaven</span>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-6">
            你是
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">独一无二</span>
            的
            <br />
            你值得被
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">温柔以待</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            SafeHaven 是一个专门为儿童和青少年打造的安全空间。
            在这里，你可以获得专业支持，认识志同道合的朋友，
            通过有趣的工具培养自信和社交技能。
          </p>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span>🛡️</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">安全私密</h4>
                <p class="text-sm text-gray-600">所有信息严格保密，专业团队审核保护</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span>👨‍⚕️</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">专业支持</h4>
                <p class="text-sm text-gray-600">认证心理学家和咨询师随时提供帮助</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                <span>🎮</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">有趣成长</h4>
                <p class="text-sm text-gray-600">通过游戏和练习，在乐趣中提升自己</p>
              </div>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">10,000+</div>
              <div class="text-sm text-gray-500">用户</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">200+</div>
              <div class="text-sm text-gray-500">专家</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">98%</div>
              <div class="text-sm text-gray-500">满意度</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-xl p-8">
        <div class="flex bg-gray-100 rounded-xl p-1 mb-8">
          <button
            @click="isLogin = true"
            class="flex-1 py-3 rounded-lg font-medium transition-all duration-300"
            :class="isLogin ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'"
          >
            登录
          </button>
          <button
            @click="isLogin = false"
            class="flex-1 py-3 rounded-lg font-medium transition-all duration-300"
            :class="!isLogin ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'"
          >
            注册
          </button>
        </div>

        <div v-if="isLogin">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            欢迎回来 👋
          </h2>
          <p class="text-gray-500 mb-8">
            登录你的 SafeHaven 账号，继续你的成长之旅
          </p>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                邮箱 <span class="text-red-500">*</span>
              </label>
              <input
                v-model="loginForm.email"
                type="email"
                placeholder="请输入邮箱地址"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                密码 <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="请输入密码"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="agreeToTerms"
                  class="w-4 h-4 text-green-500 rounded border-gray-300 focus:ring-green-500"
                />
                <span class="text-sm text-gray-600">记住我</span>
              </label>
              <a href="#" class="text-sm text-green-600 hover:text-green-700">
                忘记密码？
              </a>
            </div>

            <button
              @click="handleLogin"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg"
            >
              登录 SafeHaven
            </button>
          </div>

          <div class="flex items-center gap-4 my-8">
            <div class="flex-1 h-px bg-gray-200"></div>
            <span class="text-sm text-gray-400">或</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <button class="flex items-center justify-center py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <span class="text-xl">📱</span>
            </button>
            <button class="flex items-center justify-center py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <span class="text-xl">💬</span>
            </button>
            <button class="flex items-center justify-center py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <span class="text-xl">🐧</span>
            </button>
          </div>
        </div>

        <div v-else>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            创建账号 🎉
          </h2>
          <p class="text-gray-500 mb-8">
            加入 SafeHaven，开启你的成长之旅
          </p>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              你是谁？
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="type in userTypes"
                :key="type.value"
                @click="userType = type.value"
                class="py-4 px-4 border-2 rounded-xl transition-all duration-300"
                :class="userType === type.value ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-gray-300'"
              >
                <div class="text-lg">{{ type.label }}</div>
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                昵称 <span class="text-red-500">*</span>
              </label>
              <input
                v-model="registerForm.nickname"
                placeholder="给自己起一个喜欢的昵称"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                邮箱 <span class="text-red-500">*</span>
              </label>
              <input
                v-model="registerForm.email"
                type="email"
                placeholder="请输入邮箱地址"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div v-if="userType === 'teen'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                年龄
              </label>
              <input
                v-model="registerForm.age"
                type="number"
                placeholder="你的年龄（可选）"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div v-if="userType === 'teen'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                家长邮箱（可选）
              </label>
              <input
                v-model="registerForm.parentEmail"
                type="email"
                placeholder="家长/监护人邮箱（可选）"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-500 mt-1">为了保护未成年人的安全，我们建议提供家长或监护人的联系方式</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                密码 <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="registerForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="请设置密码（至少8位）"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                确认密码 <span class="text-red-500">*</span>
              </label>
              <input
                v-model="registerForm.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请再次输入密码"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label class="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="agreeToTerms"
                  class="w-4 h-4 text-green-500 rounded border-gray-300 focus:ring-green-500 mt-1"
                />
                <span class="text-sm text-gray-600">
                  我同意
                  <a href="#" class="text-green-600 hover:underline">用户协议</a>
                  和
                  <a href="#" class="text-green-600 hover:underline">隐私政策</a>
                </span>
              </label>
            </div>

            <button
              @click="handleRegister"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg"
            >
              创建 SafeHaven 账号
            </button>
          </div>

          <div class="mt-6 p-4 bg-blue-50 rounded-xl">
            <div class="flex items-start gap-3">
              <span class="text-xl">🛡️</span>
              <div class="text-sm text-blue-800">
                <p class="font-medium mb-1">我们重视你的安全</p>
                <p class="text-blue-700">
                  所有用户信息都经过严格加密保护。
                  对于未成年人用户，我们会采取额外的安全措施确保安全。
                  你可以随时删除你的账号和所有数据。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 text-center">
          <p class="text-gray-500">
            <span v-if="isLogin">还没有 SafeHaven 账号？</span>
            <span v-else>已有 SafeHaven 账号？</span>
            <button
              @click="toggleMode"
              class="text-green-600 font-medium hover:text-green-700 ml-1"
            >
              {{ isLogin ? '立即注册' : '立即登录' }}
            </button>
          </p>
        </div>

        <div class="mt-6 text-center">
          <button
            @click="navigateTo('/')"
            class="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← 返回首页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
