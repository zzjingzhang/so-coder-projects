<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { Slider, Select, Button, Card, message } from 'ant-design-vue'

// 类型定义
interface Point {
  x: number
  y: number
  label: string
}

interface Shape {
  type: 'triangle' | 'rectangle' | 'pentagon' | 'hexagon' | 'custom'
  points: Point[]
}

// 跑马灯文本
const marqueeText = ref('欢迎使用交互式几何图形变换工具 - 支持平移、旋转等多种变换 - 可自定义图形并进行实时预览')

// 状态管理
const canvasRef = ref<HTMLCanvasElement | null>(null)
const currentShapeType = ref<string>('triangle')
const translationX = ref<number>(0)
const translationY = ref<number>(0)
const rotationAngle = ref<number>(0)
const rotationCenterIndex = ref<number>(0)
const isDrawingCustom = ref<boolean>(false)
const customPoints = ref<Point[]>([])
const canvasWidth = ref<number>(800)
const canvasHeight = ref<number>(600)
const gridSize = ref<number>(40)

// 预定义图形
const predefinedShapes = reactive<Record<string, Point[]>>({
  triangle: [
    { x: 200, y: 150, label: 'A' },
    { x: 150, y: 250, label: 'B' },
    { x: 250, y: 250, label: 'C' }
  ],
  rectangle: [
    { x: 150, y: 150, label: 'A' },
    { x: 150, y: 250, label: 'B' },
    { x: 300, y: 250, label: 'C' },
    { x: 300, y: 150, label: 'D' }
  ],
  pentagon: [
    { x: 200, y: 120, label: 'A' },
    { x: 120, y: 180, label: 'B' },
    { x: 150, y: 280, label: 'C' },
    { x: 250, y: 280, label: 'D' },
    { x: 280, y: 180, label: 'E' }
  ],
  hexagon: [
    { x: 200, y: 100, label: 'A' },
    { x: 130, y: 150, label: 'B' },
    { x: 130, y: 250, label: 'C' },
    { x: 200, y: 300, label: 'D' },
    { x: 270, y: 250, label: 'E' },
    { x: 270, y: 150, label: 'F' }
  ]
})

// 当前图形
const currentShape = computed<Point[]>(() => {
  if (currentShapeType.value === 'custom' && customPoints.value.length > 0) {
    return customPoints.value
  }
  return predefinedShapes[currentShapeType.value] || predefinedShapes.triangle
})

// 顶点选项
const vertexOptions = computed(() => {
  return currentShape.value.map((point, index) => ({
    label: `顶点 ${point.label}`,
    value: index
  }))
})

// 图形类型选项
const shapeOptions = [
  { label: '三角形', value: 'triangle' },
  { label: '矩形', value: 'rectangle' },
  { label: '五边形', value: 'pentagon' },
  { label: '六边形', value: 'hexagon' },
  { label: '自定义图形', value: 'custom' }
]

// 计算变换后的点
const getTransformedPoints = (points: Point[]): Point[] => {
  if (points.length === 0) return []
  
  const center = points[rotationCenterIndex.value] || points[0]
  
  // 先旋转，再平移
  const angleRad = (rotationAngle.value * Math.PI) / 180
  const cos = Math.cos(angleRad)
  const sin = Math.sin(angleRad)
  
  return points.map((point, index) => {
    // 旋转
    const dx = point.x - center.x
    const dy = point.y - center.y
    const rotatedX = dx * cos - dy * sin + center.x
    const rotatedY = dx * sin + dy * cos + center.y
    
    // 平移
    const translatedX = rotatedX + translationX.value
    const translatedY = rotatedY + translationY.value
    
    return {
      x: translatedX,
      y: translatedY,
      label: point.label
    }
  })
}

// 绘制网格
const drawGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.save()
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  
  // 垂直线
  for (let x = 0; x <= canvasWidth.value; x += gridSize.value) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvasHeight.value)
    ctx.stroke()
  }
  
  // 水平线
  for (let y = 0; y <= canvasHeight.value; y += gridSize.value) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvasWidth.value, y)
    ctx.stroke()
  }
  
  ctx.restore()
}

// 绘制图形
const drawShape = (
  ctx: CanvasRenderingContext2D, 
  points: Point[], 
  fillColor: string, 
  strokeColor: string,
  isTransformed: boolean = false
) => {
  if (points.length < 3) return
  
  ctx.save()
  
  // 填充图形
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = 2
  
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  
  // 绘制顶点
  points.forEach((point, index) => {
    // 红色圆点
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2)
    ctx.fill()
    
    // 顶点标签
    ctx.fillStyle = isTransformed ? '#059669' : '#1d4ed8'
    ctx.font = 'bold 14px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(point.label, point.x, point.y - 10)
    
    // 旋转中心特殊标记
    if (index === rotationCenterIndex.value && !isTransformed) {
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(point.x, point.y, 12, 0, Math.PI * 2)
      ctx.stroke()
    }
  })
  
  ctx.restore()
}

// 绘制画布
const drawCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  // 清空画布
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  
  // 绘制网格
  drawGrid(ctx)
  
  // 绘制原始图形（蓝色系）
  drawShape(
    ctx, 
    currentShape.value, 
    'rgba(59, 130, 246, 0.3)', 
    '#3b82f6',
    false
  )
  
  // 绘制变换后的图形（绿色系）
  const transformedPoints = getTransformedPoints(currentShape.value)
  drawShape(
    ctx, 
    transformedPoints, 
    'rgba(16, 185, 129, 0.3)', 
    '#10b981',
    true
  )
  
  // 如果正在绘制自定义图形，显示临时点
  if (isDrawingCustom.value && customPoints.value.length > 0) {
    ctx.save()
    customPoints.value.forEach((point, index) => {
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = '#1d4ed8'
      ctx.font = 'bold 14px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText(String.fromCharCode(65 + index), point.x, point.y - 10)
    })
    
    // 连接已绘制的点
    if (customPoints.value.length > 1) {
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(customPoints.value[0].x, customPoints.value[0].y)
      for (let i = 1; i < customPoints.value.length; i++) {
        ctx.lineTo(customPoints.value[i].x, customPoints.value[i].y)
      }
      ctx.stroke()
    }
    ctx.restore()
  }
}

// 平移控制
const moveUp = () => {
  translationY.value -= 10
}

const moveDown = () => {
  translationY.value += 10
}

const moveLeft = () => {
  translationX.value -= 10
}

const moveRight = () => {
  translationX.value += 10
}

// 重置
const reset = () => {
  translationX.value = 0
  translationY.value = 0
  rotationAngle.value = 0
  rotationCenterIndex.value = 0
  currentShapeType.value = 'triangle'
  customPoints.value = []
  isDrawingCustom.value = false
  message.success('已重置到初始状态')
}

// 应用变换（这里变换已经实时应用，这个函数主要是为了用户确认）
const applyTransformation = () => {
  message.success('变换已应用')
}

// 开始绘制自定义图形
const startCustomDrawing = () => {
  currentShapeType.value = 'custom'
  customPoints.value = []
  isDrawingCustom.value = true
  message.info('请在画布上点击添加顶点，双击完成绘制')
}

// 画布点击事件
const handleCanvasClick = (event: MouseEvent) => {
  if (!isDrawingCustom.value) return
  
  const canvas = canvasRef.value
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvasWidth.value / rect.width
  const scaleY = canvasHeight.value / rect.height
  
  const x = (event.clientX - rect.left) * scaleX
  const y = (event.clientY - rect.top) * scaleY
  
  // 检查是否点击位置太近
  const minDistance = 20
  for (const point of customPoints.value) {
    const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2))
    if (distance < minDistance) {
      return
    }
  }
  
  customPoints.value.push({
    x,
    y,
    label: String.fromCharCode(65 + customPoints.value.length)
  })
}

// 画布双击事件
const handleCanvasDoubleClick = () => {
  if (!isDrawingCustom.value) return
  
  if (customPoints.value.length < 3) {
    message.warning('至少需要3个顶点才能构成图形')
    return
  }
  
  isDrawingCustom.value = false
  rotationCenterIndex.value = 0
  message.success('自定义图形绘制完成')
}

// 监听状态变化，实时重绘
watch(
  [
    currentShapeType, 
    translationX, 
    translationY, 
    rotationAngle, 
    rotationCenterIndex,
    () => customPoints.value.length
  ],
  () => {
    drawCanvas()
  },
  { deep: true }
)

// 组件挂载后绘制
onMounted(() => {
  drawCanvas()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 跑马灯 -->
    <div class="bg-blue-600 text-white py-3 overflow-hidden">
      <div class="animate-marquee whitespace-nowrap">
        <span class="mx-8 text-lg font-medium">{{ marqueeText }}</span>
        <span class="mx-8 text-lg font-medium">{{ marqueeText }}</span>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="flex-1 p-6 flex flex-col lg:flex-row gap-6">
      <!-- 控制面板 -->
      <div class="lg:w-80 flex flex-col gap-4">
        <!-- 图形选择 -->
        <Card title="图形选择" class="shadow-md">
          <Select
            v-model:value="currentShapeType"
            :options="shapeOptions"
            style="width: 100%"
            class="mb-3"
          />
          <Button 
            type="primary" 
            @click="startCustomDrawing"
            class="w-full bg-green-600"
          >
            绘制自定义图形
          </Button>
          <div v-if="isDrawingCustom" class="mt-2 text-sm text-orange-600">
            正在绘制自定义图形，点击添加顶点，双击完成
          </div>
        </Card>
        
        <!-- 平移控制 -->
        <Card title="平移控制" class="shadow-md">
          <div class="space-y-4">
            <div class="text-center">
              <Button type="primary" @click="moveUp" class="w-20">
                ↑ 上
              </Button>
            </div>
            <div class="flex justify-center gap-4">
              <Button type="primary" @click="moveLeft" class="w-20">
                ← 左
              </Button>
              <Button type="primary" @click="moveRight" class="w-20">
                右 →
              </Button>
            </div>
            <div class="text-center">
              <Button type="primary" @click="moveDown" class="w-20">
                ↓ 下
              </Button>
            </div>
            
            <div class="mt-4 pt-4 border-t">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                水平平移 (X): {{ translationX }}px
              </label>
              <Slider 
                v-model:value="translationX" 
                :min="-300" 
                :max="300" 
                :step="1"
              />
              
              <label class="block text-sm font-medium text-gray-700 mb-2 mt-4">
                垂直平移 (Y): {{ translationY }}px
              </label>
              <Slider 
                v-model:value="translationY" 
                :min="-300" 
                :max="300" 
                :step="1"
              />
            </div>
          </div>
        </Card>
        
        <!-- 旋转控制 -->
        <Card title="旋转控制" class="shadow-md">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                旋转中心
              </label>
              <Select
                v-model:value="rotationCenterIndex"
                :options="vertexOptions"
                style="width: 100%"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                旋转角度: {{ rotationAngle }}°
              </label>
              <Slider 
                v-model:value="rotationAngle" 
                :min="-180" 
                :max="180" 
                :step="1"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>-180°</span>
                <span>0°</span>
                <span>+180°</span>
              </div>
            </div>
          </div>
        </Card>
        
        <!-- 操作按钮 -->
        <Card title="操作" class="shadow-md">
          <div class="flex flex-col gap-3">
            <Button type="primary" @click="applyTransformation" class="w-full bg-blue-600">
              应用变换
            </Button>
            <Button @click="startCustomDrawing" class="w-full">
              添加图形
            </Button>
            <Button danger @click="reset" class="w-full">
              重置
            </Button>
          </div>
        </Card>
      </div>
      
      <!-- 画布区域 -->
      <div class="flex-1 flex flex-col">
        <Card title="图形变换演示" class="shadow-md flex-1">
          <div class="flex justify-center items-center h-full">
            <canvas
              ref="canvasRef"
              :width="canvasWidth"
              :height="canvasHeight"
              class="border border-gray-300 bg-white cursor-crosshair max-w-full"
              style="max-height: 600px;"
              @click="handleCanvasClick"
              @dblclick="handleCanvasDoubleClick"
            />
          </div>
          
          <!-- 图例 -->
          <div class="mt-4 flex flex-wrap justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-blue-400 opacity-50 border border-blue-500"></div>
              <span>原始图形</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-green-400 opacity-50 border border-green-500"></div>
              <span>变换后图形</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>顶点</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 border-2 border-amber-500 rounded-full"></div>
              <span>旋转中心</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 覆盖Ant Design样式 */
:deep(.ant-card-head) {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.ant-card-head-title) {
  font-weight: 600;
  color: #1f2937;
}

:deep(.ant-btn-primary) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

:deep(.ant-select) {
  display: block;
}

:deep(.ant-slider) {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
