<template>
  <div class="p-4">
    <h3 class="text-lg font-semibold mb-4">属性设置</h3>
    <div v-if="!store.activeForm" class="text-gray-500 text-center py-8">
      请选择一个表单元素进行编辑
    </div>
    <div v-else class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">标签</label>
        <input
          type="text"
          v-model="localField.label"
          class="w-full px-3 py-2 border rounded-md"
          @input="updateField"
        />
      </div>
      <div v-if="localField.placeholder !== undefined">
        <label class="block text-sm font-medium mb-1">占位符</label>
        <input
          type="text"
          v-model="localField.placeholder"
          class="w-full px-3 py-2 border rounded-md"
          @input="updateField"
        />
      </div>
      <div v-if="localField.required !== undefined" class="flex items-center gap-2">
        <input type="checkbox" v-model="localField.required" @change="updateField" id="required" />
        <label for="required" class="text-sm font-medium">必填</label>
      </div>
      <div v-if="localField.helpText !== undefined">
        <label class="block text-sm font-medium mb-1">帮助文本</label>
        <input
          type="text"
          v-model="localField.helpText"
          class="w-full px-3 py-2 border rounded-md"
          @input="updateField"
        />
      </div>
      <div v-if="localField.options" class="space-y-3">
        <label class="block text-sm font-medium">选项</label>
        <div v-for="(opt, index) in localField.options" :key="index" class="flex gap-2">
          <input
            type="text"
            v-model="localField.options[index].label"
            class="flex-1 px-3 py-2 border rounded-md"
            placeholder="标签"
            @input="updateField"
          />
          <input
            type="text"
            v-model="localField.options[index].value"
            class="flex-1 px-3 py-2 border rounded-md"
            placeholder="值"
            @input="updateField"
          />
          <button @click="removeOption(index)" class="px-2 text-red-500">×</button>
        </div>
        <button @click="addOption" class="text-blue-500 text-sm">+ 添加选项</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFormBuilderStore } from '@/stores/form-builder'

const store = useFormBuilderStore()
const localField = ref({})

watch(() => store.activeForm, (newVal) => {
  if (newVal) {
    localField.value = JSON.parse(JSON.stringify(newVal))
  }
}, { immediate: true })

function updateField() {
  if (store.activeForm) {
    store.updateForm(store.activeForm.id, localField.value)
  }
}

function addOption() {
  if (!localField.value.options) {
    localField.value.options = []
  }
  localField.value.options.push({ label: '新选项', value: `option${Date.now()}` })
  updateField()
}

function removeOption(index) {
  localField.value.options.splice(index, 1)
  updateField()
}
</script>
