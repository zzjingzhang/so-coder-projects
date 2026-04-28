<script setup lang="ts">
import { ref, computed } from 'vue'

const options = [
  { key: 'good', label: 'Good', description: '高质量，专业水准' },
  { key: 'cheap', label: 'Cheap', description: '价格实惠，成本低' },
  { key: 'fast', label: 'Fast', description: '快速交付，高效完成' }
]

const selected = ref<Record<string, boolean>>({
  good: false,
  cheap: false,
  fast: false
})

const lastSelected = ref<string | null>(null)

const selectedOptions = computed(() => {
  return Object.entries(selected.value)
    .filter(([_, isSelected]) => isSelected)
    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
})

const handleToggle = (key: string) => {
  const isCurrentlySelected = selected.value[key]
  
  if (!isCurrentlySelected) {
    const selectedCount = Object.values(selected.value).filter(Boolean).length
    
    if (selectedCount >= 2) {
      if (lastSelected.value) {
        selected.value[lastSelected.value] = false
      }
    }
    
    lastSelected.value = key
  }
  
  selected.value[key] = !isCurrentlySelected
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-8 bg-gray-50">
    <h1 class="text-4xl font-medium text-gray-800 mb-12 text-center">
      How do you want your project to be?
    </h1>
    
    <div class="w-full max-w-md space-y-6">
      <div 
        v-for="option in options" 
        :key="option.key"
        class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      >
        <div class="flex flex-col">
          <span class="text-xl font-medium text-gray-700">{{ option.label }}</span>
          <span class="text-sm text-gray-500">{{ option.description }}</span>
        </div>
        
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="selected[option.key]"
            @change="handleToggle(option.key)"
            class="sr-only"
          />
          <div 
            class="switch-track relative w-14 h-7 rounded-full transition-colors duration-300"
            :class="selected[option.key] ? 'bg-purple-700' : 'bg-gray-300'"
          >
            <div 
              class="switch-thumb absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out"
              :class="{
                'translate-x-7': selected[option.key],
                'translate-x-1': !selected[option.key]
              }"
            ></div>
          </div>
        </label>
      </div>
    </div>
    
    <!-- 固定高度的容器，防止页面抖动 -->
    <div class="mt-12 text-center h-20 flex flex-col justify-center items-center">
      <p class="text-gray-600 mb-4">
        当前选择：
        <span v-if="selectedOptions.length === 0" class="text-gray-500">
          尚未选择任何选项
        </span>
        <span v-else>
          <span 
            v-for="optionLabel in selectedOptions" 
            :key="optionLabel"
            class="inline-block px-3 py-1 mx-1 rounded-full text-sm font-medium text-white bg-purple-700"
          >
            {{ optionLabel }}
          </span>
        </span>
      </p>
      <p class="text-sm text-gray-500">
        提示：你只能同时选择两个选项。当选择第三个时，最早选中的将会被取消。
      </p>
    </div>
  </div>
</template>

<style scoped>
/* 开关轨道样式 */
.switch-track {
  position: relative;
  overflow: visible;
}

/* 滑块样式 */
.switch-thumb {
  position: absolute;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out, margin 0.3s ease-in-out;
  transform-origin: center;
}

/* 悬停时的放大效果 - 滑块轻微放大，但保持在轨道内 */
.switch-track:hover .switch-thumb,
.switch-track:focus-within .switch-thumb {
  width: 22px;
  height: 22px;
  margin-top: -1px;
  margin-left: -1px;
}

/* 选中状态悬停时的放大效果 - 调整位置 */
.switch-track:hover .switch-thumb.translate-x-7,
.switch-track:focus-within .switch-thumb.translate-x-7 {
  transform: translateX(1.625rem); /* 26px */
}

/* 点击时的放大效果 */
.switch-track:active .switch-thumb {
  width: 24px;
  height: 24px;
  margin-top: -2px;
  margin-left: -2px;
}

/* 选中状态点击时的放大效果 - 调整位置 */
.switch-track:active .switch-thumb.translate-x-7 {
  transform: translateX(1.5rem); /* 24px */
}
</style>
