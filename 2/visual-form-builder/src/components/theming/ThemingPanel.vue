<template>
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-4">主题设置</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">全局字体</label>
        <input
          type="text"
          v-model="localTheming.fontFamily"
          class="w-full px-3 py-2 border rounded-md"
          @input="updateTheming"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">字体颜色</label>
        <div class="flex gap-2">
          <input
            type="color"
            :value="hexToRgb(localTheming.fontColor)"
            @input="updateColorFromPicker('fontColor', $event)"
            class="w-12 h-9 rounded"
          />
          <input
            type="text"
            v-model="localTheming.fontColor"
            class="flex-1 px-3 py-2 border rounded-md"
            @input="updateTheming"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">字体大小</label>
        <input
          type="text"
          v-model="localTheming.fontSize"
          class="w-full px-3 py-2 border rounded-md"
          @input="updateTheming"
        />
      </div>
      <div class="border-t pt-4 mt-4">
        <h4 class="font-medium mb-3">标签样式</h4>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">标签颜色</label>
            <div class="flex gap-2">
              <input
                type="color"
                :value="hexToRgb(localTheming.labelColor)"
                @input="updateColorFromPicker('labelColor', $event)"
                class="w-12 h-9 rounded"
              />
              <input
                type="text"
                v-model="localTheming.labelColor"
                class="flex-1 px-3 py-2 border rounded-md"
                @input="updateTheming"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">标签字号</label>
            <input
              type="text"
              v-model="localTheming.labelFontSize"
              class="w-full px-3 py-2 border rounded-md"
              @input="updateTheming"
            />
          </div>
        </div>
      </div>
      <div class="border-t pt-4 mt-4">
        <h4 class="font-medium mb-3">输入框样式</h4>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">边框颜色</label>
            <div class="flex gap-2">
              <input
                type="color"
                :value="hexToRgb(localTheming.inputBorderColor)"
                @input="updateColorFromPicker('inputBorderColor', $event)"
                class="w-12 h-9 rounded"
              />
              <input
                type="text"
                v-model="localTheming.inputBorderColor"
                class="flex-1 px-3 py-2 border rounded-md"
                @input="updateTheming"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">圆角</label>
            <input
              type="text"
              v-model="localTheming.inputBorderRadius"
              class="w-full px-3 py-2 border rounded-md"
              @input="updateTheming"
            />
          </div>
        </div>
      </div>
      <div class="border-t pt-4 mt-4">
        <h4 class="font-medium mb-3">按钮样式</h4>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">背景颜色</label>
            <div class="flex gap-2">
              <input
                type="color"
                :value="hexToRgb(localTheming.buttonBgColor)"
                @input="updateColorFromPicker('buttonBgColor', $event)"
                class="w-12 h-9 rounded"
              />
              <input
                type="text"
                v-model="localTheming.buttonBgColor"
                class="flex-1 px-3 py-2 border rounded-md"
                @input="updateTheming"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">文字颜色</label>
            <div class="flex gap-2">
              <input
                type="color"
                :value="hexToRgb(localTheming.buttonTextColor)"
                @input="updateColorFromPicker('buttonTextColor', $event)"
                class="w-12 h-9 rounded"
              />
              <input
                type="text"
                v-model="localTheming.buttonTextColor"
                class="flex-1 px-3 py-2 border rounded-md"
                @input="updateTheming"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useFormBuilderStore } from '@/stores/form-builder'

const store = useFormBuilderStore()
const localTheming = ref({ ...store.themingVars })

onMounted(() => {
  store.applyTheming()
})

watch(() => store.themingVars, (newVal) => {
  localTheming.value = { ...newVal }
}, { deep: true })

function updateTheming() {
  store.updateThemingVars(localTheming.value)
  store.applyTheming()
}

function updateColorFromPicker(key, event) {
  localTheming.value[key] = rgbToHex(event.target.value)
  updateTheming()
}

function hexToRgb(hex) {
  if (!hex) return '#000000'
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgb(${r}, ${g}, ${b})`
}

function rgbToHex(rgb) {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (!match) return '#000000'
  const r = parseInt(match[1]).toString(16).padStart(2, '0')
  const g = parseInt(match[2]).toString(16).padStart(2, '0')
  const b = parseInt(match[3]).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}
</script>
