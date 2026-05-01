import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getGitHubAuthUrl, exchangeCodeForToken, getUserData, mockUser } from '@/api/auth'
import { githubApi } from '@/api/github'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('github_token') || null)
  const user = ref(JSON.parse(localStorage.getItem('github_user') || 'null'))
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('github_token', newToken)
    githubApi.setToken(newToken)
  }

  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('github_user', JSON.stringify(userData))
  }

  const login = () => {
    window.location.href = getGitHubAuthUrl()
  }

  const mockLogin = () => {
    loading.value = true
    error.value = null

    setTimeout(() => {
      const mockToken = 'mock_access_token_' + Math.random().toString(36).substring(2, 15)
      setToken(mockToken)
      setUser(mockUser)
      loading.value = false
    }, 500)
  }

  const handleCallback = async (code) => {
    loading.value = true
    error.value = null

    try {
      const accessToken = await exchangeCodeForToken(code)
      setToken(accessToken)

      const userData = await getUserData(accessToken)
      setUser(userData)

      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('github_token')
    localStorage.removeItem('github_user')
    githubApi.clearToken()
  }

  const initializeAuth = () => {
    if (token.value) {
      githubApi.setToken(token.value)
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    mockLogin,
    handleCallback,
    logout,
    initializeAuth
  }
})
