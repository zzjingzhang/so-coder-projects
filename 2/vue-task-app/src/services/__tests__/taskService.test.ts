import { describe, it, expect, vi } from 'vitest'
import { taskService } from '../taskService'
import type { Task, CreateTaskDto, UpdateTaskDto } from '@/types'

describe('taskService', () => {

  it('should get tasks', async () => {
    const tasks = await taskService.getTasks()
    expect(tasks).toBeInstanceOf(Array)
    expect(tasks.length).toBeGreaterThan(0)
  })

  it('should get task by id', async () => {
    const tasks = await taskService.getTasks()
    const firstTask = tasks[0]
    const task = await taskService.getTaskById(firstTask.id)
    expect(task).toBeDefined()
    expect(task?.id).toBe(firstTask.id)
  })

  it('should return undefined for non-existent task id', async () => {
    const task = await taskService.getTaskById('non-existent-id')
    expect(task).toBeUndefined()
  })

  it('should create a new task', async () => {
    const dto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description'
    }
    const newTask = await taskService.createTask(dto)
    expect(newTask).toBeDefined()
    expect(newTask.title).toBe(dto.title)
    expect(newTask.description).toBe(dto.description)
    expect(newTask.completed).toBe(false)
  })

  it('should update an existing task', async () => {
    const tasks = await taskService.getTasks()
    const firstTask = tasks[0]
    const updateDto: UpdateTaskDto = {
      title: 'Updated Title',
      completed: true
    }
    const updatedTask = await taskService.updateTask(firstTask.id, updateDto)
    expect(updatedTask).toBeDefined()
    expect(updatedTask?.title).toBe(updateDto.title)
    expect(updatedTask?.completed).toBe(true)
  })

  it('should return undefined when updating non-existent task', async () => {
    const updateDto: UpdateTaskDto = { title: 'Updated' }
    const updatedTask = await taskService.updateTask('non-existent-id', updateDto)
    expect(updatedTask).toBeUndefined()
  })

  it('should toggle task complete status', async () => {
    const tasks = await taskService.getTasks()
    const firstTask = tasks[0]
    const originalStatus = firstTask.completed

    const toggledTask = await taskService.toggleTaskComplete(firstTask.id)
    expect(toggledTask).toBeDefined()
    expect(toggledTask?.completed).toBe(!originalStatus)

    const toggledBackTask = await taskService.toggleTaskComplete(firstTask.id)
    expect(toggledBackTask?.completed).toBe(originalStatus)
  })

  it('should return undefined when toggling non-existent task', async () => {
    const toggledTask = await taskService.toggleTaskComplete('non-existent-id')
    expect(toggledTask).toBeUndefined()
  })

  it('should delete an existing task', async () => {
    const dto: CreateTaskDto = { title: 'Task to delete' }
    const newTask = await taskService.createTask(dto)

    const deleteResult = await taskService.deleteTask(newTask.id)
    expect(deleteResult).toBe(true)

    const deletedTask = await taskService.getTaskById(newTask.id)
    expect(deletedTask).toBeUndefined()
  })

  it('should return false when deleting non-existent task', async () => {
    const deleteResult = await taskService.deleteTask('non-existent-id')
    expect(deleteResult).toBe(false)
  })
})

describe('taskService with monkey-patch', () => {
  it('should mock getTasks method', async () => {
    const mockTasks: Task[] = [
      {
        id: 'mock-1',
        title: 'Mock Task 1',
        description: 'Mock Description 1',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    const originalGetTasks = taskService.getTasks
    taskService.getTasks = vi.fn().mockResolvedValue(mockTasks)

    const tasks = await taskService.getTasks()
    expect(tasks).toEqual(mockTasks)
    expect(tasks.length).toBe(1)
    expect(tasks[0].title).toBe('Mock Task 1')

    taskService.getTasks = originalGetTasks
  })

  it('should mock createTask to throw error', async () => {
    const originalCreateTask = taskService.createTask
    const testError = new Error('Network error')

    taskService.createTask = vi.fn().mockRejectedValue(testError)

    await expect(taskService.createTask({ title: 'Test' })).rejects.toThrow('Network error')

    taskService.createTask = originalCreateTask
  })

  it('should mock updateTask with custom behavior', async () => {
    const originalUpdateTask = taskService.updateTask

    const updatedTask: Task = {
      id: 'test-id',
      title: 'Patched Title',
      description: 'Patched Description',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    taskService.updateTask = vi.fn((_id: string, dto: UpdateTaskDto) => {
      return Promise.resolve({
        ...updatedTask,
        ...dto
      } as Task)
    })

    const result = await taskService.updateTask('test-id', { completed: false })
    expect(result?.title).toBe('Patched Title')
    expect(result?.completed).toBe(false)

    taskService.updateTask = originalUpdateTask
  })
})
