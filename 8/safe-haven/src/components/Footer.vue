<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '专业指导', path: '/professionals' },
  { name: '自助工具', path: '/tools' },
  { name: '社区交流', path: '/community' },
  { name: '家长资源', path: '/parents' }
]

const resources = [
  { name: '紧急求助', path: '#' },
  { name: '隐私政策', path: '#' },
  { name: '使用条款', path: '#' },
  { name: '常见问题', path: '#' },
  { name: '联系我们', path: '#' }
]

const navigateTo = (path) => {
  if (path.startsWith('/')) {
    router.push(path)
  }
}
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-3xl">🌻</span>
            <span class="text-xl font-bold">SafeHaven</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            一个为儿童和青少年提供心理支持的安全港湾，帮助他们建立信心，培养社交技能，找到真正的友谊。
          </p>
          <div class="flex gap-4 mt-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="text-xl">📱</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="text-xl">💬</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="text-xl">📧</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-primary-400">快速链接</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.path">
              <a
                @click="navigateTo(link.path)"
                class="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-primary-400">资源中心</h3>
          <ul class="space-y-3">
            <li v-for="link in resources" :key="link.path">
              <a
                @click="navigateTo(link.path)"
                class="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-primary-400">联系我们</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-gray-400">
              <span>📞</span>
              <span>400-888-9999</span>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <span>📧</span>
              <span>support@safehaven.com</span>
            </div>
            <div class="flex items-center gap-2 text-gray-400">
              <span>⏰</span>
              <span>每天 9:00 - 21:00</span>
            </div>
          </div>
          
          <!-- Emergency Button -->
          <div class="mt-6">
            <a
              href="#"
              class="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🆘 紧急求助
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-500 text-sm">
            © 2024 SafeHaven. 保留所有权利。
          </p>
          <div class="flex items-center gap-2 text-gray-500 text-sm">
            <span>🏆</span>
            <span>中国心理学会认证合作平台</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
