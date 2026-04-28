import { Dropdown } from 'primereact/dropdown'
import { Slider } from 'primereact/slider'
import { InputSwitch } from 'primereact/inputswitch'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { colorSchemes } from '../utils/colorSchemes.js'

const shapeTypes = [
  { label: '圆形', value: 'circle' },
  { label: '方形', value: 'square' },
  { label: '三角形', value: 'triangle' },
  { label: '星形', value: 'star' },
  { label: '线条', value: 'line' },
  { label: '多边形', value: 'polygon' },
  { label: '混合', value: 'mixed' }
]

const layoutTypes = [
  { label: '随机', value: 'random' },
  { label: '网格', value: 'grid' },
  { label: '径向', value: 'radial' },
  { label: '螺旋', value: 'spiral' }
]

const colorSchemeOptions = Object.entries(colorSchemes).map(([key, value]) => ({
  label: value.name,
  value: key,
  colors: value.colors
}))

function ControlPanel({ params, updateParam, regenerate, resetParams, currentColors }) {
  return (
    <div className="w-full md:w-96 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        控制面板
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          形状类型
        </label>
        <Dropdown
          value={params.shapeType}
          options={shapeTypes}
          onChange={(e) => updateParam('shapeType', e.value)}
          className="w-full"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          布局方式
        </label>
        <Dropdown
          value={params.layout}
          options={layoutTypes}
          onChange={(e) => {
            updateParam('layout', e.value)
            regenerate()
          }}
          className="w-full"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          配色方案
        </label>
        <Dropdown
          value={params.colorScheme}
          options={colorSchemeOptions}
          onChange={(e) => updateParam('colorScheme', e.value)}
          className="w-full"
          itemTemplate={(option) => (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {option.colors.slice(0, 3).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>{option.label}</span>
            </div>
          )}
        />
        <div className="mt-2 flex gap-1">
          {currentColors.colors.map((color, idx) => (
            <div
              key={idx}
              className="flex-1 h-6 rounded border border-gray-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <Divider className="my-4" />

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          形状数量: {params.shapeCount}
        </label>
        <Slider
          value={params.shapeCount}
          onChange={(e) => {
            updateParam('shapeCount', e.value)
            regenerate()
          }}
          min={10}
          max={200}
          step={5}
          className="w-full"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          最小尺寸: {params.minSize}px
        </label>
        <Slider
          value={params.minSize}
          onChange={(e) => updateParam('minSize', e.value)}
          min={5}
          max={50}
          className="w-full"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          最大尺寸: {params.maxSize}px
        </label>
        <Slider
          value={params.maxSize}
          onChange={(e) => updateParam('maxSize', e.value)}
          min={30}
          max={150}
          className="w-full"
        />
      </div>

      <Divider className="my-4" />

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          动画速度: {params.animationSpeed}
        </label>
        <Slider
          value={params.animationSpeed}
          onChange={(e) => updateParam('animationSpeed', e.value)}
          min={0.1}
          max={5}
          step={0.1}
          className="w-full"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          透明度: {Math.round(params.opacity * 100)}%
        </label>
        <Slider
          value={params.opacity}
          onChange={(e) => updateParam('opacity', e.value)}
          min={0.1}
          max={1}
          step={0.05}
          className="w-full"
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          启用动画
        </label>
        <InputSwitch
          checked={params.isAnimating}
          onChange={(e) => updateParam('isAnimating', e.value)}
        />
      </div>

      <Divider className="my-4" />

      <div className="flex flex-col gap-3">
        <Button
          label="重新生成"
          icon="pi pi-refresh"
          onClick={regenerate}
          className="w-full"
          severity="primary"
        />
        <Button
          label="重置参数"
          icon="pi pi-undo"
          onClick={resetParams}
          className="w-full"
          severity="secondary"
          outlined
        />
      </div>

      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          使用说明
        </h3>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>• 调整参数实时预览效果</li>
          <li>• 点击"重新生成"创建新的随机布局</li>
          <li>• 选择不同配色方案改变视觉风格</li>
          <li>• 关闭动画可以暂停当前画面</li>
        </ul>
      </div>
    </div>
  )
}

export default ControlPanel
