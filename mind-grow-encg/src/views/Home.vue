<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <div class="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <el-icon class="mr-2"><Star /></el-icon>
              New: Join our 30-Day Wellness Challenge
            </div>
            <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Nurture Your Mind,<br />
              <span class="text-primary-200">Grow Your Potential</span>
            </h1>
            <p class="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
              Your all-in-one student wellness platform. Manage your health, connect with peers, discover recipes, and thrive in every aspect of student life.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <el-button type="primary" size="large" class="rounded-xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" @click="navigateTo('/health-balance')">
                <el-icon class="mr-2"><Right /></el-icon>
                Get Started
              </el-button>
              <el-button size="large" class="rounded-xl px-8 py-6 text-lg font-semibold bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm" @click="navigateTo('/community')">
                <el-icon class="mr-2"><VideoCamera /></el-icon>
                Watch Demo
              </el-button>
            </div>
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/30">
              <div>
                <div class="text-3xl font-bold">10K+</div>
                <div class="text-white/80 text-sm">Active Students</div>
              </div>
              <div>
                <div class="text-3xl font-bold">500+</div>
                <div class="text-white/80 text-sm">Resources</div>
              </div>
              <div>
                <div class="text-3xl font-bold">98%</div>
                <div class="text-white/80 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
          <div class="hidden lg:block">
            <div class="relative">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diverse%20group%20of%20students%20studying%20together%20in%20modern%20campus%20environment%20happy%20healthy%20lifestyle&image_size=landscape_4_3"
                alt="Students thriving"
                class="rounded-3xl shadow-2xl"
              />
              <!-- Floating Cards -->
              <div class="absolute -left-8 top-8 bg-white rounded-2xl p-4 shadow-xl">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <el-icon class="text-green-600 text-xl"><Check /></el-icon>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-800">Sleep Goal</div>
                    <div class="text-sm text-green-600 font-medium">7/7 days ✓</div>
                  </div>
                </div>
              </div>
              <div class="absolute -right-4 bottom-8 bg-white rounded-2xl p-4 shadow-xl">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <el-icon class="text-blue-600 text-xl"><Trophy /></el-icon>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-800">Weekly Points</div>
                    <div class="text-sm text-blue-600 font-medium">+1,250 earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Wave Shape -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>

    <!-- Quick Links Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            Explore Our Features
          </span>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need in One Place
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            From healthy recipes to mindfulness exercises, we've got all the tools to help you thrive during your student journey.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="link in quickLinks"
            :key="link.id"
            @click="navigateTo(link.path)"
            class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
          >
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110',
              link.color === 'primary' ? 'bg-primary-100' :
              link.color === 'secondary' ? 'bg-secondary-100' : 'bg-accent-100'
            ]">
              <el-icon :class="[
                'text-2xl',
                link.color === 'primary' ? 'text-primary-600' :
                link.color === 'secondary' ? 'text-secondary-600' : 'text-accent-600'
              ]">
                <component :is="link.icon" />
              </el-icon>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {{ link.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              {{ link.description }}
            </p>
            <div :class="[
              'inline-flex items-center text-sm font-medium transition-colors',
              link.color === 'primary' ? 'text-primary-600' :
              link.color === 'secondary' ? 'text-secondary-600' : 'text-accent-600'
            ]">
              Learn more
              <el-icon class="ml-1 group-hover:translate-x-1 transition-transform"><Right /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Loved by Students
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            See what fellow students have to say about their experience with Mind & Grow ENCG.
          </p>
        </div>

        <div class="relative">
          <el-carousel :interval="5000" type="card" height="400px">
            <el-carousel-item v-for="(testimonial, index) in testimonials" :key="testimonial.id">
              <div class="flex items-center justify-center h-full px-8">
                <div class="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 max-w-2xl shadow-lg border border-gray-100">
                  <div class="flex items-center mb-6">
                    <img
                      :src="testimonial.avatar"
                      :alt="testimonial.name"
                      class="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                      <p class="text-sm text-gray-500">{{ testimonial.major }}</p>
                    </div>
                    <div class="ml-auto">
                      <el-rate :model-value="testimonial.rating" disabled />
                    </div>
                  </div>
                  <div class="text-6xl text-primary-200 mb-4">"</div>
                  <p class="text-gray-700 text-lg leading-relaxed italic">
                    {{ testimonial.text }}
                  </p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </section>

    <!-- Weekly Challenges Section -->
    <section class="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-4">
            Weekly Challenges
          </span>
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            Join the Challenge, Earn Rewards
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Participate in our weekly wellness challenges, track your progress, and earn points redeemable for amazing rewards.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="challenge in weeklyChallenges"
            :key="challenge.id"
            class="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all duration-300"
          >
            <div class="relative">
              <img
                :src="challenge.image"
                :alt="challenge.title"
                class="w-full h-48 object-cover"
              />
              <div class="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ challenge.participants }} participants
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-3">{{ challenge.title }}</h3>
              <p class="text-gray-400 mb-4">{{ challenge.description }}</p>
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center text-gray-400 text-sm">
                  <el-icon class="mr-1"><Calendar /></el-icon>
                  {{ challenge.startDate }} - {{ challenge.endDate }}
                </div>
                <div class="flex items-center text-primary-400 text-sm font-medium">
                  <el-icon class="mr-1"><Trophy /></el-icon>
                  {{ challenge.rewards }}
                </div>
              </div>
              <el-button type="primary" size="large" class="w-full rounded-xl" @click="navigateTo('/community?tab=challenges')">
                Join Challenge
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 lg:p-12">
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
                Stay Updated with Wellness Tips
              </h2>
              <p class="text-white/90 text-lg mb-6">
                Subscribe to our newsletter and receive weekly wellness tips, new recipes, challenge updates, and exclusive offers directly to your inbox.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <el-input
                  v-model="subscribeEmail"
                  placeholder="Enter your email"
                  size="large"
                  class="flex-1"
                  :prefix-icon="Message"
                />
                <el-button type="primary" size="large" class="rounded-xl px-8 bg-white text-primary-600 hover:bg-gray-100 border-0 shadow-lg" @click="handleSubscribe">
                  Subscribe
                </el-button>
              </div>
              <p class="text-white/70 text-sm mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
            <div class="hidden lg:block">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student%20checking%20email%20on%20phone%20happy%20receiving%20wellness%20tips&image_size=landscape_4_3"
                alt="Newsletter"
                class="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { quickLinks, testimonials, weeklyChallenges } from '../data/mockData'

const router = useRouter()
const subscribeEmail = ref('')

const navigateTo = (path) => {
  router.push(path)
}

const handleSubscribe = () => {
  if (!subscribeEmail.value) {
    ElMessage.warning('Please enter your email address')
    return
  }
  ElMessage.success('Successfully subscribed! Check your email for a welcome message.')
  subscribeEmail.value = ''
}
</script>

<style scoped>
</style>
