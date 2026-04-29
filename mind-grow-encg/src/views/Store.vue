<template>
  <div class="store-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-secondary-600 to-accent-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <el-icon class="text-6xl mb-4 opacity-80"><ShoppingBag /></el-icon>
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Well-Being Store</h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Discover products that support your wellness journey - from fitness gear to relaxation aids.
        </p>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p class="text-gray-600 mt-1">Curated selection of wellness products for students</p>
          </div>
          <el-select v-model="selectedCategory" placeholder="Filter by category" size="large" clearable class="w-48">
            <el-option label="All Categories" value="" />
            <el-option label="Fitness" value="Fitness" />
            <el-option label="Wellness" value="Wellness" />
            <el-option label="Nutrition" value="Nutrition" />
            <el-option label="Comfort" value="Comfort" />
          </el-select>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div class="relative overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {{ discountPercent(product) }}% OFF
                </span>
              </div>
              <div class="absolute top-3 right-3">
                <el-button circle size="small" class="bg-white/90 backdrop-blur-sm">
                  <el-icon><Heart /></el-icon>
                </el-button>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {{ product.category }}
                </span>
                <div class="flex items-center">
                  <el-rate :model-value="product.rating" disabled size="small" />
                  <span class="text-sm text-gray-500 ml-1">{{ product.rating }}</span>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {{ product.name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ product.description }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
                  <span class="text-sm text-gray-400 line-through">${{ product.originalPrice }}</span>
                </div>
                <el-button type="primary" size="small" @click="addToCart(product)">
                  <el-icon class="mr-1"><ShoppingCart /></el-icon>
                  Add
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-16">
          <el-icon class="text-gray-300 text-6xl mb-4"><Search /></el-icon>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p class="text-gray-500">Try selecting a different category</p>
        </div>
      </div>
    </section>

    <!-- Shopping Cart Drawer (Simulated) -->
    <el-drawer
      v-model="showCartDrawer"
      title="Shopping Cart"
      size="400px"
      direction="rtl"
    >
      <div v-if="cartItems.length > 0" class="space-y-4">
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
        >
          <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg" />
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900">{{ item.name }}</h4>
            <div class="flex items-center justify-between mt-2">
              <span class="font-bold text-primary-600">${{ item.price }}</span>
              <div class="flex items-center space-x-2">
                <el-button size="small" circle @click="removeFromCart(index)">
                  <el-icon><Minus /></el-icon>
                </el-button>
                <span class="font-medium">1</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4 mt-6">
          <div class="flex items-center justify-between mb-4">
            <span class="font-semibold text-gray-900">Total:</span>
            <span class="text-2xl font-bold text-primary-600">${{ cartTotal }}</span>
          </div>
          <el-button type="primary" size="large" class="w-full rounded-xl">
            Checkout
          </el-button>
        </div>
      </div>
      <div v-else class="text-center py-12">
        <el-icon class="text-gray-300 text-6xl mb-4"><ShoppingCart /></el-icon>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
        <p class="text-gray-500">Start adding products to your cart</p>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { storeProducts } from '../data/mockData'

const selectedCategory = ref('')
const showCartDrawer = ref(false)
const cartItems = ref([])

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return storeProducts
  }
  return storeProducts.filter(p => p.category === selectedCategory.value)
})

const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price, 0).toFixed(2)
})

const discountPercent = (product) => {
  return Math.round((1 - product.price / product.originalPrice) * 100)
}

const addToCart = (product) => {
  cartItems.value.push({ ...product })
  ElMessage.success(`${product.name} added to cart!`)
}

const removeFromCart = (index) => {
  cartItems.value.splice(index, 1)
}
</script>

<style scoped>
</style>
