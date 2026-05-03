import { buildingCategoryColors, buildingCategoryLabels } from '@/types'
import type { BuildingCategory } from '@/types'

interface BuildingLegendProps {
  selectedCategory: BuildingCategory | 'all'
  onCategorySelect: (category: BuildingCategory | 'all') => void
}

export function BuildingLegend({
  selectedCategory,
  onCategorySelect,
}: BuildingLegendProps) {
  const categories: (BuildingCategory | 'all')[] = [
    'all',
    'academic',
    'dormitory',
    'library',
    'sports',
    'admin',
    'dining',
  ]

  const getCategoryLabel = (category: BuildingCategory | 'all') => {
    if (category === 'all') return '全部建筑'
    return buildingCategoryLabels[category]
  }

  const getCategoryColor = (category: BuildingCategory | 'all') => {
    if (category === 'all') return '#6b7280'
    return buildingCategoryColors[category]
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">建筑类型</h3>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-left ${selectedCategory === category ? 'bg-gray-100 ring-2 ring-gray-300' : 'hover:bg-gray-50'}`}
          >
            <div
              className="w-4 h-4 rounded-md flex-shrink-0"
              style={{ backgroundColor: getCategoryColor(category) }}
            />
            <span
              className={`text-sm ${selectedCategory === category ? 'font-medium text-gray-900' : 'text-gray-600'}`}
            >
              {getCategoryLabel(category)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
