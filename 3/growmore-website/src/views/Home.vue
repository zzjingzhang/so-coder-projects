<script setup lang="ts">
import { useRouter } from 'vue-router'
import Common from '../components/Common.vue'
import Card from '../components/Card.vue'

const router = useRouter()

const featuredServices = [
  {
    title: 'Android 开发',
    description: '打造卓越的 Android 应用，为用户提供流畅的移动体验。我们使用最新的 Kotlin 和 Jetpack Compose 技术，确保应用性能优异、安全可靠。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20android%20mobile%20app%20development%20with%20smartphone%20devices%20coding%20interface&image_size=landscape_4_3'
  },
  {
    title: 'Web 开发',
    description: '构建响应式、高性能的现代网站和 Web 应用程序。从企业官网到复杂的 SaaS 平台，我们提供全方位的 Web 开发解决方案。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20development%20with%20multiple%20screens%20showing%20responsive%20design%20coding%20workspace&image_size=landscape_4_3'
  },
  {
    title: '数据库管理',
    description: '提供专业的数据库设计、优化和维护服务。无论是 SQL 还是 NoSQL，我们确保您的数据存储高效、安全且可扩展。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=database%20management%20server%20racks%20data%20center%20with%20visual%20data%20analytics%20dashboard&image_size=landscape_4_3'
  }
]

const navigateToServices = () => {
  router.push('/services')
}

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="min-h-screen">
    <Common 
      title="赋能您的数字化未来"
      subtitle="GrowMore Inc. 是您值得信赖的技术合作伙伴。我们提供专业的软件开发服务，帮助企业实现数字化转型，在竞争中脱颖而出。"
      buttonText="开始"
      buttonLink="/services"
      imageUrl="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20business%20team%20collaboration%20in%20bright%20office%20with%20technology%20innovation%20concept&image_size=landscape_16_9"
    />

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
            为什么选择我们
          </h2>
          <p class="text-lg text-text-light max-w-2xl mx-auto">
            我们拥有专业的团队、丰富的经验和创新的解决方案，致力于为客户创造最大价值
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-8 rounded-2xl bg-background hover:shadow-lg transition-all duration-300 group">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
              <svg class="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-text mb-3">快速交付</h3>
            <p class="text-text-light">高效的开发流程确保项目按时交付，让您的业务尽快上线</p>
          </div>

          <div class="text-center p-8 rounded-2xl bg-background hover:shadow-lg transition-all duration-300 group">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
              <svg class="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-text mb-3">质量保证</h3>
            <p class="text-text-light">严格的质量控制流程，确保每一行代码都符合行业标准</p>
          </div>

          <div class="text-center p-8 rounded-2xl bg-background hover:shadow-lg transition-all duration-300 group">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
              <svg class="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-text mb-3">专业团队</h3>
            <p class="text-text-light">由经验丰富的开发人员和设计师组成的专业团队</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
            精选服务
          </h2>
          <p class="text-lg text-text-light max-w-2xl mx-auto">
            探索我们提供的核心服务，为您的业务增长提供强大支持
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="service in featuredServices"
            :key="service.title"
            :title="service.title"
            :description="service.description"
            :imageUrl="service.imageUrl"
            buttonText="获取报价"
            buttonLink="/contact"
          />
        </div>

        <div class="text-center mt-12">
          <button 
            @click="navigateToServices"
            class="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span>查看全部服务</span>
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          准备好开始您的项目了吗？
        </h2>
        <p class="text-lg text-white/90 mb-8">
          联系我们，让我们一起讨论如何将您的想法变为现实
        </p>
        <button 
          @click="navigateTo('/contact')"
          class="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <span>立即联系我们</span>
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>
