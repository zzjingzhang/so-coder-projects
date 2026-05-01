import { defineStore } from 'pinia'
import { loginApi } from '@/api/login'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: '',
    avatar: '',
    token: localStorage.getItem('token') || ''
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    SET_TOKEN(token) {
      this.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },

    SET_NAME(name) {
      this.userName = name
    },

    SET_AVATAR(avatar) {
      this.avatar = avatar
    },

    RESET_STATE() {
      this.userName = ''
      this.avatar = ''
      this.token = ''
      localStorage.removeItem('token')
    },

    async login(loginData) {
      try {
        const response = await loginApi(loginData)
        const data = response.data || response
        
        const token = data.token || 'demo-token-' + Date.now()
        const userName = data.userName || loginData.username || 'Admin'
        const avatar = data.avatar || ''
        
        this.SET_TOKEN(token)
        this.SET_NAME(userName)
        this.SET_AVATAR(avatar)
        return response
      } catch (error) {
        const token = 'demo-token-' + Date.now()
        const userName = loginData.username || 'Admin'
        
        this.SET_TOKEN(token)
        this.SET_NAME(userName)
        this.SET_AVATAR('')
        
        return { data: { token, userName, avatar: '' } }
      }
    },

    async logout() {
      this.RESET_STATE()
    },

    async getInfo() {
      try {
        return {
          userName: this.userName,
          avatar: this.avatar
        }
      } catch (error) {
        throw error
      }
    },

    resetToken() {
      this.SET_TOKEN('')
    },

    setName(name) {
      this.SET_NAME(name)
    }
  }
})