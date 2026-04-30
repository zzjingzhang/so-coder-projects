<template>
  <FormFieldWrapper :isActive="isActive" :isPreview="isPreview" :isUnique="isUnique" @clone="$emit('clone')" @remove="$emit('remove')">
    <button
      class="px-6 py-2 rounded-md font-medium"
      :style="{
        backgroundColor: 'var(--theme-button-bg-color)',
        borderColor: 'var(--theme-button-border-color)',
        color: 'var(--theme-button-text-color)',
        borderRadius: 'var(--theme-input-border-radius)'
      }"
    >
      {{ field.label }}
    </button>
  </FormFieldWrapper>
</template>

<script setup>
import FormFieldWrapper from './FormFieldWrapper.vue'

defineProps({
  field: Object,
  isActive: Boolean,
  isPreview: Boolean,
  isUnique: Boolean
})
defineEmits(['clone', 'remove'])
</script>
