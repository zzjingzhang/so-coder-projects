import { useRef, useEffect, useCallback } from 'react'
import { getRandomColor, hexToRgba } from '../utils/colorSchemes.js'

function ArtCanvas({ params, colors }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const shapesRef = useRef([])
  const timeRef = useRef(0)

  const createShape = useCallback((width, height, index, total) => {
    const { minSize, maxSize, layout, shapeType } = params
    let x, y
    
    const size = minSize + Math.random() * (maxSize - minSize)
    
    switch (layout) {
      case 'grid':
        const cols = Math.ceil(Math.sqrt(total))
        const row = Math.floor(index / cols)
        const col = index % cols
        x = (width / (cols + 1)) * (col + 1)
        y = (height / (Math.ceil(total / cols) + 1)) * (row + 1)
        break
      case 'radial':
        const angle = (index / total) * Math.PI * 2
        const radius = Math.min(width, height) * 0.3 * (0.5 + Math.random() * 0.5)
        x = width / 2 + Math.cos(angle) * radius
        y = height / 2 + Math.sin(angle) * radius
        break
      case 'spiral':
        const spiralAngle = (index / total) * Math.PI * 4
        const spiralRadius = (index / total) * Math.min(width, height) * 0.4
        x = width / 2 + Math.cos(spiralAngle) * spiralRadius
        y = height / 2 + Math.sin(spiralAngle) * spiralRadius
        break
      default:
        x = Math.random() * width
        y = Math.random() * height
    }

    const velocity = {
      x: (Math.random() - 0.5) * params.animationSpeed,
      y: (Math.random() - 0.5) * params.animationSpeed,
      rotation: (Math.random() - 0.5) * 0.02 * params.animationSpeed
    }

    const shape = {
      x,
      y,
      size,
      originalSize: size,
      color: getRandomColor(colors.colors),
      type: shapeType,
      velocity,
      rotation: Math.random() * Math.PI * 2,
      phase: Math.random() * Math.PI * 2,
      sizeVariation: 0.2 + Math.random() * 0.3
    }

    return shape
  }, [params, colors])

  const drawShape = useCallback((ctx, shape) => {
    ctx.save()
    ctx.translate(shape.x, shape.y)
    ctx.rotate(shape.rotation)
    ctx.fillStyle = hexToRgba(shape.color, params.opacity)
    ctx.strokeStyle = hexToRgba(shape.color, params.opacity * 1.5)
    ctx.lineWidth = 2

    const size = shape.size

    switch (shape.type) {
      case 'circle':
        ctx.beginPath()
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        break
      case 'square':
        ctx.fillRect(-size / 2, -size / 2, size, size)
        ctx.strokeRect(-size / 2, -size / 2, size, size)
        break
      case 'triangle':
        ctx.beginPath()
        ctx.moveTo(0, -size / 2)
        ctx.lineTo(size / 2, size / 2)
        ctx.lineTo(-size / 2, size / 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break
      case 'star':
        const points = 5
        const outerRadius = size / 2
        const innerRadius = size / 4
        ctx.beginPath()
        for (let i = 0; i < points * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const angle = (i * Math.PI) / points - Math.PI / 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break
      case 'line':
        ctx.beginPath()
        ctx.moveTo(-size / 2, 0)
        ctx.lineTo(size / 2, 0)
        ctx.lineWidth = 3
        ctx.stroke()
        break
      case 'polygon':
        const sides = 6
        ctx.beginPath()
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides - Math.PI / 2
          const x = Math.cos(angle) * size / 2
          const y = Math.sin(angle) * size / 2
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        break
      default:
        ctx.beginPath()
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        ctx.fill()
    }

    ctx.restore()
  }, [params.opacity])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, width, height)

    timeRef.current += 0.01 * params.animationSpeed

    if (params.isAnimating) {
      shapesRef.current.forEach((shape) => {
        shape.x += shape.velocity.x
        shape.y += shape.velocity.y
        shape.rotation += shape.velocity.rotation

        const sizePulse = 1 + Math.sin(timeRef.current * 2 + shape.phase) * shape.sizeVariation
        shape.size = shape.originalSize * sizePulse

        if (shape.x < 0 || shape.x > width) shape.velocity.x *= -1
        if (shape.y < 0 || shape.y > height) shape.velocity.y *= -1
      })
    }

    shapesRef.current.forEach((shape) => {
      drawShape(ctx, shape)
    })

    if (params.isAnimating) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [colors, params, drawShape])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      shapesRef.current = []
      for (let i = 0; i < params.shapeCount; i++) {
        shapesRef.current.push(createShape(canvas.width, canvas.height, i, params.shapeCount))
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [params.shapeCount, createShape])

  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const types = ['circle', 'square', 'triangle', 'star', 'line', 'polygon']
    shapesRef.current = shapesRef.current.map((shape, index) => ({
      ...shape,
      type: params.shapeType === 'mixed' 
        ? types[Math.floor(Math.random() * types.length)]
        : params.shapeType,
      color: getRandomColor(colors.colors)
    }))
  }, [params.shapeType, colors.colors])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  )
}

export default ArtCanvas
