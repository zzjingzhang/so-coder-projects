<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bills } from './data/mockData'

const route = useRoute()
const router = useRouter()

const currentYear = ref(new Date().getFullYear())
const sidebarVisible = ref(true)
const pendingBillsCount = ref(0)

const menuItems = ref([
  {
    label: '仪表盘',
    icon: 'pi pi-home',
    to: '/',
    active: true
  },
  {
    label: '收支记录',
    icon: 'pi pi-money-bill',
    to: '/transactions'
  },
  {
    label: '预算控制',
    icon: 'pi pi-chart-pie',
    to: '/budget'
  },
  {
    label: '投资跟踪',
    icon: 'pi pi-chart-line',
    to: '/investments'
  },
  {
    label: '账单提醒',
    icon: 'pi pi-bell',
    to: '/bills',
    badge: true
  },
  {
    label: '财务报表',
    icon: 'pi pi-chart-bar',
    to: '/reports'
  }
])

onMounted(() => {
  pendingBillsCount.value = bills.filter(b => b.status === 'pending').length
})

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const navigateTo = (item) => {
  router.push(item.to)
}
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- 侧边栏 -->
    <aside
      :class="[
        'bg-white shadow-lg transition-all duration-300 flex flex-col',
        sidebarVisible ? 'w-64' : 'w-20'
      ]"
    >
      <!-- Logo 区域 -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <i class="pi pi-wallet text-white text-xl"></i>
          </div>
          <span
            v-if="sidebarVisible" class="text-xl font-bold text-gray-800"
            >理财管家</span
          >
        </div>
      </div>

      <!-- 导航菜单 -->
      <nav class="flex-1 p-4 overflow-y-auto">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.to">
            <a
              @click="navigateTo(item)"
              :class="[
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer',
                route.path === item.to
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              ]"
            >
              <i :class="[item.icon, 'text-lg']"></i>
              <span v-if="sidebarVisible" class="font-medium">{{ item.label }}</span>
              <Badge
                v-if="sidebarVisible && item.badge && pendingBillsCount > 0"
                :value="pendingBillsCount"
                severity="danger"
                class="ml-auto"
              />
            </a>
          </li>
          </ul>
      </nav>

      <!-- 用户信息 -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center gap-3">
          <Avatar
            label="用户"
            style="background-color: #3b82f6"
            size="large"
            shape="circle"
          />
          <div v-if="sidebarVisible">
            <p class="font-medium text-gray-800">管理员</p>
            <p class="text-sm text-gray-500">admin@finance.com</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- 主内容区域 -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- 顶部导航栏 -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <Toolbar>
          <template #start>
            <Button
              icon="pi pi-bars"
              text
              @click="toggleSidebar"
              class="mr-4"
            />
            <span class="text-lg font-semibold text-gray-800">
              {{ route.meta.title || '仪表盘' }}
            </span>
          </template>

          <template #end>
            <div class="flex items-center gap-4">
              <Button icon="pi pi-search" text rounded />
              <Button icon="pi pi-bell" text rounded>
                <Badge
                  :value="pendingBillsCount"
                  severity="danger"
                  class="absolute -top-1 -right-1"
                />
              </Button>
              <Button icon="pi pi-cog" text rounded />
            </div>
          </template>
        </Toolbar>
      </header>

      <!-- 内容区域 -->
      <div class="flex-1 overflow-y-auto p-6">
        <router-view />
      </div>
    </main>

    <!-- Toast 组件 -->
    <Toast position="top-right" />
    <ConfirmDialog />
  </div>
</template>

<style scoped>
</style>
