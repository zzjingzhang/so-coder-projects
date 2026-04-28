<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[150] flex items-center justify-center p-4"
      >
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="handleClose"
        ></div>
        
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
          <button 
            @click="handleClose"
            class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            class="h-56 flex items-center justify-center"
            :class="project.bgClass"
          >
            <div class="text-8xl">{{ project.icon }}</div>
          </div>

          <div class="p-8">
            <div class="mb-6">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {{ project.title }}
              </h2>
              <div class="flex items-center gap-3">
                <span 
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                  :class="categoryConfig.bgColor"
                >
                  <span class="text-base">{{ categoryConfig.icon }}</span>
                  <span :class="categoryConfig.color">{{ categoryLabel }}</span>
                </span>
              </div>
            </div>

            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">项目描述</h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ project.description }}
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                {{ project.fullDescription || '这是一个精心设计的项目，使用现代化的技术栈构建。项目注重代码质量、用户体验和性能优化，遵循最佳实践和设计模式。' }}
              </p>
            </div>

            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">技术栈</h3>
              <div class="flex flex-wrap gap-2">
                <TechBadge 
                  v-for="tech in project.tags" 
                  :key="tech" 
                  :tech-name="tech"
                />
              </div>
            </div>

            <div class="mb-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">主要功能</h3>
              <ul class="space-y-3">
                <li 
                  v-for="(feature, index) in features" 
                  :key="index"
                  class="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <span class="text-green-500 mt-0.5">✓</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <a 
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
                查看源代码
              </a>
              <a 
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                在线预览
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue'
import TechBadge from './TechBadge.vue'

interface Project {
  id: number
  title: string
  description: string
  fullDescription?: string
  icon: string
  bgClass: string
  tags: string[]
  category: string
  github: string
  link: string
}

const props = defineProps<{
  isOpen: boolean
  project: Project
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const categoryMap: Record<string, { label: string; icon: string; bgColor: string; color: string }> = {
  frontend: { label: '前端', icon: '🎨', bgColor: 'bg-blue-100 dark:bg-blue-900/30', color: 'text-blue-600 dark:text-blue-400' },
  backend: { label: '后端', icon: '⚙️', bgColor: 'bg-green-100 dark:bg-green-900/30', color: 'text-green-600 dark:text-green-400' },
  fullstack: { label: '全栈', icon: '🚀', bgColor: 'bg-purple-100 dark:bg-purple-900/30', color: 'text-purple-600 dark:text-purple-400' },
  mobile: { label: '移动端', icon: '📱', bgColor: 'bg-orange-100 dark:bg-orange-900/30', color: 'text-orange-600 dark:text-orange-400' }
}

const categoryConfig = computed(() => {
  return categoryMap[props.project.category] || categoryMap.fullstack
})

const categoryLabel = computed(() => categoryConfig.value.label)

const features = computed(() => [
  '响应式设计，完美适配各种设备',
  '现代化技术栈，代码质量优秀',
  '性能优化，加载速度快',
  '完整的测试覆盖',
  '遵循最佳实践和设计模式'
])

const handleClose = () => {
  emit('close')
}

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  document.body.style.overflow = ''
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }
)

onUnmounted(() => {
  unlockScroll()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
