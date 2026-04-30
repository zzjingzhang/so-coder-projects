<template>
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-4">元素库</h3>
    <div class="space-y-2">
      <div
        v-for="(element, key) in FORM_ELEMENTS"
        :key="key"
        class="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-3"
        :class="{
          'opacity-50 cursor-not-allowed': isElementDisabled(key),
          'cursor-grab': !isElementDisabled(key)
        }"
        :draggable="!isElementDisabled(key)"
        @dragstart="handleDragStart($event, key)"
      >
        <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white">
          <span class="text-xs">{{ element.label.charAt(0) }}</span>
        </div>
        <span class="font-medium">{{ element.label }}</span>
        <span v-if="element.isUnique" class="text-xs text-gray-500 ml-auto">唯一</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FORM_ELEMENTS } from '@/config/form-elements'
import { useFormBuilderStore } from '@/stores/form-builder'

const store = useFormBuilderStore()

function isElementDisabled(type) {
  const element = FORM_ELEMENTS[type]
  if (element.isUnique) {
    return store.forms.some(f => f.type === type)
  }
  return false
}

function handleDragStart(event, elementType) {
  event.dataTransfer.setData('elementType', elementType)
  event.dataTransfer.effectAllowed = 'copy'
}
</script>
