export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
}

export interface Category {
  id: string
  name: string
  description: string
  imageUrl: string
  soundCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Sound {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  fileUrl: string
  duration: number
  format: string
  size: number
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface DashboardStats {
  totalSounds: number
  totalCategories: number
  categoriesWithSounds: { categoryId: string; categoryName: string; soundCount: number }[]
}

export interface FormErrors {
  [key: string]: string
}

export interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error'
  summary: string
  detail?: string
}
