<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useCategoriesStore } from '@/stores/categories'
import { useSoundsStore } from '@/stores/sounds'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const categoriesStore = useCategoriesStore()
const soundsStore = useSoundsStore()
const toast = useToast()
const confirm = useConfirm()

const sidebarVisible = ref(true)

const menuItems = [
  { 
    name: '仪表板', 
    icon: 'pi pi-home', 
    route: '/dashboard',
    badge: null
  },
  { 
    name: '声音管理', 
    icon: 'pi pi-volume-up', 
    route: '/sounds',
    badge: soundsStore.totalSounds
  },
  { 
    name: '类别管理', 
    icon: 'pi pi-tags', 
    route: '/categories',
    badge: categoriesStore.totalCategories
  }
]

const handleLogout = () => {
  confirm.require({
    message: '确定要退出登录吗？',
    header: '确认退出',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: '确定',
    rejectLabel: '取消',
    accept: async () => {
      await authStore.logout()
      toast.show({
        severity: 'info',
        summary: '已退出登录',
        life: 3000
      })
      router.push('/login')
    }
  })
}

const navigateTo = (path: string) => {
  router.push(path)
  if (window.innerWidth < 768) {
    sidebarVisible.value = false
  }
}

onMounted(async () => {
  if (categoriesStore.categories.length === 0) {
    await categoriesStore.fetchCategories()
  }
  if (soundsStore.sounds.length === 0) {
    await soundsStore.fetchSounds()
  }
})
</script>

<template>
  <div class="flex h-full w-full">
    <Sidebar
      v-model:visible="sidebarVisible"
      :baseZIndex="100"
      class="w-64"
      :show-close-icon="false"
      position="left"
      :modal="false"
    >
      <div class="flex flex-col h-full">
        <div class="p-4 border-b">
          <div class="flex items-center gap-3">
            <Avatar 
              style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
              class="w-10 h-10"
              icon="pi pi-volume-up"
            />
            <div>
              <h2 class="font-bold text-lg">Sound Admin</h2>
              <p class="text-xs opacity-70">管理控制面板</p>
            </div>
          </div>
        </div>

        <nav class="flex-1 p-2 overflow-y-auto">
          <ul class="space-y-1">
            <li
              v-for="item in menuItems"
              :key="item.route"
              @click="navigateTo(item.route)"
              class="nav-item flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer"
              :class="{ active: route.path === item.route }"
            >
              <div class="flex items-center gap-3">
                <i :class="item.icon" class="text-lg"></i>
                <span>{{ item.name }}</span>
              </div>
              <Badge 
                v-if="item.badge !== null && item.badge > 0" 
                :value="item.badge"
                severity="secondary"
              />
            </li>
          </ul>
        </nav>

        <div class="p-4 border-t">
          <div class="flex items-center gap-3">
            <Avatar 
            label="AD" 
            style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);"
            />
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm truncate">{{ authStore.user?.name }}</p>
              <p class="text-xs opacity-70 truncate">{{ authStore.user?.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>

    <div class="flex-1 flex flex-col overflow-hidden">
      <Toolbar class="shadow-sm border-b">
        <template #start>
          <Button
            icon="pi pi-bars"
            text
            rounded
            @click="sidebarVisible = !sidebarVisible"
            class="mr-2"
          />
          <span class="font-semibold text-lg">
            {{ route.meta?.title || '仪表板' }}
          </span>
        </template>

        <template #end>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <i class="pi pi-sun opacity-70"></i>
              <InputSwitch
                v-model="themeStore.isDark"
                @change="themeStore.toggleTheme"
              />
              <i class="pi pi-moon opacity-70"></i>
            </div>
            <Button
              icon="pi pi-sign-out"
              text
              rounded
              severity="danger"
              @click="handleLogout"
              tooltip="退出登录"
            />
          </div>
        </template>
      </Toolbar>

      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar-content {
  padding: 0;
}
</style>
