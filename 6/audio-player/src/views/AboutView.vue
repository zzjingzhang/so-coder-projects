<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-8">
    <div class="max-w-2xl w-full">
      <n-card bordered class="bg-slate-800 border-slate-700">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-white">音频播放器</h1>
                <p class="text-sm text-slate-400">自定义音乐播放器</p>
              </div>
            </div>
            <n-button @click="goBack">返回</n-button>
          </div>
        </template>

        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-semibold text-white mb-3">功能特性</h2>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-slate-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>播放/暂停控制</span>
              </li>
              <li class="flex items-start gap-2 text-slate-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>上一首/下一首曲目切换</span>
              </li>
              <li class="flex items-start gap-2 text-slate-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>可拖动的进度条</span>
              </li>
              <li class="flex items-start gap-2 text-slate-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>音量控制和静音</span>
              </li>
              <li class="flex items-start gap-2 text-slate-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>动态播放列表侧边栏</span>
              </li>
              <li class="flex items-start gap-2 text-slate-300">
                <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>随机播放和循环播放（单曲/全部）</span>
              </li>
            </ul>
          </div>

          <n-divider class="border-slate-700" />

          <div>
            <h2 class="text-lg font-semibold text-white mb-3">技术栈</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-700/50 rounded-lg p-4">
                <h3 class="text-primary-400 font-medium mb-1">前端框架</h3>
                <p class="text-slate-300 text-sm">Vue 3</p>
              </div>
              <div class="bg-slate-700/50 rounded-lg p-4">
                <h3 class="text-primary-400 font-medium mb-1">构建工具</h3>
                <p class="text-slate-300 text-sm">Vite</p>
              </div>
              <div class="bg-slate-700/50 rounded-lg p-4">
                <h3 class="text-primary-400 font-medium mb-1">样式框架</h3>
                <p class="text-slate-300 text-sm">Tailwind CSS</p>
              </div>
              <div class="bg-slate-700/50 rounded-lg p-4">
                <h3 class="text-primary-400 font-medium mb-1">UI 组件库</h3>
                <p class="text-slate-300 text-sm">Naive UI</p>
              </div>
              <div class="bg-slate-700/50 rounded-lg p-4">
                <h3 class="text-primary-400 font-medium mb-1">路由管理</h3>
                <p class="text-slate-300 text-sm">Vue Router 4</p>
              </div>
              <div class="bg-slate-700/50 rounded-lg p-4">
                <h3 class="text-primary-400 font-medium mb-1">编程语言</h3>
                <p class="text-slate-300 text-sm">JavaScript</p>
              </div>
            </div>
          </div>

          <n-divider class="border-slate-700" />

          <div>
            <h2 class="text-lg font-semibold text-white mb-3">使用说明</h2>
            <div class="bg-slate-700/50 rounded-lg p-4">
              <p class="text-slate-300 text-sm leading-relaxed">
                左侧边栏显示当前播放列表，点击任意曲目即可播放。底部控制栏提供播放/暂停、上一首/下一首、音量控制等功能。支持随机播放和循环播放模式切换。
              </p>
            </div>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>
