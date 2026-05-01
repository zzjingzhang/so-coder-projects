<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const isVisible = ref(false)

const teamMembers = ref([
  {
    id: 1,
    name: '张明',
    role: '主编 & 创意总监',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20asian%20male%20creative%20professional&image_size=square',
    bio: '拥有15年设计经验，曾服务于多家世界500强企业'
  },
  {
    id: 2,
    name: '李婷',
    role: '视觉设计师',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20asian%20female%20designer%20modern&image_size=square',
    bio: '擅长品牌视觉设计，热爱探索色彩与排版的艺术'
  },
  {
    id: 3,
    name: '王浩',
    role: '技术架构师',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20asian%20male%20tech%20developer&image_size=square',
    bio: '全栈开发专家，专注于前沿Web技术和用户体验优化'
  },
  {
    id: 4,
    name: '陈雪',
    role: '内容策划',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20portrait%20asian%20female%20content%20creator&image_size=square',
    bio: '资深编辑，擅长挖掘有趣的故事和热点话题'
  }
])

const milestones = ref([
  {
    year: '2020',
    title: '项目启动',
    description: 'Digital Magazine 项目正式启动，致力于打造最佳数字阅读体验'
  },
  {
    year: '2021',
    title: '第一期发布',
    description: '首期杂志正式上线，获得读者广泛好评'
  },
  {
    year: '2022',
    title: '技术升级',
    description: '全面升级技术栈，引入交互式翻页效果'
  },
  {
    year: '2023',
    title: '用户突破',
    description: '全球用户突破100万，成为领先的数字杂志平台'
  },
  {
    year: '2024',
    title: '持续创新',
    description: '引入AI辅助创作，开启智能阅读新时代'
  }
])

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    
    <main class="flex-grow">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-primary-600 via-accent-500 to-primary-400 text-white py-24 px-4 overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-20 right-20 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div class="absolute bottom-20 left-20 w-80 h-80 bg-accent-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div class="max-w-4xl mx-auto relative z-10 text-center">
          <h1 
            :class="[
              'text-4xl md:text-6xl font-display font-bold mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            ]"
          >
            关于我们
          </h1>
          <p 
            :class="[
              'text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            ]"
          >
            我们是一群热爱设计与技术的创意人士，致力于打造最佳的数字阅读体验
          </p>
        </div>
      </section>
      
      <!-- Mission Section -->
      <section class="py-20 px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div 
              :class="[
                'transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              ]"
            >
              <h2 class="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-800">
                我们的使命
              </h2>
              <p class="text-gray-600 text-lg leading-relaxed mb-6">
                在 Digital Magazine，我们相信优秀的内容值得优秀的呈现方式。我们的使命是通过创新的技术和精美的设计，让每一次阅读都成为一种享受。
              </p>
              <p class="text-gray-600 text-lg leading-relaxed mb-6">
                我们致力于打破传统数字阅读的界限，将交互式体验、精美动画和现代设计完美融合，为读者带来前所未有的阅读体验。
              </p>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-primary-50 p-4 rounded-lg">
                  <div class="text-3xl font-bold text-primary-600 mb-1">100万+</div>
                  <div class="text-sm text-gray-600">全球读者</div>
                </div>
                <div class="bg-accent-50 p-4 rounded-lg">
                  <div class="text-3xl font-bold text-accent-600 mb-1">50+</div>
                  <div class="text-sm text-gray-600">精品期刊</div>
                </div>
              </div>
            </div>
            
            <div 
              :class="[
                'transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              ]"
            >
              <div class="relative">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20team%20collaboration%20modern%20office%20designers%20working&image_size=landscape_4_3" 
                  alt="Our Team" 
                  class="rounded-xl shadow-2xl w-full"
                />
                <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400 rounded-lg opacity-80 -z-10"></div>
                <div class="absolute -top-4 -right-4 w-24 h-24 bg-accent-400 rounded-lg opacity-80 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Team Section -->
      <section class="py-20 px-4 bg-gray-100">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-800">
              核心团队
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              我们的团队由来自设计、技术和内容领域的专业人士组成
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="(member, index) in teamMembers" 
              :key="member.id"
              :class="[
                'bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2',
                `transition-all duration-700 delay-${(index + 1) * 100}`,
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              ]"
            >
              <div class="relative">
                <img 
                  :src="member.avatar" 
                  :alt="member.name"
                  class="w-full h-48 object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-display font-bold text-gray-800 mb-1">
                  {{ member.name }}
                </h3>
                <p class="text-primary-600 font-medium text-sm mb-3">
                  {{ member.role }}
                </p>
                <p class="text-gray-600 text-sm">
                  {{ member.bio }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Timeline Section -->
      <section class="py-20 px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-800">
              发展历程
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              见证我们的成长与创新
            </p>
          </div>
          
          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500"></div>
            
            <div class="space-y-12">
              <div 
                v-for="(milestone, index) in milestones" 
                :key="milestone.year"
                :class="[
                  'relative pl-20 transition-all duration-700',
                  `delay-${(index + 1) * 100}`,
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                ]"
              >
                <!-- Timeline Dot -->
                <div class="absolute left-6 top-1 w-5 h-5 bg-white border-4 border-primary-500 rounded-full transform -translate-x-1/2"></div>
                
                <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div class="text-2xl font-display font-bold text-primary-600 mb-2">
                    {{ milestone.year }}
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">
                    {{ milestone.title }}
                  </h3>
                  <p class="text-gray-600">
                    {{ milestone.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Contact Section -->
      <section class="py-20 px-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-display font-bold mb-6">
            联系我们
          </h2>
          <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            有任何问题或合作意向？我们期待听到您的声音
          </p>
          
          <div class="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div class="text-3xl mb-3">📧</div>
              <h3 class="font-semibold mb-1">邮箱</h3>
              <p class="text-white/80 text-sm">contact@digital-magazine.com</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div class="text-3xl mb-3">📞</div>
              <h3 class="font-semibold mb-1">电话</h3>
              <p class="text-white/80 text-sm">+86 123 4567 8900</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div class="text-3xl mb-3">📍</div>
              <h3 class="font-semibold mb-1">地址</h3>
              <p class="text-white/80 text-sm">北京市朝阳区创意园区</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>

<style scoped>
</style>
