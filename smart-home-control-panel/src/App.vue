<script setup>
import { ref, computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NIcon } from 'naive-ui'
import {
  HomeOutline,
  SettingsOutline,
  LayersOutline,
  FlashOutline,
  OptionsOutline,
  MenuOutline,
  ChevronForwardOutline,
  NotificationsOutline,
  PersonOutline
} from '@vicons/ionicons5'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: '仪表板',
    key: 'Dashboard',
    icon: renderIcon(HomeOutline)
  },
  {
    label: '设备控制',
    key: 'Devices',
    icon: renderIcon(SettingsOutline)
  },
  {
    label: '场景设置',
    key: 'Scenes',
    icon: renderIcon(LayersOutline)
  },
  {
    label: '自动化规则',
    key: 'Automation',
    icon: renderIcon(FlashOutline)
  },
  {
    label: '设置',
    key: 'Settings',
    icon: renderIcon(OptionsOutline)
  }
]

const handleMenuClick = (key) => {
  router.push({ name: key })
}

const currentMenuKey = computed(() => route.name)
</script>

<template>
  <n-config-provider>
    <n-layout style="min-height: 100vh">
      <n-layout-sider
        :collapsed="collapsed"
        :collapsed-width="64"
        :width="240"
        :bordered="false"
        style="background: #1a1a2e; color: white"
      >
        <div class="flex items-center justify-center h-16 border-b border-gray-700">
          <n-icon size="28" color="#4ade80">
            <home-outline />
          </n-icon>
          <span v-if="!collapsed" class="ml-3 text-xl font-bold text-white">
            智能家居
          </span>
        </div>
        
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="24"
          :options="menuOptions"
          :value="currentMenuKey"
          @update:value="handleMenuClick"
          style="background: #1a1a2e; color: #e0e0e0; border-right: none"
        />
        
        <div class="absolute bottom-4 left-0 right-0 px-4">
          <n-button
            block
            quaternary
            @click="collapsed = !collapsed"
            style="color: #9ca3af"
          >
            <template #icon>
              <n-icon>
                <menu-outline v-if="!collapsed" />
                <chevron-forward-outline v-else />
              </n-icon>
            </template>
            <span v-if="!collapsed">收起菜单</span>
          </n-button>
        </div>
      </n-layout-sider>
      
      <n-layout>
        <n-layout-header
          style="background: white; border-bottom: 1px solid #e5e7eb; padding: 0 24px"
          class="flex items-center justify-between"
        >
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-800">
              {{ route.meta.title }}
            </h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <n-badge :value="3" :dot="true">
              <n-button quaternary circle>
                <template #icon>
                  <n-icon size="20">
                    <notifications-outline />
                  </n-icon>
                </template>
              </n-button>
            </n-badge>
            
            <n-avatar round>
              <n-icon size="20">
                <person-outline />
              </n-icon>
            </n-avatar>
          </div>
        </n-layout-header>
        
        <n-layout-content style="background: #f3f4f6; padding: 24px">
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script>
import {
  HomeOutline,
  SettingsOutline,
  LayersOutline,
  FlashOutline,
  OptionsOutline,
  MenuOutline,
  ChevronForwardOutline,
  NotificationsOutline,
  PersonOutline
} from '@vicons/ionicons5'

export default {
  components: {
    HomeOutline,
    SettingsOutline,
    LayersOutline,
    FlashOutline,
    OptionsOutline,
    MenuOutline,
    ChevronForwardOutline,
    NotificationsOutline,
    PersonOutline
  }
}
</script>
