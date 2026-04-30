<template>
  <div
    class="element-text"
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
  lineHeight: '1.2',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}))
</script>

<style scoped>
.element-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 2px;
}
</style>
