<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeCategory = ref('all')

const categories = [
  { id: 'all', name: '全部', icon: '🏠' },
  { id: 'hobbies', name: '兴趣爱好', icon: '🎨' },
  { id: 'games', name: '游戏娱乐', icon: '🎮' },
  { id: 'study', name: '学习交流', icon: '📚' },
  { id: 'support', name: '互助支持', icon: '💪' }
]

const groups = [
  {
    id: 1,
    name: '绘画爱好者',
    description: '喜欢画画的小伙伴们在这里分享作品，互相鼓励',
    category: 'hobbies',
    members: 328,
    avatar: '🎨',
    color: 'from-pink-400 to-purple-500',
    online: 45,
    isJoined: true
  },
  {
    id: 2,
    name: '游戏交流群',
    description: '分享喜欢的游戏，组队玩耍，健康游戏',
    category: 'games',
    members: 512,
    avatar: '🎮',
    color: 'from-green-400 to-teal-500',
    online: 128,
    isJoined: false
  },
  {
    id: 3,
    name: '学习互助小组',
    description: '遇到学习困难？大家一起讨论，共同进步',
    category: 'study',
    members: 256,
    avatar: '📚',
    color: 'from-blue-400 to-indigo-500',
    online: 67,
    isJoined: true
  },
  {
    id: 4,
    name: '勇敢成长营',
    description: '分享你的故事，获得理解和支持，我们一起变得更强大',
    category: 'support',
    members: 890,
    avatar: '💪',
    color: 'from-orange-400 to-red-500',
    online: 234,
    isJoined: false
  },
  {
    id: 5,
    name: '音乐爱好者',
    description: '喜欢唱歌、弹乐器？在这里找到知音',
    category: 'hobbies',
    members: 178,
    avatar: '🎵',
    color: 'from-purple-400 to-pink-500',
    online: 34,
    isJoined: false
  },
  {
    id: 6,
    name: '运动健身群',
    description: '一起运动，一起变强壮！分享运动心得',
    category: 'hobbies',
    members: 234,
    avatar: '⚽',
    color: 'from-green-400 to-blue-500',
    online: 56,
    isJoined: false
  }
]

const events = [
  {
    id: 1,
    title: '周末线上绘画比赛',
    description: '以"我的梦想"为主题，创作属于你的作品',
    time: '本周六 14:00',
    participants: 45,
    category: 'hobbies',
    status: 'upcoming'
  },
  {
    id: 2,
    title: '学习方法分享会',
    description: '学霸们分享高效学习技巧',
    time: '明天 19:00',
    participants: 78,
    category: 'study',
    status: 'upcoming'
  },
  {
    id: 3,
    title: '情绪管理工作坊',
    description: '专业咨询师带领，学习如何与情绪相处',
    time: '下周日 10:00',
    participants: 120,
    category: 'support',
    status: 'upcoming'
  }
]

const safetyTips = [
  { icon: '🔒', title: '保护隐私', description: '不要透露真实姓名、学校、住址等个人信息' },
  { icon: '🤝', title: '友善相处', description: '尊重他人，用善意和理解对待每一位小伙伴' },
  { icon: '🚫', title: '拒绝欺凌', description: '如遇到不当行为，及时报告管理员' },
  { icon: '👨‍⚕️', title: '专业支持', description: '遇到困难时，记得寻求专业人士的帮助' }
]

const filteredGroups = () => {
  if (activeCategory.value === 'all') {
    return groups
  }
  return groups.filter(g => g.category === activeCategory.value)
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="community-page">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-purple-50 via-white to-primary-50 section-padding">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>👥</span>
            <span>社区交流</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            在这里找到
            <span class="gradient-text">志同道合的朋友</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            SafeHaven 社区是一个经过严格审核的安全空间。
            你可以加入感兴趣的群组，参与线上活动，
            认识和你有相似经历的小伙伴，建立真正的友谊。
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>🛡️</span>
              <span class="text-sm text-gray-600">严格审核</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>👮</span>
              <span class="text-sm text-gray-600">专人管理</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>🔒</span>
              <span class="text-sm text-gray-600">隐私保护</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Safety Notice -->
    <section class="py-8 bg-gradient-to-r from-primary-500 to-accent-500 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🛡️</span>
            <div>
              <h3 class="font-bold text-lg">你的安全是我们的首要任务</h3>
              <p class="text-sm opacity-90">
                所有交流都经过审核，如有不当行为请立即报告
              </p>
            </div>
          </div>
          <div class="flex gap-3">
            <button
              class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              📖 社区规则
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🚨 举报违规
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Groups Section -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              兴趣群组
            </h2>
            <p class="text-gray-600">
              找到你感兴趣的话题，加入讨论，认识新朋友
            </p>
          </div>
          <button
            @click="navigateTo('/login')"
            class="btn-primary whitespace-nowrap"
          >
            + 创建新群组
          </button>
        </div>

        <!-- Category Filter -->
        <div class="flex gap-2 overflow-x-auto pb-4 mb-8">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            :class="activeCategory === category.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            <span>{{ category.icon }}</span>
            <span>{{ category.name }}</span>
          </button>
        </div>

        <!-- Groups Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="group in filteredGroups()"
            :key="group.id"
            class="card cursor-pointer hover:-translate-y-2 transition-all duration-300"
          >
            <div class="flex items-start gap-4 mb-4">
              <div
                class="w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center text-2xl shrink-0"
                :class="group.color"
              >
                {{ group.avatar }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-bold text-gray-900">{{ group.name }}</h3>
                  <span
                    v-if="group.isJoined"
                    class="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full"
                  >
                    已加入
                  </span>
                </div>
                <p class="text-sm text-gray-500 mb-2">{{ group.description }}</p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <span>👥</span>
                    <span>{{ group.members }} 成员</span>
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>{{ group.online }} 在线</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                v-if="group.isJoined"
                class="flex-1 py-2 bg-green-50 text-green-600 rounded-lg font-medium"
              >
                🚀 进入群组
              </button>
              <button
                v-else
                @click="navigateTo('/login')"
                class="flex-1 py-2 bg-primary-50 text-primary-600 rounded-lg font-medium hover:bg-primary-100 transition-colors"
              >
                + 加入群组
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="section-padding bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              近期活动
            </h2>
            <p class="text-gray-600">
              参与线上活动，在互动中结交朋友
            </p>
          </div>
          <button
            class="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            查看全部活动 →
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="event in events"
            :key="event.id"
            class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div class="bg-gradient-to-r from-primary-400 to-accent-400 p-6 text-white">
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {{ event.status === 'upcoming' ? '即将开始' : '进行中' }}
                </span>
                <span class="text-sm opacity-90">
                  {{ categories.find(c => c.id === event.category)?.name }}
                </span>
              </div>
              <h3 class="text-xl font-bold mb-2">{{ event.title }}</h3>
              <p class="opacity-90 text-sm">{{ event.description }}</p>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2 text-gray-600">
                  <span>📅</span>
                  <span class="text-sm">{{ event.time }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                  <span>👥</span>
                  <span class="text-sm">{{ event.participants }} 人报名</span>
                </div>
              </div>
              <button
                @click="navigateTo('/login')"
                class="w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
              >
                立即报名
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Safety Guidelines -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">
          社区安全指南
        </h2>
        <p class="text-center text-gray-600 mb-12">
          为了每个人都能有一个安全愉快的体验，请遵守以下准则
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="tip in safetyTips"
            :key="tip.title"
            class="text-center p-6 bg-gray-50 rounded-2xl"
          >
            <div class="text-4xl mb-4">{{ tip.icon }}</div>
            <h3 class="font-bold text-gray-900 mb-2">{{ tip.title }}</h3>
            <p class="text-sm text-gray-600">{{ tip.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-gradient-to-r from-purple-500 to-primary-500 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          准备好加入我们的社区了吗？
        </h2>
        <p class="text-xl opacity-90 mb-8">
          在这里，你会发现你并不孤单。
          有许多小伙伴和你有相似的经历，
          他们理解你，支持你，和你一起成长。
        </p>
        <button
          @click="navigateTo('/login')"
          class="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          立即加入 SafeHaven
        </button>
      </div>
    </section>
  </div>
</template>
