<template>
  <div class="element-qrcode">
    <canvas ref="qrcodeCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PrintElement } from '../../types'
import QRCode from 'qrcode'

const props = defineProps<{
  element: PrintElement
}>()

const qrcodeCanvas = ref<HTMLCanvasElement | null>(null)

function renderQRCode() {
  if (!qrcodeCanvas.value || !props.element.content) return
  
  const size = Math.min(props.element.width, props.element.height) - 4
  
  QRCode.toCanvas(qrcodeCanvas.value, props.element.content, {
    width: size,
    margin: 1,
    errorCorrectionLevel: props.element.qrcodeErrorLevel || 'M',
  }, (error) => {
    if (error) {
      console.error('QR Code render error:', error)
    }
  })
}

watch(
  () => props.element.content,
  () => renderQRCode()
)

watch(
  () => props.element.width,
  () => renderQRCode()
)

watch(
  () => props.element.height,
  () => renderQRCode()
)

onMounted(() => {
  renderQRCode()
})
</script>

<style scoped>
.element-qrcode {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.element-qrcode canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>
