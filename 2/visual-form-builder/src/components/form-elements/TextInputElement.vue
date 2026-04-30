<template>
  <FormFieldWrapper :isActive="isActive" :isPreview="isPreview" :isUnique="isUnique" @clone="$emit('clone')" @remove="$emit('remove')">
    <div>
      <label class="block font-medium mb-2" :style="{ color: 'var(--theme-label-color)', fontSize: 'var(--theme-label-font-size)', marginBottom: 'var(--theme-label-margin-bottom)' }">
        {{ field.label }}
        <span v-if="field.required" class="text-red-500 ml-1">*</span>
      </label>
      <input
        type="text"
        :placeholder="field.placeholder"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
        :style="{
          borderColor: 'var(--theme-input-border-color)',
          borderRadius: 'var(--theme-input-border-radius)',
          color: 'var(--theme-font-color)',
          fontSize: 'var(--theme-font-size)'
        }"
      />
      <p v-if="field.helpText" class="mt-1 text-sm" :style="{ color: 'var(--theme-help-text-color)', fontSize: 'var(--theme-help-text-font-size)', marginTop: 'var(--theme-help-text-margin-top)' }">
        {{ field.helpText }}
      </p>
    </div>
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
