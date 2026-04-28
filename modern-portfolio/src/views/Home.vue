<template>
  <div class="min-h-screen">
    <section class="relative py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900"></div>
      <div class="absolute top-20 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
      <div class="absolute bottom-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse" style="animation-delay: 1s;"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              目前可接受新项目
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              你好，我是
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                全栈开发者
              </span>
            </h1>
            <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              我专注于构建优雅、高效的 Web 应用。拥有 5 年以上的开发经验，
              擅长 Vue、React、Node.js 等现代技术栈。
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <RouterLink 
                to="/projects" 
                class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                查看项目
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RouterLink>
              <RouterLink 
                to="/contact" 
                class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
              >
                联系我
              </RouterLink>
            </div>
          </div>
          
          <div class="relative hidden lg:block">
            <div class="relative w-96 h-96 mx-auto">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform rotate-6"></div>
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-3xl transform -rotate-6 opacity-50"></div>
              <div class="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div class="text-center text-white">
                  <div class="text-8xl mb-4">👨‍💻</div>
                  <p class="text-lg font-medium">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">技术栈</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">我使用的主要技术和工具</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div v-for="tech in techStack" :key="tech.name" class="group flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105">
            <div class="text-4xl mb-3">{{ tech.icon }}</div>
            <span class="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">精选项目</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">我最近完成的一些项目</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(project, index) in featuredProjects" :key="project.id" class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <div class="relative overflow-hidden">
              <div 
                class="w-full h-48 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                :class="project.bgClass"
              >
                <div class="text-5xl">{{ project.icon }}</div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <TechBadge 
                  v-for="tag in project.tags.slice(0, 3)" 
                  :key="tag" 
                  :tech-name="tag"
                />
              </div>
              <div class="flex gap-3">
                <a :href="project.github" class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                  <span>代码</span>
                </a>
                <button 
                  @click="openProjectModal(index)"
                  class="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>预览</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <RouterLink 
            to="/projects" 
            class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            查看所有项目
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label" class="p-6">
            <div class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-gray-600 dark:text-gray-400 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">有项目想法？让我们一起实现它</h2>
        <p class="text-lg text-blue-100 mb-8">无论是一个简单的网站还是复杂的 Web 应用，我都很乐意帮助你将想法变为现实。</p>
        <RouterLink 
          to="/contact" 
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          开始对话
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </RouterLink>
      </div>
    </section>

    <ProjectModal 
      v-if="selectedProject"
      :is-open="modalOpen"
      :project="selectedProject"
      @close="closeProjectModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TechBadge from '../components/TechBadge.vue'
import ProjectModal from '../components/ProjectModal.vue'

const techStack = [
  { name: 'Vue.js', icon: '💚' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'React', icon: '⚛️' },
  { name: 'Git', icon: '🔧' }
]

interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  icon: string
  bgClass: string
  tags: string[]
  category: string
  github: string
  link: string
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: '电商管理系统',
    description: '一个完整的电商后台管理系统，包含商品管理、订单处理、用户管理等功能。',
    fullDescription: '这是一个功能完善的电商后台管理系统，采用现代化的技术栈构建。系统包含商品管理、订单处理、用户管理、数据统计等核心模块，支持多角色权限管理、实时数据更新、报表导出等功能。前端使用 Vue 3 + TypeScript + Element Plus 构建，后端使用 Node.js + Express + PostgreSQL。',
    icon: '🛒',
    bgClass: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    tags: ['Vue 3', 'TypeScript', 'Element Plus'],
    category: 'fullstack',
    github: '#',
    link: '#'
  },
  {
    id: 2,
    title: '社交媒体应用',
    description: '实时社交平台，支持消息推送、动态分享、好友互动等社交功能。',
    fullDescription: '一个现代化的实时社交媒体平台，支持用户注册登录、动态发布与分享、好友关注系统、实时消息推送、群组聊天等功能。前端使用 React + TypeScript 构建，后端使用 Node.js + Socket.io 实现实时通信，数据库使用 MongoDB。',
    icon: '💬',
    bgClass: 'bg-gradient-to-br from-purple-500 to-pink-500',
    tags: ['React', 'Node.js', 'Socket.io'],
    category: 'fullstack',
    github: '#',
    link: '#'
  },
  {
    id: 3,
    title: '数据可视化平台',
    description: '企业级数据可视化解决方案，支持多种图表类型和实时数据更新。',
    fullDescription: '企业级数据可视化解决方案，支持多种图表类型（折线图、柱状图、饼图、地图等）、数据导入导出、实时数据更新、自定义仪表盘等功能。前端使用 Vue 3 + ECharts 构建，后端使用 Python + Flask + Pandas 处理数据。',
    icon: '📊',
    bgClass: 'bg-gradient-to-br from-green-500 to-teal-500',
    tags: ['Vue 3', 'ECharts', 'Python'],
    category: 'frontend',
    github: '#',
    link: '#'
  }
]

const stats = [
  { value: '50+', label: '完成项目' },
  { value: '5+', label: '年经验' },
  { value: '30+', label: '满意客户' },
  { value: '1000+', label: '代码提交' }
]

const modalOpen = ref(false)
const selectedProject = ref<Project | null>(null)

const openProjectModal = (index: number) => {
  selectedProject.value = featuredProjects[index]
  modalOpen.value = true
}

const closeProjectModal = () => {
  modalOpen.value = false
  setTimeout(() => {
    selectedProject.value = null
  }, 300)
}
</script>
