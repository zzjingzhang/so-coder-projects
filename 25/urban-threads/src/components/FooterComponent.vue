<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}

const footerLinks = {
  shop: [
    { name: '全部商品', path: '/products' },
    { name: '新品上市', path: '/products' },
    { name: '限量系列', path: '/products' },
    { name: '折扣专区', path: '/products' }
  ],
  about: [
    { name: '品牌故事', path: '/about' },
    { name: '设计理念', path: '/about' },
    { name: '合作伙伴', path: '/about' },
    { name: '加入我们', path: '/contact' }
  ],
  support: [
    { name: '联系我们', path: '/contact' },
    { name: '配送信息', path: '/contact' },
    { name: '退换政策', path: '/contact' },
    { name: '常见问题', path: '/contact' }
  ]
}
</script>

<template>
  <footer class="bg-black text-white">
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2">
          <div class="text-3xl font-bold mb-6">
            URBAN<span class="text-red">THREADS</span>
          </div>
          <p class="text-gray-400 mb-8 leading-relaxed">
            源于街头，忠于自我。Urban Threads 致力于为热爱街头文化的年轻人提供独特的穿搭选择，传递真实的街头态度。
          </p>
          <div class="flex space-x-4">
            <a 
              href="#" 
              class="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:bg-red transition-colors duration-300"
            >
              <span class="text-lg">微</span>
            </a>
            <a 
              href="#" 
              class="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:bg-red transition-colors duration-300"
            >
              <span class="text-lg">博</span>
            </a>
            <a 
              href="#" 
              class="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:bg-red transition-colors duration-300"
            >
              <span class="text-lg">抖</span>
            </a>
            <a 
              href="#" 
              class="w-10 h-10 bg-gray-900 text-white flex items-center justify-center hover:bg-red transition-colors duration-300"
            >
              <span class="text-lg">红</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-6 pb-2 border-b border-gray-800">购物</h3>
          <ul class="space-y-4">
            <li v-for="link in footerLinks.shop" :key="link.name">
              <a 
                @click="navigateTo(link.path)"
                class="text-gray-400 hover:text-red transition-colors duration-300 cursor-pointer"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-6 pb-2 border-b border-gray-800">关于</h3>
          <ul class="space-y-4">
            <li v-for="link in footerLinks.about" :key="link.name">
              <a 
                @click="navigateTo(link.path)"
                class="text-gray-400 hover:text-red transition-colors duration-300 cursor-pointer"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-6 pb-2 border-b border-gray-800">支持</h3>
          <ul class="space-y-4">
            <li v-for="link in footerLinks.support" :key="link.name">
              <a 
                @click="navigateTo(link.path)"
                class="text-gray-400 hover:text-red transition-colors duration-300 cursor-pointer"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-16 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm mb-4 md:mb-0">
            © 2026 Urban Threads. 保留所有权利。
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-500 hover:text-red text-sm transition-colors duration-300">
              隐私政策
            </a>
            <a href="#" class="text-gray-500 hover:text-red text-sm transition-colors duration-300">
              使用条款
            </a>
            <a href="#" class="text-gray-500 hover:text-red text-sm transition-colors duration-300">
              Cookie 政策
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
