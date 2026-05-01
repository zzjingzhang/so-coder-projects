<template>
  <div class="block-heading">
    <div
      v-if="level === 1"
      :contenteditable="true"
      class="text-3xl font-bold text-gray-900 outline-none min-h-[2.5rem] leading-tight"
      :data-placeholder="placeholder"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
    >
    </div>
    <div
      v-else-if="level === 2"
      :contenteditable="true"
      class="text-2xl font-semibold text-gray-900 outline-none min-h-[2rem] leading-tight"
      :data-placeholder="placeholder"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
    >
    </div>
    <div
      v-else-if="level === 3"
      :contenteditable="true"
      class="text-xl font-medium text-gray-800 outline-none min-h-[1.75rem] leading-tight"
      :data-placeholder="placeholder"
      @input="handleInput"
      @keydown="handleKeydown"
      @blur="handleBlur"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import type { Block } from '@/types'

const props = defineProps<{
  modelValue: Block
  level: 1 | 2 | 3
}>()

const emit = defineEmits<{
  'update:modelValue': [block: Block]
  'update': [block: Block]
  'delete': []
}>()

const contentRef = ref<HTMLElement | null>(null)
const placeholder = props.level === 1 ? '一级标题' : props.level === 2 ? '二级标题' : '三级标题'

function updateContent() {
  if (contentRef.value && contentRef.value.innerText !== props.modelValue.content) {
    contentRef.value.innerText = props.modelValue.content
  }
}

function handleInput() {
  if (!contentRef.value) return
  const newBlock = {
    ...props.modelValue,
    content: contentRef.value.innerText
  }
  emit('update:modelValue', newBlock)
  emit('update', newBlock)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('delete')
  }
  if (e.key === 'Backspace') {
    const text = contentRef.value?.innerText || ''
    if (text.length === 0) {
      e.preventDefault()
      emit('delete')
    }
  }
}

function handleBlur() {
  if (!contentRef.value) return
  const newBlock = {
    ...props.modelValue,
    content: contentRef.value.innerText
  }
  emit('update:modelValue', newBlock)
  emit('update', newBlock)
}

watch(() => props.modelValue.content, () => {
  updateContent()
})

onMounted(() => {
  nextTick(() => {
    updateContent()
  })
})
</script>

<style scoped>
[contenteditable]:empty:before {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
}

[contenteditable]:focus {
  color: #111827;
}
</style>
