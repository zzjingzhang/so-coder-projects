<template>
  <v-container fluid class="py-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-bold mb-4">关于项目</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card class="elevation-2 mb-6">
          <v-card-title>项目简介</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p class="mb-4">
              这是一个使用现代前端技术栈构建的单页面应用（SPA）示例项目。
              项目展示了如何使用 Vue 3、TypeScript、Vuetify、Pinia 状态管理、
              Vue Router 路由等技术构建一个功能完整的 Web 应用。
            </p>
            <p>
              项目包含任务管理、数据表格和关于页面，展示了组件设计、
              状态管理、路由配置、服务层分离等最佳实践。
            </p>
          </v-card-text>
        </v-card>

        <v-card class="elevation-2">
          <v-card-title>技术栈</v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="tech in techStack"
              :key="tech.name"
              :prepend-icon="tech.icon"
              :title="tech.name"
              :subtitle="tech.description"
            >
              <template v-slot:prepend>
                <v-avatar
                  :color="tech.color"
                  size="40"
                  class="d-flex align-center justify-center"
                >
                  <v-icon size="large" color="white">{{ tech.icon }}</v-icon>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="elevation-2 mb-6">
          <v-card-title>项目特性</v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="feature in features"
              :key="feature.title"
            >
              <template v-slot:prepend>
                <v-icon color="primary">{{ feature.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ feature.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ feature.description }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="elevation-2">
          <v-card-title>开发工具</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-chip
              v-for="tool in devTools"
              :key="tool"
              class="ma-1"
              variant="outlined"
              color="secondary"
              size="small"
            >
              {{ tool }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
interface TechItem {
  name: string
  icon: string
  color: string
  description: string
}

interface FeatureItem {
  title: string
  icon: string
  description: string
}

const techStack: TechItem[] = [
  {
    name: 'Vue 3',
    icon: 'mdi-vuejs',
    color: 'green',
    description: '渐进式 JavaScript 框架，使用 Composition API'
  },
  {
    name: 'TypeScript',
    icon: 'mdi-language-typescript',
    color: 'blue',
    description: 'JavaScript 的超集，提供静态类型检查'
  },
  {
    name: 'Vuetify',
    icon: 'mdi-vector-rectangle',
    color: 'indigo',
    description: 'Vue UI 组件库，基于 Material Design'
  },
  {
    name: 'Vue Router',
    icon: 'mdi-routes',
    color: 'purple',
    description: 'Vue.js 官方路由管理器'
  },
  {
    name: 'Pinia',
    icon: 'mdi-pineapple',
    color: 'yellow',
    description: 'Vue 状态管理库，新一代的 Vuex'
  },
  {
    name: 'Tailwind CSS',
    icon: 'mdi-tailwind',
    color: 'teal',
    description: '实用优先的 CSS 框架'
  },
  {
    name: 'Vite',
    icon: 'mdi-lightning-bolt',
    color: 'orange',
    description: '下一代前端构建工具'
  }
]

const features: FeatureItem[] = [
  {
    title: '响应式设计',
    icon: 'mdi-cellphone-link',
    description: '适配各种屏幕尺寸'
  },
  {
    title: '状态管理',
    icon: 'mdi-database',
    description: '使用 Pinia 集中管理状态'
  },
  {
    title: '路由管理',
    icon: 'mdi-compass',
    description: 'Vue Router 实现 SPA 路由'
  },
  {
    title: '组件化',
    icon: 'mdi-puzzle',
    description: '可复用的组件架构'
  },
  {
    title: '类型安全',
    icon: 'mdi-shield-check',
    description: 'TypeScript 提供类型保障'
  },
  {
    title: '测试覆盖',
    icon: 'mdi-check-circle-outline',
    description: '单元测试支持'
  }
]

const devTools = [
  'Vite',
  'Vitest',
  'ESLint',
  'Prettier',
  'Vue DevTools',
  'TypeScript'
]
</script>
