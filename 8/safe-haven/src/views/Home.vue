<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  {
    icon: '👨‍⚕️',
    title: '专业指导',
    description: '来自资深心理学家、咨询师的一对一支持，随时为你解答困惑',
    path: '/professionals',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: '🎮',
    title: '自助工具',
    description: '有趣的游戏和练习，帮助你建立自信、提升情商、培养韧性',
    path: '/tools',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: '👥',
    title: '社区交流',
    description: '在这里遇到志同道合的朋友，分享经历，互相支持，一起成长',
    path: '/community',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: '👨‍👩‍👧',
    title: '家长支持',
    description: '为家长提供专业建议和资源，帮助你更好地理解和支持孩子',
    path: '/parents',
    color: 'bg-orange-100 text-orange-600'
  }
]

const stats = [
  { number: '10,000+', label: '青少年用户', icon: '🌟' },
  { number: '200+', label: '专业咨询师', icon: '👨‍⚕️' },
  { number: '50+', label: '自助活动', icon: '🎮' },
  { number: '98%', label: '用户满意度', icon: '❤️' }
]

const testimonials = [
  {
    name: '小明',
    age: '14岁',
    content: 'SafeHaven 让我知道我不是一个人在战斗。在这里我认识了很多好朋友，他们理解我的感受。',
    avatar: '😊'
  },
  {
    name: '小红',
    age: '12岁',
    content: '心理咨询师姐姐真的很温柔，她教会了我很多应对困难的方法。现在我感觉自己更勇敢了！',
    avatar: '🌸'
  },
  {
    name: '小李妈妈',
    age: '',
    content: '作为家长，看到孩子越来越开朗，真的很感谢 SafeHaven 团队的专业帮助。',
    avatar: '👩'
  }
]

const currentTestimonial = ref(0)

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
}

const prevTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value - 1 + testimonials.length) % testimonials.length
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="home-page">
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🌻</span>
              <span>安全、温暖、支持</span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              你是
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">独一无二</span>
              的
              <br />
              你值得被
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">温柔以待</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              SafeHaven 是一个专门为你打造的安全空间。
              无论你正在经历什么，你都不孤单。
              在这里，有专业人士的支持，有同龄人的陪伴，
              还有丰富的工具帮助你成长。
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                @click="navigateTo('/login')"
                class="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg"
              >
                开始你的旅程 →
              </button>
              <button
                @click="navigateTo('/tools')"
                class="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-full transition-colors border border-gray-200"
              >
                探索自助工具
              </button>
            </div>
            <div class="flex items-center justify-center lg:justify-start gap-4 mt-8">
              <div class="flex -space-x-2">
                <span class="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center border-2 border-white">😊</span>
                <span class="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center border-2 border-white">🌸</span>
                <span class="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center border-2 border-white">🌟</span>
              </div>
              <div class="text-sm text-gray-600">
                <span class="font-semibold text-gray-900">10,000+</span> 小伙伴已经加入
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="relative z-10">
              <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                    🌻
                  </div>
                  <div>
                    <h3 class="font-bold text-lg">欢迎来到 SafeHaven</h3>
                    <p class="text-gray-500 text-sm">今天是新的一天 🌅</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div class="bg-green-50 rounded-xl p-4 flex items-center gap-4">
                    <span class="text-2xl">💬</span>
                    <div>
                      <p class="font-medium">每日心情打卡</p>
                      <p class="text-sm text-gray-500">记录今天的感受</p>
                    </div>
                  </div>
                  <div class="bg-blue-50 rounded-xl p-4 flex items-center gap-4">
                    <span class="text-2xl">🎯</span>
                    <div>
                      <p class="font-medium">小目标</p>
                      <p class="text-sm text-gray-500">今天想完成什么？</p>
                    </div>
                  </div>
                  <div class="bg-orange-50 rounded-xl p-4 flex items-center gap-4">
                    <span class="text-2xl">👫</span>
                    <div>
                      <p class="font-medium">3 条新消息</p>
                      <p class="text-sm text-gray-500">来看看朋友们的分享</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="text-3xl mb-2">{{ stat.icon }}</div>
            <div class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mb-2">
              {{ stat.number }}
            </div>
            <div class="text-gray-600">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SafeHaven 能为你提供什么？
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            我们致力于创造一个温暖、安全、支持性的环境，
            帮助每一个需要帮助的孩子
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl cursor-pointer hover:-translate-y-2 transition-all duration-300"
            @click="navigateTo(feature.path)"
          >
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
              :class="feature.color"
            >
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
            <div class="mt-6 flex items-center text-green-600 font-medium">
              <span>了解更多</span>
              <span class="ml-2">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            他们的故事
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            听听 SafeHaven 用户们的真实感受
          </p>
        </div>
        <div class="relative max-w-3xl mx-auto">
          <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <div class="text-center">
              <div class="text-5xl mb-6">
                {{ testimonials[currentTestimonial].avatar }}
              </div>
              <p class="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
                "{{ testimonials[currentTestimonial].content }}"
              </p>
              <div class="font-bold text-gray-900">
                {{ testimonials[currentTestimonial].name }}
              </div>
              <div v-if="testimonials[currentTestimonial].age" class="text-gray-500 text-sm">
                {{ testimonials[currentTestimonial].age }}
              </div>
            </div>
          </div>
          <div class="flex justify-center gap-4 mt-8">
            <button
              @click="prevTestimonial"
              class="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <div class="flex items-center gap-2">
              <span
                v-for="(_, index) in testimonials"
                :key="index"
                class="w-3 h-3 rounded-full transition-colors"
                :class="index === currentTestimonial ? 'bg-green-500' : 'bg-gray-300'"
              ></span>
            </div>
            <button
              @click="nextTestimonial"
              class="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 bg-gradient-to-r from-green-500 to-blue-500">
      <div class="max-w-4xl mx-auto text-center text-white">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          准备好开始了吗？
        </h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          加入 SafeHaven，开启你的成长之旅。
          记住：你不必独自面对一切。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="navigateTo('/login')"
            class="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            免费注册
          </button>
          <button
            @click="navigateTo('/professionals')"
            class="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-colors"
          >
            联系专家
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
