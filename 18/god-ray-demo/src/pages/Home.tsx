import { useState, useEffect, useRef } from 'react'
import GodRayCanvas from '@/components/GodRayCanvas'
import ControlPanel from '@/components/ControlPanel'
import { Sun, Info, Layers } from 'lucide-react'

interface ControlParams {
  lightX: number
  lightY: number
  rayDensity: number
  attenuation: number
  lightIntensity: number
  raySpread: number
}

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })

  const [params, setParams] = useState<ControlParams>({
    lightX: 400,
    lightY: 300,
    rayDensity: 24,
    attenuation: 1.5,
    lightIntensity: 0.8,
    raySpread: 0.5
  })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setCanvasSize({
          width: rect.width,
          height: rect.height
        })
        setParams(prev => ({
          ...prev,
          lightX: rect.width / 2,
          lightY: rect.height / 2
        }))
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setParams(prev => ({
        ...prev,
        lightX: e.clientX - rect.left,
        lightY: e.clientY - rect.top
      }))
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="w-8 h-8 text-yellow-400 animate-pulse" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  God-Ray 体积光演示
                </h1>
                <p className="text-sm text-slate-400">实时体积光效果模拟器</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
              <Info className="w-4 h-4" />
              <span>点击画布任意位置移动光源</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Canvas Area - 3/4 width on large screens */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-200 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    实时渲染预览
                  </h2>
                  <span className="text-xs text-slate-500">
                    {Math.round(canvasSize.width)} × {Math.round(canvasSize.height)}
                  </span>
                </div>
              </div>
              <div 
                ref={containerRef}
                onClick={handleCanvasClick}
                className="relative h-[500px] md:h-[600px] cursor-crosshair"
              >
                <GodRayCanvas 
                  lightX={params.lightX}
                  lightY={params.lightY}
                  rayDensity={params.rayDensity}
                  attenuation={params.attenuation}
                  lightIntensity={params.lightIntensity}
                  raySpread={params.raySpread}
                />
                {/* Overlay hint */}
                <div className="absolute bottom-4 left-4 right-4 md:hidden">
                  <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-slate-300 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    点击画布任意位置移动光源
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-5">
                <h3 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  体积光技术
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  体积光（God Rays）是一种光学效果，当光线穿过含有微小颗粒的介质（如雾、尘埃）时，光线会被散射形成可见的光束。
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-5">
                <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center text-xs">α</div>
                  衰减原理
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  光线在传播过程中会逐渐衰减，衰减系数决定了光线随距离减弱的速度。值越大，光线传播距离越短。
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-5">
                <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  实时渲染
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  本演示使用 Canvas 2D API 实现实时体积光效果。通过动态生成径向渐变光束，模拟光线在雾中的散射效果。
                </p>
              </div>
            </div>
          </div>

          {/* Control Panel - 1/4 width on large screens */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ControlPanel 
                params={params}
                setParams={setParams}
                canvasWidth={canvasSize.width}
                canvasHeight={canvasSize.height}
              />
              
              {/* Current Values Display */}
              <div className="mt-4 bg-slate-900/50 rounded-xl border border-slate-800 p-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">当前参数</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-800/50 rounded-lg p-2">
                    <span className="text-slate-500">光源 X</span>
                    <div className="font-mono text-blue-400">{Math.round(params.lightX)}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2">
                    <span className="text-slate-500">光源 Y</span>
                    <div className="font-mono text-blue-400">{Math.round(params.lightY)}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2">
                    <span className="text-slate-500">光束数</span>
                    <div className="font-mono text-purple-400">{Math.round(params.rayDensity)}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2">
                    <span className="text-slate-500">衰减</span>
                    <div className="font-mono text-green-400">{params.attenuation.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
            <p>God-Ray 体积光演示 | 使用 React + TypeScript + Canvas 构建</p>
            <p className="mt-2 md:mt-0">提示：点击画布任意位置可快速移动光源</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
