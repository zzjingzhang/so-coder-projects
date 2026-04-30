<template>
  <v-container fluid class="pa-2 h-full">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2" class="mb-2">
          <v-card-text class="py-2 px-4">
            <v-row align="center">
              <v-col cols="auto" class="d-flex align-center">
                <span class="text-sm mr-2 font-medium">纸张尺寸:</span>
                <v-select
                  density="compact"
                  :items="paperSizeOptions"
                  :model-value="currentPaperSizeName"
                  @update:model-value="changePaperSize"
                  style="width: 120px;"
                  hide-details
                ></v-select>
              </v-col>
              
              <template v-if="currentPaperSizeName === 'custom'">
                <v-col cols="auto" class="d-flex align-center">
                  <span class="text-sm mr-2 font-medium">宽度:</span>
                  <v-text-field
                    type="number"
                    density="compact"
                    :model-value="customWidth"
                    @update:model-value="updateCustomSize('width', Number($event))"
                    style="width: 80px;"
                    hide-details
                  ></v-text-field>
                  <span class="text-sm ml-1">px</span>
                </v-col>
                <v-col cols="auto" class="d-flex align-center">
                  <span class="text-sm mr-2 font-medium">高度:</span>
                  <v-text-field
                    type="number"
                    density="compact"
                    :model-value="customHeight"
                    @update:model-value="updateCustomSize('height', Number($event))"
                    style="width: 80px;"
                    hide-details
                  ></v-text-field>
                  <span class="text-sm ml-1">px</span>
                </v-col>
              </template>
              
              <v-col cols="auto">
                <v-btn
                  variant="outlined"
                  size="small"
                  @click="rotateLeft"
                >
                  <v-icon left>mdi-rotate-left</v-icon>
                  左转 90°
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  variant="outlined"
                  size="small"
                  @click="rotateRight"
                >
                  <v-icon left>mdi-rotate-right</v-icon>
                  右转 90°
                </v-btn>
              </v-col>
              
              <v-col cols="auto">
                <v-btn
                  color="error"
                  variant="outlined"
                  size="small"
                  @click="clearCanvas"
                >
                  <v-icon left>mdi-delete-sweep</v-icon>
                  清空画布
                </v-btn>
              </v-col>
              
              <v-spacer></v-spacer>
              
              <v-col cols="auto">
                <v-btn
                  color="primary"
                  variant="outlined"
                  size="small"
                  @click="handlePreview"
                >
                  <v-icon left>mdi-eye-outline</v-icon>
                  快速预览
                </v-btn>
              </v-col>
              
              <v-col cols="auto">
                <v-btn
                  color="success"
                  variant="outlined"
                  size="small"
                  @click="handlePrint"
                >
                  <v-icon left>mdi-printer</v-icon>
                  直接打印
                </v-btn>
              </v-col>
              
              <v-col cols="auto">
                <v-menu>
                  <template #activator="{ props }">
                    <v-btn
                      color="info"
                      variant="outlined"
                      size="small"
                      v-bind="props"
                    >
                      <v-icon left>mdi-export</v-icon>
                      导出
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="exportJSON">
                      <template #prepend>
                        <v-icon>mdi-code-json</v-icon>
                      </template>
                      <v-list-item-title>导出 JSON</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="exportHTML">
                      <template #prepend>
                        <v-icon>mdi-language-html5</v-icon>
                      </template>
                      <v-list-item-title>导出 HTML</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
              
              <v-col cols="auto">
                <v-menu>
                  <template #activator="{ props }">
                    <v-btn
                      color="warning"
                      variant="outlined"
                      size="small"
                      v-bind="props"
                    >
                      <v-icon left>mdi-import</v-icon>
                      导入
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="showImportDialog = true">
                      <template #prepend>
                        <v-icon>mdi-code-json</v-icon>
                      </template>
                      <v-list-item-title>从 JSON 导入</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row style="height: calc(100% - 80px);">
      <v-col cols="2">
        <ElementPanel
          :elements="elements"
          :selected-element="selectedElement"
          @element-drag-start="onElementDragStart"
          @select-element="onSelectElement"
          @delete-element="onDeleteElement"
          @copy-element="onCopyElement"
        />
      </v-col>
      
      <v-col cols="7">
        <Canvas
          ref="canvasRef"
          :elements="elements"
          :selected-element="selectedElement"
          :paper-size="paperSize"
          :rotation="rotation"
          @add-element="onAddElement"
          @select-element="onSelectElement"
          @update-element="onUpdateElement"
          @deselect-element="onDeselectElement"
        />
      </v-col>
      
      <v-col cols="3">
        <PropertyPanel
          :selected-element="selectedElement"
          @update-element="onUpdateElement"
          @delete-element="onDeleteElement"
        />
      </v-col>
    </v-row>
    
    <v-dialog
      v-model="showImportDialog"
      max-width="600"
      title="从 JSON 导入模板"
    >
      <v-card>
        <v-card-text>
          <v-textarea
            v-model="importJSONContent"
            label="粘贴 JSON 内容"
            rows="10"
            density="compact"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showImportDialog = false">取消</v-btn>
          <v-btn color="primary" @click="importFromJSON">导入</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'
import { PAPER_SIZES } from '../types'
import type { PaperSize, PrintElement, Template } from '../types'
import { cloneElement } from '../utils/elementUtils'
import { exportToJSON, downloadJSON, downloadHTML, generateHTML, openPrintPreview, printDirectly } from '../utils/exportUtils'
import ElementPanel from '../components/ElementPanel.vue'
import Canvas from '../components/Canvas.vue'
import PropertyPanel from '../components/PropertyPanel.vue'

const paperSizeOptions = [
  'A3', 'A4', 'A5', 'B3', 'B4', 'B5', 'custom'
]

const currentPaperSizeName = ref('A4')
const customWidth = ref(800)
const customHeight = ref(600)
const rotation = ref(0)
const elements = ref<PrintElement[]>([])
const selectedElement = ref<PrintElement | null>(null)
const canvasRef = shallowRef<InstanceType<typeof Canvas> | null>(null)

const showImportDialog = ref(false)
const importJSONContent = ref('')

const paperSize = computed<PaperSize>(() => {
  if (currentPaperSizeName.value === 'custom') {
    return {
      name: 'custom',
      width: customWidth.value,
      height: customHeight.value,
    }
  }
  return PAPER_SIZES[currentPaperSizeName.value] || PAPER_SIZES.A4
})

function changePaperSize(size: string): void {
  currentPaperSizeName.value = size
}

function updateCustomSize(dimension: 'width' | 'height', value: number): void {
  if (dimension === 'width') {
    customWidth.value = value
  } else {
    customHeight.value = value
  }
}

function rotateLeft(): void {
  rotation.value = (rotation.value - 90 + 360) % 360
}

function rotateRight(): void {
  rotation.value = (rotation.value + 90) % 360
}

function clearCanvas(): void {
  if (window.confirm('确定要清空画布吗？此操作不可撤销。')) {
    elements.value = []
    selectedElement.value = null
  }
}

function onElementDragStart(type: string): void {
  console.log('Drag start:', type)
}

function onAddElement(element: PrintElement): void {
  elements.value.push(element)
  selectedElement.value = element
}

function onSelectElement(element: PrintElement): void {
  selectedElement.value = element
}

function onDeselectElement(): void {
  selectedElement.value = null
}

function onUpdateElement(element: PrintElement): void {
  const index = elements.value.findIndex(e => e.id === element.id)
  if (index !== -1) {
    elements.value[index] = element
    if (selectedElement.value?.id === element.id) {
      selectedElement.value = element
    }
  }
}

function onDeleteElement(id: string): void {
  elements.value = elements.value.filter(e => e.id !== id)
  if (selectedElement.value?.id === id) {
    selectedElement.value = null
  }
}

function onCopyElement(element: PrintElement): void {
  const newElement = cloneElement(element)
  elements.value.push(newElement)
  selectedElement.value = newElement
}

function handlePreview(): void {
  openPrintPreview(elements.value, paperSize.value)
}

async function handlePrint(): Promise<void> {
  if (canvasRef.value?.paperRef) {
    await printDirectly(canvasRef.value.paperRef as HTMLElement)
  } else {
    openPrintPreview(elements.value, paperSize.value)
  }
}

function getTemplate(): Template {
  return {
    name: '未命名模板',
    paperSize: paperSize.value,
    rotation: rotation.value,
    elements: [...elements.value],
    createdAt: new Date().toISOString(),
  }
}

function exportJSON(): void {
  const template = getTemplate()
  const jsonContent = exportToJSON(template)
  downloadJSON(jsonContent, 'print-template')
}

function exportHTML(): void {
  const htmlContent = generateHTML(elements.value, paperSize.value)
  downloadHTML(htmlContent, 'print-template')
}

function importFromJSON(): void {
  try {
    const template: Template = JSON.parse(importJSONContent.value)
    
    if (template.paperSize) {
      const sizeName = template.paperSize.name
      if (sizeName === 'custom') {
        currentPaperSizeName.value = 'custom'
        customWidth.value = template.paperSize.width
        customHeight.value = template.paperSize.height
      } else if (PAPER_SIZES[sizeName]) {
        currentPaperSizeName.value = sizeName
      }
    }
    
    if (template.rotation !== undefined) {
      rotation.value = template.rotation
    }
    
    if (template.elements) {
      elements.value = template.elements
    }
    
    showImportDialog.value = false
    importJSONContent.value = ''
  } catch (error) {
    alert('JSON 格式错误，请检查内容')
    console.error(error)
  }
}
</script>

<style scoped>
</style>
