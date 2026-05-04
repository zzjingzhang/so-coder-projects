<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  polygons: {
    type: Array,
    default: () => []
  }
})

const canvasRef = ref(null)
const containerRef = ref(null)
const canvasSize = ref({ width: 800, height: 600 })

const colors = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
]

const drawCoordinateSystem = (ctx, width, height) => {
  const padding = 50
  const centerX = width / 2
  const centerY = height / 2
  
  // 绘制背景
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)
  
  // 绘制网格线
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  
  // 水平网格线
  for (let y = padding; y < height - padding; y += 40) {
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(width - padding, y)
    ctx.stroke()
  }
  
  // 垂直网格线
  for (let x = padding; x < width - padding; x += 40) {
    ctx.beginPath()
    ctx.moveTo(x, padding)
    ctx.lineTo(x, height - padding)
    ctx.stroke()
  }
  
  // 绘制坐标轴
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 2
  
  // X轴
  ctx.beginPath()
  ctx.moveTo(padding, centerY)
  ctx.lineTo(width - padding, centerY)
  ctx.stroke()
  
  // X轴箭头
  ctx.beginPath()
  ctx.moveTo(width - padding, centerY)
  ctx.lineTo(width - padding - 10, centerY - 5)
  ctx.lineTo(width - padding - 10, centerY + 5)
  ctx.closePath()
  ctx.fillStyle = '#374151'
  ctx.fill()
  
  // Y轴
  ctx.beginPath()
  ctx.moveTo(centerX, height - padding)
  ctx.lineTo(centerX, padding)
  ctx.stroke()
  
  // Y轴箭头
  ctx.beginPath()
  ctx.moveTo(centerX, padding)
  ctx.lineTo(centerX - 5, padding + 10)
  ctx.lineTo(centerX + 5, padding + 10)
  ctx.closePath()
  ctx.fillStyle = '#374151'
  ctx.fill()
  
  // 绘制坐标轴标签
  ctx.fillStyle = '#374151'
  ctx.font = '12px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('X', width - padding - 15, centerY - 10)
  ctx.fillText('Y', centerX + 15, padding + 5)
  
  // 绘制原点
  ctx.beginPath()
  ctx.arc(centerX, centerY, 3, 0, Math.PI * 2)
  ctx.fillStyle = '#374151'
  ctx.fill()
  ctx.fillText('O', centerX + 10, centerY + 15)
}

const drawPolygons = (ctx, polygons, width, height) => {
  if (polygons.length === 0) return
  
  const padding = 50
  const centerX = width / 2
  const centerY = height / 2
  
  // 计算所有点的边界
  let minX = Infinity, maxX = -Infinity
  let minY = Infinity, maxY = -Infinity
  
  for (const polygon of polygons) {
    for (const point of polygon) {
      minX = Math.min(minX, point.x)
      maxX = Math.max(maxX, point.x)
      minY = Math.min(minY, point.y)
      maxY = Math.max(maxY, point.y)
    }
  }
  
  // 计算缩放比例和偏移量
  const dataWidth = maxX - minX
  const dataHeight = maxY - minY
  const canvasWidth = width - 2 * padding
  const canvasHeight = height - 2 * padding
  
  // 添加一些边距
  const scaleX = canvasWidth / (dataWidth || 1)
  const scaleY = canvasHeight / (dataHeight || 1)
  const scale = Math.min(scaleX, scaleY) * 0.8
  
  const offsetX = (canvasWidth - dataWidth * scale) / 2
  const offsetY = (canvasHeight - dataHeight * scale) / 2
  
  // 绘制每个多边形
  polygons.forEach((polygon, index) => {
    const color = colors[index % colors.length]
    
    ctx.beginPath()
    
    for (let i = 0; i < polygon.length; i++) {
      const point = polygon[i]
      
      // 转换坐标：将数据坐标映射到画布坐标
      // 注意：Y轴在画布上是向下增长的，所以需要翻转
      const x = padding + offsetX + (point.x - minX) * scale
      const y = height - padding - offsetY - (point.y - minY) * scale
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    
    ctx.closePath()
    
    // 填充多边形
    ctx.fillStyle = color + '33' // 20% 透明度
    ctx.fill()
    
    // 绘制边框
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
    
    // 绘制顶点
    polygon.forEach((point, i) => {
      const x = padding + offsetX + (point.x - minX) * scale
      const y = height - padding - offsetY - (point.y - minY) * scale
      
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    })
  })
}

const render = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const width = canvasSize.value.width
  const height = canvasSize.value.height
  
  // 设置canvas尺寸
  canvas.width = width
  canvas.height = height
  
  // 绘制坐标系
  drawCoordinateSystem(ctx, width, height)
  
  // 绘制多边形
  drawPolygons(ctx, props.polygons, width, height)
}

const updateCanvasSize = () => {
  if (containerRef.value) {
    const container = containerRef.value
    canvasSize.value = {
      width: container.clientWidth - 48,
      height: container.clientHeight - 48
    }
  }
}

onMounted(() => {
  updateCanvasSize()
  nextTick(() => {
    render()
  })
  
  window.addEventListener('resize', () => {
    updateCanvasSize()
    nextTick(() => {
      render()
    })
  })
})

watch(() => props.polygons, () => {
  nextTick(() => {
    render()
  })
}, { deep: true })
</script>

<template>
  <div ref="containerRef" class="h-full flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full h-full">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-800">坐标系视图</h2>
        <div class="text-sm text-gray-500">
          多边形数量: <span class="font-semibold text-blue-600">{{ polygons.length }}</span>
        </div>
      </div>
      <div class="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <canvas
          ref="canvasRef"
          class="block"
        ></canvas>
      </div>
      
      <div v-if="polygons.length > 0" class="mt-4">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">图例</h3>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(_, index) in polygons"
            :key="index"
            class="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded"
          >
            <div
              class="w-3 h-3 rounded-sm"
              :style="{ backgroundColor: colors[index % colors.length] }"
            ></div>
            <span class="text-xs text-gray-600">多边形 {{ index + 1 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
