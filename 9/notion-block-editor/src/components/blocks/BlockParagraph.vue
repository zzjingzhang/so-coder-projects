<template>
  <div class="block-paragraph">
    <div
      ref="contentRef"
      contenteditable="true"
      class="text-gray-700 outline-none min-h-[1.5rem] leading-relaxed"
      data-placeholder="输入 / 打开命令菜单..."
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
}>()

const emit = defineEmits<{
  'update:modelValue': [block: Block]
  'update': [block: Block]
  'delete': []
  'add-block-after': []
  'open-add-menu': []
}>()

const contentRef = ref<HTMLElement | null>(null)

function updateContent() {
  if (contentRef.value && contentRef.value.innerText !== props.modelValue.content) {
    contentRef.value.innerText = props.modelValue.content
  }
}

function handleInput() {
  if (!contentRef.value) return
  const text = contentRef.value.innerText
  
  if (text === '/') {
    emit('open-add-menu')
    return
  }
  
  const newBlock = {
    ...props.modelValue,
    content: text
  }
  emit('update:modelValue', newBlock)
  emit('update', newBlock)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('add-block-after')
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
