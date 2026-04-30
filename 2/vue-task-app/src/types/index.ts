export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateTaskDto {
  title: string
  description?: string
}

export interface UpdateTaskDto {
  title?: string
  description?: string
  completed?: boolean
}

export interface DessertItem {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
  iron: string
}
