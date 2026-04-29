<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out',
      state.isMobile ? 'w-64 transform' : collapsedClass,
      state.isMobile && !state.sidebarCollapsed ? 'translate-x-0' : '',
      state.isMobile && state.sidebarCollapsed ? '-translate-x-full' : '',
    ]"
    :style="{
      backgroundColor: 'var(--card-bg)',
      borderRight: '1px solid var(--border-color)',
    }"
  >
    <div
      class="flex items-center justify-between p-4 border-b"
      :style="{ borderColor: 'var(--border-color)' }"
    >
      <div
        class="flex items-center gap-2"
        v-if="!state.sidebarCollapsed || state.isMobile"
      >
        <UserOutlined
          class="text-xl"
          :style="{ color: 'var(--primary-color)' }"
        />
        <span class="font-semibold text-lg">简历编辑器</span>
      </div>
      <button
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <MenuOutlined class="text-lg" />
      </button>
    </div>

    <nav class="p-4">
      <div class="space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center py-3 rounded-lg transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            {
              'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400':
                isActiveRoute(item.path),
            },
            state.sidebarCollapsed && !state.isMobile
              ? 'justify-center px-2 gap-0'
              : 'gap-3 px-3',
          ]"
          @click="handleMenuClick"
        >
          <component :is="item.icon" class="text-lg" />
          <span v-if="!state.sidebarCollapsed || state.isMobile">{{
            item.label
          }}</span>
        </router-link>
      </div>
    </nav>

    <div
      class="absolute bottom-0 left-0 right-0 p-4 border-t"
      :style="{ borderColor: 'var(--border-color)' }"
    >
      <div class="flex items-center justify-between">
        <button
          @click="toggleTheme"
          class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <component
            :is="isDark ? HomeOutlined : DownloadOutlined"
            class="text-lg"
          />
          <span
            v-if="!state.sidebarCollapsed || state.isMobile"
            class="text-sm"
          >
            {{ isDark ? "浅色模式" : "深色模式" }}
          </span>
        </button>

        <div v-if="state.user" class="flex items-center gap-2">
          <Avatar
            :size="32"
            :style="{ backgroundColor: 'var(--primary-color)' }"
          >
            {{ state.user.name.charAt(0) }}
          </Avatar>
          <span
            v-if="!state.sidebarCollapsed || state.isMobile"
            class="text-sm truncate"
          >
            {{ state.user.name }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="state.isMobile && !state.sidebarCollapsed"
    class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
    @click="closeSidebar"
  ></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  MenuOutlined,
  UserOutlined,
  BookOutlined,
  ToolOutlined,
  ProjectOutlined,
  StarOutlined,
  ExperimentOutlined,
  HomeOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import { Avatar } from "ant-design-vue";
import { useStore } from "@/store";

const { state, toggleSidebar, toggleTheme, isDark, setSidebarCollapsed } =
  useStore();
const route = useRoute();
const router = useRouter();

const menuItems = [
  { path: "/", label: "个人信息", icon: UserOutlined },
  { path: "/?tab=education", label: "教育经历", icon: BookOutlined },
  { path: "/?tab=experience", label: "工作经验", icon: ToolOutlined },
  { path: "/?tab=projects", label: "项目经历", icon: ProjectOutlined },
  { path: "/?tab=skills", label: "技能", icon: StarOutlined },
  { path: "/optimize", label: "简历优化", icon: ExperimentOutlined },
];

const collapsedClass = computed(() => {
  return state.sidebarCollapsed ? "w-16" : "w-64";
});

const isActiveRoute = (path: string) => {
  const basePath = path.split("?")[0];
  if (route.path === basePath) {
    if (path.includes("?")) {
      const queryParam = path.split("=")[1];
      return route.query.tab === queryParam;
    }
    return !route.query.tab;
  }
  return false;
};

const handleMenuClick = () => {
  if (state.isMobile) {
    setSidebarCollapsed(true);
  }
};

const closeSidebar = () => {
  setSidebarCollapsed(true);
};
</script>
