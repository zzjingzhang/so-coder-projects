<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="#" class="text-2xl font-bold text-purple-700">
            Qwen 3
          </a>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-gray-700 hover:text-purple-600 transition-colors">
            特性
          </a>
          <a href="#architecture" class="text-gray-700 hover:text-purple-600 transition-colors">
            架构
          </a>
          <a href="#performance" class="text-gray-700 hover:text-purple-600 transition-colors">
            性能
          </a>
          <div class="flex items-center space-x-4">
            <a 
              :href="qwen3Data.externalLinks.tongyi" 
              target="_blank" 
              rel="noopener noreferrer"
              class="px-4 py-2 text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
            >
              通义
            </a>
            <a 
              :href="qwen3Data.externalLinks.qwenChat" 
              target="_blank" 
              rel="noopener noreferrer"
              class="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
            >
              Qwen Chat
            </a>
          </div>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg 
            v-if="!isMobileMenuOpen"
            class="w-6 h-6 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg 
            v-else
            class="w-6 h-6 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-if="isMobileMenuOpen"
      class="md:hidden bg-white border-t shadow-lg"
    >
      <div class="px-4 py-4 space-y-3">
        <a 
          href="#features" 
          @click="isMobileMenuOpen = false"
          class="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
        >
          特性
        </a>
        <a 
          href="#architecture" 
          @click="isMobileMenuOpen = false"
          class="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
        >
          架构
        </a>
        <a 
          href="#performance" 
          @click="isMobileMenuOpen = false"
          class="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
        >
          性能
        </a>
        <div class="pt-4 border-t space-y-3">
          <a 
            :href="qwen3Data.externalLinks.tongyi" 
            target="_blank" 
            rel="noopener noreferrer"
            class="block w-full py-2 text-center text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
          >
            通义
          </a>
          <a 
            :href="qwen3Data.externalLinks.qwenChat" 
            target="_blank" 
            rel="noopener noreferrer"
            class="block w-full py-2 text-center bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            Qwen Chat
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
import { qwen3Data } from '../data/qwen3Data.js';

export default {
  name: 'Header',
  setup() {
    const isMobileMenuOpen = ref(false);
    
    return {
      qwen3Data,
      isMobileMenuOpen
    };
  }
};
</script>