<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <router-view :key="route.path" />
    </main>
    <footer class="bg-text text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">G</span>
              </div>
              <span class="ml-3 text-xl font-bold text-white">GrowMore Inc.</span>
            </div>
            <p class="text-white/70 mb-4 leading-relaxed">
              我们是一家致力于创新技术解决方案的软件开发公司。帮助企业通过技术实现增长和成功是我们的使命。
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <i class="pi pi-facebook text-sm"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <i class="pi pi-twitter text-sm"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <i class="pi pi-linkedin text-sm"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <i class="pi pi-instagram text-sm"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">快速链接</h3>
            <ul class="space-y-2">
              <li>
                <router-link to="/" class="text-white/70 hover:text-secondary transition-colors duration-300">
                  主页
                </router-link>
              </li>
              <li>
                <router-link to="/services" class="text-white/70 hover:text-secondary transition-colors duration-300">
                  服务
                </router-link>
              </li>
              <li>
                <router-link to="/about" class="text-white/70 hover:text-secondary transition-colors duration-300">
                  关于我们
                </router-link>
              </li>
              <li>
                <router-link to="/contact" class="text-white/70 hover:text-secondary transition-colors duration-300">
                  联系我们
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">我们的服务</h3>
            <ul class="space-y-2">
              <li class="text-white/70">Android 开发</li>
              <li class="text-white/70">Web 开发</li>
              <li class="text-white/70">数据库管理</li>
              <li class="text-white/70">业务分析</li>
              <li class="text-white/70">数字营销</li>
              <li class="text-white/70">视频创建</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
          <p>&copy; {{ new Date().getFullYear() }} GrowMore Inc. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  </div>
</template>
