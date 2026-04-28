<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { bills, transactions } from './data/mockData'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const currentYear = ref(new Date().getFullYear())
const sidebarVisible = ref(true)
const pendingBillsCount = ref(0)

const searchDialogVisible = ref(false)
const searchKeyword = ref('')
const settingsDialogVisible = ref(false)

const searchResults = computed(() => {
  if (!searchKeyword.value.trim()) return []
  const keyword = searchKeyword.value.toLowerCase()
  return transactions.filter(t =>
    t.category.toLowerCase().includes(keyword) ||
    t.description.toLowerCase().includes(keyword) ||
    t.amount.toString().includes(keyword)
  )
})

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

const openSearch = () => {
  searchDialogVisible.value = true
  searchKeyword.value = ''
}

const openNotifications = () => {
  router.push('/bills')
}

const openSettings = () => {
  settingsDialogVisible.value = true
}

const formatCurrency = (value) => {
  return `¥${value.toLocaleString()}`
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
              <Button icon="pi pi-search" text rounded @click="openSearch" />
              <div class="relative">
                <Button icon="pi pi-bell" text rounded @click="openNotifications" />
                <Badge
                  :value="pendingBillsCount"
                  severity="danger"
                  class="absolute -top-1 -right-1"
                />
              </div>
              <Button icon="pi pi-cog" text rounded @click="openSettings" />
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

    <!-- 搜索对话框 -->
    <Dialog
      v-model:visible="searchDialogVisible"
      header="搜索交易记录"
      :modal="true"
      :style="{ width: '600px' }"
      :closable="false"
    >
      <div class="p-fluid">
        <div class="mb-4">
          <InputText
            v-model="searchKeyword"
            placeholder="输入关键词搜索交易记录（分类、描述、金额）"
            class="w-full"
            @keyup.enter="searchKeyword"
          />
        </div>
        <div class="space-y-3">
          <div
            v-if="searchKeyword.trim() && searchResults.length === 0"
            class="text-center py-8 text-gray-500"
          >
            <i class="pi pi-search text-4xl text-gray-300 mb-2"></i>
            <p>未找到匹配的交易记录</p>
          </div>
          <div
            v-for="item in searchResults"
            :key="item.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-4">
              <div
                :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  item.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                ]"
              >
                <i
                  :class="[
                    'pi text-lg',
                    item.type === 'income' ? 'pi-arrow-up text-green-600' : 'pi-arrow-down text-red-600'
                  ]"
                ></i>
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ item.category }}</p>
                <p class="text-sm text-gray-500">{{ item.description || '无描述' }}</p>
                <p class="text-xs text-gray-400">{{ item.date }}</p>
              </div>
            </div>
            <div class="text-right">
              <p
                :class="[
                  'font-bold',
                  item.type === 'income' ? 'text-green-600' : 'text-red-600'
                ]"
              >
                {{ item.type === 'income' ? '+' : '-' }}{{ formatCurrency(item.amount) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="关闭"
          icon="pi pi-times"
          text
          @click="searchDialogVisible = false"
        />
        <Button
          label="查看全部记录"
          icon="pi pi-external-link"
          @click="
            searchDialogVisible = false
            router.push('/transactions')
          "
        />
      </template>
    </Dialog>

    <!-- 设置对话框 -->
    <Dialog
      v-model:visible="settingsDialogVisible"
      header="设置"
      :modal="true"
      :style="{ width: '500px' }"
      :closable="false"
    >
      <div class="p-fluid space-y-6">
        <div>
          <h4 class="font-semibold text-gray-700 mb-4">外观设置</h4>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">深色模式</p>
              <p class="text-sm text-gray-500">切换深色/浅色主题</p>
            </div>
            <InputSwitch disabled />
          </div>
        </div>
        <div>
          <h4 class="font-semibold text-gray-700 mb-4">通知设置</h4>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
            <div>
              <p class="font-medium text-gray-800">账单提醒</p>
              <p class="text-sm text-gray-500">账单到期前发送提醒</p>
            </div>
            <InputSwitch v-model="true" />
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">预算提醒</p>
              <p class="text-sm text-gray-500">预算超出时发送提醒</p>
            </div>
            <InputSwitch v-model="true" />
          </div>
        </div>
        <div>
          <h4 class="font-semibold text-gray-700 mb-4">关于</h4>
          <div class="p-4 bg-gray-50 rounded-lg space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">应用名称</span>
              <span class="font-medium text-gray-800">理财管家</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">版本</span>
              <span class="font-medium text-gray-800">1.0.0</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">技术栈</span>
              <span class="font-medium text-gray-800">Vue 3 + PrimeVue</span>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button
          label="关闭"
          icon="pi pi-times"
          @click="settingsDialogVisible = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
</style>
