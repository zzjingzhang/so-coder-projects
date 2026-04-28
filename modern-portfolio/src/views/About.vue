<template>
  <div class="min-h-screen py-20">
    <section class="relative mb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
              关于我
            </span>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              你好，我是
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                全栈开发者
              </span>
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              我是一名拥有 5 年以上经验的全栈开发者，专注于构建优雅、高效的 Web 应用。
              我热爱技术，热衷于学习新技术并将其应用到实际项目中。
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              我的职业生涯始于前端开发，后来逐渐扩展到后端和全栈开发。
              我相信优秀的代码应该是简洁、可维护和高性能的。
            </p>
            <div class="flex flex-wrap gap-4">
              <RouterLink 
                to="/projects" 
                class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                查看项目
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RouterLink>
              <RouterLink 
                to="/contact" 
                class="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                联系我
              </RouterLink>
            </div>
          </div>
          <div class="relative">
            <div class="relative w-full aspect-square max-w-md mx-auto">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform rotate-6"></div>
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-3xl transform -rotate-6 opacity-50"></div>
              <div class="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <div class="text-center text-white">
                  <div class="text-9xl mb-4">👨‍💻</div>
                  <p class="text-xl font-medium">Full Stack Dev</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">技能栈</h2>
        <p class="text-gray-600 dark:text-gray-400">我熟练掌握的技术和工具</p>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">前端开发</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Vue 3</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">React</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">TypeScript</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Tailwind CSS</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Next.js</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Nuxt.js</span>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">后端开发</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Node.js</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Express</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Python</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">Go</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">PostgreSQL</span>
            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">MongoDB</span>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">工作经历</h2>
        <p class="text-gray-600 dark:text-gray-400">我的专业历程</p>
      </div>
      <div class="space-y-8">
        <div class="flex gap-6">
          <div class="flex flex-col items-center">
            <div class="w-4 h-4 bg-blue-600 rounded-full"></div>
            <div class="w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div class="pb-8">
            <div class="flex flex-wrap items-center gap-3 mb-2">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">高级全栈开发工程师</h3>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">当前</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-2">某科技公司 · 2022 - 至今</p>
            <p class="text-gray-600 dark:text-gray-400">
              负责公司核心产品的前端和后端架构设计与开发，带领团队完成多个重要项目。
              推动技术栈升级，从 Vue 2 迁移到 Vue 3，引入 TypeScript 提升代码质量。
            </p>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col items-center">
            <div class="w-4 h-4 bg-purple-600 rounded-full"></div>
            <div class="w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div class="pb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">全栈开发工程师</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">某互联网公司 · 2020 - 2022</p>
            <p class="text-gray-600 dark:text-gray-400">
              参与电商平台的全栈开发，负责商品管理、订单系统等核心模块。
              使用 React + Node.js 技术栈，优化系统性能提升 30%。
            </p>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col items-center">
            <div class="w-4 h-4 bg-green-600 rounded-full"></div>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">前端开发工程师</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">某创业公司 · 2019 - 2020</p>
            <p class="text-gray-600 dark:text-gray-400">
              负责公司产品的前端开发，使用 Vue.js 构建响应式 Web 应用。
              参与设计系统的制定和组件库的建设。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">想了解更多？</h2>
        <p class="text-blue-100 mb-8">如果你有项目想要合作，或者只是想聊聊技术，随时联系我。</p>
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
</script>