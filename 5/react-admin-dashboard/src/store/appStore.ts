import { create } from 'zustand'

interface AppState {
  theme: 'light' | 'dark'
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  toggleTheme: () => void
  login: (user: { name: string; email: string }) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => {
  const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  const savedAuth = localStorage.getItem('isAuthenticated') === 'true'
  const savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  }

  return {
    theme: savedTheme,
    isAuthenticated: savedAuth,
    user: savedUser,
    toggleTheme: () => {
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('theme', newTheme)
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return { theme: newTheme }
      })
    },
    login: (user) => {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(user))
      set({ isAuthenticated: true, user })
    },
    logout: () => {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      set({ isAuthenticated: false, user: null })
    },
  }
})
