import type { Route } from '@/types'

interface RouteAnimatorProps {
  route: Route
  scale: number
  isActive: boolean
}

export function RouteAnimator({ route, scale, isActive }: RouteAnimatorProps) {
  if (!isActive || route.path.length < 2) return null

  const pathD = route.path
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`
      return `L ${point.x} ${point.y}`
    })
    .join(' ')

  return (
    <g>
      <path
        d={pathD}
        fill="none"
        stroke={route.color}
        strokeWidth={8 / scale}
        opacity={0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={pathD}
        fill="none"
        stroke={route.color}
        strokeWidth={4 / scale}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animated-path"
      />
      <circle
        cx={route.path[0].x}
        cy={route.path[0].y}
        r={8 / scale}
        fill={route.color}
        stroke="white"
        strokeWidth={2 / scale}
      />
      <circle
        cx={route.path[route.path.length - 1].x}
        cy={route.path[route.path.length - 1].y}
        r={8 / scale}
        fill={route.color}
        stroke="white"
        strokeWidth={2 / scale}
      />
      <text
        x={route.path[0].x}
        y={route.path[0].y - 15 / scale}
        textAnchor="middle"
        fill={route.color}
        fontSize={Math.max(10, 12 / scale)}
        fontWeight="bold"
        className="select-none"
      >
        起点
      </text>
      <text
        x={route.path[route.path.length - 1].x}
        y={route.path[route.path.length - 1].y - 15 / scale}
        textAnchor="middle"
        fill={route.color}
        fontSize={Math.max(10, 12 / scale)}
        fontWeight="bold"
        className="select-none"
      >
        终点
      </text>
    </g>
  )
}
