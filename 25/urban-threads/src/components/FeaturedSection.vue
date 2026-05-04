<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const featuredProducts = ref([
  {
    id: 1,
    name: '限量联名T恤',
    price: '¥399',
    originalPrice: '¥599',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=limited%20edition%20streetwear%20t-shirt%20black%20with%20red%20graphic%20design%20on%20white%20background&image_size=square',
    badge: '限量'
  },
  {
    id: 2,
    name: '复古工装外套',
    price: '¥899',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20workwear%20jacket%20black%20streetwear%20style%20on%20white%20background&image_size=square',
    badge: '新品'
  },
  {
    id: 3,
    name: '潮流休闲裤',
    price: '¥499',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=trendy%20casual%20pants%20black%20streetwear%20style%20on%20white%20background&image_size=square',
    badge: '热卖'
  },
  {
    id: 4,
    name: '设计师联名卫衣',
    price: '¥699',
    originalPrice: '¥899',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=designer%20collaboration%20hoodie%20black%20with%20minimal%20logo%20on%20white%20background&image_size=square',
    badge: '折扣'
  }
])

const navigateToProducts = () => {
  router.push('/products')
}
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container-custom">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-4">
          精选<span class="text-red">系列</span>
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          探索我们最受欢迎的街头服饰系列，每一件都代表着独特的街头态度
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="product in featuredProducts" 
          :key="product.id" 
          class="group cursor-pointer"
        >
          <div class="relative overflow-hidden bg-gray-100 mb-4">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div 
              v-if="product.badge"
              class="absolute top-4 left-4"
            >
              <span 
                class="bg-red text-white text-xs px-4 py-1 font-bold"
                :class="{
                  'bg-black': product.badge === '新品' || product.badge === '热卖',
                  'bg-red': product.badge === '限量' || product.badge === '折扣'
                }"
              >
                {{ product.badge }}
              </span>
            </div>
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button class="bg-red text-white px-8 py-3 font-bold transition-all duration-300 hover:bg-red-hover transform translate-y-4 group-hover:translate-y-0">
                查看详情
              </button>
            </div>
          </div>
          <div class="text-center">
            <h3 class="text-lg font-bold mb-2 group-hover:text-red transition-colors duration-300">
              {{ product.name }}
            </h3>
            <div class="flex items-center justify-center space-x-2">
              <span class="text-xl font-bold text-red">{{ product.price }}</span>
              <span 
                v-if="product.originalPrice" 
                class="text-sm text-gray-400 line-through"
              >
                {{ product.originalPrice }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-16">
        <button 
          @click="navigateToProducts"
          class="group inline-flex items-center space-x-2 bg-black text-white px-10 py-4 text-lg font-bold hover:bg-red transition-all duration-300"
        >
          <span>查看全部商品</span>
          <span class="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>
    </div>
  </section>
</template>
