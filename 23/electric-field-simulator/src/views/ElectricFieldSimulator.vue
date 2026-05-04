<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import ControlPanel from '../components/ControlPanel.vue'

const canvasRef = ref(null)
const containerRef = ref(null)
const isReady = ref(false)

const q1Magnitude = ref(5)
const q1Polarity = ref(1)
const q2Magnitude = ref(5)
const q2Polarity = ref(-1)
const distance = ref(150)

let canvas = null
let ctx = null
let animationId = null
let resizeObserver = null

const getChargePosition = (canvasWidth, canvasHeight, dist) => {
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  const halfDist = dist / 2
  return {
    q1: { x: centerX - halfDist, y: centerY },
    q2: { x: centerX + halfDist, y: centerY }
  }
}

const getChargeRadius = (magnitude) => {
  return 20 + magnitude * 1.5
}

const calculateElectricField = (px, py, q1, q2) => {
  const k = 5000

  const dx1 = px - q1.x
  const dy1 = py - q1.y
  const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)

  const dx2 = px - q2.x
  const dy2 = py - q2.y
  const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

  if (r1 < 1 || r2 < 1) {
    return { ex: 0, ey: 0 }
  }

  const e1x = (k * q1.value * dx1) / (r1 * r1 * r1)
  const e1y = (k * q1.value * dy1) / (r1 * r1 * r1)

  const e2x = (k * q2.value * dx2) / (r2 * r2 * r2)
  const e2y = (k * q2.value * dy2) / (r2 * r2 * r2)

  return {
    ex: e1x + e2x,
    ey: e1y + e2y
  }
}

const drawFieldLine = (startX, startY, q1, q2, q1Radius, q2Radius, direction) => {
  const points = []
  const stepSize = 2
  const maxSteps = 2000

  let x = startX
  let y = startY

  for (let i = 0; i < maxSteps; i++) {
    points.push({ x, y })

    const field = calculateElectricField(x, y, q1, q2)
    const magnitude = Math.sqrt(field.ex * field.ex + field.ey * field.ey)

    if (magnitude < 0.0001) break

    const dx = (field.ex / magnitude) * stepSize * direction
    const dy = (field.ey / magnitude) * stepSize * direction

    const nextX = x + dx
    const nextY = y + dy

    const distToQ1 = Math.sqrt((nextX - q1.x) ** 2 + (nextY - q1.y) ** 2)
    const distToQ2 = Math.sqrt((nextX - q2.x) ** 2 + (nextY - q2.y) ** 2)

    if (distToQ1 < q1Radius + 3 || distToQ2 < q2Radius + 3) {
      break
    }

    if (nextX < -100 || nextX > canvas.width + 100 || nextY < -100 || nextY > canvas.height + 100) {
      break
    }

    x = nextX
    y = nextY
  }

  return points
}

const drawArrow = (ctx, x, y, angle, size = 8) => {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)

  ctx.beginPath()
  ctx.moveTo(size, 0)
  ctx.lineTo(-size / 2, -size / 2)
  ctx.lineTo(-size / 2, size / 2)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

const drawFieldLines = (q1, q2, q1Radius, q2Radius) => {
  ctx.strokeStyle = 'rgba(0, 100, 255, 0.5)'
  ctx.fillStyle = 'rgba(0, 100, 255, 0.9)'
  ctx.lineWidth = 1.5

  const numLines = 16

  const q1IsPositive = q1.value > 0
  const q2IsPositive = q2.value > 0

  if (q1IsPositive) {
    const startRadius = q1Radius + 5
    
    for (let i = 0; i < numLines; i++) {
      const angle = (2 * Math.PI * i) / numLines
      const startX = q1.x + startRadius * Math.cos(angle)
      const startY = q1.y + startRadius * Math.sin(angle)

      const points = drawFieldLine(startX, startY, q1, q2, q1Radius, q2Radius, 1)

      if (points.length >= 2) {
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        ctx.stroke()

        const arrowInterval = Math.max(30, Math.floor(points.length / 5))
        for (let j = arrowInterval; j < points.length - 5; j += arrowInterval) {
          if (j < points.length - 1) {
            const p1 = points[j]
            const p2 = points[j + 1]
            const arrowAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x)
            drawArrow(ctx, p1.x, p1.y, arrowAngle, 7)
          }
        }
      }
    }
  }

  if (q2IsPositive) {
    const startRadius = q2Radius + 5
    
    for (let i = 0; i < numLines; i++) {
      const angle = (2 * Math.PI * i) / numLines
      const startX = q2.x + startRadius * Math.cos(angle)
      const startY = q2.y + startRadius * Math.sin(angle)

      const points = drawFieldLine(startX, startY, q1, q2, q1Radius, q2Radius, 1)

      if (points.length >= 2) {
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        ctx.stroke()

        const arrowInterval = Math.max(30, Math.floor(points.length / 5))
        for (let j = arrowInterval; j < points.length - 5; j += arrowInterval) {
          if (j < points.length - 1) {
            const p1 = points[j]
            const p2 = points[j + 1]
            const arrowAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x)
            drawArrow(ctx, p1.x, p1.y, arrowAngle, 7)
          }
        }
      }
    }
  }

  if (!q1IsPositive && !q2IsPositive) {
    const boundaryLines = 24
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.max(canvas.width, canvas.height) * 0.8
    
    for (let i = 0; i < boundaryLines; i++) {
      const angle = (2 * Math.PI * i) / boundaryLines
      const startX = centerX + radius * Math.cos(angle)
      const startY = centerY + radius * Math.sin(angle)

      const points = drawFieldLine(startX, startY, q1, q2, q1Radius, q2Radius, -1)

      if (points.length >= 2) {
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        ctx.stroke()

        const arrowInterval = Math.max(30, Math.floor(points.length / 5))
        for (let j = arrowInterval; j < points.length - 5; j += arrowInterval) {
          if (j < points.length - 1) {
            const p1 = points[j]
            const p2 = points[j + 1]
            const arrowAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x)
            drawArrow(ctx, p1.x, p1.y, arrowAngle, 7)
          }
        }
      }
    }
  }
}

const drawCharge = (x, y, value, polarity, radius) => {
  const color = polarity > 0 ? '#ff4444' : '#4444ff'

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5)
  gradient.addColorStop(0, color)
  gradient.addColorStop(0.7, color + 'aa')
  gradient.addColorStop(1, color + '00')

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = `bold ${radius}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(polarity > 0 ? '+' : '-', x, y)
}

const render = () => {
  if (!canvas || !ctx) return

  if (canvas.width <= 0 || canvas.height <= 0) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const positions = getChargePosition(canvas.width, canvas.height, distance.value)
  const q1Radius = getChargeRadius(q1Magnitude.value)
  const q2Radius = getChargeRadius(q2Magnitude.value)
  
  const q1 = { x: positions.q1.x, y: positions.q1.y, value: q1Magnitude.value * q1Polarity.value }
  const q2 = { x: positions.q2.x, y: positions.q2.y, value: q2Magnitude.value * q2Polarity.value }

  drawFieldLines(q1, q2, q1Radius, q2Radius)

  drawCharge(q1.x, q1.y, q1Magnitude.value, q1Polarity.value, q1Radius)
  drawCharge(q2.x, q2.y, q2Magnitude.value, q2Polarity.value, q2Radius)
}

const resizeCanvas = () => {
  if (!canvasRef.value || !containerRef.value) return

  const container = containerRef.value
  canvas = canvasRef.value

  const width = container.clientWidth
  const height = container.clientHeight

  if (width <= 0 || height <= 0) {
    if (!isReady.value) {
      animationId = requestAnimationFrame(resizeCanvas)
    }
    return
  }

  canvas.width = width
  canvas.height = height

  ctx = canvas.getContext('2d')
  isReady.value = true
  render()
}

const params = [q1Magnitude, q1Polarity, q2Magnitude, q2Polarity, distance]
params.forEach((param) => {
  watch(param, () => {
    if (isReady.value) {
      render()
    }
  })
})

const initCanvas = () => {
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      animationId = requestAnimationFrame(resizeCanvas)
    })
    
    if (containerRef.value) {
      resizeObserver.observe(containerRef.value)
    }
  } else {
    window.addEventListener('resize', () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      animationId = requestAnimationFrame(resizeCanvas)
    })
  }

  resizeCanvas()
}

onMounted(() => {
  nextTick(() => {
    initCanvas()
  })
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

const handleQ1MagnitudeChange = (value) => {
  q1Magnitude.value = value
}

const handleQ1PolarityChange = (value) => {
  q1Polarity.value = value
}

const handleQ2MagnitudeChange = (value) => {
  q2Magnitude.value = value
}

const handleQ2PolarityChange = (value) => {
  q2Polarity.value = value
}

const handleDistanceChange = (value) => {
  distance.value = value
}
</script>

<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <ControlPanel
      :q1-magnitude="q1Magnitude"
      :q1-polarity="q1Polarity"
      :q2-magnitude="q2Magnitude"
      :q2-polarity="q2Polarity"
      :distance="distance"
      @update:q1-magnitude="handleQ1MagnitudeChange"
      @update:q1-polarity="handleQ1PolarityChange"
      @update:q2-magnitude="handleQ2MagnitudeChange"
      @update:q2-polarity="handleQ2PolarityChange"
      @update:distance="handleDistanceChange"
    />
    <div ref="containerRef" class="flex-1 bg-white p-4 min-w-0">
      <canvas ref="canvasRef" class="w-full h-full border border-gray-200 rounded-lg shadow-sm" />
    </div>
  </div>
</template>

<style scoped>
</style>
