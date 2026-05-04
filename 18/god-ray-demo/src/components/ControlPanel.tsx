import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Sun, Zap, Wind, Maximize2, Layers, RotateCcw } from 'lucide-react'

interface ControlParams {
  lightX: number
  lightY: number
  rayDensity: number
  attenuation: number
  lightIntensity: number
  raySpread: number
}

interface ControlPanelProps {
  params: ControlParams
  setParams: (params: ControlParams) => void
  canvasWidth: number
  canvasHeight: number
}

const defaultParams: ControlParams = {
  lightX: 400,
  lightY: 300,
  rayDensity: 24,
  attenuation: 1.5,
  lightIntensity: 0.8,
  raySpread: 0.5
}

const ControlPanel = ({ params, setParams, canvasWidth, canvasHeight }: ControlPanelProps) => {
  const handleReset = () => {
    setParams({
      ...defaultParams,
      lightX: canvasWidth / 2,
      lightY: canvasHeight / 2
    })
  }

  const handleRandomize = () => {
    setParams({
      lightX: Math.random() * canvasWidth,
      lightY: Math.random() * canvasHeight,
      rayDensity: Math.floor(Math.random() * 60) + 8,
      attenuation: Math.random() * 2.5 + 0.5,
      lightIntensity: Math.random() * 0.5 + 0.5,
      raySpread: Math.random() * 0.8 + 0.1
    })
  }

  return (
    <Card className="w-full bg-slate-900/90 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Sun className="w-6 h-6 text-yellow-400" />
          体积光控制面板
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 光源位置 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-blue-400" />
            <Label className="text-sm font-medium text-slate-300">光源位置</Label>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>X 坐标</span>
                <span className="font-mono text-blue-400">{Math.round(params.lightX)}</span>
              </div>
              <Slider
                value={[params.lightX]}
                min={0}
                max={canvasWidth}
                step={1}
                onValueChange={([value]) => setParams({ ...params, lightX: value })}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Y 坐标</span>
                <span className="font-mono text-blue-400">{Math.round(params.lightY)}</span>
              </div>
              <Slider
                value={[params.lightY]}
                min={0}
                max={canvasHeight}
                step={1}
                onValueChange={([value]) => setParams({ ...params, lightY: value })}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 光束密度 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <div className="flex-1 flex justify-between">
              <Label className="text-sm font-medium text-slate-300">光束密度</Label>
              <span className="font-mono text-xs text-purple-400">{Math.round(params.rayDensity)}</span>
            </div>
          </div>
          <Slider
            value={[params.rayDensity]}
            min={4}
            max={80}
            step={1}
            onValueChange={([value]) => setParams({ ...params, rayDensity: value })}
            className="cursor-pointer"
          />
          <p className="text-xs text-slate-500">控制光线的数量和密集程度</p>
        </div>

        {/* 衰减系数 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-green-400" />
            <div className="flex-1 flex justify-between">
              <Label className="text-sm font-medium text-slate-300">衰减系数</Label>
              <span className="font-mono text-xs text-green-400">{params.attenuation.toFixed(2)}</span>
            </div>
          </div>
          <Slider
            value={[params.attenuation]}
            min={0.5}
            max={3.0}
            step={0.1}
            onValueChange={([value]) => setParams({ ...params, attenuation: value })}
            className="cursor-pointer"
          />
          <p className="text-xs text-slate-500">值越大，光线在雾中衰减越快</p>
        </div>

        {/* 光线强度 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <div className="flex-1 flex justify-between">
              <Label className="text-sm font-medium text-slate-300">光线强度</Label>
              <span className="font-mono text-xs text-yellow-400">{(params.lightIntensity * 100).toFixed(0)}%</span>
            </div>
          </div>
          <Slider
            value={[params.lightIntensity]}
            min={0.1}
            max={1.0}
            step={0.05}
            onValueChange={([value]) => setParams({ ...params, lightIntensity: value })}
            className="cursor-pointer"
          />
          <p className="text-xs text-slate-500">控制光源的整体亮度</p>
        </div>

        {/* 光线扩散角度 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-orange-400" />
            <div className="flex-1 flex justify-between">
              <Label className="text-sm font-medium text-slate-300">光线扩散</Label>
              <span className="font-mono text-xs text-orange-400">{(params.raySpread * 100).toFixed(0)}%</span>
            </div>
          </div>
          <Slider
            value={[params.raySpread]}
            min={0.1}
            max={1.0}
            step={0.05}
            onValueChange={([value]) => setParams({ ...params, raySpread: value })}
            className="cursor-pointer"
          />
          <p className="text-xs text-slate-500">控制每条光线的扩散角度</p>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleReset}
            variant="secondary"
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重置参数
          </Button>
          <Button
            onClick={handleRandomize}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            随机参数
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ControlPanel
