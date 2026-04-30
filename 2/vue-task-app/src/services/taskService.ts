import type { Task, CreateTaskDto, UpdateTaskDto } from '@/types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let mockTasks: Task[] = [
  {
    id: '1',
    title: '学习 Vue 3',
    description: '掌握 Vue 3 的新特性和 Composition API',
    completed: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02')
  },
  {
    id: '2',
    title: '使用 TypeScript',
    description: '在项目中应用 TypeScript 进行类型安全开发',
    completed: false,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '3',
    title: '集成 Pinia',
    description: '使用 Pinia 进行状态管理',
    completed: false,
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  }
]

export const taskService = {
  async getTasks(): Promise<Task[]> {
    await delay(500)
    return [...mockTasks]
  },

  async getTaskById(id: string): Promise<Task | undefined> {
    await delay(300)
    return mockTasks.find(task => task.id === id)
  },

  async createTask(dto: CreateTaskDto): Promise<Task> {
    await delay(500)
    const newTask: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    mockTasks.unshift(newTask)
    return { ...newTask }
  },

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task | undefined> {
    await delay(300)
    const index = mockTasks.findIndex(task => task.id === id)
    if (index === -1) return undefined

    mockTasks[index] = {
      ...mockTasks[index],
      ...dto,
      updatedAt: new Date()
    }
    return { ...mockTasks[index] }
  },

  async deleteTask(id: string): Promise<boolean> {
    await delay(300)
    const index = mockTasks.findIndex(task => task.id === id)
    if (index === -1) return false

    mockTasks.splice(index, 1)
    return true
  },

  async toggleTaskComplete(id: string): Promise<Task | undefined> {
    const task = mockTasks.find(t => t.id === id)
    if (!task) return undefined

    return this.updateTask(id, { completed: !task.completed })
  }
}
