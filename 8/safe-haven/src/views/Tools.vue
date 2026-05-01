<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mood Tracker State
const selectedMood = ref(null)
const showMoodModal = ref(false)

const moods = [
  { emoji: '😊', label: '开心', color: 'bg-green-100 border-green-400' },
  { emoji: '😌', label: '平静', color: 'bg-blue-100 border-blue-400' },
  { emoji: '😔', label: '难过', color: 'bg-purple-100 border-purple-400' },
  { emoji: '😤', label: '生气', color: 'bg-red-100 border-red-400' },
  { emoji: '😰', label: '焦虑', color: 'bg-yellow-100 border-yellow-400' },
  { emoji: '😴', label: '疲惫', color: 'bg-gray-100 border-gray-400' }
]

const moodNote = ref('')

// Confidence Game State
const showConfidenceGame = ref(false)
const currentChallenge = ref(0)

const confidenceChallenges = [
  {
    title: '赞美自己',
    description: '对着镜子说三件你喜欢自己的地方',
    example: '比如：我喜欢我的微笑，我很善良，我擅长画画'
  },
  {
    title: '勇敢提问',
    description: '今天主动问一个你一直想知道的问题',
    example: '可以问老师、家人或朋友'
  },
  {
    title: '接受赞美',
    description: '当别人表扬你时，说"谢谢"并欣然接受',
    example: '不要说"没有啦"，直接说"谢谢！"'
  },
  {
    title: '尝试新事物',
    description: '今天尝试一件你从未做过的事情',
    example: '可以是新的游戏、新的食物或新的活动'
  }
]

// Emotional Regulation Exercises
const currentExercise = ref(0)
const showExercise = ref(false)

const exercises = [
  {
    title: '4-7-8 呼吸法',
    icon: '🧘',
    description: '帮助快速平静下来',
    steps: [
      '用鼻子吸气 4 秒',
      '屏住呼吸 7 秒',
      '用嘴慢慢呼气 8 秒',
      '重复 3-5 次'
    ]
  },
  {
    title: '5-4-3-2-1 感官接地',
    icon: '👁️',
    description: '当感到焦虑时使用',
    steps: [
      '说出 5 个你看到的东西',
      '说出 4 个你能摸到的东西',
      '说出 3 个你能听到的声音',
      '说出 2 个你能闻到的味道',
      '说出 1 个你能尝到的味道'
    ]
  },
  {
    title: '情绪命名游戏',
    icon: '🎭',
    description: '更好地理解自己的情绪',
    steps: [
      '现在的感觉是什么？',
      '这个情绪像什么颜色？',
      '这个情绪在身体的哪个部位？',
      '这个情绪想告诉你什么？'
    ]
  }
]

const tools = [
  {
    id: 1,
    icon: '📊',
    title: '情绪追踪器',
    description: '记录每天的心情变化，了解自己的情绪模式',
    category: '自我觉察',
    color: 'from-blue-400 to-blue-600',
    isInteractive: true
  },
  {
    id: 2,
    icon: '🎯',
    title: '自信培养游戏',
    description: '完成小挑战，逐步建立自信，发现自己的闪光点',
    category: '自信培养',
    color: 'from-green-400 to-green-600',
    isInteractive: true
  },
  {
    id: 3,
    icon: '🧘',
    title: '情绪调节练习',
    description: '学习科学的方法来管理和表达自己的情绪',
    category: '情绪管理',
    color: 'from-purple-400 to-purple-600',
    isInteractive: true
  },
  {
    id: 4,
    icon: '✍️',
    title: '心情日记',
    description: '写下你的想法和感受，释放内心的压力',
    category: '自我表达',
    color: 'from-pink-400 to-pink-600',
    isInteractive: false
  },
  {
    id: 5,
    icon: '🎨',
    title: '创意表达',
    description: '通过绘画、音乐、写作等方式表达自己',
    category: '自我表达',
    color: 'from-orange-400 to-orange-600',
    isInteractive: false
  },
  {
    id: 6,
    icon: '💪',
    title: '韧性训练',
    description: '培养面对困难时的心理韧性和适应能力',
    category: '韧性培养',
    color: 'from-red-400 to-red-600',
    isInteractive: false
  }
]

const selectMood = (mood) => {
  selectedMood.value = mood
  showMoodModal.value = true
}

const submitMood = () => {
  alert(`心情已记录：${selectedMood.value.label}\n备注：${moodNote.value || '无'}`)
  showMoodModal.value = false
  moodNote.value = ''
  selectedMood.value = null
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="tools-page">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-green-50 via-white to-primary-50 section-padding">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🎮</span>
            <span>自助工具</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            通过有趣的方式
            <span class="gradient-text">成为更好的自己</span>
          </h1>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            在这里，你可以通过游戏、练习和各种互动工具，
            培养自己的心理韧性、情绪管理能力和社交技能。
            让成长变得有趣又有成就感！
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>🎉</span>
              <span class="text-sm text-gray-600">完全免费</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>🎮</span>
              <span class="text-sm text-gray-600">游戏化学习</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span>📈</span>
              <span class="text-sm text-gray-600">追踪进步</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start Tools -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">
          立即开始
        </h2>
        <p class="text-center text-gray-600 mb-12">
          点击下方卡片，开始你的自助之旅
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Mood Tracker Card -->
          <div class="card cursor-pointer hover:-translate-y-2 transition-all duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                📊
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">情绪追踪</h3>
                <p class="text-sm text-gray-500">今天感觉怎么样？</p>
              </div>
            </div>
            <div class="flex justify-center gap-3 mb-4">
              <span
                v-for="mood in moods.slice(0, 4)"
                :key="mood.label"
                class="text-3xl cursor-pointer hover:scale-125 transition-transform"
                @click="selectMood(mood)"
              >
                {{ mood.emoji }}
              </span>
            </div>
            <button
              class="w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
              @click="showMoodModal = true"
            >
              记录今天的心情
            </button>
          </div>

          <!-- Confidence Game Card -->
          <div class="card cursor-pointer hover:-translate-y-2 transition-all duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-3xl">
                🎯
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">自信挑战</h3>
                <p class="text-sm text-gray-500">每天一个小挑战</p>
              </div>
            </div>
            <div class="bg-green-50 rounded-xl p-4 mb-4">
              <p class="text-sm text-green-800 font-medium mb-2">今日挑战：</p>
              <p class="text-green-700">{{ confidenceChallenges[0].title }}</p>
            </div>
            <button
              @click="showConfidenceGame = true"
              class="w-full py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors"
            >
              开始挑战
            </button>
          </div>

          <!-- Breathing Exercise Card -->
          <div class="card cursor-pointer hover:-translate-y-2 transition-all duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">
                🧘
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">情绪调节</h3>
                <p class="text-sm text-gray-500">快速平静下来</p>
              </div>
            </div>
            <div class="bg-purple-50 rounded-xl p-4 mb-4 text-center">
              <p class="text-3xl mb-2">
                {{ exercises[currentExercise.value].icon }}
              </p>
              <p class="text-purple-800 font-medium">
                {{ exercises[currentExercise.value].title }}
              </p>
            </div>
            <button
              @click="showExercise = true"
              class="w-full py-2 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors"
            >
              开始练习
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- All Tools Section -->
    <section class="section-padding bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">
          探索更多工具
        </h2>
        <p class="text-center text-gray-600 mb-12">
          根据你的需求选择合适的工具
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="tool in tools"
            :key="tool.id"
            class="card cursor-pointer hover:-translate-y-2 transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center text-2xl shrink-0"
                :class="tool.color"
              >
                {{ tool.icon }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-bold text-gray-900">{{ tool.title }}</h3>
                  <span
                    v-if="tool.isInteractive"
                    class="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs rounded-full"
                  >
                    互动
                  </span>
                </div>
                <p class="text-sm text-gray-500 mb-2">{{ tool.category }}</p>
                <p class="text-sm text-gray-600">{{ tool.description }}</p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t flex justify-between items-center">
              <span class="text-primary-600 font-medium text-sm">
                开始使用 →
              </span>
              <span v-if="tool.isInteractive" class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                🎮 可立即体验
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              为什么这些工具有效？
            </h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-xl shrink-0">
                  🧠
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">科学支持</h3>
                  <p class="text-gray-600 text-sm">
                    所有工具都基于心理学研究和循证实践，由专业团队设计开发
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-xl shrink-0">
                  🎮
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">游戏化设计</h3>
                  <p class="text-gray-600 text-sm">
                    通过有趣的游戏和挑战，让学习和成长变得轻松愉快
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center text-xl shrink-0">
                  📈
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">进度追踪</h3>
                  <p class="text-gray-600 text-sm">
                    记录你的每一步成长，看到自己的进步，增强自信心
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-xl shrink-0">
                  🔒
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">完全私密</h3>
                  <p class="text-gray-600 text-sm">
                    你的记录和练习都是私密的，只有你自己才能看到
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8">
            <h3 class="font-bold text-gray-900 text-lg mb-6">📊 你的成长仪表盘</h3>
            <div class="space-y-6">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm text-gray-600">情绪觉察力</span>
                  <span class="text-sm font-medium text-primary-600">+35%</span>
                </div>
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full w-3/4 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm text-gray-600">自信心</span>
                  <span class="text-sm font-medium text-green-600">+28%</span>
                </div>
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full w-2/3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm text-gray-600">情绪管理</span>
                  <span class="text-sm font-medium text-purple-600">+42%</span>
                </div>
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full w-4/5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                </div>
              </div>
            </div>
            <div class="mt-8 p-4 bg-white rounded-xl shadow-sm">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <p class="font-bold text-gray-900">已获得 5 枚徽章</p>
                  <p class="text-sm text-gray-500">继续努力，解锁更多成就！</p>
                </div>
              </div>
            </div>
            <p class="text-center text-sm text-gray-500 mt-6">
              * 登录后即可查看你的完整成长数据
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mood Modal -->
    <div
      v-if="showMoodModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showMoodModal = false"
    >
      <div class="bg-white rounded-2xl max-w-md w-full overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 text-center">
          <h3 class="text-xl font-bold mb-2">今天感觉怎么样？</h3>
          <p class="text-sm opacity-90">选择一个最能代表你现在心情的表情</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-3 gap-4 mb-6">
            <button
              v-for="mood in moods"
              :key="mood.label"
              @click="selectMood(mood)"
              class="p-4 rounded-xl border-2 transition-all text-center"
              :class="selectedMood?.label === mood.label ? mood.color + ' scale-105' : 'border-gray-200 hover:border-gray-300'"
            >
              <div class="text-3xl mb-2">{{ mood.emoji }}</div>
              <div class="text-sm font-medium">{{ mood.label }}</div>
            </button>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              想说点什么？（可选）
            </label>
            <textarea
              v-model="moodNote"
              class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows="3"
              placeholder="今天发生了什么让你有这种感觉？"
            ></textarea>
          </div>
          <div class="flex gap-3">
            <button
              @click="showMoodModal = false"
              class="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              @click="submitMood"
              class="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              保存心情
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confidence Game Modal -->
    <div
      v-if="showConfidenceGame"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showConfidenceGame = false"
    >
      <div class="bg-white rounded-2xl max-w-md w-full overflow-hidden">
        <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold mb-1">自信挑战</h3>
              <p class="text-sm opacity-90">
                挑战 {{ currentChallenge + 1 }} / {{ confidenceChallenges.length }}
              </p>
            </div>
            <button
              @click="showConfidenceGame = false"
              class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="bg-green-50 rounded-xl p-6 text-center mb-6">
            <div class="text-5xl mb-4">🎯</div>
            <h4 class="text-xl font-bold text-green-800 mb-2">
              {{ confidenceChallenges[currentChallenge].title }}
            </h4>
            <p class="text-green-700 mb-4">
              {{ confidenceChallenges[currentChallenge].description }}
            </p>
            <div class="bg-white/60 rounded-lg p-3 text-sm text-green-600">
              💡 提示：{{ confidenceChallenges[currentChallenge].example }}
            </div>
          </div>
          <div class="flex gap-3">
            <button
              v-if="currentChallenge > 0"
              @click="currentChallenge--"
              class="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              ← 上一个
            </button>
            <button
              v-if="currentChallenge < confidenceChallenges.length - 1"
              @click="currentChallenge++"
              class="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              下一个 →
            </button>
            <button
              v-else
              @click="showConfidenceGame = false; currentChallenge = 0"
              class="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              完成挑战 ✓
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Exercise Modal -->
    <div
      v-if="showExercise"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showExercise = false"
    >
      <div class="bg-white rounded-2xl max-w-md w-full overflow-hidden">
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold mb-1">情绪调节练习</h3>
              <p class="text-sm opacity-90">
                选择一个练习来帮助你平静下来
              </p>
            </div>
            <button
              @click="showExercise = false"
              class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              v-for="(exercise, index) in exercises"
              :key="index"
              @click="currentExercise = index"
              class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
              :class="currentExercise === index ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              {{ exercise.icon }} {{ exercise.title }}
            </button>
          </div>
          <div class="bg-purple-50 rounded-xl p-6">
            <div class="text-center mb-6">
              <div class="text-6xl mb-4">{{ exercises[currentExercise].icon }}</div>
              <h4 class="text-xl font-bold text-purple-800 mb-1">
                {{ exercises[currentExercise].title }}
              </h4>
              <p class="text-purple-600 text-sm">
                {{ exercises[currentExercise].description }}
              </p>
            </div>
            <div class="space-y-3">
              <div
                v-for="(step, index) in exercises[currentExercise].steps"
                :key="index"
                class="flex items-start gap-3"
              >
                <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-purple-600 shadow-sm shrink-0">
                  {{ index + 1 }}
                </div>
                <p class="text-purple-700 pt-1">{{ step }}</p>
              </div>
            </div>
          </div>
          <button
            @click="showExercise = false"
            class="w-full mt-6 py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors"
          >
            我已经准备好练习了
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
