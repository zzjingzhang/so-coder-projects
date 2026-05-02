<script setup lang="ts">
import { Card } from 'ant-design-vue'
</script>

<template>
  <div class="min-h-full p-6 md:p-10">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <div class="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg">
          👨‍💻
        </div>
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-4">
          Hi, I'm <span class="text-blue-400">Developer</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-400 mb-8">
          Full Stack Developer | Vue.js Enthusiast | TypeScript Lover
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <span class="px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm">Vue.js</span>
          <span class="px-4 py-2 bg-green-900/50 text-green-300 rounded-full text-sm">TypeScript</span>
          <span class="px-4 py-2 bg-yellow-900/50 text-yellow-300 rounded-full text-sm">Node.js</span>
          <span class="px-4 py-2 bg-purple-900/50 text-purple-300 rounded-full text-sm">Tailwind CSS</span>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <Card class="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all cursor-pointer">
          <div class="text-center py-4">
            <div class="text-4xl mb-3">📁</div>
            <h3 class="text-lg font-semibold text-white mb-2">Explore Files</h3>
            <p class="text-sm text-gray-400">Browse my portfolio like an IDE. Click on files in the sidebar to explore.</p>
          </div>
        </Card>
        <Card class="bg-gray-800/50 border-gray-700 hover:border-green-500 transition-all cursor-pointer">
          <div class="text-center py-4">
            <div class="text-4xl mb-3">⌨️</div>
            <h3 class="text-lg font-semibold text-white mb-2">Use Terminal</h3>
            <p class="text-sm text-gray-400">Try commands like <code class="bg-gray-700 px-1 rounded">ls</code>, <code class="bg-gray-700 px-1 rounded">cd</code>, <code class="bg-gray-700 px-1 rounded">help</code>.</p>
          </div>
        </Card>
        <Card class="bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-all cursor-pointer">
          <div class="text-center py-4">
            <div class="text-4xl mb-3">🔧</div>
            <h3 class="text-lg font-semibold text-white mb-2">LAG Project</h3>
            <p class="text-sm text-gray-400">Check out the Lexical Analyzer Generator - write rules, generate lexers!</p>
          </div>
        </Card>
      </div>

      <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-white mb-4">📋 Quick Navigation</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <span class="text-2xl mr-2">📄</span>
            <span class="text-ide-text">Resume</span>
          </div>
          <div class="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <span class="text-2xl mr-2">💪</span>
            <span class="text-ide-text">Skills</span>
          </div>
          <div class="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <span class="text-2xl mr-2">🚀</span>
            <span class="text-ide-text">Projects</span>
          </div>
          <div class="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <span class="text-2xl mr-2">📧</span>
            <span class="text-ide-text">Contact</span>
          </div>
          <div class="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <span class="text-2xl mr-2">⚙️</span>
            <span class="text-ide-text">LAG</span>
          </div>
          <div class="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors">
            <span class="text-2xl mr-2">💻</span>
            <span class="text-ide-text">Terminal</span>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center text-gray-500 text-sm">
        <p>This portfolio is designed like an IDE. Navigate using the file explorer, tabs, or terminal commands.</p>
        <p class="mt-2">Built with ❤️ using Vue 3 + TypeScript + Tailwind CSS</p>
      </div>
    </div>
  </div>
</template>
