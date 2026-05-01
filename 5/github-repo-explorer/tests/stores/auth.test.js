import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

vi.mock('@/api/auth', () => ({
  getGitHubAuthUrl: vi.fn(() => 'https://github.com/login/oauth/authorize?client_id=test'),
  exchangeCodeForToken: vi.fn(),
  getUserData: vi.fn()
}))

vi.mock('@/api/github', () => ({
  githubApi: {
    setToken: vi.fn(),
    clearToken: vi.fn()
  }
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have no token initially', () => {
      const authStore = useAuthStore()
      expect(authStore.token).toBeNull()
    })

    it('should not be authenticated initially', () => {
      const authStore = useAuthStore()
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('should have no user initially', () => {
      const authStore = useAuthStore()
      expect(authStore.user).toBeNull()
    })

    it('should not be loading initially', () => {
      const authStore = useAuthStore()
      expect(authStore.loading).toBe(false)
    })
  })

  describe('login', () => {
    it('should redirect to GitHub OAuth URL', () => {
      const { getGitHubAuthUrl } = require('@/api/auth')
      const authStore = useAuthStore()

      authStore.login()

      expect(getGitHubAuthUrl).toHaveBeenCalled()
    })
  })

  describe('handleCallback', () => {
    it('should set token and user on successful authentication', async () => {
      const { exchangeCodeForToken, getUserData } = require('@/api/auth')
      const mockToken = 'test_token_123'
      const mockUser = { login: 'testuser', id: 1 }

      exchangeCodeForToken.mockResolvedValue(mockToken)
      getUserData.mockResolvedValue(mockUser)

      const authStore = useAuthStore()
      const result = await authStore.handleCallback('test_code')

      expect(result).toBe(true)
      expect(authStore.token).toBe(mockToken)
      expect(authStore.user).toEqual(mockUser)
      expect(authStore.error).toBeNull()
    })

    it('should set error on failed authentication', async () => {
      const { exchangeCodeForToken } = require('@/api/auth')
      exchangeCodeForToken.mockRejectedValue(new Error('Invalid code'))

      const authStore = useAuthStore()
      const result = await authStore.handleCallback('invalid_code')

      expect(result).toBe(false)
      expect(authStore.error).toBe('Invalid code')
    })
  })

  describe('logout', () => {
    it('should clear token and user', () => {
      const { githubApi } = require('@/api/github')
      const authStore = useAuthStore()

      authStore.setToken('test_token')
      authStore.setUser({ login: 'test' })

      authStore.logout()

      expect(authStore.token).toBeNull()
      expect(authStore.user).toBeNull()
      expect(githubApi.clearToken).toHaveBeenCalled()
    })
  })

  describe('initializeAuth', () => {
    it('should set token from localStorage', () => {
      const { githubApi } = require('@/api/github')
      localStorage.setItem('github_token', 'stored_token')

      const authStore = useAuthStore()
      authStore.initializeAuth()

      expect(githubApi.setToken).toHaveBeenCalledWith('stored_token')
    })
  })
})
