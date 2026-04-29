<template>
  <section id="performance" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          卓越性能
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Qwen 3 在多项基准测试中表现卓越，达到业界领先水平
        </p>
      </div>
      
      <!-- Benchmark Scores -->
      <div class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            基准测试成绩
          </h3>
          <p class="text-gray-600">
            在编码、数学和推理三大核心能力上的综合评分
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div 
            v-for="benchmark in qwen3Data.performance.benchmarks" 
            :key="benchmark.category"
            class="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="text-center mb-4">
              <h4 class="text-xl font-semibold text-gray-900 mb-2">
                {{ benchmark.category }}
              </h4>
              <p class="text-sm text-gray-500 mb-4">
                {{ benchmark.description }}
              </p>
            </div>
            
            <!-- Progress Bar -->
            <div class="relative pt-1">
              <div class="flex mb-2 items-center justify-between">
                <div>
                  <span class="text-xs font-semibold inline-block text-purple-700">
                    得分
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-2xl font-bold inline-block text-purple-700">
                    {{ benchmark.score }}
                  </span>
                  <span class="text-sm text-gray-500">
                    /{{ benchmark.maxScore }}
                  </span>
                </div>
              </div>
              <div class="overflow-hidden h-4 text-xs flex rounded-full bg-purple-100">
                <div 
                  :style="{ width: (benchmark.score / benchmark.maxScore * 100) + '%' }"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Competitor Comparison -->
      <div class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            竞争对手对比
          </h3>
          <p class="text-gray-600 max-w-2xl mx-auto">
            与业界领先模型的性能对比分析
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div 
            v-for="competitor in qwen3Data.performance.competitors" 
            :key="competitor.name"
            class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-xl font-bold text-gray-900">
                vs {{ competitor.name }}
              </h4>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-purple-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-sm font-medium text-purple-700">
                  Qwen 3 优势
                </span>
              </div>
            </div>
            
            <p class="text-gray-600 mb-4">
              {{ competitor.comparison }}
            </p>
            
            <div class="space-y-2">
              <h5 class="font-medium text-gray-900 text-sm">核心亮点：</h5>
              <ul class="space-y-2">
                <li 
                  v-for="highlight in competitor.highlights" 
                  :key="highlight"
                  class="flex items-start text-sm text-gray-600"
                >
                  <svg class="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Performance Highlights -->
      <div>
        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-6 text-center">
            性能亮点
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div 
              v-for="(highlight, index) in qwen3Data.performance.highlights" 
              :key="index"
              class="flex items-start bg-white/10 rounded-lg p-4 backdrop-blur-sm"
            >
              <div class="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-white/90">
                {{ highlight }}
              </p>
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
  name: 'Performance',
  setup() {
    return {
      qwen3Data
    };
  }
};
</script>