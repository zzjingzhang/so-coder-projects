<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  visible: boolean
  videoUrl: string
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)

const closeModal = () => {
  emit('update:visible', false)
}

// 监听 visible 变化，控制视频播放/暂停
watch(() => props.visible, (newVal) => {
  if (newVal && videoRef.value) {
    videoRef.value.currentTime = 0
    videoRef.value.play()
    isPlaying.value = true
  } else if (!newVal && videoRef.value) {
    videoRef.value.pause()
    isPlaying.value = false
  }
})

// ESC 键关闭弹窗
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.visible) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

// 点击遮罩层关闭
const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    closeModal()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="video-modal">
      <div 
        v-if="visible"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click="handleOverlayClick"
      >
        <!-- 遮罩层 -->
        <div class="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
        
        <!-- 弹窗内容 -->
        <div class="relative z-10 w-full max-w-5xl">
          <!-- 关闭按钮 -->
          <button 
            @click="closeModal"
            class="absolute -top-12 right-0 text-white hover:text-accent transition-colors z-20"
          >
            <i class="pi pi-times text-3xl"></i>
          </button>
          
          <!-- 标题 -->
          <div class="text-center mb-4">
            <h2 class="text-white text-2xl font-bold">{{ title }}</h2>
          </div>
          
          <!-- 视频容器 -->
          <div class="relative bg-black rounded-xl overflow-hidden shadow-2xl aspect-video">
            <video 
              ref="videoRef"
              :src="videoUrl"
              class="w-full h-full object-contain"
              controls
              playsinline
            ></video>
          </div>
          
          <!-- 提示文字 -->
          <div class="mt-4 text-center text-gray-400 text-sm">
            <p>按 <span class="text-white">ESC</span> 键或点击外部关闭</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.video-modal-enter-active,
.video-modal-leave-active {
  transition: all 0.3s ease;
}

.video-modal-enter-from,
.video-modal-leave-to {
  opacity: 0;
}

.video-modal-enter-from .relative.z-10,
.video-modal-leave-to .relative.z-10 {
  transform: scale(0.9);
}
</style>
