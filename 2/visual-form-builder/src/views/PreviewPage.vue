<template>
  <DefaultLayout>
    <div class="h-full bg-gray-50 p-8 overflow-y-auto">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl shadow-sm p-8">
          <h2 class="text-2xl font-bold mb-6 text-center">表单预览</h2>
          <div v-if="store.forms.length === 0" class="p-8 text-center text-gray-400">
            暂无表单元素，请先在编辑页面添加
          </div>
          <div v-else>
            <FormElementRenderer
              v-for="field in store.forms"
              :key="field.id"
              :field="field"
              :isActive="false"
              :isPreview="true"
            />
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { useFormBuilderStore } from '@/stores/form-builder'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import FormElementRenderer from '@/components/form-elements/FormElementRenderer.vue'

const store = useFormBuilderStore()
</script>
