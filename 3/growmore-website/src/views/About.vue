<script setup lang="ts">
import Common from '../components/Common.vue'

const teamMembers = [
  {
    name: '张明',
    role: 'CEO & 创始人',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20businessman%20ceo%20portrait%20confident%20modern%20office&image_size=square'
  },
  {
    name: '李华',
    role: '技术总监',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20tech%20director%20portrait%20developer%20modern%20workspace&image_size=square'
  },
  {
    name: '王芳',
    role: '设计总监',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20female%20design%20director%20portrait%20creative%20studio&image_size=square'
  },
  {
    name: '陈伟',
    role: '市场总监',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20marketing%20director%20portrait%20business%20professional&image_size=square'
  }
]

const values = [
  {
    title: '创新驱动',
    description: '我们不断探索新技术、新方法，为客户提供最前沿的解决方案。创新是我们发展的核心动力。',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    title: '客户至上',
    description: '客户的成功就是我们的成功。我们始终把客户需求放在首位，提供超越期望的服务和产品。',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    title: '卓越品质',
    description: '每一行代码、每一个设计都经过严格的质量把控。我们追求卓越，不妥协于任何瑕疵。',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
  },
  {
    title: '团队协作',
    description: '我们相信团队的力量。来自不同背景的专业人才携手合作，创造出大于个体之和的价值。',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  }
]
</script>

<template>
  <div class="min-h-screen">
    <Common 
      title="关于我们"
      subtitle="GrowMore Inc. 是一家致力于创新技术解决方案的软件开发公司。我们的使命是帮助企业通过技术实现增长和成功。"
      buttonText="联系我们"
      buttonLink="/contact"
      imageUrl="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diverse%20team%20of%20professionals%20collaborating%20in%20modern%20office%20startup%20culture&image_size=landscape_16_9"
    />

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-text mb-6">
              我们的故事
            </h2>
            <p class="text-lg text-text-light mb-6 leading-relaxed">
              GrowMore Inc. 成立于 2018 年，由一群充满激情的技术爱好者创立。我们相信，优秀的技术解决方案能够彻底改变企业的运营方式。
            </p>
            <p class="text-lg text-text-light mb-6 leading-relaxed">
              从最初的几个人团队，到如今拥有 50+ 专业人才的公司，我们始终保持着对技术的热爱和对客户的承诺。我们的团队来自不同的背景，包括软件开发、设计、商业分析和数字营销，这使我们能够为客户提供全方位的服务。
            </p>
            <p class="text-lg text-text-light leading-relaxed">
              至今，我们已成功为 200+ 企业提供了技术解决方案，帮助他们实现数字化转型，在竞争激烈的市场中脱颖而出。
            </p>
          </div>
          <div class="relative">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20startup%20office%20interior%20with%20team%20working%20collaboratively%20creative%20workspace&image_size=landscape_4_3"
              alt="我们的团队"
              class="rounded-2xl shadow-2xl"
            />
            <div class="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
              <div class="text-4xl font-bold">5+</div>
              <div class="text-sm opacity-90">年行业经验</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
            我们的核心价值观
          </h2>
          <p class="text-lg text-text-light max-w-2xl mx-auto">
            这些价值观指引着我们的每一个决策和行动
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="value in values"
            :key="value.title"
            class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
              <svg 
                class="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-text mb-3">{{ value.title }}</h3>
            <p class="text-text-light leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-4">
            核心团队
          </h2>
          <p class="text-lg text-text-light max-w-2xl mx-auto">
            认识带领我们前进的优秀领导者
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="member in teamMembers"
            :key="member.name"
            class="text-center group"
          >
            <div class="relative mb-6 overflow-hidden rounded-2xl">
              <img 
                :src="member.imageUrl" 
                :alt="member.name"
                class="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 class="text-xl font-bold text-text mb-1">{{ member.name }}</h3>
            <p class="text-primary font-medium">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">200+</div>
            <div class="text-white/80">成功项目</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">50+</div>
            <div class="text-white/80">专业团队</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">5+</div>
            <div class="text-white/80">年行业经验</div>
          </div>
          <div>
            <div class="text-4xl md:text-5xl font-bold mb-2">98%</div>
            <div class="text-white/80">客户满意度</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
