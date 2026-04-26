import { ref, type Ref } from 'vue'

export interface FluidParams {
  viscosity: number
  gravity: number
  amplitude: number
}

export function useFluidSimulation(
  canvasRef: Ref<HTMLCanvasElement | null>,
  params: Ref<FluidParams>
) {
  const isRunning = ref(false)
  const animationId = ref<number | null>(null)
  
  let width = 0
  let height = 0
  let current: number[] = []
  let previous: number[] = []
  let ctx: CanvasRenderingContext2D | null = null
  
  const GRID_SIZE = 4
  let cols = 0
  let rows = 0
  
  const initSimulation = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    
    ctx = canvas.getContext('2d')
    if (!ctx) return
    
    width = canvas.width
    height = canvas.height
    
    cols = Math.floor(width / GRID_SIZE)
    rows = Math.floor(height / GRID_SIZE)
    
    const size = cols * rows
    current = new Array(size).fill(0)
    previous = new Array(size).fill(0)
    
    addRandomWaves()
  }
  
  const getIndex = (x: number, y: number): number => {
    return y * cols + x
  }
  
  const addRipple = (centerX: number, centerY: number, radius: number = 5, strength: number = 1) => {
    const gridX = Math.floor(centerX / GRID_SIZE)
    const gridY = Math.floor(centerY / GRID_SIZE)
    
    const actualStrength = strength * params.value.amplitude
    
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const x = gridX + dx
        const y = gridY + dy
        
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist <= radius) {
            const factor = 1 - dist / radius
            const idx = getIndex(x, y)
            previous[idx] += actualStrength * factor * 50
          }
        }
      }
    }
  }
  
  const addRandomWaves = () => {
    const numWaves = 3
    for (let i = 0; i < numWaves; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      addRipple(x, y, 8, 1)
    }
  }
  
  const updateSimulation = () => {
    const { viscosity, gravity } = params.value
    
    for (let y = 1; y < rows - 1; y++) {
      for (let x = 1; x < cols - 1; x++) {
        const idx = getIndex(x, y)
        
        const avg = (
          current[getIndex(x - 1, y)] +
          current[getIndex(x + 1, y)] +
          current[getIndex(x, y - 1)] +
          current[getIndex(x, y + 1)]
        ) / 2 - previous[idx]
        
        previous[idx] = current[idx]
        current[idx] = avg
        
        current[idx] *= 1 - viscosity * 0.001
        current[idx] -= gravity * 0.01
      }
    }
  }
  
  const render = () => {
    if (!ctx) return
    
    const imageData = ctx.createImageData(width, height)
    const data = imageData.data
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const gridX = Math.floor(x / GRID_SIZE)
        const gridY = Math.floor(y / GRID_SIZE)
        
        if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
          const idx = getIndex(gridX, gridY)
          const value = current[idx]
          
          const normalizedValue = Math.max(-1, Math.min(1, value / 100))
          
          let r, g, b
          
          if (normalizedValue > 0) {
            r = Math.floor(6 + normalizedValue * 100)
            g = Math.floor(182 + normalizedValue * 50)
            b = Math.floor(212 + normalizedValue * 43)
          } else {
            r = Math.floor(6 + normalizedValue * 6)
            g = Math.floor(100 + normalizedValue * 50)
            b = Math.floor(150 + normalizedValue * 50)
          }
          
          const pixelIdx = (y * width + x) * 4
          data[pixelIdx] = r
          data[pixelIdx + 1] = g
          data[pixelIdx + 2] = b
          data[pixelIdx + 3] = 255
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0)
  }
  
  const animate = () => {
    if (!isRunning.value) return
    
    updateSimulation()
    render()
    
    animationId.value = requestAnimationFrame(animate)
  }
  
  const start = () => {
    if (isRunning.value) return
    
    initSimulation()
    isRunning.value = true
    animate()
  }
  
  const stop = () => {
    isRunning.value = false
    if (animationId.value !== null) {
      cancelAnimationFrame(animationId.value)
      animationId.value = null
    }
  }
  
  const reset = () => {
    const size = cols * rows
    current = new Array(size).fill(0)
    previous = new Array(size).fill(0)
    addRandomWaves()
  }
  
  const handleCanvasClick = (event: MouseEvent) => {
    const canvas = canvasRef.value
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY
    
    addRipple(x, y, 6, 1.5)
  }
  
  const handleCanvasMouseMove = (event: MouseEvent) => {
    if (event.buttons !== 1) return
    
    const canvas = canvasRef.value
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY
    
    addRipple(x, y, 3, 0.8)
  }
  
  return {
    isRunning,
    start,
    stop,
    reset,
    handleCanvasClick,
    handleCanvasMouseMove,
    addRandomWaves
  }
}
