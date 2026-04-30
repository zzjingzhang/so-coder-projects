import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const isAuthenticated = ref(false)
  const isCheckingAuth = ref(true)

  const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123'
  }

  const isAdmin = computed(() => user.value?.role === 'admin')

  const checkAuthStatus = async () => {
    isCheckingAuth.value = true
    try {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        user.value = JSON.parse(savedUser)
        isAuthenticated.value = true
      }
    } catch (error) {
      console.error('检查认证状态失败:', error)
    } finally {
      isCheckingAuth.value = false
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (email === adminCredentials.email && password === adminCredentials.password) {
        const newUser: User = {
          id: '1',
          email: email,
          name: 'Admin User',
          role: 'admin'
        }
        user.value = newUser
        isAuthenticated.value = true
        localStorage.setItem('user', JSON.stringify(newUser))
        return { success: true, message: '登录成功' }
      } else {
        return { success: false, message: '邮箱或密码错误' }
      }
    } catch (error) {
      return { success: false, message: '登录过程中发生错误' }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      user.value = null
      isAuthenticated.value = false
      localStorage.removeItem('user')
    } catch (error) {
      console.error('退出登录失败:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    isCheckingAuth,
    isAdmin,
    checkAuthStatus,
    login,
    logout
  }
})
