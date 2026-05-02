<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Props {
  lightIntensity: number
  neonColor: string
  trafficDensity: number
}

const props = withDefaults(defineProps<Props>(), {
  lightIntensity: 0.8,
  neonColor: '#ff00ff',
  trafficDensity: 0.5
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number = 0
let ctx: CanvasRenderingContext2D | null = null
let width: number = 0
let height: number = 0

interface Building {
  x: number
  width: number
  height: number
  floors: number
  windowsPerFloor: number
  windows: boolean[][]
  neonSigns: { y: number; width: number; color: string; flickerOffset: number }[]
}

interface Car {
  x: number
  lane: number
  speed: number
  direction: number
  trail: { x: number; opacity: number }[]
  maxTrailLength: number
}

interface Star {
  x: number
  y: number
  size: number
  twinkleSpeed: number
  twinkleOffset: number
}

let buildings: Building[] = []
let cars: Car[] = []
let stars: Star[] = []
let time: number = 0

const parseColor = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 0, b: 255 }
}

const generateBuildings = () => {
  buildings = []
  const groundY = height * 0.7
  const centerX = width / 2
  
  for (let i = 0; i < 20; i++) {
    const buildingWidth = 40 + Math.random() * 80
    const buildingHeight = 100 + Math.random() * 250
    const x = (i / 20) * width + (Math.random() - 0.5) * 20
    
    const floors = Math.floor(buildingHeight / 25)
    const windowsPerFloor = Math.floor(buildingWidth / 15)
    
    const windows: boolean[][] = []
    for (let f = 0; f < floors; f++) {
      windows[f] = []
      for (let w = 0; w < windowsPerFloor; w++) {
        windows[f][w] = Math.random() > 0.3
      }
    }
    
    const neonSigns: { y: number; width: number; color: string; flickerOffset: number }[] = []
    if (Math.random() > 0.5) {
      const neonColors = ['#ff00ff', '#00ffff', '#ff3366', '#ffff00', '#ff6600']
      neonSigns.push({
        y: groundY - buildingHeight + 20 + Math.random() * 80,
        width: buildingWidth * 0.7,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        flickerOffset: Math.random() * Math.PI * 2
      })
    }
    
    buildings.push({
      x,
      width: buildingWidth,
      height: buildingHeight,
      floors,
      windowsPerFloor,
      windows,
      neonSigns
    })
  }
}

const generateStars = () => {
  stars = []
  const starCount = 100
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      size: 0.5 + Math.random() * 1.5,
      twinkleSpeed: 0.5 + Math.random() * 2,
      twinkleOffset: Math.random() * Math.PI * 2
    })
  }
}

const spawnCar = () => {
  const groundY = height * 0.7
  const lanes = [
    { y: groundY + 20, direction: 1 },
    { y: groundY + 40, direction: -1 },
    { y: groundY + 60, direction: 1 },
    { y: groundY + 80, direction: -1 }
  ]
  const lane = lanes[Math.floor(Math.random() * lanes.length)]
  
  cars.push({
    x: lane.direction === 1 ? -20 : width + 20,
    lane: lane.y,
    speed: (1 + Math.random() * 2) * lane.direction,
    direction: lane.direction,
    trail: [],
    maxTrailLength: 15 + Math.floor(Math.random() * 10)
  })
}

const drawSky = () => {
  if (!ctx) return
  
  const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.7)
  const intensity = props.lightIntensity
  
  gradient.addColorStop(0, `rgba(5, 10, 30, 1)`)
  gradient.addColorStop(0.3, `rgba(15, 20, 50, 1)`)
  gradient.addColorStop(0.6, `rgba(${30 * intensity}, ${20 * intensity}, ${50 * intensity}, 1)`)
  gradient.addColorStop(1, `rgba(${40 * intensity}, ${30 * intensity}, ${60 * intensity}, 1)`)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height * 0.7)
}

const drawStars = () => {
  if (!ctx) return
  
  stars.forEach(star => {
    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5
    const alpha = 0.3 + twinkle * 0.7 * props.lightIntensity
    
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
    ctx.fill()
    
    if (star.size > 1) {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.2})`
      ctx.fill()
    }
  })
}

const drawMoon = () => {
  if (!ctx) return
  
  const moonX = width * 0.8
  const moonY = height * 0.15
  const moonRadius = 30
  const intensity = props.lightIntensity
  
  const glowGradient = ctx.createRadialGradient(moonX, moonY, moonRadius, moonX, moonY, moonRadius * 4)
  glowGradient.addColorStop(0, `rgba(200, 200, 255, ${0.3 * intensity})`)
  glowGradient.addColorStop(0.5, `rgba(150, 150, 200, ${0.1 * intensity})`)
  glowGradient.addColorStop(1, 'rgba(100, 100, 150, 0)')
  
  ctx.beginPath()
  ctx.arc(moonX, moonY, moonRadius * 4, 0, Math.PI * 2)
  ctx.fillStyle = glowGradient
  ctx.fill()
  
  ctx.beginPath()
  ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(240, 240, 255, ${intensity})`
  ctx.fill()
}

const drawBuildings = () => {
  if (!ctx) return
  
  const groundY = height * 0.7
  const neonBaseColor = parseColor(props.neonColor)
  const intensity = props.lightIntensity
  
  buildings.forEach((building) => {
    const buildingTop = groundY - building.height
    
    const buildingGradient = ctx.createLinearGradient(building.x, buildingTop, building.x, groundY)
    buildingGradient.addColorStop(0, `rgba(20, 25, 40, 1)`)
    buildingGradient.addColorStop(1, `rgba(10, 15, 25, 1)`)
    
    ctx.fillStyle = buildingGradient
    ctx.fillRect(building.x, buildingTop, building.width, building.height)
    
    ctx.strokeStyle = `rgba(100, 110, 140, ${0.3 * intensity})`
    ctx.lineWidth = 1
    ctx.strokeRect(building.x, buildingTop, building.width, building.height)
    
    const windowWidth = (building.width - 10) / building.windowsPerFloor
    const windowHeight = 15
    const padding = 5
    
    for (let f = 0; f < building.floors; f++) {
      for (let w = 0; w < building.windowsPerFloor; w++) {
        if (building.windows[f] && building.windows[f][w]) {
          const wx = building.x + padding + w * windowWidth
          const wy = buildingTop + padding + f * (windowHeight + padding)
          
          const isWarm = Math.random() > 0.7
          const windowColor = isWarm 
            ? `rgba(255, 220, 150, ${0.8 * intensity})`
            : `rgba(200, 220, 255, ${0.6 * intensity})`
          
          const glowSize = 3
          ctx.shadowColor = windowColor
          ctx.shadowBlur = glowSize * intensity
          
          ctx.fillStyle = windowColor
          ctx.fillRect(wx, wy, windowWidth - 2, windowHeight)
          
          ctx.shadowBlur = 0
        }
      }
    }
    
    building.neonSigns.forEach(neon => {
      const flicker = Math.sin(time * 3 + neon.flickerOffset) * 0.2 + 0.8
      const signX = building.x + (building.width - neon.width) / 2
      
      const originalColor = parseColor(neon.color)
      const hueShift = (originalColor.r + originalColor.g + originalColor.b) / 3 / 255
      
      const r = Math.min(255, Math.max(0, Math.round(neonBaseColor.r * (0.7 + hueShift * 0.3))))
      const g = Math.min(255, Math.max(0, Math.round(neonBaseColor.g * (0.7 + hueShift * 0.3))))
      const b = Math.min(255, Math.max(0, Math.round(neonBaseColor.b * (0.7 + hueShift * 0.3))))
      
      const finalColor = `rgba(${r}, ${g}, ${b}, ${flicker * intensity})`
      
      ctx.shadowColor = finalColor
      ctx.shadowBlur = 15 * intensity
      
      ctx.fillStyle = finalColor
      ctx.fillRect(signX, neon.y, neon.width, 8)
      
      ctx.beginPath()
      ctx.moveTo(signX, neon.y + 4)
      ctx.lineTo(signX, groundY - 10)
      ctx.strokeStyle = finalColor
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.shadowBlur = 0
    })
  })
}

const drawRoad = () => {
  if (!ctx) return
  
  const groundY = height * 0.7
  const roadHeight = height * 0.3
  const intensity = props.lightIntensity
  
  const roadGradient = ctx.createLinearGradient(0, groundY, 0, height)
  roadGradient.addColorStop(0, `rgba(25, 25, 30, 1)`)
  roadGradient.addColorStop(1, `rgba(15, 15, 20, 1)`)
  
  ctx.fillStyle = roadGradient
  ctx.fillRect(0, groundY, width, roadHeight)
  
  ctx.setLineDash([30, 20])
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * intensity})`
  ctx.lineWidth = 2
  
  for (let i = 1; i < 4; i++) {
    const laneY = groundY + i * 25
    ctx.beginPath()
    ctx.moveTo(0, laneY)
    ctx.lineTo(width, laneY)
    ctx.stroke()
  }
  ctx.setLineDash([])
}

const drawCars = () => {
  if (!ctx) return
  
  const intensity = props.lightIntensity
  
  cars.forEach(car => {
    car.trail.forEach((point, index) => {
      const trailAlpha = (index / car.trail.length) * 0.8
      const carColor = car.direction === 1 
        ? `rgba(255, 50, 50, ${trailAlpha * intensity})`
        : `rgba(255, 255, 200, ${trailAlpha * intensity})`
      
      ctx.beginPath()
      ctx.arc(point.x, car.lane, 3 * (index / car.trail.length + 0.5), 0, Math.PI * 2)
      ctx.fillStyle = carColor
      ctx.fill()
    })
    
    const isRed = car.direction === 1
    const headlightColor = isRed 
      ? `rgba(255, 50, 50, ${intensity})`
      : `rgba(255, 255, 200, ${intensity})`
    
    ctx.shadowColor = headlightColor
    ctx.shadowBlur = 10 * intensity
    
    ctx.fillStyle = isRed ? `rgba(255, 30, 30, ${intensity})` : `rgba(255, 255, 180, ${intensity})`
    ctx.beginPath()
    ctx.arc(car.x, car.lane, 5, 0, Math.PI * 2)
    ctx.fill()
    
    const lightBeamLength = isRed ? 0 : 60
    if (lightBeamLength > 0) {
      const beamGradient = ctx.createLinearGradient(
        car.x, car.lane,
        car.x + lightBeamLength * car.direction, car.lane
      )
      beamGradient.addColorStop(0, `rgba(255, 255, 200, ${0.3 * intensity})`)
      beamGradient.addColorStop(1, 'rgba(255, 255, 200, 0)')
      
      ctx.beginPath()
      ctx.moveTo(car.x, car.lane - 3)
      ctx.lineTo(car.x + lightBeamLength * car.direction, car.lane - 15)
      ctx.lineTo(car.x + lightBeamLength * car.direction, car.lane + 15)
      ctx.lineTo(car.x, car.lane + 3)
      ctx.closePath()
      ctx.fillStyle = beamGradient
      ctx.fill()
    }
    
    ctx.shadowBlur = 0
  })
}

const drawCityGlow = () => {
  if (!ctx) return
  
  const groundY = height * 0.7
  const intensity = props.lightIntensity
  const neonColor = parseColor(props.neonColor)
  
  const glowGradient = ctx.createRadialGradient(
    width / 2, groundY, 0,
    width / 2, groundY - 100, width
  )
  glowGradient.addColorStop(0, `rgba(${neonColor.r}, ${neonColor.g}, ${neonColor.b}, ${0.15 * intensity})`)
  glowGradient.addColorStop(0.5, `rgba(${Math.round(neonColor.r * 0.5)}, ${Math.round(neonColor.g * 0.5)}, ${Math.round(neonColor.b * 0.5)}, ${0.08 * intensity})`)
  glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  
  ctx.fillStyle = glowGradient
  ctx.fillRect(0, 0, width, groundY)
}

const update = () => {
  time += 0.016
  
  const maxCars = Math.floor(props.trafficDensity * 20) + 5
  if (cars.length < maxCars && Math.random() < 0.05 + props.trafficDensity * 0.1) {
    spawnCar()
  }
  
  cars = cars.filter(car => {
    car.trail.unshift({ x: car.x, opacity: 1 })
    if (car.trail.length > car.maxTrailLength) {
      car.trail.pop()
    }
    
    car.x += car.speed
    
    return car.x > -50 && car.x < width + 50
  })
}

const render = () => {
  if (!ctx) return
  
  ctx.fillStyle = '#0a0a0f'
  ctx.fillRect(0, 0, width, height)
  
  drawSky()
  drawStars()
  drawMoon()
  drawCityGlow()
  drawBuildings()
  drawRoad()
  drawCars()
  
  update()
  
  animationFrameId = requestAnimationFrame(render)
}

const init = () => {
  if (!canvasRef.value) return
  
  ctx = canvasRef.value.getContext('2d')
  if (!ctx) return
  
  width = canvasRef.value.width
  height = canvasRef.value.height
  
  generateStars()
  generateBuildings()
  cars = []
}

const handleResize = () => {
  if (!canvasRef.value) return
  
  const container = canvasRef.value.parentElement
  if (!container) return
  
  canvasRef.value.width = container.clientWidth
  canvasRef.value.height = container.clientHeight
  
  init()
}

watch(() => [props.lightIntensity, props.neonColor, props.trafficDensity], () => {}, { deep: true })

onMounted(() => {
  nextTick(() => {
    handleResize()
    render()
  })
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="w-full h-full"
  ></canvas>
</template>

<style scoped>
</style>
