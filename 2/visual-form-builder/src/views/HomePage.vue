<template>
  <DefaultLayout>
    <div class="h-full flex">
      <aside class="w-64 border-r bg-white overflow-y-auto">
        <ElementsPanel />
      </aside>
      <main class="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-xl shadow-sm p-8 min-h-[400px]">
            <div
              class="border-2 border-dashed border-gray-200 rounded-lg min-h-[200px] p-4"
              @dragover.prevent
              @drop="handleDrop"
            >
              <div v-if="store.forms.length === 0" class="p-8 text-center text-gray-400">
                拖拽元素到此处开始构建表单
              </div>
              <draggable
                v-else
                v-model="store.forms"
                item-key="id"
                ghost-class="opacity-50"
                class="space-y-2"
              >
                <template #item="{ element }">
                  <div @click="store.setActiveForm(element)">
                    <FormElementRenderer
                      :field="element"
                      :isActive="store.activeForm?.id === element.id"
                      :isPreview="false"
                      @clone="store.cloneForm(element.id)"
                      @remove="store.removeForm(element.id)"
                    />
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </main>
      <aside class="w-80 border-l bg-white overflow-y-auto">
        <div class="border-b flex">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="store.activeTabForFields = tab.key"
            class="flex-1 py-3 text-sm font-medium"
            :class="store.activeTabForFields === tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="overflow-y-auto">
          <ElementsPanel v-if="store.activeTabForFields === 'Elements'" />
          <PropertiesPanel v-else-if="store.activeTabForFields === 'Properties'" />
          <ThemingPanel v-else-if="store.activeTabForFields === 'Styles'" />
        </div>
      </aside>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { useFormBuilderStore } from '@/stores/form-builder'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import ElementsPanel from '@/components/layout/ElementsPanel.vue'
import PropertiesPanel from '@/components/properties/PropertiesPanel.vue'
import ThemingPanel from '@/components/theming/ThemingPanel.vue'
import FormElementRenderer from '@/components/form-elements/FormElementRenderer.vue'
import draggable from 'vuedraggable'

const store = useFormBuilderStore()

const tabs = [
  { key: 'Elements', label: '元素' },
  { key: 'Properties', label: '属性' },
  { key: 'Styles', label: '样式' }
]

function handleDrop(event) {
  const elementType = event.dataTransfer.getData('elementType')
  if (elementType) {
    store.addForm(elementType)
  }
}
</script>
