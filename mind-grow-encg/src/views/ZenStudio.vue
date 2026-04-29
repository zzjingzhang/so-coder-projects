<template>
  <div class="zen-studio-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-accent-600 via-primary-600 to-secondary-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <el-icon class="text-6xl mb-4 opacity-80"><VideoCamera /></el-icon>
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Zen Studio</h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Find your inner peace with guided meditations, yoga flows, and relaxation exercises.
        </p>
      </div>
    </section>

    <!-- Categories Filter -->
    <section class="py-8 bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-3 justify-center">
          <el-tag
            v-for="category in categories"
            :key="category"
            :effect="selectedCategory === category ? 'dark' : 'plain'"
            :type="selectedCategory === category ? 'primary' : 'info'"
            class="px-5 py-2 text-base cursor-pointer hover:opacity-80 transition-opacity rounded-lg"
            @click="selectedCategory = category"
          >
            {{ category }}
          </el-tag>
        </div>
      </div>
    </section>

    <!-- Featured Video Section -->
    <section class="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            <img
              :src="featuredVideo.image"
              :alt="featuredVideo.title"
              class="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div class="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <el-icon class="text-primary-600 text-3xl ml-1"><VideoPlay /></el-icon>
              </div>
            </div>
            <div class="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
              {{ featuredVideo.duration }}
            </div>
          </div>
          <div>
            <span class="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Featured
            </span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ featuredVideo.title }}</h2>
            <p class="text-gray-600 mb-6 text-lg leading-relaxed">
              {{ featuredVideo.description }}
            </p>
            <div class="flex items-center space-x-4 mb-6">
              <span class="flex items-center text-sm text-gray-500">
                <el-icon class="mr-1"><Clock /></el-icon>
                {{ featuredVideo.duration }}
              </span>
              <span class="flex items-center text-sm text-gray-500">
                <el-icon class="mr-1"><Collection /></el-icon>
                {{ featuredVideo.category }}
              </span>
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
              <el-button type="primary" size="large" class="rounded-xl">
                <el-icon class="mr-2"><VideoPlay /></el-icon>
                Start Now
              </el-button>
              <el-button size="large" class="rounded-xl">
                <el-icon class="mr-2"><Plus /></el-icon>
                Add to Favorites
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Videos Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">
          {{ selectedCategory === 'All' ? 'All Videos' : selectedCategory + ' Videos' }}
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="video in filteredVideos"
            :key="video.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div class="relative">
              <img
                :src="video.image"
                :alt="video.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div class="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                  <el-icon class="text-primary-600 text-xl ml-0.5"><VideoPlay /></el-icon>
                </div>
              </div>
              <div class="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                {{ video.duration }}
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-secondary-600 bg-secondary-50 px-2 py-1 rounded">
                  {{ video.category }}
                </span>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {{ video.title }}
              </h3>
              <p class="text-gray-600 text-sm line-clamp-2">
                {{ video.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Practice Section -->
    <section class="py-16 bg-gradient-to-br from-accent-50 via-primary-50 to-secondary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Quick Practice</h2>
          <p class="text-gray-600 text-lg">Just a few minutes to center yourself and recharge</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="quickPractice in quickPractices"
            :key="quickPractice.id"
            class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div :class="[
              'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110',
              quickPractice.color === 'primary' ? 'bg-primary-100' :
              quickPractice.color === 'secondary' ? 'bg-secondary-100' : 'bg-accent-100'
            ]">
              <el-icon :class="[
                'text-3xl',
                quickPractice.color === 'primary' ? 'text-primary-600' :
                quickPractice.color === 'secondary' ? 'text-secondary-600' : 'text-accent-600'
              ]">
                <component :is="quickPractice.icon" />
              </el-icon>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ quickPractice.title }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ quickPractice.description }}</p>
            <span class="inline-flex items-center text-sm font-semibold" :class="[
              quickPractice.color === 'primary' ? 'text-primary-600' :
              quickPractice.color === 'secondary' ? 'text-secondary-600' : 'text-accent-600'
            ]">
              <el-icon class="mr-1"><Clock /></el-icon>
              {{ quickPractice.duration }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Benefits of Mindfulness</h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Regular practice can transform your student experience
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <el-icon class="text-primary-600 text-2xl"><Brain /></el-icon>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Better Focus</h3>
            <p class="text-gray-600 text-sm">Improve concentration and attention span for better study sessions</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <el-icon class="text-secondary-600 text-2xl"><EmotionHappy /></el-icon>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Reduced Stress</h3>
            <p class="text-gray-600 text-sm">Lower anxiety levels and manage exam pressure more effectively</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <el-icon class="text-accent-600 text-2xl"><Moon /></el-icon>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Improved Sleep</h3>
            <p class="text-gray-600 text-sm">Fall asleep faster and enjoy more restful nights</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <el-icon class="text-green-600 text-2xl"><Heart /></el-icon>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Emotional Balance</h3>
            <p class="text-gray-600 text-sm">Develop greater emotional resilience and self-awareness</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { zenVideos } from '../data/mockData'

const categories = ['All', 'Meditation', 'Breathing', 'Yoga', 'Sleep', 'Focus', 'Relaxation']
const selectedCategory = ref('All')

const featuredVideo = computed(() => {
  return zenVideos[0]
})

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'All') {
    return zenVideos.filter((_, index) => index !== 0)
  }
  return zenVideos.filter(v => v.category === selectedCategory.value)
})

const quickPractices = [
  {
    id: 1,
    title: '3-Minute Breathing',
    description: 'A quick breathing exercise to center yourself anytime',
    duration: '3 minutes',
    icon: 'WindPower',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Desk Stretch',
    description: 'Release tension from sitting at your desk all day',
    duration: '5 minutes',
    icon: 'Aim',
    color: 'secondary'
  },
  {
    id: 3,
    title: 'Mini Meditation',
    description: 'A brief mindfulness practice for busy moments',
    duration: '4 minutes',
    icon: 'Moon',
    color: 'accent'
  }
]
</script>

<style scoped>
</style>
