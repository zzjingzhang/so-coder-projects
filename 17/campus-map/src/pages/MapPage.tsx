import { useState, useRef, useEffect, useCallback } from 'react'
import { buildings } from '@/data/buildings'
import { routes } from '@/data/routes'
import type { Building, BuildingCategory, Route } from '@/types'
import { buildingCategoryLabels, buildingCategoryColors } from '@/types'
import { BuildingMarker } from '@/components/BuildingMarker'
import { RouteAnimator } from '@/components/RouteAnimator'
import { MapControls } from '@/components/MapControls'
import { BuildingLegend } from '@/components/BuildingLegend'
import { RouteSelector } from '@/components/RouteSelector'
import { X, MapPin } from 'lucide-react'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const MIN_ZOOM = 0.5
const MAX_ZOOM = 2
const ZOOM_STEP = 0.1

export function MapPage() {
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hoveredBuilding, setHoveredBuilding] = useState<Building | null>(null)
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<BuildingCategory | 'all'>('all')
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)

  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
      const newZoom = Math.min(Math.max(zoom + delta, MIN_ZOOM), MAX_ZOOM)

      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const scaleChange = newZoom / zoom
        const newOffsetX = mouseX - (mouseX - offset.x) * scaleChange
        const newOffsetY = mouseY - (mouseY - offset.y) * scaleChange

        setOffset({ x: newOffsetX, y: newOffsetY })
      }

      setZoom(newZoom)
    },
    [zoom, offset]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as SVGElement
      if (target.closest('g')?.classList.contains('cursor-pointer')) return

      setIsDragging(true)
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    },
    [offset]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    },
    [isDragging, dragStart]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM))
  }

  const handleReset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setSelectedBuilding(null)
    setSelectedRoute(null)
    setSelectedCategory('all')
  }

  const filteredBuildings =
    selectedCategory === 'all'
      ? buildings
      : buildings.filter((b) => b.category === selectedCategory)

  useEffect(() => {
    const svg = svgRef.current
    if (svg) {
      svg.addEventListener('wheel', handleWheel, { passive: false })
      return () => svg.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col">
      <header className="bg-white shadow-sm border-b border-slate-200 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">校园地图</h1>
              <p className="text-sm text-gray-500 mt-1">Campus Map System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 h-full">
          <div className="flex gap-8 h-full">
            <div className="w-72 flex-shrink-0 space-y-6">
              <BuildingLegend
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
              <RouteSelector
                routes={routes}
                selectedRoute={selectedRoute}
                onRouteSelect={setSelectedRoute}
              />
            </div>

            <div className="flex-1 h-full min-h-0">
              <div
                ref={containerRef}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden h-full"
              >
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                className={isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <defs>
                  <pattern
                    id="grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                  </pattern>
                  <radialGradient id="centerGlow">
                    <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect
                  width="100%"
                  height="100%"
                  fill="url(#centerGlow)"
                />

                <g
                  transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}
                  style={{ transformOrigin: '0 0' }}
                >
                  <rect
                    x={0}
                    y={0}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    fill="url(#grid)"
                    rx={8}
                  />

                  <rect
                    x={0}
                    y={0}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth={2}
                    rx={8}
                  />

                  <rect
                    x={20}
                    y={100}
                    width={CANVAS_WIDTH - 40}
                    height={CANVAS_HEIGHT - 120}
                    fill="#fefce8"
                    opacity={0.5}
                    rx={4}
                  />

                  {selectedRoute && (
                    <RouteAnimator
                      route={selectedRoute}
                      scale={zoom}
                      isActive={true}
                    />
                  )}

                  {filteredBuildings.map((building) => (
                    <BuildingMarker
                      key={building.id}
                      building={building}
                      scale={zoom}
                      onHover={setHoveredBuilding}
                      isHovered={hoveredBuilding?.id === building.id}
                      onClick={(b) => setSelectedBuilding(b)}
                    />
                  ))}
                </g>
              </svg>

              <div className="absolute top-4 right-4">
                <MapControls
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onReset={handleReset}
                  canZoomIn={zoom < MAX_ZOOM}
                  canZoomOut={zoom > MIN_ZOOM}
                />
              </div>

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                <span className="text-sm text-gray-600">
                  缩放: {Math.round(zoom * 100)}%
                </span>
              </div>

              {hoveredBuilding && !selectedBuilding && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-md flex-shrink-0"
                      style={{
                        backgroundColor:
                          buildingCategoryColors[hoveredBuilding.category],
                      }}
                    />
                    <span className="font-medium text-gray-900">
                      {hoveredBuilding.name}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-500">
                      {buildingCategoryLabels[hoveredBuilding.category]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {hoveredBuilding.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </main>

      {selectedBuilding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div
              className="h-20 relative"
              style={{
                backgroundColor: buildingCategoryColors[selectedBuilding.category],
              }}
            >
              <button
                onClick={() => setSelectedBuilding(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-3 left-5">
                <span className="px-2 py-1 bg-white/20 rounded text-xs text-white font-medium">
                  {buildingCategoryLabels[selectedBuilding.category]}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedBuilding.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedBuilding.nameEn}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  建筑简介
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedBuilding.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">位置:</span>
                    <span>
                      ({selectedBuilding.x}, {selectedBuilding.y})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">尺寸:</span>
                    <span>
                      {selectedBuilding.width} x {selectedBuilding.height}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBuilding(null)}
                className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
