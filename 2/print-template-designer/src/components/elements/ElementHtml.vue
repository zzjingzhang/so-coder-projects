<template>
  <div
    class="element-html"
    v-html="element.content"
  ></div>
</template>

<script setup lang="ts">
import type { PrintElement } from '../../types'

defineProps<{
  element: PrintElement
}>()
</script>

<style scoped>
.element-html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
