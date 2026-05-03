import type { Route } from '@/types'
import { MapPin, Navigation } from 'lucide-react'

interface RouteSelectorProps {
  routes: Route[]
  selectedRoute: Route | null
  onRouteSelect: (route: Route | null) => void
}

export function RouteSelector({
  routes,
  selectedRoute,
  onRouteSelect,
}: RouteSelectorProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Navigation className="w-4 h-4" />
        导航路线
      </h3>
      <div className="flex flex-col gap-2">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => onRouteSelect(selectedRoute?.id === route.id ? null : route)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${selectedRoute?.id === route.id ? 'bg-blue-50 ring-2 ring-blue-300' : 'hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-1">
              <MapPin
                className="w-4 h-4 flex-shrink-0"
                style={{ color: route.color }}
              />
              <div
                className="w-4 h-0.5"
                style={{ backgroundColor: route.color }}
              />
              <MapPin
                className="w-4 h-4 flex-shrink-0"
                style={{ color: route.color }}
              />
            </div>
            <span
              className={`text-sm ${selectedRoute?.id === route.id ? 'font-medium text-blue-700' : 'text-gray-600'}`}
            >
              {route.name}
            </span>
          </button>
        ))}
      </div>
      {selectedRoute && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            点击按钮取消选择路线
          </p>
        </div>
      )}
    </div>
  )
}
