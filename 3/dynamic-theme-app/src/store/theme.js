import { reactive, watch } from 'vue'
import { applyTheme } from '../themes'

const savedTheme = localStorage.getItem('theme') || 'blue'
const savedDarkMode = localStorage.getItem('darkMode') === 'true'

export const themeStore = reactive({
  currentTheme: savedTheme,
  isDarkMode: savedDarkMode,
  
  setTheme(themeName) {
    this.currentTheme = themeName
    localStorage.setItem('theme', themeName)
    applyTheme(themeName, this.isDarkMode)
  },
  
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode
    localStorage.setItem('darkMode', this.isDarkMode)
    applyTheme(this.currentTheme, this.isDarkMode)
  },
  
  initTheme() {
    applyTheme(this.currentTheme, this.isDarkMode)
  }
})
