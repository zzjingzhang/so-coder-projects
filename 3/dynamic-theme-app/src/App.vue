<template>
  <div class="min-h-screen theme-transition" :class="{ 'bg-gray-900': themeStore.isDarkMode, 'bg-gray-50': !themeStore.isDarkMode }">
    <el-container>
      <el-header
        class="theme-transition"
        :class="{ 'bg-gray-800': themeStore.isDarkMode, 'bg-white shadow-md': !themeStore.isDarkMode }"
      >
        <div class="flex items-center justify-between h-full">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <el-icon class="text-2xl" :class="{ 'text-blue-400': themeStore.isDarkMode, 'text-blue-500': !themeStore.isDarkMode }">
                <Monitor />
              </el-icon>
              <span
                class="text-xl font-bold"
                :class="{ 'text-white': themeStore.isDarkMode, 'text-gray-800': !themeStore.isDarkMode }"
              >动态主题演示</span>
            </div>
            <el-menu
              :default-active="activeMenu"
              mode="horizontal"
              :router="true"
              class="border-none"
              :background-color="themeStore.isDarkMode ? '#1f2937' : '#ffffff'"
              :text-color="themeStore.isDarkMode ? '#e5e7eb' : '#4b5563'"
              :active-text-color="themeStore.isDarkMode ? '#60a5fa' : '#3b82f6'"
            >
              <el-menu-item index="/dashboard">
                <el-icon><Grid /></el-icon>
                <span>仪表板</span>
              </el-menu-item>
              <el-menu-item index="/dessert">
                <el-icon><Cake /></el-icon>
                <span>甜点管理</span>
              </el-menu-item>
            </el-menu>
          </div>
          <ThemeChanger />
        </div>
      </el-header>
      <el-main class="p-6">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { themeStore } from './store/theme'
import ThemeChanger from './components/ThemeChanger.vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style>
.el-menu--horizontal > .el-menu-item {
  border-bottom: 2px solid transparent !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid var(--el-color-primary) !important;
}
</style>
