export type BuildingCategory = 'academic' | 'dormitory' | 'library' | 'sports' | 'admin' | 'dining'

export interface Building {
  id: string
  name: string
  nameEn: string
  category: BuildingCategory
  x: number
  y: number
  width: number
  height: number
  description: string
}

export interface Route {
  id: string
  name: string
  from: string
  to: string
  path: { x: number; y: number }[]
  color: string
}

export interface MapState {
  zoom: number
  offsetX: number
  offsetY: number
}

export const buildingCategoryLabels: Record<BuildingCategory, string> = {
  academic: '教学楼',
  dormitory: '宿舍楼',
  library: '图书馆',
  sports: '体育馆',
  admin: '行政楼',
  dining: '食堂',
}

export const buildingCategoryColors: Record<BuildingCategory, string> = {
  academic: '#3b82f6',
  dormitory: '#10b981',
  library: '#f59e0b',
  sports: '#ef4444',
  admin: '#8b5cf6',
  dining: '#ec4899',
}
