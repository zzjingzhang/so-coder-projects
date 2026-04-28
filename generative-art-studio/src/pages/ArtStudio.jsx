import { useState, useCallback } from 'react'
import ArtCanvas from '../components/ArtCanvas.jsx'
import ControlPanel from '../components/ControlPanel.jsx'
import { colorSchemes } from '../utils/colorSchemes.js'

const defaultParams = {
  shapeType: 'circle',
  colorScheme: 'sunset',
  shapeCount: 50,
  minSize: 10,
  maxSize: 80,
  animationSpeed: 2,
  opacity: 0.8,
  isAnimating: true,
  layout: 'random'
}

function ArtStudio() {
  const [params, setParams] = useState(defaultParams)
  const [canvasKey, setCanvasKey] = useState(0)

  const updateParam = useCallback((key, value) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }, [])

  const regenerate = useCallback(() => {
    setCanvasKey(prev => prev + 1)
  }, [])

  const resetParams = useCallback(() => {
    setParams(defaultParams)
    setCanvasKey(prev => prev + 1)
  }, [])

  const currentColors = colorSchemes[params.colorScheme]

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 relative overflow-hidden">
        <ArtCanvas 
          key={canvasKey}
          params={params}
          colors={currentColors}
        />
        <div className="absolute top-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            生成式艺术工作室
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            实时调整参数，创造独特的抽象艺术
          </p>
        </div>
      </div>
      
      <ControlPanel 
        params={params}
        updateParam={updateParam}
        regenerate={regenerate}
        resetParams={resetParams}
        currentColors={currentColors}
      />
    </div>
  )
}

export default ArtStudio
