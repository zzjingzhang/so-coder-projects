<template>
  <div
    class="form-field-wrapper relative mb-4 p-4 rounded-lg border-2 transition-all"
    :class="{
      'border-blue-500 bg-blue-50': isActive,
      'border-transparent hover:border-gray-300': !isActive
    }"
  >
    <div v-if="!isPreview && isActive" class="absolute top-2 right-2 flex gap-2">
      <button
        v-if="!isUnique"
        @click.stop="$emit('clone')"
        class="p-1.5 bg-gray-200 hover:bg-gray-300 rounded text-gray-600"
        title="复制"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button
        @click.stop="$emit('remove')"
        class="p-1.5 bg-red-100 hover:bg-red-200 rounded text-red-600"
        title="删除"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  isActive: Boolean,
  isPreview: Boolean,
  isUnique: Boolean
})
defineEmits(['clone', 'remove'])
</script>
