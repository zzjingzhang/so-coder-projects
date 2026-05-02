import { reactive } from 'vue'
import type { User } from '@/types'

interface AuthState {
  currentUser: User | null
  isLoggedIn: boolean
}

const state = reactive<AuthState>({
  currentUser: null,
  isLoggedIn: false
})

export function useAuthStore() {
  const loadUser = () => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      state.currentUser = JSON.parse(storedUser)
      state.isLoggedIn = true
    }
  }

  const login = (user: User) => {
    state.currentUser = user
    state.isLoggedIn = true
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  const logout = () => {
    state.currentUser = null
    state.isLoggedIn = false
    localStorage.removeItem('currentUser')
  }

  const getCurrentUser = () => state.currentUser
  const isLoggedIn = () => state.isLoggedIn

  return {
    state,
    loadUser,
    login,
    logout,
    getCurrentUser,
    isLoggedIn
  }
}
