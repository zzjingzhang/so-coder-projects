<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)

const menuItems = [
  { path: '/dashboard', title: '仪表盘', icon: 'DataAnalysis' },
  { path: '/tricks', title: '技巧档案', icon: 'Collection' },
  { path: '/practice', title: '练习记录', icon: 'EditPen' }
]

const currentPath = computed(() => route.path)

const handleMenuSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <div class="app-container h-screen flex bg-gray-50">
    <el-aside :width="isCollapse ? '64px' : '200px'" class="bg-white shadow-lg transition-all duration-300">
      <div class="logo h-16 flex items-center justify-center border-b border-gray-100">
        <el-icon class="text-2xl text-orange-500 mr-2">
          <VideoPlay />
        </el-icon>
        <span v-if="!isCollapse" class="font-bold text-lg text-gray-800">滑板管理</span>
      </div>
      <el-menu
        :default-active="currentPath"
        :collapse="isCollapse"
        :collapse-transition="false"
        mode="vertical"
        @select="handleMenuSelect"
        class="border-none"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
      <div class="absolute bottom-4 left-0 right-0 px-4">
        <el-button 
          type="text" 
          class="w-full justify-center"
          @click="isCollapse = !isCollapse"
        >
          <el-icon v-if="isCollapse">
            <Expand />
          </el-icon>
          <el-icon v-else>
            <Fold />
          </el-icon>
        </el-button>
      </div>
    </el-aside>

    <el-main class="flex-1 overflow-auto p-6">
      <router-view />
    </el-main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.logo {
  user-select: none;
}
</style>
