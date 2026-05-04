import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import {
  ArrowRightOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'

const MotionPaths = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = 600

    const resize = () => {
      width = window.innerWidth
      height = 600
      canvas.width = width
      canvas.height = height
    }

    resize()
    window.addEventListener('resize', resize)

    const particles = []
    const paths = []

    const createPath = () => {
      const points = []
      const startX = Math.random() * width
      const startY = Math.random() * height
      const numPoints = 5 + Math.floor(Math.random() * 8)

      points.push({ x: startX, y: startY })

      for (let i = 1; i < numPoints; i++) {
        const prev = points[i - 1]
        const angle = Math.random() * Math.PI * 2
        const distance = 80 + Math.random() * 150
        points.push({
          x: Math.max(0, Math.min(width, prev.x + Math.cos(angle) * distance)),
          y: Math.max(0, Math.min(height, prev.y + Math.sin(angle) * distance))
        })
      }

      paths.push({
        points,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        color: `rgba(236, 72, 153, ${0.3 + Math.random() * 0.4})`,
        lineWidth: 1 + Math.random() * 2
      })
    }

    const createParticle = (x, y) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        decay: 0.01 + Math.random() * 0.02,
        size: 2 + Math.random() * 4,
        color: `rgba(236, 72, 153, ${0.6 + Math.random() * 0.4})`
      })
    }

    for (let i = 0; i < 8; i++) {
      createPath()
    }

    const drawSmoothPath = (points, progress, color, lineWidth) => {
      if (points.length < 2) return

      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      const totalSegments = points.length - 1
      const currentProgress = progress * totalSegments
      const segmentIndex = Math.min(Math.floor(currentProgress), totalSegments - 1)
      const segmentProgress = currentProgress - segmentIndex

      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 0; i <= segmentIndex; i++) {
        if (i === segmentIndex) {
          const start = points[i]
          const end = points[i + 1] || points[i]
          const x = start.x + (end.x - start.x) * segmentProgress
          const y = start.y + (end.y - start.y) * segmentProgress
          ctx.lineTo(x, y)

          if (Math.random() < 0.3) {
            createParticle(x, y)
          }
        } else {
          ctx.lineTo(points[i + 1].x, points[i + 1].y)
        }
      }

      ctx.stroke()

      if (segmentIndex >= 0 && segmentIndex < points.length - 1) {
        const start = points[segmentIndex]
        const end = points[segmentIndex + 1]
        const x = start.x + (end.x - start.x) * segmentProgress
        const y = start.y + (end.y - start.y) * segmentProgress

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15)
        gradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)')
        gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.3)')
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0)')

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(x, y, 15, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = '#ec4899'
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, width, height)

      paths.forEach((path, index) => {
        drawSmoothPath(path.points, path.progress, path.color, path.lineWidth)
        path.progress += path.speed

        if (path.progress >= 1) {
          paths.splice(index, 1)
          createPath()
        }
      })

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.fillStyle = p.color.replace(/[\d\.]+\)$/, `${p.life})`)
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      }

      if (Math.random() < 0.02 && paths.length < 12) {
        createPath()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      <MotionPaths />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-pink-400 text-sm font-medium">专业舞蹈教育 · 15年品质</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">释放身心</span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
                舞动灵魂
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
              探索当代舞蹈的无限可能。我们提供专业的现代舞、爵士舞、街舞等多种课程，
              无论您是初学者还是有经验的舞者，都能在这里找到属于自己的舞台。
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/schedule">
                <Button
                  type="primary"
                  size="large"
                  className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300"
                  icon={<ArrowRightOutlined style={{ fontSize: '20px' }} />}
                  iconPosition="end"
                >
                  立即预约课程
                </Button>
              </Link>
              <Button
                size="large"
                className="h-14 px-8 text-base font-semibold bg-transparent border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400 hover:text-pink-300 transition-all duration-300"
                icon={<PlayCircleOutlined style={{ fontSize: '20px' }} />}
              >
                观看介绍视频
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-pink-500">5000+</div>
                <div className="text-sm text-gray-400 mt-1">学员信赖</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-pink-500">50+</div>
                <div className="text-sm text-gray-400 mt-1">专业导师</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-pink-500">100+</div>
                <div className="text-sm text-gray-400 mt-1">精品课程</div>
              </div>
            </div>
          </div>

          <div className={`hidden lg:block ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-3xl blur-xl" />
              
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">今日热门课程</h3>
                    <span className="text-xs text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full">HOT</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { time: '09:00', name: '现代舞基础', instructor: '李梦', spots: 3, level: '初级' },
                      { time: '14:00', name: '爵士舞进阶', instructor: '张伟', spots: 2, level: '中级' },
                      { time: '19:00', name: '街舞入门', instructor: '王芳', spots: 5, level: '初级' },
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                            {course.time.split(':')[0]}
                          </div>
                          <div>
                            <div className="font-medium text-white group-hover:text-pink-400 transition-colors">
                              {course.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              导师: {course.instructor}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">剩余名额</div>
                          <div className="text-lg font-bold text-pink-400">{course.spots}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to="/schedule" className="block">
                    <div className="flex items-center justify-center space-x-2 p-4 rounded-xl border-2 border-dashed border-gray-700 hover:border-pink-500 text-gray-400 hover:text-pink-400 transition-all cursor-pointer">
                      <span>查看完整课程表</span>
                      <ArrowRightOutlined style={{ fontSize: '16px' }} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
        <span className="text-xs text-gray-500 tracking-widest">向下滚动</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-pink-500 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero
