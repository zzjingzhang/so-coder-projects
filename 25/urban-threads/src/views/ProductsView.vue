<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const products = ref([
  {
    id: 1,
    name: '街头风格T恤',
    price: '¥299',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20streetwear%20t-shirt%20with%20bold%20graphic%20design%20on%20white%20background&image_size=square',
    category: 'T恤'
  },
  {
    id: 2,
    name: '工装休闲裤',
    price: '¥499',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20cargo%20pants%20streetwear%20style%20on%20white%20background&image_size=square',
    category: '裤子'
  },
  {
    id: 3,
    name: '复古连帽卫衣',
    price: '¥599',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20hoodie%20streetwear%20with%20minimal%20logo%20on%20white%20background&image_size=square',
    category: '卫衣'
  },
  {
    id: 4,
    name: '潮流夹克外套',
    price: '¥899',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20bomber%20jacket%20streetwear%20style%20on%20white%20background&image_size=square',
    category: '外套'
  },
  {
    id: 5,
    name: '宽松牛仔短裤',
    price: '¥399',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20denim%20shorts%20streetwear%20style%20on%20white%20background&image_size=square',
    category: '短裤'
  },
  {
    id: 6,
    name: '设计感衬衫',
    price: '¥449',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20button%20up%20shirt%20streetwear%20style%20on%20white%20background&image_size=square',
    category: '衬衫'
  }
])
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComponent :is-menu-open="isMenuOpen" @toggle-menu="toggleMenu" />
    
    <main class="flex-grow pt-28">
      <section class="bg-black text-white py-16">
        <div class="container-custom text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">全部商品</h1>
          <p class="text-gray-300 text-lg">探索我们的街头服饰系列</p>
        </div>
      </section>
      
      <section class="py-16 bg-white">
        <div class="container-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="product in products" 
              :key="product.id" 
              class="group cursor-pointer"
            >
              <div class="relative overflow-hidden bg-gray-100 rounded-lg mb-4">
                <img 
                  :src="product.image" 
                  :alt="product.name" 
                  class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button class="bg-red text-white px-6 py-3 font-semibold transition-all duration-300 hover:bg-red-hover transform translate-y-4 group-hover:translate-y-0">
                    立即购买
                  </button>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="bg-black text-white text-xs px-3 py-1 font-semibold">
                    {{ product.category }}
                  </span>
                </div>
              </div>
              <div class="text-center">
                <h3 class="text-lg font-bold mb-2 group-hover:text-red transition-colors duration-300">
                  {{ product.name }}
                </h3>
                <p class="text-xl font-bold text-red">{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <FooterComponent />
  </div>
</template>
