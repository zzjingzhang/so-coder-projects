import { ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'

interface MapControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  canZoomIn: boolean
  canZoomOut: boolean
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  canZoomIn,
  canZoomOut,
}: MapControlsProps) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        className="w-10 h-10 rounded-lg shadow-md bg-white hover:bg-gray-50"
        title="放大"
      >
        <ZoomIn className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        className="w-10 h-10 rounded-lg shadow-md bg-white hover:bg-gray-50"
        title="缩小"
      >
        <ZoomOut className="w-5 h-5" />
      </Button>
      <div className="w-10 h-px bg-gray-200" />
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        className="w-10 h-10 rounded-lg shadow-md bg-white hover:bg-gray-50"
        title="重置视图"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
      <div className="w-10 h-px bg-gray-200" />
      <div className="w-10 h-10 rounded-lg shadow-md bg-white flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing">
        <Move className="w-5 h-5" />
      </div>
    </div>
  )
}
