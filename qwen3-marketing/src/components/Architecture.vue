<template>
  <section id="architecture" class="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          双路径架构
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Qwen 3 采用创新的双路径架构设计，提供灵活的性能与效率平衡
        </p>
      </div>
      
      <!-- Dual Path Components -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Dense Model -->
          <div class="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ qwen3Data.architecture.dualPath.denseModel.name }}
              </h3>
            </div>
            
            <p class="text-gray-600 mb-6">
              {{ qwen3Data.architecture.dualPath.denseModel.description }}
            </p>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-900">核心特性：</h4>
              <ul class="space-y-2">
                <li 
                  v-for="feature in qwen3Data.architecture.dualPath.denseModel.features" 
                  :key="feature"
                  class="flex items-center text-gray-600"
                >
                  <svg class="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
          
          <!-- MoE Model -->
          <div class="bg-white rounded-xl p-8 shadow-lg border border-purple-200 hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">
                {{ qwen3Data.architecture.dualPath.moeModel.name }}
              </h3>
            </div>
            
            <p class="text-gray-600 mb-6">
              {{ qwen3Data.architecture.dualPath.moeModel.description }}
            </p>
            
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-900">核心特性：</h4>
              <ul class="space-y-2">
                <li 
                  v-for="feature in qwen3Data.architecture.dualPath.moeModel.features" 
                  :key="feature"
                  class="flex items-center text-gray-600"
                >
                  <svg class="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Model Variants -->
      <div>
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            可选模型规模
          </h3>
          <p class="text-gray-600 max-w-2xl mx-auto">
            选择最适合您需求的模型尺寸，从轻量级到企业级全方位覆盖
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div 
            v-for="variant in qwen3Data.architecture.modelVariants" 
            :key="variant.size"
            class="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-500 transition-all shadow-sm hover:shadow-lg"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-3xl font-bold text-purple-700">
                  {{ variant.size }}
                </h4>
                <p class="text-sm text-gray-500 mt-1">
                  {{ variant.type }} 架构
                </p>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p class="font-medium text-gray-900">适用场景</p>
                  <p class="text-gray-600 text-sm">{{ variant.useCase }}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p class="font-medium text-gray-900">性能特点</p>
                  <p class="text-gray-600 text-sm">{{ variant.performance }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { qwen3Data } from '../data/qwen3Data.js';

export default {
  name: 'Architecture',
  setup() {
    return {
      qwen3Data
    };
  }
};
</script>