<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeFaq = ref(null)

const warningSigns = [
  {
    icon: '😔',
    title: '情绪变化',
    description: '持续的悲伤、易怒、情绪波动大',
    examples: ['经常哭泣', '对喜欢的事物失去兴趣', '容易发脾气']
  },
  {
    icon: '📚',
    title: '学业变化',
    description: '学习成绩突然下降或对上学失去兴趣',
    examples: ['不想去学校', '成绩大幅下滑', '逃学']
  },
  {
    icon: '👥',
    title: '社交退缩',
    description: '避开朋友和家人，喜欢独处',
    examples: ['不再参加喜欢的活动', '总是把自己关在房间里', '失去朋友']
  },
  {
    icon: '💤',
    title: '睡眠变化',
    description: '失眠或睡眠过多',
    examples: ['难以入睡', '整夜失眠', '白天总是想睡觉']
  },
  {
    icon: '🍽️',
    title: '饮食习惯改变',
    description: '食欲变化明显',
    examples: ['不想吃东西', '暴饮暴食', '体重明显变化']
  },
  {
    icon: '💔',
    title: '谈论伤害自己',
    description: '表达消极或自残的想法',
    examples: ['说自己没有价值', '提到死亡', '说希望消失']
  }
]

const communicationTips = [
  {
    icon: '👂',
    title: '积极倾听',
    description: '全神贯注地听孩子说话，不要打断，不要急于给出建议或批评',
    action: '放下手机，看着孩子的眼睛，点头表示你在听'
  },
  {
    icon: '❓',
    title: '开放式提问',
    description: '用开放式问题代替封闭式问题，让孩子有更多表达空间',
    action: '问"今天在学校怎么样？"而不是"今天在学校好不好？"'
  },
  {
    icon: '❤️',
    title: '表达理解',
    description: '承认和验证孩子的感受，而不是否定或轻视',
    action: '说"我理解你为什么会感到难过"而不是"这有什么好难过的"'
  },
  {
    icon: '💬',
    title: '分享自己的感受',
    description: '适度分享自己的经历和感受，建立信任和共鸣',
    action: '说"我小时候也有过类似的感觉"让孩子知道他不孤单'
  },
  {
    icon: '⏰',
    title: '选择合适的时机',
    description: '在孩子放松、没有压力的时候谈话',
    action: '可以在散步、开车或一起做饭时轻松地聊天'
  },
  {
    icon: '🤗',
    title: '表达无条件的爱',
    description: '让孩子知道无论发生什么，你都爱他、支持他',
    action: '经常说"我爱你"，给拥抱，花时间陪伴'
  }
]

const faqs = [
  {
    question: '我如何知道我的孩子是否需要专业帮助？',
    answer: '如果你注意到孩子出现持续的情绪变化、社交退缩、学业下滑、睡眠或饮食问题，特别是如果这些症状持续超过两周，影响了孩子的日常生活，建议寻求专业帮助。相信你的直觉——作为父母，你最了解你的孩子。'
  },
  {
    question: '我应该如何和孩子谈论 SafeHaven？',
    answer: '以开放、支持的态度介绍 SafeHaven。你可以说："我发现了一个很棒的平台，有很多有趣的活动和专业的叔叔阿姨可以帮助你。你想和我一起看看吗？"强调这是一个安全的空间，孩子可以自由地分享，所有内容都是保密的。'
  },
  {
    question: '我可以在 SafeHaven 看到孩子的活动吗？',
    answer: '为了保护孩子的隐私和建立信任，我们尊重孩子的隐私空间。但是，我们鼓励家长和孩子一起使用这个平台，一起完成练习，共同参与活动。这种参与方式比单独查看更能建立信任和支持。'
  },
  {
    question: '如果孩子拒绝寻求帮助怎么办？',
    answer: '这是很常见的。不要强迫孩子，而是创造一个安全的环境让他知道帮助是可用的。你可以说："我知道你现在可能不想谈论这个，但我在这里，如果你想聊，我随时都在。"同时，你可以自己学习资源，理解孩子的需求，以更有效的方式支持他。'
  },
  {
    question: '校园欺凌有哪些迹象？',
    answer: '常见迹象包括：不想上学、突然成绩下降、物品丢失或损坏、不明原因的伤痕、睡眠问题、情绪变化、社交退缩、谈论自杀等。如果你注意到这些迹象，温柔地和孩子交谈，表达你的关心。'
  },
  {
    question: '我应该如何应对孩子被欺凌的情况？',
    answer: '首先，认真倾听孩子的诉说，表达你的理解和支持。不要责怪孩子。然后，与学校沟通，了解情况并寻求解决方案。同时，帮助孩子建立自信，学习应对技巧。在严重情况下，考虑寻求法律或专业帮助。'
  }
]

const articles = [
  {
    id: 1,
    title: '如何与青春期孩子有效沟通',
    author: '李明医生',
    readTime: '8分钟',
    category: '沟通技巧',
    image: '💬'
  },
  {
    id: 2,
    title: '识别孩子抑郁的早期信号',
    author: '王芳咨询师',
    readTime: '6分钟',
    category: '心理健康',
    image: '😔'
  },
  {
    id: 3,
    title: '校园欺凌：家长指南',
    author: '周婷医生',
    readTime: '10分钟',
    category: '校园问题',
    image: '🛡️'
  },
  {
    id: 4,
    title: '培养孩子的自信心',
    author: '张伟专家',
    readTime: '7分钟',
    category: '自我成长',
    image: '💪'
  }
]

const toggleFaq = (index) => {
  if (activeFaq.value === index) {
    activeFaq.value = null
  } else {
    activeFaq.value = index
  }
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="parents-page">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-orange-50 via-white to-primary-50 section-padding">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>👨‍👩‍👧</span>
              <span>家长资源</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              与孩子
              <span class="gradient-text">一起成长</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              作为家长，看到孩子遇到困难时，你可能会感到无助和困惑。
              在这里，我们为你提供专业的知识、实用的工具和温暖的支持，
              帮助你更好地理解孩子，与他一起度过困难时刻。
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="navigateTo('/login')"
                class="btn-primary"
              >
                创建家长账号
              </button>
              <button
                @click="navigateTo('/professionals')"
                class="btn-secondary"
              >
                联系专家咨询
              </button>
            </div>
          </div>
          <div class="bg-gradient-to-br from-orange-100 to-primary-100 rounded-3xl p-8">
            <div class="text-center">
              <div class="text-6xl mb-6">👨‍👩‍👧</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                你并不孤单
              </h3>
              <p class="text-gray-600 mb-6">
                超过 5,000 位家长正在 SafeHaven 学习如何更好地支持他们的孩子
              </p>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/60 rounded-xl p-4">
                  <div class="text-2xl font-bold text-orange-600">95%</div>
                  <div class="text-sm text-gray-600">家长反馈更理解孩子</div>
                </div>
                <div class="bg-white/60 rounded-xl p-4">
                  <div class="text-2xl font-bold text-primary-600">88%</div>
                  <div class="text-sm text-gray-600">家庭关系改善</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Warning Signs Section -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            需要关注的信号
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            了解这些常见的警示信号，可以帮助你及早发现孩子可能遇到的问题
          </p>
          <p class="text-sm text-red-500 mt-2">
            ⚠️ 如果你发现多个这些信号，特别是持续超过两周，建议寻求专业帮助
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="sign in warningSigns"
            :key="sign.title"
            class="card hover:shadow-xl transition-shadow"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {{ sign.icon }}
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 mb-2">{{ sign.title }}</h3>
                <p class="text-sm text-gray-600 mb-3">{{ sign.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="example in sign.examples"
                    :key="example"
                    class="px-2 py-1 bg-red-50 text-red-600 text-xs rounded"
                  >
                    • {{ example }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Communication Tips Section -->
    <section class="section-padding bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            有效沟通的技巧
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            良好的沟通是建立信任和理解的基础。以下是一些实用的沟通技巧
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="tip in communicationTips"
            :key="tip.title"
            class="card"
          >
            <div class="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl mb-4">
              {{ tip.icon }}
            </div>
            <h3 class="font-bold text-gray-900 mb-2">{{ tip.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ tip.description }}</p>
            <div class="bg-primary-50 rounded-lg p-3">
              <p class="text-sm text-primary-700">
                <span class="font-medium">💡 怎么做：</span>{{ tip.action }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Section -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              专家文章
            </h2>
            <p class="text-gray-600">
              由专业人士撰写的实用指南和建议
            </p>
          </div>
          <button
            class="text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            查看全部文章 →
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="article in articles"
            :key="article.id"
            class="card cursor-pointer hover:-translate-y-2 transition-all duration-300"
          >
            <div class="h-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center text-5xl mb-4">
              {{ article.image }}
            </div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                {{ article.category }}
              </span>
              <span class="text-xs text-gray-500">
                ⏱️ {{ article.readTime }}
              </span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">
              {{ article.title }}
            </h3>
            <p class="text-sm text-gray-500">
              作者：{{ article.author }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            常见问题
          </h2>
          <p class="text-lg text-gray-600">
            许多家长都有类似的疑问，看看这些解答是否能帮助你
          </p>
        </div>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between"
            >
              <span class="font-medium text-gray-900 pr-4">
                {{ faq.question }}
              </span>
              <span class="text-xl text-primary-500 shrink-0">
                {{ activeFaq === index ? '−' : '+' }}
              </span>
            </button>
            <div
              v-if="activeFaq === index"
              class="px-6 pb-4 pt-2 border-t"
            >
              <p class="text-gray-600 leading-relaxed">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-gradient-to-r from-orange-500 to-primary-500 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          准备好开始了吗？
        </h2>
        <p class="text-xl opacity-90 mb-8">
          作为家长，你的支持对孩子来说非常重要。
          加入 SafeHaven，与孩子一起踏上成长之旅。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="navigateTo('/login')"
            class="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            立即注册家长账号
          </button>
          <button
            @click="navigateTo('/professionals')"
            class="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors"
          >
            预约专家咨询
          </button>
        </div>
        <p class="mt-6 text-sm opacity-80">
          💡 你也可以与孩子一起使用 SafeHaven，共同参与活动和练习
        </p>
      </div>
    </section>

    <!-- Emergency Notice -->
    <section class="py-8 bg-red-50">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <div class="flex items-center justify-center gap-2 mb-4">
          <span class="text-3xl">🆘</span>
          <h3 class="text-xl font-bold text-red-700">
            遇到紧急情况？
          </h3>
        </div>
        <p class="text-red-600 mb-4">
          如果孩子正在经历危机或有伤害自己的想法，请立即寻求帮助
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <div class="bg-white px-6 py-3 rounded-lg shadow-sm">
            <span class="text-sm text-gray-500">全国心理援助热线</span>
            <p class="font-bold text-red-600">400-161-9995</p>
          </div>
          <div class="bg-white px-6 py-3 rounded-lg shadow-sm">
            <span class="text-sm text-gray-500">危机干预热线</span>
            <p class="font-bold text-red-600">010-82951332</p>
          </div>
          <div class="bg-white px-6 py-3 rounded-lg shadow-sm">
            <span class="text-sm text-gray-500">青少年热线</span>
            <p class="font-bold text-red-600">12355</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
