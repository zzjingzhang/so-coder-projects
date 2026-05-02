<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

const props = defineProps({
  layers: {
    type: Array,
    default: () => []
  },
  selectedLayerId: {
    type: [Number, null],
    default: null
  },
  activeTool: {
    type: String,
    default: 'brush'
  },
  brushColor: {
    type: String,
    default: '#000000'
  },
  brushSize: {
    type: Number,
    default: 5
  },
  fillColor: {
    type: String,
    default: '#000000'
  },
  strokeColor: {
    type: String,
    default: '#000000'
  },
  strokeWidth: {
    type: Number,
    default: 2
  },
  fillEnabled: {
    type: Boolean,
    default: true
  },
  fontFamily: {
    type: String,
    default: 'Arial'
  },
  fontSize: {
    type: Number,
    default: 24
  },
  textContent: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['draw', 'shape-added', 'text-added'])

const canvasRef = ref(null)
const isDrawing = ref(false)
const lastX = ref(0)
const lastY = ref(0)
const startX = ref(0)
const startY = ref(0)
const ctx = ref(null)
const canvasWidth = ref(800)
const canvasHeight = ref(600)

const shapes = ref([])
const texts = ref([])
const history = ref([])
const historyIndex = ref(-1)

const visibleLayers = computed(() => {
  return props.layers.filter(layer => layer.visible)
})

function getCanvasCoordinates(e) {
  const rect = canvasRef.value.getBoundingClientRect()
  const scaleX = canvasWidth.value / rect.width
  const scaleY = canvasHeight.value / rect.height
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  }
}

function startDrawing(e) {
  if (!canvasRef.value) return
  
  const coords = getCanvasCoordinates(e)
  isDrawing.value = true
  lastX.value = coords.x
  lastY.value = coords.y
  startX.value = coords.x
  startY.value = coords.y
  
  if (props.activeTool === 'brush' || props.activeTool === 'eraser') {
    ctx.value.beginPath()
    ctx.value.moveTo(lastX.value, lastY.value)
  }
}

function draw(e) {
  if (!isDrawing.value || !canvasRef.value) return
  
  const coords = getCanvasCoordinates(e)
  
  if (props.activeTool === 'brush') {
    ctx.value.strokeStyle = props.brushColor
    ctx.value.lineWidth = props.brushSize
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'
    
    ctx.value.lineTo(coords.x, coords.y)
    ctx.value.stroke()
    ctx.value.beginPath()
    ctx.value.moveTo(coords.x, coords.y)
    
    lastX.value = coords.x
    lastY.value = coords.y
  } else if (props.activeTool === 'eraser') {
    ctx.value.clearRect(
      coords.x - props.brushSize / 2,
      coords.y - props.brushSize / 2,
      props.brushSize,
      props.brushSize
    )
    lastX.value = coords.x
    lastY.value = coords.y
  }
}

function stopDrawing(e) {
  if (!isDrawing.value) return
  
  const coords = getCanvasCoordinates(e)
  
  if (props.activeTool === 'rectangle') {
    const width = coords.x - startX.value
    const height = coords.y - startY.value
    
    ctx.value.strokeStyle = props.strokeColor
    ctx.value.lineWidth = props.strokeWidth
    
    if (props.fillEnabled) {
      ctx.value.fillStyle = props.fillColor
      ctx.value.fillRect(startX.value, startY.value, width, height)
    }
    ctx.value.strokeRect(startX.value, startY.value, width, height)
    
    saveToHistory()
    emit('shape-added', {
      type: 'rectangle',
      x: startX.value,
      y: startY.value,
      width,
      height,
      fillColor: props.fillColor,
      strokeColor: props.strokeColor,
      strokeWidth: props.strokeWidth,
      fillEnabled: props.fillEnabled
    })
  } else if (props.activeTool === 'circle') {
    const radiusX = Math.abs(coords.x - startX.value) / 2
    const radiusY = Math.abs(coords.y - startY.value) / 2
    const centerX = startX.value + (coords.x - startX.value) / 2
    const centerY = startY.value + (coords.y - startY.value) / 2
    
    ctx.value.beginPath()
    ctx.value.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
    
    if (props.fillEnabled) {
      ctx.value.fillStyle = props.fillColor
      ctx.value.fill()
    }
    ctx.value.strokeStyle = props.strokeColor
    ctx.value.lineWidth = props.strokeWidth
    ctx.value.stroke()
    
    saveToHistory()
    emit('shape-added', {
      type: 'circle',
      centerX,
      centerY,
      radiusX,
      radiusY,
      fillColor: props.fillColor,
      strokeColor: props.strokeColor,
      strokeWidth: props.strokeWidth,
      fillEnabled: props.fillEnabled
    })
  } else if (props.activeTool === 'line') {
    ctx.value.beginPath()
    ctx.value.moveTo(startX.value, startY.value)
    ctx.value.lineTo(coords.x, coords.y)
    ctx.value.strokeStyle = props.strokeColor
    ctx.value.lineWidth = props.strokeWidth
    ctx.value.lineCap = 'round'
    ctx.value.stroke()
    
    saveToHistory()
    emit('shape-added', {
      type: 'line',
      startX: startX.value,
      startY: startY.value,
      endX: coords.x,
      endY: coords.y,
      strokeColor: props.strokeColor,
      strokeWidth: props.strokeWidth
    })
  } else if (props.activeTool === 'text' && props.textContent.trim()) {
    ctx.value.font = `${props.fontSize}px ${props.fontFamily}`
    ctx.value.fillStyle = props.brushColor
    ctx.value.fillText(props.textContent, coords.x, coords.y)
    
    saveToHistory()
    emit('text-added', {
      type: 'text',
      content: props.textContent,
      x: coords.x,
      y: coords.y,
      fontFamily: props.fontFamily,
      fontSize: props.fontSize,
      color: props.brushColor
    })
  }
  
  isDrawing.value = false
  lastX.value = 0
  lastY.value = 0
  startX.value = 0
  startY.value = 0
}

function saveToHistory() {
  const imageData = ctx.value.getImageData(0, 0, canvasWidth.value, canvasHeight.value)
  history.value = history.value.slice(0, historyIndex.value + 1)
  history.value.push(imageData)
  historyIndex.value = history.value.length - 1
}

function undo() {
  if (historyIndex.value > 0) {
    historyIndex.value--
    ctx.value.putImageData(history.value[historyIndex.value], 0, 0)
  }
}

function redo() {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    ctx.value.putImageData(history.value[historyIndex.value], 0, 0)
  }
}

function clearCanvas() {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  saveToHistory()
}

function exportCanvas(format = 'png') {
  const dataUrl = canvasRef.value.toDataURL(`image/${format}`, 1.0)
  const link = document.createElement('a')
  link.download = `canvas-export.${format}`
  link.href = dataUrl
  link.click()
}

function importImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        ctx.value.drawImage(img, 0, 0, canvasWidth.value, canvasHeight.value)
        saveToHistory()
        resolve()
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'
    
    saveToHistory()
    
    canvasRef.value.addEventListener('mousedown', startDrawing)
    canvasRef.value.addEventListener('mousemove', draw)
    canvasRef.value.addEventListener('mouseup', stopDrawing)
    canvasRef.value.addEventListener('mouseleave', stopDrawing)
  }
})

onUnmounted(() => {
  if (canvasRef.value) {
    canvasRef.value.removeEventListener('mousedown', startDrawing)
    canvasRef.value.removeEventListener('mousemove', draw)
    canvasRef.value.removeEventListener('mouseup', stopDrawing)
    canvasRef.value.removeEventListener('mouseleave', stopDrawing)
  }
})

defineExpose({
  undo,
  redo,
  clearCanvas,
  exportCanvas,
  importImage
})
</script>

<template>
  <canvas
    ref="canvasRef"
    :width="canvasWidth"
    :height="canvasHeight"
    class="w-full h-full cursor-crosshair bg-white"
    :class="{
      'cursor-not-allowed': activeTool === 'text' && !textContent.trim()
    }"
  ></canvas>
</template>

<style scoped>
canvas {
  display: block;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
