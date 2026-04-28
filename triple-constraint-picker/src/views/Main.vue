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
            class="switch-track relative rounded-full transition-colors duration-300"
            :class="selected[option.key] ? 'bg-purple-700' : 'bg-gray-300'"
          >
            <div 
              class="switch-thumb absolute rounded-full bg-white shadow-md"
              :class="{
                'thumb-checked': selected[option.key],
                'thumb-unchecked': !selected[option.key]
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
/* 开关轨道样式 - 固定尺寸 */
.switch-track {
  width: 56px;
  height: 28px;
  position: relative;
  overflow: visible;
}

/* 滑块样式 - 固定初始位置和尺寸 */
.switch-thumb {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 4px;
  left: 4px;
  transition: all 0.3s ease-in-out;
  transform-origin: center;
}

/* 未选中状态：滑块在左侧 */
.thumb-unchecked {
  left: 4px;
  width: 20px;
  height: 20px;
}

/* 选中状态：滑块移动到右侧 */
/* 轨道宽度 56px，滑块宽度 20px，两侧各留 4px 边距 */
/* 56px - 4px - 20px - 4px = 28px */
.thumb-checked {
  left: 32px; /* 4px + 28px */
  width: 20px;
  height: 20px;
}

/* 悬停时的放大效果 - 直接修改尺寸，并调整位置以保持在轨道内 */
/* 未选中状态悬停：滑块放大，但保持左侧对齐 */
.switch-track:hover .thumb-unchecked,
.switch-track:focus-within .thumb-unchecked {
  width: 22px;
  height: 22px;
  top: 3px; /* 调整 top 以保持垂直居中 */
  left: 3px; /* 调整 left 以保持左侧对齐 */
}

/* 选中状态悬停：滑块放大，但保持右侧对齐 */
/* 轨道宽度 56px，滑块放大到 22px，右侧留 4px */
/* left = 56px - 4px - 22px = 30px */
.switch-track:hover .thumb-checked,
.switch-track:focus-within .thumb-checked {
  width: 22px;
  height: 22px;
  top: 3px; /* 调整 top 以保持垂直居中 */
  left: 30px; /* 调整 left 以保持右侧对齐 */
}

/* 点击时的放大效果 */
/* 未选中状态点击 */
.switch-track:active .thumb-unchecked {
  width: 24px;
  height: 24px;
  top: 2px;
  left: 2px;
}

/* 选中状态点击：保持右侧对齐 */
/* left = 56px - 4px - 24px = 28px */
.switch-track:active .thumb-checked {
  width: 24px;
  height: 24px;
  top: 2px;
  left: 28px;
}
</style>
