<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('all')
const showChatModal = ref(false)
const showVideoModal = ref(false)
const selectedProfessional = ref(null)

const professionals = [
  {
    id: 1,
    name: '李明医生',
    title: '儿童心理学家',
    specialty: '儿童焦虑、社交技能训练',
    experience: '12年',
    rating: 4.9,
    avatar: '👨‍⚕️',
    available: true,
    tags: ['焦虑', '社交技能', '青少年']
  },
  {
    id: 2,
    name: '王芳咨询师',
    title: '学校心理咨询师',
    specialty: '校园欺凌应对、情绪管理',
    experience: '8年',
    rating: 4.8,
    avatar: '👩‍⚕️',
    available: true,
    tags: ['欺凌', '情绪管理', '学校适应']
  },
  {
    id: 3,
    name: '张伟专家',
    title: '青少年精神科医师',
    specialty: '青少年抑郁、家庭关系',
    experience: '15年',
    rating: 4.9,
    avatar: '👨‍🏫',
    available: false,
    tags: ['抑郁', '家庭关系', '青少年']
  },
  {
    id: 4,
    name: '陈琳咨询师',
    title: '儿童游戏治疗师',
    specialty: '儿童创伤、游戏疗法',
    experience: '10年',
    rating: 4.7,
    avatar: '👩‍🎓',
    available: true,
    tags: ['创伤', '游戏疗法', '儿童心理']
  },
  {
    id: 5,
    name: '刘强专家',
    title: '家庭教育顾问',
    specialty: '亲子沟通、行为管理',
    experience: '7年',
    rating: 4.6,
    avatar: '👨‍💼',
    available: true,
    tags: ['亲子关系', '家庭教育', '行为问题']
  },
  {
    id: 6,
    name: '周婷医生',
    title: '青少年心理治疗师',
    specialty: '自我认同、自尊建设',
    experience: '9年',
    rating: 4.8,
    avatar: '👩‍💼',
    available: true,
    tags: ['自尊', '自我认同', '青春期']
  }
]

const resources = [
  {
    icon: '📚',
    title: '情绪管理指南',
    description: '学习如何识别和处理自己的情绪',
    link: '#'
  },
  {
    icon: '🎬',
    title: '视频课程',
    description: '专家录制的心理健康科普视频',
    link: '#'
  },
  {
    icon: '📝',
    title: '心理测试',
    description: '了解自己的情绪状态和性格特点',
    link: '#'
  },
  {
    icon: '💡',
    title: '每周小贴士',
    description: '来自专家的心理健康建议',
    link: '#'
  }
]

const filteredProfessionals = () => {
  if (activeTab.value === 'all') {
    return professionals
  }
  if (activeTab.value === 'available') {
    return professionals.filter(p => p.available)
  }
  return professionals
}

const openChat = (professional) => {
  selectedProfessional.value = professional
  showChatModal.value = true
}

const openVideo = (professional) => {
  selectedProfessional.value = professional
  showVideoModal.value = true
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="professionals-page">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-50 via-white to-primary-50 section-padding">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>👨‍⚕️</span>
            <span>专业指导</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            遇到困难？
            <span class="gradient-text">专业人士随时为你提供帮助</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            SafeHaven 拥有一支经验丰富的专业团队，包括心理学家、咨询师、社工等。
            他们都是经过严格筛选和培训的专业人士，将为你提供温暖、专业、保密的支持。
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>🔒</span>
              <span class="text-sm text-gray-600">完全保密</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>💝</span>
              <span class="text-sm text-gray-600">专业认证</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>⏰</span>
              <span class="text-sm text-gray-600">灵活预约</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Methods -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          多种咨询方式，总有一种适合你
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-6">
              📹
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">视频咨询</h3>
            <p class="text-gray-600 mb-6">
              通过安全的视频通话，与专家面对面交流，获得即时的专业指导和支持
            </p>
            <div class="text-sm text-gray-500">
              ⏱️ 30-60分钟 | 💰 需要预约
            </div>
          </div>
          <div class="card text-center">
            <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6">
              💬
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">实时聊天</h3>
            <p class="text-gray-600 mb-6">
              通过文字即时与专家沟通，更适合害羞或不方便说话的时刻
            </p>
            <div class="text-sm text-gray-500">
              ⏱️ 随时可用 | 💰 部分免费
            </div>
          </div>
          <div class="card text-center">
            <div class="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-4xl mb-6">
              📚
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">策划内容</h3>
            <p class="text-gray-600 mb-6">
              专家精心准备的文章、视频、练习等，帮助你自助学习和成长
            </p>
            <div class="text-sm text-gray-500">
              ⏱️ 24小时在线 | 💰 完全免费
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Professionals Directory -->
    <section class="section-padding bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              认识我们的专业团队
            </h2>
            <p class="text-gray-600">
              每位专家都经过严格筛选，拥有专业资质和丰富经验
            </p>
          </div>
          <div class="flex gap-2">
            <button
              @click="activeTab = 'all'"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="activeTab === 'all' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
            >
              全部专家
            </button>
            <button
              @click="activeTab = 'available'"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="activeTab === 'available' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
            >
              在线可用
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="professional in filteredProfessionals()"
            :key="professional.id"
            class="card"
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                {{ professional.avatar }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <h3 class="font-bold text-gray-900">{{ professional.name }}</h3>
                  <span
                    v-if="professional.available"
                    class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    在线
                  </span>
                  <span
                    v-else
                    class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    忙碌
                  </span>
                </div>
                <p class="text-sm text-primary-600 font-medium">{{ professional.title }}</p>
                <div class="flex items-center gap-1 mt-1">
                  <span class="text-yellow-400">⭐</span>
                  <span class="text-sm font-medium">{{ professional.rating }}</span>
                  <span class="text-xs text-gray-400">| {{ professional.experience }}经验</span>
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-4">
              <span class="font-medium">专长：</span>{{ professional.specialty }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in professional.tags"
                :key="tag"
                class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex gap-2">
              <button
                @click="openChat(professional)"
                :disabled="!professional.available"
                class="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                :class="professional.available ? 'bg-primary-100 text-primary-600 hover:bg-primary-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
              >
                💬 在线聊天
              </button>
              <button
                @click="openVideo(professional)"
                class="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-accent-100 text-accent-600 hover:bg-accent-200 transition-colors"
              >
                📹 预约视频
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resource Library -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          自助资源库
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(resource, index) in resources"
            :key="index"
            class="card text-center cursor-pointer hover:-translate-y-2 transition-all duration-300"
          >
            <div class="text-5xl mb-4">{{ resource.icon }}</div>
            <h3 class="font-bold text-gray-900 mb-2">{{ resource.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ resource.description }}</p>
            <span class="text-primary-600 font-medium text-sm">
              立即探索 →
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-gradient-to-r from-blue-500 to-primary-500 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          需要立即帮助？
        </h2>
        <p class="text-xl opacity-90 mb-8">
          记住，寻求帮助是勇敢的表现，不是软弱。
          我们在这里，随时准备支持你。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="navigateTo('/login')"
            class="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            立即注册获取帮助
          </button>
          <a
            href="#"
            class="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
          >
            🆘 紧急求助热线
          </a>
        </div>
      </div>
    </section>

    <!-- Chat Modal -->
    <div
      v-if="showChatModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showChatModal = false"
    >
      <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div class="bg-primary-500 text-white p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              {{ selectedProfessional?.avatar }}
            </div>
            <div>
              <div class="font-medium">{{ selectedProfessional?.name }}</div>
              <div class="text-sm opacity-80">在线</div>
            </div>
          </div>
          <button
            @click="showChatModal = false"
            class="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        <div class="h-80 bg-gray-50 p-4 overflow-y-auto">
          <div class="flex flex-col gap-4">
            <div class="flex items-start gap-2">
              <span class="text-2xl">{{ selectedProfessional?.avatar }}</span>
              <div class="bg-white rounded-2xl rounded-tl-none p-3 max-w-xs shadow-sm">
                <p class="text-sm text-gray-700">
                  你好！我是{{ selectedProfessional?.name }}，很高兴为你服务。有什么我可以帮助你的吗？
                </p>
              </div>
            </div>
            <div class="flex items-start gap-2 justify-end">
              <div class="bg-primary-500 text-white rounded-2xl rounded-tr-none p-3 max-w-xs">
                <p class="text-sm">
                  （登录后即可开始聊天）
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 border-t">
          <button
            @click="navigateTo('/login')"
            class="w-full btn-primary"
          >
            登录后开始聊天
          </button>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <div
      v-if="showVideoModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showVideoModal = false"
    >
      <div class="bg-white rounded-2xl max-w-lg w-full overflow-hidden">
        <div class="bg-accent-500 text-white p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📹</span>
            <span class="font-medium">预约视频咨询</span>
          </div>
          <button
            @click="showVideoModal = false"
            class="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
              {{ selectedProfessional?.avatar }}
            </div>
            <div>
              <h3 class="font-bold text-gray-900">{{ selectedProfessional?.name }}</h3>
              <p class="text-sm text-gray-600">{{ selectedProfessional?.title }}</p>
            </div>
          </div>
          <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 class="font-medium text-gray-900 mb-3">选择预约时间</h4>
            <div class="grid grid-cols-3 gap-2 mb-4">
              <button class="py-2 px-3 border border-primary-500 text-primary-600 rounded-lg text-sm font-medium">
                明天 14:00
              </button>
              <button class="py-2 px-3 border border-gray-200 text-gray-500 rounded-lg text-sm">
                后天 10:00
              </button>
              <button class="py-2 px-3 border border-gray-200 text-gray-500 rounded-lg text-sm">
                周六 15:00
              </button>
            </div>
          </div>
          <button
            @click="navigateTo('/login')"
            class="w-full btn-primary"
          >
            登录后确认预约
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
