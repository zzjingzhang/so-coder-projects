<template>
  <component
    :is="componentMap[field.type]"
    :field="field"
    :isActive="isActive"
    :isPreview="isPreview"
    :isUnique="isUnique"
    @clone="$emit('clone')"
    @remove="$emit('remove')"
  />
</template>

<script setup>
import { computed } from 'vue'
import TextInputElement from './TextInputElement.vue'
import TextareaElement from './TextareaElement.vue'
import NumberInputElement from './NumberInputElement.vue'
import SelectElement from './SelectElement.vue'
import RadioElement from './RadioElement.vue'
import CheckboxElement from './CheckboxElement.vue'
import DateTimeElement from './DateTimeElement.vue'
import RatingElement from './RatingElement.vue'
import ButtonElement from './ButtonElement.vue'
import TextEditorElement from './TextEditorElement.vue'
import { FORM_ELEMENTS } from '@/config/form-elements'

const componentMap = {
  TextInput: TextInputElement,
  Textarea: TextareaElement,
  NumberInput: NumberInputElement,
  Select: SelectElement,
  Radio: RadioElement,
  Checkbox: CheckboxElement,
  DateTime: DateTimeElement,
  Rating: RatingElement,
  Button: ButtonElement,
  TextEditor: TextEditorElement
}

const props = defineProps({
  field: Object,
  isActive: Boolean,
  isPreview: Boolean
})
defineEmits(['clone', 'remove'])

const isUnique = computed(() => {
  const config = FORM_ELEMENTS[props.field?.type]
  return config?.isUnique || false
})
</script>
