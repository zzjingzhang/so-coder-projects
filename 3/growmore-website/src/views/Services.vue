<script setup lang="ts">
import Common from '../components/Common.vue'
import Card from '../components/Card.vue'

const services = [
  {
    title: 'Android 开发',
    description: '打造卓越的 Android 应用，为用户提供流畅的移动体验。我们使用最新的 Kotlin 和 Jetpack Compose 技术，确保应用性能优异、安全可靠。从概念到上线，我们提供全方位的 Android 开发服务。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20android%20mobile%20app%20development%20with%20smartphone%20devices%20coding%20interface&image_size=landscape_4_3'
  },
  {
    title: 'Web 开发',
    description: '构建响应式、高性能的现代网站和 Web 应用程序。从企业官网到复杂的 SaaS 平台，我们提供全方位的 Web 开发解决方案。使用 React、Vue、Angular 等主流框架，为您打造用户喜爱的数字体验。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20development%20with%20multiple%20screens%20showing%20responsive%20design%20coding%20workspace&image_size=landscape_4_3'
  },
  {
    title: '数据库管理',
    description: '提供专业的数据库设计、优化和维护服务。无论是 SQL 还是 NoSQL，我们确保您的数据存储高效、安全且可扩展。包括 MySQL、PostgreSQL、MongoDB、Redis 等多种数据库的管理和优化服务。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=database%20management%20server%20racks%20data%20center%20with%20visual%20data%20analytics%20dashboard&image_size=landscape_4_3'
  },
  {
    title: '业务分析',
    description: '通过数据驱动的洞察，帮助您做出更明智的商业决策。我们的业务分析师团队将与您密切合作，深入了解您的业务需求，提供定制化的分析解决方案和战略建议。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20analytics%20dashboard%20with%20charts%20graphs%20data%20visualization%20professional%20report&image_size=landscape_4_3'
  },
  {
    title: '数字营销',
    description: '提升您的在线可见度，吸引更多潜在客户。我们的数字营销服务涵盖 SEO 优化、社交媒体营销、内容营销、PPC 广告等，全方位助力您的品牌在数字世界中脱颖而出。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20marketing%20social%20media%20campaign%20analytics%20growth%20metrics%20online%20advertising&image_size=landscape_4_3'
  },
  {
    title: '视频创建',
    description: '用引人入胜的视频内容讲述您的品牌故事。我们提供专业的视频制作服务，包括企业宣传片、产品演示、社交媒体短视频、动画视频等，用视觉语言传递您的品牌价值。',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20production%20studio%20camera%20equipment%20video%20editing%20software%20creative%20content%20creation&image_size=landscape_4_3'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <Common 
      title="我们的服务"
      subtitle="GrowMore Inc. 提供全方位的技术解决方案，从软件开发到数字营销，助力您的业务蓬勃发展。"
      buttonText="联系我们"
      buttonLink="/contact"
      imageUrl="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20services%20team%20collaboration%20modern%20office%20technology%20solutions&image_size=landscape_16_9"
    />

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
            全方位服务
          </h2>
          <p class="text-lg text-text-light max-w-2xl mx-auto">
            探索我们提供的完整服务列表，为您的业务增长提供全方位支持
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="service in services"
            :key="service.title"
            :title="service.title"
            :description="service.description"
            :imageUrl="service.imageUrl"
            buttonText="获取报价"
            buttonLink="/contact"
          />
        </div>
      </div>
    </section>

    <section class="py-20 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
            我们的工作流程
          </h2>
          <p class="text-lg text-text-light max-w-2xl mx-auto">
            简单高效的合作流程，确保项目顺利交付
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center relative">
            <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
              <span class="text-white text-2xl font-bold">1</span>
            </div>
            <div class="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-primary/20 z-0"></div>
            <h3 class="text-xl font-bold text-text mb-3">需求分析</h3>
            <p class="text-text-light">深入了解您的业务需求和项目目标</p>
          </div>

          <div class="text-center relative">
            <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
              <span class="text-white text-2xl font-bold">2</span>
            </div>
            <div class="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-primary/20 z-0"></div>
            <h3 class="text-xl font-bold text-text mb-3">方案设计</h3>
            <p class="text-text-light">制定详细的技术方案和项目计划</p>
          </div>

          <div class="text-center relative">
            <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
              <span class="text-white text-2xl font-bold">3</span>
            </div>
            <div class="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-primary/20 z-0"></div>
            <h3 class="text-xl font-bold text-text mb-3">开发实现</h3>
            <p class="text-text-light">采用敏捷开发方法，按时高质量交付</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-white text-2xl font-bold">4</span>
            </div>
            <h3 class="text-xl font-bold text-text mb-3">上线支持</h3>
            <p class="text-text-light">提供完整的测试、部署和后续维护服务</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
