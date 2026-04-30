<template>
  <FormFieldWrapper :isActive="isActive" :isPreview="isPreview" :isUnique="isUnique" @clone="$emit('clone')" @remove="$emit('remove')">
    <div>
      <label class="block font-medium mb-3" :style="{ color: 'var(--theme-label-color)', fontSize: 'var(--theme-label-font-size)', marginBottom: 'var(--theme-label-margin-bottom)' }">
        {{ field.label }}
        <span v-if="field.required" class="text-red-500 ml-1">*</span>
      </label>
      <div class="flex gap-1">
        <button
          v-for="i in field.max"
          :key="i"
          class="text-2xl"
          :style="{ color: i <= currentRating ? '#fbbf24' : '#d1d5db' }"
        >
          ★
        </button>
      </div>
      <p v-if="field.helpText" class="mt-2 text-sm" :style="{ color: 'var(--theme-help-text-color)', fontSize: 'var(--theme-help-text-font-size)', marginTop: 'var(--theme-help-text-margin-top)' }">
        {{ field.helpText }}
      </p>
    </div>
  </FormFieldWrapper>
</template>

<script setup>
import { ref } from 'vue'
import FormFieldWrapper from './FormFieldWrapper.vue'

const currentRating = ref(0)

defineProps({
  field: Object,
  isActive: Boolean,
  isPreview: Boolean,
  isUnique: Boolean
})
defineEmits(['clone', 'remove'])
</script>
