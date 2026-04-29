<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
              <el-icon class="text-white text-xl"><Brain /></el-icon>
            </div>
            <span class="text-xl font-bold text-white">Mind & Grow ENCG</span>
          </div>
          <p class="text-sm text-gray-400 mb-6">
            Empowering students to thrive in all aspects of health and wellness. Your journey to a balanced, healthy lifestyle starts here.
          </p>
          <!-- Social Icons -->
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
              <el-icon class="text-lg"><Promotion /></el-icon>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
              <el-icon class="text-lg"><ChatDotRound /></el-icon>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
              <el-icon class="text-lg"><Picture /></el-icon>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-200">
              <el-icon class="text-lg"><VideoCamera /></el-icon>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center space-x-2"
              >
                <el-icon :size="14"><ChevronRight /></el-icon>
                <span>{{ link.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-white font-semibold text-lg mb-4">Resources</h3>
          <ul class="space-y-3">
            <li v-for="resource in resources" :key="resource.name">
              <a
                href="#"
                class="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center space-x-2"
              >
                <el-icon :size="14"><ChevronRight /></el-icon>
                <span>{{ resource.name }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-semibold text-lg mb-4">Contact Us</h3>
          <ul class="space-y-4">
            <li class="flex items-start space-x-3">
              <el-icon class="text-primary-400 mt-0.5"><Location /></el-icon>
              <div>
                <p class="text-sm text-gray-400">ENCG Campus</p>
                <p class="text-sm text-gray-400">Building A, Room 201</p>
              </div>
            </li>
            <li class="flex items-center space-x-3">
              <el-icon class="text-primary-400"><Message /></el-icon>
              <a href="mailto:support@mindgrow.encg" class="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                support@mindgrow.encg
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <el-icon class="text-primary-400"><Phone /></el-icon>
              <span class="text-sm text-gray-400">+212 5XX XXX XXX</span>
            </li>
          </ul>

          <!-- Newsletter Signup -->
          <div class="mt-6">
            <h4 class="text-white font-medium text-sm mb-3">Stay Updated</h4>
            <div class="flex space-x-2">
              <el-input
                v-model="newsletterEmail"
                placeholder="Your email"
                size="small"
                class="flex-1"
              />
              <el-button type="primary" size="small" @click="subscribeNewsletter">
                Subscribe
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-sm text-gray-500">
            © 2024 Mind & Grow ENCG. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const newsletterEmail = ref('')

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Health & Balance', path: '/health-balance' },
  { name: 'Student Recipes', path: '/student-recipes' },
  { name: 'Community', path: '/community' }
]

const resources = [
  { name: 'FAQ' },
  { name: 'Help Center' },
  { name: 'Student Support' },
  { name: 'Feedback' }
]

const subscribeNewsletter = () => {
  if (!newsletterEmail.value) {
    ElMessage.warning('Please enter your email address')
    return
  }
  ElMessage.success('Thank you for subscribing!')
  newsletterEmail.value = ''
}
</script>

<style scoped>
</style>
