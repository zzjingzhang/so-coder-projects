<template>
  <v-card class="h-full" elevation="2">
    <v-toolbar color="grey lighten-2" flat>
      <v-toolbar-title class="text-sm font-bold">画布</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-refresh"
        size="small"
        variant="text"
        @click="resetView"
        title="重置视图"
      ></v-btn>
      <v-btn
        icon="mdi-magnify-plus"
        size="small"
        variant="text"
        @click="zoomIn"
        :disabled="scale >= 2"
      ></v-btn>
      <span class="text-xs px-2">{{ Math.round(scale * 100) }}%</span>
      <v-btn
        icon="mdi-magnify-minus"
        size="small"
        variant="text"
        @click="zoomOut"
        :disabled="scale <= 0.25"
      ></v-btn>
    </v-toolbar>
    
    <v-card-text
      class="pa-2 overflow-auto"
      style="height: calc(100% - 56px);"
      @dragover.prevent
      @drop="handleDrop"
    >
      <div
        class="canvas-container relative flex items-center justify-center"
        style="min-height: 100%; background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px);"
        @click="handleCanvasClick"
      >
        <div
          ref="paperRef"
          class="paper-bg relative bg-white"
          :style="paperStyle"
          @click.stop
        >
          <div
            v-for="element in elements"
            :key="element.id"
            ref="elementRefs"
            class="canvas-element absolute cursor-move"
            :class="{ 'selected-element': selectedElement?.id === element.id }"
            :style="getElementStyle(element)"
            @mousedown="handleElementMouseDown($event, element)"
            @click.stop="selectElement(element)"
          >
            <component
              :is="getElementRenderer(element.type)"
              :element="element"
            ></component>
            
            <div
              v-if="selectedElement?.id === element.id"
              class="resize-handle resize-nw"
              @mousedown.stop="handleResizeMouseDown($event, 'nw')"
            ></div>
            <div
              v-if="selectedElement?.id === element.id"
              class="resize-handle resize-ne"
              @mousedown.stop="handleResizeMouseDown($event, 'ne')"
            ></div>
            <div
              v-if="selectedElement?.id === element.id"
              class="resize-handle resize-sw"
              @mousedown.stop="handleResizeMouseDown($event, 'sw')"
            ></div>
            <div
              v-if="selectedElement?.id === element.id"
              class="resize-handle resize-se"
              @mousedown.stop="handleResizeMouseDown($event, 'se')"
            ></div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { PrintElement, PaperSize } from '../types'
import { createDefaultElement } from '../utils/elementUtils'
import ElementText from './elements/ElementText.vue'
import ElementLongText from './elements/ElementLongText.vue'
import ElementImage from './elements/ElementImage.vue'
import ElementTable from './elements/ElementTable.vue'
import ElementHtml from './elements/ElementHtml.vue'
import ElementBarcode from './elements/ElementBarcode.vue'
import ElementQRCode from './elements/ElementQRCode.vue'

const props = defineProps<{
  elements: PrintElement[]
  selectedElement: PrintElement | null
  paperSize: PaperSize
  rotation: number
}>()

const emit = defineEmits<{
  (e: 'add-element', element: PrintElement): void
  (e: 'select-element', element: PrintElement): void
  (e: 'update-element', element: PrintElement): void
  (e: 'deselect-element'): void
}>()

const paperRef = ref<HTMLElement | null>(null)
const scale = ref(0.75)

const isDragging = ref(false)
const isResizing = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const elementStartX = ref(0)
const elementStartY = ref(0)
const elementStartW = ref(0)
const elementStartH = ref(0)
const resizeDirection = ref('')

const elementRenderers: Record<string, any> = {
  text: ElementText,
  longText: ElementLongText,
  image: ElementImage,
  table: ElementTable,
  html: ElementHtml,
  barcode: ElementBarcode,
  qrcode: ElementQRCode,
}

const paperStyle = computed(() => ({
  width: `${props.paperSize.width * scale.value}px`,
  height: `${props.paperSize.height * scale.value}px`,
  transform: `rotate(${props.rotation}deg)`,
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
}))

function getElementStyle(element: PrintElement) {
  return {
    left: `${element.x * scale.value}px`,
    top: `${element.y * scale.value}px`,
    width: `${element.width * scale.value}px`,
    height: `${element.height * scale.value}px`,
    transform: `rotate(${element.rotation || 0}deg)`,
    transformOrigin: 'center center',
  }
}

function getElementRenderer(type: string) {
  return elementRenderers[type] || elementRenderers.text
}

function handleDrop(event: DragEvent) {
  const elementType = event.dataTransfer?.getData('elementType')
  if (!elementType || !paperRef.value) return
  
  const rect = paperRef.value.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / scale.value)
  const y = ((event.clientY - rect.top) / scale.value)
  
  const newElement = createDefaultElement(elementType as any)
  newElement.x = Math.max(0, x - newElement.width / 2)
  newElement.y = Math.max(0, y - newElement.height / 2)
  
  emit('add-element', newElement)
}

function selectElement(element: PrintElement) {
  emit('select-element', element)
}

function handleCanvasClick() {
  emit('deselect-element')
}

function handleElementMouseDown(event: MouseEvent, element: PrintElement) {
  if (!props.selectedElement || props.selectedElement.id !== element.id) {
    return
  }
  
  isDragging.value = true
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY
  elementStartX.value = element.x
  elementStartY.value = element.y
  
  emit('select-element', element)
}

function handleResizeMouseDown(event: MouseEvent, direction: string) {
  event.preventDefault()
  event.stopPropagation()
  
  if (!props.selectedElement) return
  
  isResizing.value = true
  resizeDirection.value = direction
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY
  elementStartX.value = props.selectedElement.x
  elementStartY.value = props.selectedElement.y
  elementStartW.value = props.selectedElement.width
  elementStartH.value = props.selectedElement.height
}

function handleMouseMove(event: MouseEvent) {
  if (isDragging.value && props.selectedElement) {
    const dx = (event.clientX - dragStartX.value) / scale.value
    const dy = (event.clientY - dragStartY.value) / scale.value
    
    const updatedElement = {
      ...props.selectedElement,
      x: elementStartX.value + dx,
      y: elementStartY.value + dy,
    }
    emit('update-element', updatedElement)
  }
  
  if (isResizing.value && props.selectedElement) {
    const dx = (event.clientX - dragStartX.value) / scale.value
    const dy = (event.clientY - dragStartY.value) / scale.value
    
    let newX = elementStartX.value
    let newY = elementStartY.value
    let newWidth = elementStartW.value
    let newHeight = elementStartH.value
    
    switch (resizeDirection.value) {
      case 'se':
        newWidth = Math.max(20, elementStartW.value + dx)
        newHeight = Math.max(20, elementStartH.value + dy)
        break
      case 'sw':
        newWidth = Math.max(20, elementStartW.value - dx)
        newHeight = Math.max(20, elementStartH.value + dy)
        newX = elementStartX.value + (elementStartW.value - newWidth)
        break
      case 'ne':
        newWidth = Math.max(20, elementStartW.value + dx)
        newHeight = Math.max(20, elementStartH.value - dy)
        newY = elementStartY.value + (elementStartH.value - newHeight)
        break
      case 'nw':
        newWidth = Math.max(20, elementStartW.value - dx)
        newHeight = Math.max(20, elementStartH.value - dy)
        newX = elementStartX.value + (elementStartW.value - newWidth)
        newY = elementStartY.value + (elementStartH.value - newHeight)
        break
    }
    
    const updatedElement = {
      ...props.selectedElement,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    }
    emit('update-element', updatedElement)
  }
}

function handleMouseUp() {
  isDragging.value = false
  isResizing.value = false
}

function zoomIn() {
  scale.value = Math.min(2, scale.value + 0.1)
}

function zoomOut() {
  scale.value = Math.max(0.25, scale.value - 0.1)
}

function resetView() {
  scale.value = 0.75
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

defineExpose({
  paperRef,
})
</script>

<style scoped>
.canvas-container {
  min-height: 100%;
}

.canvas-element {
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.canvas-element:hover {
  border-color: rgba(25, 118, 210, 0.5);
}

.selected-element {
  border: 2px solid #1976d2 !important;
}

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #1976d2;
  border: 2px solid white;
  border-radius: 2px;
  z-index: 10;
}

.resize-nw {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}

.resize-ne {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}

.resize-sw {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}

.resize-se {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}

.paper-bg {
  transition: transform 0.3s ease;
}
</style>
