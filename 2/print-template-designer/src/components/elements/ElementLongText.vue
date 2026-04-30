<template>
  <div
    class="element-long-text"
    :style="textStyle"
  >
    {{ element.content }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PrintElement } from '../../types'

const props = defineProps<{
  element: PrintElement
}>()

const textStyle = computed(() => ({
  fontSize: `${props.element.fontSize}px`,
  fontFamily: props.element.fontFamily,
  fontWeight: props.element.fontWeight,
  color: props.element.color,
  textAlign: props.element.textAlign,
  lineHeight: '1.4',
  whiteSpace: 'pre-wrap' as const,
  overflowWrap: 'break-word' as const,
}))
</script>

<style scoped>
.element-long-text {
  width: 100%;
  height: 100%;
  padding: 4px;
  overflow: hidden;
}
</style>
