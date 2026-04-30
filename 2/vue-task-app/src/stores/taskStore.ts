import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, CreateTaskDto } from '@/types'
import { taskService } from '@/services/taskService'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const completedTasks = computed(() =>
    tasks.value.filter(task => task.completed)
  )

  const pendingTasks = computed(() =>
    tasks.value.filter(task => !task.completed)
  )

  const completedCount = computed(() => completedTasks.value.length)
  const pendingCount = computed(() => pendingTasks.value.length)
  const totalCount = computed(() => tasks.value.length)

  async function fetchTasks() {
    isLoading.value = true
    error.value = null
    try {
      tasks.value = await taskService.getTasks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取任务失败'
    } finally {
      isLoading.value = false
    }
  }

  async function addTask(dto: CreateTaskDto) {
    isLoading.value = true
    error.value = null
    try {
      const newTask = await taskService.createTask(dto)
      tasks.value.unshift(newTask)
      return newTask
    } catch (err) {
      error.value = err instanceof Error ? err.message : '添加任务失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function toggleTask(id: string) {
    isLoading.value = true
    error.value = null
    try {
      const updatedTask = await taskService.toggleTaskComplete(id)
      if (updatedTask) {
        const index = tasks.value.findIndex(task => task.id === id)
        if (index !== -1) {
          tasks.value[index] = updatedTask
        }
      }
      return updatedTask
    } catch (err) {
      error.value = err instanceof Error ? err.message : '更新任务失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function removeTask(id: string) {
    isLoading.value = true
    error.value = null
    try {
      const success = await taskService.deleteTask(id)
      if (success) {
        tasks.value = tasks.value.filter(task => task.id !== id)
      }
      return success
    } catch (err) {
      error.value = err instanceof Error ? err.message : '删除任务失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    tasks,
    isLoading,
    error,
    completedTasks,
    pendingTasks,
    completedCount,
    pendingCount,
    totalCount,
    fetchTasks,
    addTask,
    toggleTask,
    removeTask,
    clearError
  }
})
