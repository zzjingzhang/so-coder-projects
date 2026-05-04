import { useEffect, useRef } from 'react'

interface GodRayParams {
  lightX: number
  lightY: number
  rayDensity: number
  attenuation: number
  lightIntensity: number
  raySpread: number
}

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  direction: number
}

const GodRayCanvas = ({ 
  lightX, 
  lightY, 
  rayDensity, 
  attenuation, 
  lightIntensity, 
  raySpread 
}: GodRayParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.5 + 0.1,
          direction: Math.random() * Math.PI * 2
        })
      }
    }

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += Math.cos(particle.direction) * particle.speed
        particle.y += Math.sin(particle.direction) * particle.speed

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.direction = Math.PI - particle.direction
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.direction = -particle.direction
        }
      })
    }

    const drawFog = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        const distanceToLight = Math.sqrt(
          Math.pow(particle.x - lightX, 2) + Math.pow(particle.y - lightY, 2)
        )
        const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
        const visibility = Math.max(0, 1 - (distanceToLight / maxDistance) * attenuation)
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 210, 255, ${particle.opacity * visibility * 0.5})`
        ctx.fill()
      })
    }

    const drawGodRays = () => {
      const centerX = lightX
      const centerY = lightY
      const rayCount = Math.floor(rayDensity)
      const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
      
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2
        const rayWidth = (Math.PI * 2 / rayCount) * raySpread
        
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, maxDistance
        )
        
        const startOpacity = lightIntensity * 0.8
        const endOpacity = lightIntensity * 0.05 / attenuation
        
        gradient.addColorStop(0, `rgba(255, 248, 220, ${startOpacity})`)
        gradient.addColorStop(0.1, `rgba(255, 240, 200, ${startOpacity * 0.8})`)
        gradient.addColorStop(0.3, `rgba(255, 230, 180, ${startOpacity * 0.5})`)
        gradient.addColorStop(0.6, `rgba(255, 220, 160, ${endOpacity * 2})`)
        gradient.addColorStop(1, `rgba(255, 210, 140, ${endOpacity})`)

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, maxDistance, angle - rayWidth / 2, angle + rayWidth / 2)
        ctx.closePath()
        
        ctx.fillStyle = gradient
        ctx.fill()
      }

      ctx.restore()
    }

    const drawLightSource = () => {
      const gradient = ctx.createRadialGradient(
        lightX, lightY, 0,
        lightX, lightY, 60
      )
      
      gradient.addColorStop(0, `rgba(255, 255, 255, ${lightIntensity})`)
      gradient.addColorStop(0.1, `rgba(255, 250, 230, ${lightIntensity * 0.8})`)
      gradient.addColorStop(0.3, `rgba(255, 240, 200, ${lightIntensity * 0.5})`)
      gradient.addColorStop(0.6, `rgba(255, 230, 180, ${lightIntensity * 0.2})`)
      gradient.addColorStop(1, 'rgba(255, 220, 160, 0)')

      ctx.beginPath()
      ctx.arc(lightX, lightY, 60, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(lightX, lightY, 8, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${lightIntensity})`
      ctx.fill()
    }

    const render = () => {
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      updateParticles()
      drawFog()
      drawGodRays()
      drawLightSource()

      animationRef.current = requestAnimationFrame(render)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [lightX, lightY, rayDensity, attenuation, lightIntensity, raySpread])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full rounded-lg"
    />
  )
}

export default GodRayCanvas
