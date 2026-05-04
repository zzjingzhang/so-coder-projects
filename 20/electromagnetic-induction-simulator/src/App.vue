<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-slate-800/80 backdrop-blur-md border-b border-indigo-500/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="text-3xl">⚡</div>
            <div>
              <h1 class="text-xl font-bold text-indigo-300">电磁感应模拟器</h1>
              <p class="text-xs text-slate-400">Electromagnetic Induction Simulator</p>
            </div>
          </div>
          <nav class="flex gap-2">
            <router-link
              to="/simulation"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
              :class="isActiveRoute('/simulation') 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'"
            >
              <span>🧲</span>
              <span>模拟实验</span>
            </router-link>
            <router-link
              to="/quiz"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
              :class="isActiveRoute('/quiz') 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'"
            >
              <span>📝</span>
              <span>知识测验</span>
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      <router-view />
    </main>

    <footer class="bg-slate-800/60 border-t border-indigo-500/20 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p class="text-center text-sm text-slate-400">
          基于法拉第电磁感应定律和楞次定律开发 | 交互式学习工具
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isActiveRoute = (path) => {
  return route.path === path
}
</script>
