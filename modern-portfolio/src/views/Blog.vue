<template>
  <div class="min-h-screen py-20">
    <section class="relative mb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">博客文章</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            分享我的技术见解、开发经验和学习心得，希望能帮助到更多开发者。
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        <div class="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span class="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full mb-4">最新文章</span>
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">{{ featuredPost.title }}</h2>
            <p class="text-blue-100 mb-6">{{ featuredPost.excerpt }}</p>
            <div class="flex items-center gap-4 text-blue-100 text-sm">
              <span>{{ featuredPost.date }}</span>
              <span>·</span>
              <span>{{ featuredPost.readTime }}</span>
            </div>
          </div>
          <div class="relative">
            <img 
              :src="featuredPost.image" 
              :alt="featuredPost.title"
              class="w-full h-64 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="post in blogPosts" :key="post.id" class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div class="relative overflow-hidden">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                {{ post.category }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{{ post.date }}</span>
              <span>·</span>
              <span>{{ post.readTime }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{{ post.excerpt }}</p>
            <button class="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group/btn">
              <span>阅读更多</span>
              <svg class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div class="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 text-center">
        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">订阅我的博客</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8">第一时间获取最新的技术文章和开发技巧，不会发送垃圾邮件。</p>
        <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="输入你的邮箱"
            class="flex-1 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" class="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
            订阅
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const featuredPost = {
  id: 1,
  title: 'Vue 3 组合式 API 最佳实践指南',
  excerpt: '深入探讨 Vue 3 组合式 API 的设计理念和最佳实践，包括响应式数据管理、组件复用、代码组织等核心概念。',
  date: '2024年1月15日',
  readTime: '8 分钟阅读',
  image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vue%203%20composition%20api%20code%20on%20screen%20modern%20developer%20workspace&image_size=landscape_16_9',
  category: 'Vue.js'
}

const blogPosts = [
  {
    id: 2,
    title: '使用 TypeScript 构建大型前端项目',
    excerpt: '分享在大型项目中使用 TypeScript 的经验，包括类型设计、模块组织、代码规范等实用技巧。',
    date: '2024年1月10日',
    readTime: '10 分钟阅读',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typescript%20code%20editor%20syntax%20highlighting%20modern%20interface&image_size=landscape_16_9',
    category: 'TypeScript'
  },
  {
    id: 3,
    title: 'Tailwind CSS 性能优化技巧',
    excerpt: '学习如何优化 Tailwind CSS 的构建性能，包括按需加载、自定义配置、生产环境优化等。',
    date: '2024年1月5日',
    readTime: '6 分钟阅读',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tailwind%20css%20design%20system%20color%20palette%20modern%20ui&image_size=landscape_16_9',
    category: 'CSS'
  },
  {
    id: 4,
    title: 'Node.js 微服务架构实战',
    excerpt: '从单体应用到微服务架构的演进之路，分享服务拆分、通信机制、部署策略等实战经验。',
    date: '2024年1月1日',
    readTime: '12 分钟阅读',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=microservices%20architecture%20diagram%20nodes%20connections%20tech%20abstract&image_size=landscape_16_9',
    category: '后端'
  },
  {
    id: 5,
    title: '前端状态管理方案对比',
    excerpt: '对比 Vuex、Pinia、Zustand 等主流状态管理方案，帮助你选择最适合项目的方案。',
    date: '2023年12月28日',
    readTime: '8 分钟阅读',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=state%20management%20data%20flow%20diagram%20modern%20tech%20visualization&image_size=landscape_16_9',
    category: 'Vue.js'
  },
  {
    id: 6,
    title: 'Git 高级工作流技巧',
    excerpt: '掌握 Git 高级技巧，包括分支策略、冲突解决、代码审查、提交规范等专业开发流程。',
    date: '2023年12月25日',
    readTime: '7 分钟阅读',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=git%20branch%20merge%20workflow%20code%20collaboration%20tech&image_size=landscape_16_9',
    category: '工具'
  }
]
</script>