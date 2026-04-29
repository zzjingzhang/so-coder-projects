<template>
  <section class="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Main Title -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Introducing <span class="text-purple-700">Qwen 3</span>
        </h1>
        
        <!-- Description -->
        <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          阿里巴巴集团最新一代大语言模型，采用创新的双路径架构，
          在保持高效计算的同时提供卓越的推理能力和编码性能。
          训练规模达到 {{ qwen3Data.trainingInfo.trainingTokens }} 个 Token，
          支持 {{ qwen3Data.trainingInfo.supportedLanguages }}+ 种语言。
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a 
            :href="qwen3Data.externalLinks.tongyi" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-full sm:w-auto px-8 py-3 bg-purple-700 text-white text-lg font-medium rounded-lg hover:bg-purple-800 transition-colors shadow-lg hover:shadow-xl"
          >
            体验通义
          </a>
          <a 
            :href="qwen3Data.externalLinks.qwenChat" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-full sm:w-auto px-8 py-3 text-purple-700 text-lg font-medium border-2 border-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
          >
            试用 Qwen Chat
          </a>
        </div>
        
        <!-- Key Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
            <div class="text-3xl sm:text-4xl font-bold text-purple-700 mb-2">
              {{ qwen3Data.trainingInfo.supportedLanguages }}+
            </div>
            <div class="text-gray-600">
              支持语言
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
            <div class="text-3xl sm:text-4xl font-bold text-purple-700 mb-2">
              {{ qwen3Data.trainingInfo.trainingTokens }}
            </div>
            <div class="text-gray-600">
              训练 Token
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
            <div class="text-3xl sm:text-4xl font-bold text-purple-700 mb-2">
              {{ qwen3Data.trainingInfo.modelSizes.join(' / ') }}
            </div>
            <div class="text-gray-600">
              模型尺寸
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
  name: 'Hero',
  setup() {
    return {
      qwen3Data
    };
  }
};
</script>