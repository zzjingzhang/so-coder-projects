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
            class="sr-only peer"
          />
          <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:ease-in-out after:duration-300 after:scale-100 after:hover:scale-110 after:checked:scale-110 peer-checked:bg-purple-700"></div>
        </label>
      </div>
    </div>
    
    <div class="mt-12 text-center">
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
/* 自定义开关动画效果 */
input[type="checkbox"] + div {
  position: relative;
  overflow: hidden;
}

input[type="checkbox"] + div::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: white;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  transition: all 0.3s ease-in-out;
  transform: translateX(0) scale(1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 滑块动画：在过渡过程中放大 */
input[type="checkbox"] + div::after {
  transition: transform 0.3s ease-in-out, left 0.3s ease-in-out;
}

input[type="checkbox"]:checked + div {
  background-color: #8e44ad;
}

input[type="checkbox"]:checked + div::after {
  left: calc(100% - 26px);
  transform: scale(1.1);
}

/* 悬停时的放大效果 */
input[type="checkbox"] + div:hover::after,
input[type="checkbox"]:focus + div::after {
  transform: scale(1.1);
}

input[type="checkbox"]:checked + div:hover::after,
input[type="checkbox"]:checked:focus + div::after {
  transform: scale(1.15);
}

/* 过渡过程中放大的动画 */
input[type="checkbox"]:active + div::after {
  transform: scale(1.2);
}
</style>
