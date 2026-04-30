<template>
  <div class="flex items-center gap-4">
    <el-select
      v-model="selectedTheme"
      @change="handleThemeChange"
      size="default"
      style="width: 120px"
    >
      <el-option
        v-for="(theme, key) in themes"
        :key="key"
        :label="theme.name"
        :value="key"
      >
        <span class="flex items-center gap-2">
          <span
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: getThemeColor(key) }"
          ></span>
          {{ theme.name }}
        </span>
      </el-option>
    </el-select>
    
    <el-tooltip :content="isDarkMode ? '切换到浅色模式' : '切换到深色模式'" placement="bottom">
      <el-button
        :icon="isDarkMode ? 'Sunny' : 'Moon'"
        circle
        @click="toggleDarkMode"
      />
    </el-tooltip>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { themeStore } from '../store/theme'
import { themes } from '../themes'

const selectedTheme = computed({
  get: () => themeStore.currentTheme,
  set: (val) => themeStore.setTheme(val)
})

const isDarkMode = computed(() => themeStore.isDarkMode)

const handleThemeChange = (theme) => {
  themeStore.setTheme(theme)
}

const toggleDarkMode = () => {
  themeStore.toggleDarkMode()
}

const getThemeColor = (key) => {
  const colorMap = {
    blue: '#409eff',
    green: '#67c23a',
    orange: '#e6a23c'
  }
  return colorMap[key] || '#409eff'
}
</script>
