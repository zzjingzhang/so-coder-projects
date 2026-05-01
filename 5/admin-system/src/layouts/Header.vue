<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    
    <v-toolbar-title class="ml-2">
      <span class="font-weight-bold">管理系统</span>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="text">
          <v-avatar size="32" class="mr-2">
            <v-img :src="avatar" cover>
              <template v-slot:placeholder>
                <v-icon class="accent-4" size="x-large">mdi-account</v-icon>
              </template>
            </v-img>
          </v-avatar>
          <span>{{ userName }}</span>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item @click="handleLogout">
          <v-list-item-title>退出登录</v-list-item-title>
          <template v-slot:prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const props = defineProps({
  userName: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['toggle-drawer'])

const router = useRouter()
const userStore = useUserStore()

const toggleDrawer = () => {
  emit('toggle-drawer')
}

const handleLogout = async () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
</style>