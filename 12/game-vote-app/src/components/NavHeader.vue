<template>
  <el-header class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4 h-full flex items-center justify-between">
      <router-link to="/" class="flex items-center space-x-2 text-white no-underline">
        <el-icon :size="28" class="text-yellow-300">
          <Trophy />
        </el-icon>
        <span class="text-xl font-bold">游戏投票推荐</span>
      </router-link>
      
      <nav class="flex items-center space-x-6">
        <router-link 
          to="/" 
          class="text-white hover:text-yellow-300 transition-colors flex items-center space-x-1"
        >
          <el-icon><List /></el-icon>
          <span>投票列表</span>
        </router-link>
        
        <template v-if="authStore.isLoggedIn">
          <router-link 
            to="/create-poll" 
            class="text-white hover:text-yellow-300 transition-colors flex items-center space-x-1"
          >
            <el-icon><Plus /></el-icon>
            <span>创建投票</span>
          </router-link>
          
          <router-link 
            to="/my-votes" 
            class="text-white hover:text-yellow-300 transition-colors flex items-center space-x-1"
          >
            <el-icon><User /></el-icon>
            <span>我的投票</span>
          </router-link>
          
          <div class="flex items-center space-x-3">
            <span class="text-blue-100">
              <el-icon><UserFilled /></el-icon>
              {{ authStore.state.currentUser?.username }}
            </span>
            <el-button 
              type="danger" 
              size="small" 
              :icon="SwitchButton"
              @click="handleLogout"
            >
              退出
            </el-button>
          </div>
        </template>
        
        <template v-else>
          <router-link 
            to="/login" 
            class="text-white hover:text-yellow-300 transition-colors"
          >
            <el-button type="primary" size="small" plain :icon="User">
              登录
            </el-button>
          </router-link>
          <router-link 
            to="/register" 
            class="text-white hover:text-yellow-300 transition-colors"
          >
            <el-button type="success" size="small" :icon="Plus">
              注册
            </el-button>
          </router-link>
        </template>
      </nav>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.el-header {
  height: 60px;
  padding: 0;
}
</style>
