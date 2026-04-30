<template>
  <FormFieldWrapper :isActive="isActive" :isPreview="isPreview" :isUnique="isUnique" @clone="$emit('clone')" @remove="$emit('remove')">
    <div>
      <label class="block font-medium mb-3" :style="{ color: 'var(--theme-label-color)', fontSize: 'var(--theme-label-font-size)', marginBottom: 'var(--theme-label-margin-bottom)' }">
        {{ field.label }}
        <span v-if="field.required" class="text-red-500 ml-1">*</span>
      </label>
      <div class="space-y-2">
        <label v-for="opt in field.options" :key="opt.value" class="flex items-center">
        <input type="radio" :value="opt.value" name="radio-group" class="mr-2" />
        <span>{{ opt.label }}</span>
      </label>
      </div>
      <p v-if="field.helpText" class="mt-2 text-sm" :style="{ color: 'var(--theme-help-text-color)', fontSize: 'var(--theme-help-text-font-size)', marginTop: 'var(--theme-help-text-margin-top)' }">
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
