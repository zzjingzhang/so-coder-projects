<template>
  <div class="element-image">
    <img
      v-if="element.content"
      :src="element.content"
      alt="image"
    />
    <div
      v-else
      class="image-placeholder"
    >
      <v-icon size="48">mdi-image</v-icon>
      <span class="text-xs text-grey-500">点击上传图片</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PrintElement } from '../../types'

defineProps<{
  element: PrintElement
}>()
</script>

<style scoped>
.element-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.element-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px dashed #ccc;
  border-radius: 4px;
  color: #999;
}
</style>
