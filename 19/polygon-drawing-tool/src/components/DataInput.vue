<script setup>
import { ref } from 'vue'
import { Button, Input, message } from 'ant-design-vue'

const emit = defineEmits(['draw'])
const inputData = ref('')
const loading = ref(false)

const parsePolygonData = (data) => {
  if (!data.trim()) {
    return []
  }

  const lines = data.trim().split('\n').filter(line => line.trim())
  const polygons = []

  for (const line of lines) {
    try {
      // 匹配 Polygon[(x1,y1), (x2,y2), ...] 格式
      const match = line.trim().match(/Polygon\[(.*)\]/i)
      if (!match) continue

      const pointsStr = match[1]
      // 匹配所有坐标点对
      const pointMatches = pointsStr.matchAll(/\(([^)]+)\)/g)
      const points = []

      for (const pointMatch of pointMatches) {
        const coords = pointMatch[1].split(',').map(c => parseFloat(c.trim()))
        if (coords.length >= 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
          points.push({ x: coords[0], y: coords[1] })
        }
      }

      if (points.length >= 3) {
        // 确保多边形是闭合的
        if (points[0].x !== points[points.length - 1].x || points[0].y !== points[points.length - 1].y) {
          points.push({ ...points[0] })
        }
        polygons.push(points)
      }
    } catch (error) {
      console.error('解析多边形失败:', error)
    }
  }

  return polygons
}

const handleDraw = () => {
  loading.value = true
  
  setTimeout(() => {
    const parsedPolygons = parsePolygonData(inputData.value)
    
    if (parsedPolygons.length === 0 && inputData.value.trim()) {
      message.error('未解析到有效的多边形数据，请检查格式')
      loading.value = false
      return
    }
    
    emit('draw', parsedPolygons)
    message.success(`成功解析 ${parsedPolygons.length} 个多边形`)
    loading.value = false
  }, 300)
}

const handleClear = () => {
  inputData.value = ''
  emit('draw', [])
  message.info('已清空所有数据')
}
</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        输入多边形数据
      </label>
      <p class="text-xs text-gray-500 mb-2">
        格式: Polygon[(x1,y1), (x2,y2), ...]，多个多边形用换行分隔
      </p>
      <Input.TextArea
        v-model:value="inputData"
        placeholder="Polygon[(-13851.731323130303, -24424.111943115407), (-14056.006243860069, -24863.340584631682), (-14390.735828431802, -24691.257842082967), (-14385.792668078786, -24426.083320980273), (-14143.075891070905, -24297.028521422708), (-13995.667338693806, -24043.61919395542), (-13764.307490452862, -24076.185910189484), (-13667.569411966626, -24258.1237746053), (-13851.731323130303, -24424.111943115407)]"
        :rows="15"
        class="font-mono text-sm"
      />
    </div>
    
    <div class="flex space-x-3">
      <Button
        type="primary"
        :loading="loading"
        @click="handleDraw"
        class="flex items-center justify-center"
      >
        绘制图形
      </Button>
      <Button
        danger
        @click="handleClear"
        class="flex items-center justify-center"
      >
        清空
      </Button>
    </div>
    
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">使用说明</h3>
      <ul class="text-xs text-gray-600 space-y-1">
        <li>• 每个多边形使用 Polygon[(x1,y1), (x2,y2), ...] 格式</li>
        <li>• 多个多边形之间使用换行符分隔</li>
        <li>• 点击"绘制图形"按钮在右侧坐标系中显示多边形</li>
        <li>• 支持 GeoGebra 多边形数据格式</li>
      </ul>
    </div>
  </div>
</template>
