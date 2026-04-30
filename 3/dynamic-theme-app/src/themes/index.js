export const themes = {
  blue: {
    name: '蓝色主题',
    light: {
      '--el-color-primary': '#409eff',
      '--el-color-primary-light-3': '#79bbff',
      '--el-color-primary-light-5': '#a0cfff',
      '--el-color-primary-light-7': '#c6e2ff',
      '--el-color-primary-light-8': '#d9ecff',
      '--el-color-primary-light-9': '#ecf5ff',
      '--el-color-primary-dark-2': '#337ecc'
    },
    dark: {
      '--el-color-primary': '#409eff',
      '--el-color-primary-light-3': '#337ecc',
      '--el-color-primary-light-5': '#265f99',
      '--el-color-primary-light-7': '#194066',
      '--el-color-primary-light-8': '#13304d',
      '--el-color-primary-light-9': '#0d2033',
      '--el-color-primary-dark-2': '#66b1ff'
    }
  },
  green: {
    name: '绿色主题',
    light: {
      '--el-color-primary': '#67c23a',
      '--el-color-primary-light-3': '#95d475',
      '--el-color-primary-light-5': '#b3e19d',
      '--el-color-primary-light-7': '#d1edc4',
      '--el-color-primary-light-8': '#e1f3d8',
      '--el-color-primary-light-9': '#f0f9eb',
      '--el-color-primary-dark-2': '#529b2e'
    },
    dark: {
      '--el-color-primary': '#67c23a',
      '--el-color-primary-light-3': '#529b2e',
      '--el-color-primary-light-5': '#3e7423',
      '--el-color-primary-light-7': '#294e17',
      '--el-color-primary-light-8': '#1e3a11',
      '--el-color-primary-light-9': '#13270c',
      '--el-color-primary-dark-2': '#85ce61'
    }
  },
  orange: {
    name: '橙色主题',
    light: {
      '--el-color-primary': '#e6a23c',
      '--el-color-primary-light-3': '#eebe77',
      '--el-color-primary-light-5': '#f3d19e',
      '--el-color-primary-light-7': '#f8e3c5',
      '--el-color-primary-light-8': '#faecd8',
      '--el-color-primary-light-9': '#fdf6ec',
      '--el-color-primary-dark-2': '#b88230'
    },
    dark: {
      '--el-color-primary': '#e6a23c',
      '--el-color-primary-light-3': '#b88230',
      '--el-color-primary-light-5': '#8a6124',
      '--el-color-primary-light-7': '#5c4118',
      '--el-color-primary-light-8': '#453112',
      '--el-color-primary-light-9': '#2e210c',
      '--el-color-primary-dark-2': '#ebb563'
    }
  }
}

export const applyTheme = (themeName, isDark) => {
  const theme = themes[themeName]
  if (!theme) return
  
  const colors = isDark ? theme.dark : theme.light
  const root = document.documentElement
  
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  
  if (isDark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}
