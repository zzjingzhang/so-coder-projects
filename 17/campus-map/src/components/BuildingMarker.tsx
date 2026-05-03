import type { Building } from '@/types'
import { buildingCategoryColors } from '@/types'

interface BuildingMarkerProps {
  building: Building
  scale: number
  onHover: (building: Building | null) => void
  isHovered: boolean
  onClick: (building: Building) => void
}

export function BuildingMarker({
  building,
  scale,
  onHover,
  isHovered,
  onClick,
}: BuildingMarkerProps) {
  const color = buildingCategoryColors[building.category]

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => onHover(building)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(building)}
    >
      <rect
        x={building.x}
        y={building.y}
        width={building.width}
        height={building.height}
        fill={color}
        opacity={isHovered ? 0.9 : 0.7}
        stroke={isHovered ? '#1f2937' : color}
        strokeWidth={isHovered ? 3 / scale : 1.5 / scale}
        rx={4}
        className="transition-all duration-200"
      />
      <text
        x={building.x + building.width / 2}
        y={building.y + building.height / 2 - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize={Math.max(10, 12 / scale)}
        fontWeight="bold"
        className="select-none pointer-events-none"
      >
        {building.name}
      </text>
      <text
        x={building.x + building.width / 2}
        y={building.y + building.height / 2 + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize={Math.max(8, 10 / scale)}
        opacity={0.9}
        className="select-none pointer-events-none"
      >
        {building.nameEn}
      </text>
      {isHovered && (
        <>
          <circle
            cx={building.x + building.width / 2}
            cy={building.y + building.height / 2}
            r={Math.max(building.width, building.height) * 0.8}
            fill="none"
            stroke={color}
            strokeWidth={2 / scale}
            className="animate-pulse-ring"
            opacity={0.5}
          />
        </>
      )}
    </g>
  )
}
