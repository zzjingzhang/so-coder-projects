import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '../taskStore'
import { taskService } from '@/services/taskService'
import type { CreateTaskDto } from '@/types'

describe('taskStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have initial state', () => {
    const store = useTaskStore()
    expect(store.tasks).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.completedCount).toBe(0)
    expect(store.pendingCount).toBe(0)
    expect(store.totalCount).toBe(0)
  })

  it('should fetch tasks', async () => {
    const store = useTaskStore()

    expect(store.isLoading).toBe(false)

    await store.fetchTasks()

    expect(store.isLoading).toBe(false)
    expect(store.tasks.length).toBeGreaterThan(0)
    expect(store.totalCount).toBe(store.tasks.length)
  })

  it('should add a new task', async () => {
    const store = useTaskStore()
    await store.fetchTasks()

    const initialCount = store.totalCount
    const newTaskDto: CreateTaskDto = {
      title: 'New Test Task',
      description: 'New Test Description'
    }

    const newTask = await store.addTask(newTaskDto)

    expect(newTask).toBeDefined()
    expect(newTask.title).toBe(newTaskDto.title)
    expect(store.totalCount).toBe(initialCount + 1)
  })

  it('should toggle task completion', async () => {
    const store = useTaskStore()
    await store.fetchTasks()

    const firstTask = store.tasks[0]
    const originalStatus = firstTask.completed

    await store.toggleTask(firstTask.id)

    const updatedTask = store.tasks.find(t => t.id === firstTask.id)
    expect(updatedTask?.completed).toBe(!originalStatus)
  })

  it('should remove a task', async () => {
    const store = useTaskStore()
    await store.fetchTasks()

    const initialCount = store.totalCount
    const firstTaskId = store.tasks[0].id

    const result = await store.removeTask(firstTaskId)

    expect(result).toBe(true)
    expect(store.totalCount).toBe(initialCount - 1)
    expect(store.tasks.find(t => t.id === firstTaskId)).toBeUndefined()
  })

  it('should clear error', () => {
    const store = useTaskStore()
    store.error = 'Some error'
    expect(store.error).toBe('Some error')

    store.clearError()
    expect(store.error).toBeNull()
  })

  it('should have correct computed values', async () => {
    const store = useTaskStore()
    await store.fetchTasks()

    const completedTasks = store.tasks.filter(t => t.completed)
    const pendingTasks = store.tasks.filter(t => !t.completed)

    expect(store.completedTasks).toEqual(completedTasks)
    expect(store.pendingTasks).toEqual(pendingTasks)
    expect(store.completedCount).toBe(completedTasks.length)
    expect(store.pendingCount).toBe(pendingTasks.length)
  })
})

describe('taskStore with service mock', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should handle service error when fetching tasks', async () => {
    const store = useTaskStore()
    const originalGetTasks = taskService.getTasks

    taskService.getTasks = vi.fn().mockRejectedValue(new Error('Fetch failed'))

    await store.fetchTasks()

    expect(store.error).toBe('获取任务失败')
    expect(store.isLoading).toBe(false)

    taskService.getTasks = originalGetTasks
  })

  it('should handle service error when adding task', async () => {
    const store = useTaskStore()
    const originalCreateTask = taskService.createTask

    taskService.createTask = vi.fn().mockRejectedValue(new Error('Create failed'))

    await expect(store.addTask({ title: 'Test' })).rejects.toThrow()
    expect(store.error).toBe('添加任务失败')

    taskService.createTask = originalCreateTask
  })

  it('should return false when removing non-existent task', async () => {
    const store = useTaskStore()
    await store.fetchTasks()

    const result = await store.removeTask('non-existent-id')
    expect(result).toBe(false)
  })
})
