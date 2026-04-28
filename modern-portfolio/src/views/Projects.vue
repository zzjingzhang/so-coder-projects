<template>
  <div class="min-h-screen py-20">
    <section class="relative mb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">我的项目</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            这里展示了我参与开发的一些项目，涵盖了前端、后端和全栈开发等多个领域。
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="flex flex-wrap gap-3 justify-center">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="[
            'px-5 py-2 rounded-full font-medium transition-all duration-300',
            activeFilter === filter.value
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in filteredProjects" :key="project.id" class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div class="relative overflow-hidden">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-4 left-4 right-4 flex gap-3">
                <a :href="project.github" class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                  <span>代码</span>
                </a>
                <a :href="project.link" class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>预览</span>
                </a>
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">有项目想要合作？</h2>
        <p class="text-blue-100 mb-8">无论是一个简单的网站还是复杂的 Web 应用，我都很乐意帮助你将想法变为现实。</p>
        <RouterLink 
          to="/contact" 
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          联系我
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeFilter = ref('all')

const filters = [
  { label: '全部', value: 'all' },
  { label: '前端', value: 'frontend' },
  { label: '后端', value: 'backend' },
  { label: '全栈', value: 'fullstack' },
  { label: '移动端', value: 'mobile' }
]

const projects = [
  {
    id: 1,
    title: '电商管理系统',
    description: '一个完整的电商后台管理系统，包含商品管理、订单处理、用户管理、数据统计等功能模块。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20ecommerce%20dashboard%20admin%20panel%20interface%20clean%20design&image_size=landscape_16_9',
    tags: ['Vue 3', 'TypeScript', 'Element Plus'],
    category: 'fullstack',
    github: '#',
    link: '#'
  },
  {
    id: 2,
    title: '社交媒体应用',
    description: '实时社交平台，支持消息推送、动态分享、好友互动、群组管理等社交功能。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20app%20interface%20modern%20mobile%20first%20design&image_size=landscape_16_9',
    tags: ['React', 'Node.js', 'Socket.io'],
    category: 'fullstack',
    github: '#',
    link: '#'
  },
  {
    id: 3,
    title: '数据可视化平台',
    description: '企业级数据可视化解决方案，支持多种图表类型、数据导入导出和实时数据更新。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20visualization%20dashboard%20charts%20graphs%20analytics%20modern%20interface&image_size=landscape_16_9',
    tags: ['Vue 3', 'ECharts', 'Python'],
    category: 'frontend',
    github: '#',
    link: '#'
  },
  {
    id: 4,
    title: '在线学习平台',
    description: '完整的在线教育系统，支持视频课程、直播教学、作业管理、学习进度跟踪。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=online%20learning%20platform%20education%20website%20modern%20design&image_size=landscape_16_9',
    tags: ['Next.js', 'PostgreSQL', 'Redis'],
    category: 'fullstack',
    github: '#',
    link: '#'
  },
  {
    id: 5,
    title: '任务管理应用',
    description: '简洁高效的任务管理工具，支持看板视图、任务分配、截止日期提醒、团队协作。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=task%20management%20app%20kanban%20board%20modern%20minimalist%20design&image_size=landscape_16_9',
    tags: ['Vue 3', 'Tailwind', 'Firebase'],
    category: 'frontend',
    github: '#',
    link: '#'
  },
  {
    id: 6,
    title: 'API 网关服务',
    description: '高性能微服务 API 网关，支持路由转发、负载均衡、限流熔断、认证授权。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=api%20gateway%20server%20architecture%20technology%20diagram%20abstract&image_size=landscape_16_9',
    tags: ['Go', 'Docker', 'Kubernetes'],
    category: 'backend',
    github: '#',
    link: '#'
  },
  {
    id: 7,
    title: '健身追踪 App',
    description: '移动端健身追踪应用，支持运动记录、饮食管理、目标设定、数据统计分析。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20tracker%20mobile%20app%20interface%20health%20modern%20design&image_size=landscape_16_9',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    category: 'mobile',
    github: '#',
    link: '#'
  },
  {
    id: 8,
    title: '区块链钱包',
    description: '安全的加密货币钱包应用，支持多链资产管理、转账交易、DApp 浏览器。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blockchain%20wallet%20app%20cryptocurrency%20modern%20fintech%20design&image_size=landscape_16_9',
    tags: ['TypeScript', 'Web3.js', 'React Native'],
    category: 'mobile',
    github: '#',
    link: '#'
  },
  {
    id: 9,
    title: '即时通讯系统',
    description: '企业级即时通讯解决方案，支持一对一聊天、群组消息、文件传输、语音视频通话。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=instant%20messaging%20app%20chat%20interface%20modern%20communication%20design&image_size=landscape_16_9',
    tags: ['Node.js', 'Socket.io', 'WebRTC'],
    category: 'backend',
    github: '#',
    link: '#'
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.category === activeFilter.value)
})
</script>