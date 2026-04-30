<template>
  <div class="element-barcode">
    <canvas ref="barcodeCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PrintElement } from '../../types'
import JsBarcode from 'jsbarcode'

const props = defineProps<{
  element: PrintElement
}>()

const barcodeCanvas = ref<HTMLCanvasElement | null>(null)

function renderBarcode() {
  if (!barcodeCanvas.value || !props.element.content) return
  
  try {
    JsBarcode(barcodeCanvas.value, props.element.content, {
      format: props.element.barcodeFormat || 'CODE128',
      width: 2,
      height: props.element.height - 20,
      displayValue: true,
      fontSize: 12,
      margin: 0,
    })
  } catch (e) {
    console.error('Barcode render error:', e)
  }
}

watch(
  () => props.element.content,
  () => renderBarcode()
)

watch(
  () => props.element.width,
  () => renderBarcode()
)

watch(
  () => props.element.height,
  () => renderBarcode()
)

onMounted(() => {
  renderBarcode()
})
</script>

<style scoped>
.element-barcode {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.element-barcode canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>
