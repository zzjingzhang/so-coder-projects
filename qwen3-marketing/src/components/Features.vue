<template>
  <section id="features" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          核心特性
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Qwen 3 采用创新的架构设计，提供卓越的推理能力和灵活的部署选项
        </p>
      </div>
      
      <!-- Hybrid Reasoning System -->
      <div class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            {{ qwen3Data.keyFeatures.hybridReasoning.title }}
          </h3>
          <p class="text-gray-600 max-w-2xl mx-auto">
            {{ qwen3Data.keyFeatures.hybridReasoning.description }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="mode in qwen3Data.keyFeatures.hybridReasoning.modes" 
            :key="mode.name"
            class="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 class="text-xl font-semibold text-purple-700 mb-3">
              {{ mode.name }}
            </h4>
            <p class="text-gray-600">
              {{ mode.description }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- MoE Architecture -->
      <div class="mb-16">
        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">
            {{ qwen3Data.keyFeatures.moeArchitecture.title }}
          </h3>
          <p class="text-lg opacity-90">
            {{ qwen3Data.keyFeatures.moeArchitecture.description }}
          </p>
        </div>
      </div>
      
      <!-- Capabilities Grid -->
      <div>
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            全面能力
          </h3>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Qwen 3 在多个领域展现出卓越的性能，满足各种应用场景需求
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="capability in qwen3Data.keyFeatures.capabilities" 
            :key="capability.name"
            class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer"
          >
            <div class="text-4xl mb-4">
              {{ capability.icon }}
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ capability.name }}
            </h4>
            <p class="text-gray-600 text-sm">
              {{ capability.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { qwen3Data } from '../data/qwen3Data.js';

export default {
  name: 'Features',
  setup() {
    return {
      qwen3Data
    };
  }
};
</script>