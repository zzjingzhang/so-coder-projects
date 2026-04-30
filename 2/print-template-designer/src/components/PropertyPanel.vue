<template>
  <v-card class="h-full" elevation="2">
    <v-toolbar color="grey lighten-2" flat>
      <v-toolbar-title class="text-sm font-bold">属性面板</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="pa-2">
      <v-alert
        v-if="!selectedElement"
        type="info"
        variant="text"
        density="compact"
      >
        选择一个元素以编辑属性
      </v-alert>
      
      <template v-else>
        <v-alert type="info" variant="text" density="compact" class="mb-3">
          当前元素: {{ getElementLabel(selectedElement.type) }}
        </v-alert>
        
        <v-divider class="my-2"></v-divider>
        
        <v-text-field
          label="位置 X"
          type="number"
          density="compact"
          :model-value="Math.round(selectedElement.x)"
          @update:model-value="updatePosition('x', Number($event))"
          class="mb-2"
        ></v-text-field>
        
        <v-text-field
          label="位置 Y"
          type="number"
          density="compact"
          :model-value="Math.round(selectedElement.y)"
          @update:model-value="updatePosition('y', Number($event))"
          class="mb-2"
        ></v-text-field>
        
        <v-text-field
          label="宽度"
          type="number"
          density="compact"
          :model-value="Math.round(selectedElement.width)"
          @update:model-value="updateSize('width', Number($event))"
          class="mb-2"
        ></v-text-field>
        
        <v-text-field
          label="高度"
          type="number"
          density="compact"
          :model-value="Math.round(selectedElement.height)"
          @update:model-value="updateSize('height', Number($event))"
          class="mb-2"
        ></v-text-field>
        
        <v-text-field
          label="旋转角度"
          type="number"
          density="compact"
          min="0"
          max="360"
          :model-value="selectedElement.rotation || 0"
          @update:model-value="updateProperty('rotation', Number($event))"
          class="mb-2"
        ></v-text-field>
        
        <v-divider class="my-2"></v-divider>
        
        <template v-if="['text', 'longText', 'barcode', 'qrcode'].includes(selectedElement.type)">
          <v-text-field
            v-if="selectedElement.type !== 'qrcode'"
            label="内容"
            density="compact"
            :model-value="selectedElement.content"
            @update:model-value="updateProperty('content', $event)"
            class="mb-2"
          ></v-text-field>
          <v-textarea
            v-if="selectedElement.type === 'qrcode'"
            label="内容"
            density="compact"
            :model-value="selectedElement.content"
            @update:model-value="updateProperty('content', $event)"
            class="mb-2"
            rows="3"
          ></v-textarea>
        </template>
        
        <template v-else-if="selectedElement.type === 'html'">
          <v-textarea
            label="HTML 内容"
            density="compact"
            :model-value="selectedElement.content"
            @update:model-value="updateProperty('content', $event)"
            class="mb-2"
            rows="5"
          ></v-textarea>
        </template>
        
        <template v-else-if="selectedElement.type === 'image'">
          <v-text-field
            label="图片 URL"
            density="compact"
            :model-value="selectedElement.content"
            @update:model-value="updateProperty('content', $event)"
            class="mb-2"
          ></v-text-field>
          <v-btn size="small" block variant="outlined" class="mb-2">
            上传图片
          </v-btn>
        </template>
        
        <template v-else-if="selectedElement.type === 'table'">
          <v-alert type="warning" variant="text" density="compact" class="mb-2">
            表格数据编辑功能开发中
          </v-alert>
        </template>
        
        <template v-if="['text', 'longText'].includes(selectedElement.type)">
          <v-divider class="my-2"></v-divider>
          
          <v-text-field
            label="字体大小"
            type="number"
            density="compact"
            min="8"
            max="72"
            :model-value="selectedElement.fontSize"
            @update:model-value="updateProperty('fontSize', Number($event))"
            class="mb-2"
          ></v-text-field>
          
          <v-select
            label="字体"
            density="compact"
            :items="fontOptions"
            :model-value="selectedElement.fontFamily"
            @update:model-value="updateProperty('fontFamily', $event)"
            class="mb-2"
          ></v-select>
          
          <v-select
            label="字重"
            density="compact"
            :items="fontWeightOptions"
            :model-value="selectedElement.fontWeight"
            @update:model-value="updateProperty('fontWeight', $event)"
            class="mb-2"
          ></v-select>
          
          <v-text-field
            label="颜色"
            type="color"
            density="compact"
            :model-value="selectedElement.color"
            @update:model-value="updateProperty('color', $event)"
            class="mb-2"
          ></v-text-field>
          
          <v-select
            label="对齐方式"
            density="compact"
            :items="alignOptions"
            :model-value="selectedElement.textAlign"
            @update:model-value="updateProperty('textAlign', $event)"
            class="mb-2"
          ></v-select>
        </template>
        
        <template v-if="selectedElement.type === 'barcode'">
          <v-divider class="my-2"></v-divider>
          <v-select
            label="条码格式"
            density="compact"
            :items="barcodeFormats"
            :model-value="selectedElement.barcodeFormat"
            @update:model-value="updateProperty('barcodeFormat', $event)"
            class="mb-2"
          ></v-select>
        </template>
        
        <template v-if="selectedElement.type === 'qrcode'">
          <v-divider class="my-2"></v-divider>
          <v-select
            label="错误纠正级别"
            density="compact"
            :items="qrcodeErrorLevels"
            :model-value="selectedElement.qrcodeErrorLevel"
            @update:model-value="updateProperty('qrcodeErrorLevel', $event)"
            class="mb-2"
          ></v-select>
        </template>
        
        <v-divider class="my-3"></v-divider>
        
        <v-btn
          color="error"
          variant="outlined"
          size="small"
          block
          @click="deleteCurrentElement"
        >
          <v-icon left>mdi-delete</v-icon>
          删除元素
        </v-btn>
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { PrintElement } from '../types'

const props = defineProps<{
  selectedElement: PrintElement | null
}>()

const emit = defineEmits<{
  (e: 'update-element', element: PrintElement): void
  (e: 'delete-element', id: string): void
}>()

const fontOptions = [
  'Arial, sans-serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Microsoft YaHei, sans-serif',
  'SimSun, serif',
]

const fontWeightOptions = ['normal', 'bold', 'lighter', 'bolder']

const alignOptions = ['left', 'center', 'right']

const barcodeFormats = [
  'CODE128',
  'CODE39',
  'EAN13',
  'EAN8',
  'UPC',
  'ITF',
  'MSI',
  'Pharmacode',
  'Codabar',
]

const qrcodeErrorLevels = [
  { title: '低 (7%)', value: 'L' },
  { title: '中 (15%)', value: 'M' },
  { title: '较高 (25%)', value: 'Q' },
  { title: '高 (30%)', value: 'H' },
]

const elementLabels: Record<string, string> = {
  text: '文本',
  longText: '长文本',
  image: '图片',
  table: '表格',
  html: 'HTML',
  barcode: '条码',
  qrcode: '二维码',
}

function getElementLabel(type: string): string {
  return elementLabels[type] || type
}

function updatePosition(axis: 'x' | 'y', value: number): void {
  if (!props.selectedElement) return
  emit('update-element', { ...props.selectedElement, [axis]: value })
}

function updateSize(dimension: 'width' | 'height', value: number): void {
  if (!props.selectedElement) return
  emit('update-element', { ...props.selectedElement, [dimension]: value })
}

function updateProperty(key: string, value: any): void {
  if (!props.selectedElement) return
  emit('update-element', { ...props.selectedElement, [key]: value })
}

function deleteCurrentElement(): void {
  if (!props.selectedElement) return
  emit('delete-element', props.selectedElement.id)
}
</script>

<style scoped>
</style>
