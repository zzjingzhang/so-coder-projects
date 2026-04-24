<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

const todos = ref<Todo[]>([])
const newTodoText = ref('')
const currentFilter = ref<Filter>('all')
const isDarkMode = ref(false)
const draggedTodoId = ref<number | null>(null)
const dragOverTodoId = ref<number | null>(null)

onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
  
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  updateTheme()
})

watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })

watch(isDarkMode, (newValue) => {
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
  updateTheme()
})

const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const addTodo = () => {
  if (newTodoText.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodoText.value.trim(),
      completed: false
    })
    newTodoText.value = ''
  }
}

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

const activeTodosCount = computed(() => {
  return todos.value.filter(todo => !todo.completed).length
})

const completedTodosCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})

const clearCompleted = () => {
  todos.value = todos.value.filter(todo => !todo.completed)
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

const onDragStart = (todoId: number) => {
  draggedTodoId.value = todoId
}

const onDragEnd = () => {
  draggedTodoId.value = null
  dragOverTodoId.value = null
}

const onDragOver = (e: DragEvent, todoId: number) => {
  e.preventDefault()
  if (draggedTodoId.value && draggedTodoId.value !== todoId) {
    dragOverTodoId.value = todoId
  }
}

const onDragLeave = () => {
  dragOverTodoId.value = null
}

const onDrop = (e: DragEvent, targetTodoId: number) => {
  e.preventDefault()
  if (draggedTodoId.value && draggedTodoId.value !== targetTodoId) {
    const draggedIndex = todos.value.findIndex(todo => todo.id === draggedTodoId.value)
    const targetIndex = todos.value.findIndex(todo => todo.id === targetTodoId)
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedTodo] = todos.value.splice(draggedIndex, 1)
      todos.value.splice(targetIndex, 0, draggedTodo)
    }
  }
  
  draggedTodoId.value = null
  dragOverTodoId.value = null
}
</script>

<template>
  <div class="todo-app" :class="{ 'dark-mode': isDarkMode }">
    <div class="header">
      <h1>待办事项</h1>
      <button class="theme-toggle" @click="toggleTheme" :aria-label="isDarkMode ? '切换到浅色主题' : '切换到深色主题'">
        <span v-if="!isDarkMode">🌙</span>
        <span v-else>☀️</span>
      </button>
    </div>
    
    <div class="input-container">
      <input
        v-model="newTodoText"
        @keyup.enter="addTodo"
        placeholder="添加新的待办事项..."
        class="todo-input"
        :class="{ 'dark-mode': isDarkMode }"
      />
      <button @click="addTodo" class="add-button" :class="{ 'dark-mode': isDarkMode }">
        添加
      </button>
    </div>
    
    <div class="filters">
      <button
        v-for="filter in [
          { value: 'all', label: '全部', count: todos.length },
          { value: 'active', label: '待完成', count: activeTodosCount },
          { value: 'completed', label: '已完成', count: completedTodosCount }
        ]"
        :key="filter.value"
        @click="currentFilter = filter.value as Filter"
        :class="['filter-button', { active: currentFilter === filter.value, 'dark-mode': isDarkMode }]"
      >
        {{ filter.label }}
        <span class="count">({{ filter.count }})</span>
      </button>
    </div>
    
    <div class="content-container">
      <div v-if="filteredTodos.length > 0" class="todo-list">
        <div
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo-item"
          :class="{
            completed: todo.completed,
            'dark-mode': isDarkMode,
            dragging: draggedTodoId === todo.id,
            'drag-over': dragOverTodoId === todo.id
          }"
          draggable="true"
          @dragstart="onDragStart(todo.id)"
          @dragend="onDragEnd"
          @dragover="onDragOver($event, todo.id)"
          @dragleave="onDragLeave"
          @drop="onDrop($event, todo.id)"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
            class="todo-checkbox"
          />
          <span class="todo-text">{{ todo.text }}</span>
          <button @click="deleteTodo(todo.id)" class="delete-button" aria-label="删除">
            ✕
          </button>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <p v-if="currentFilter === 'all'">暂无待办事项，添加一个开始吧！</p>
        <p v-else-if="currentFilter === 'active'">没有待完成的任务！</p>
        <p v-else>没有已完成的任务！</p>
      </div>
    </div>
    
    <div v-if="completedTodosCount > 0" class="footer">
      <button @click="clearCompleted" class="clear-button" :class="{ 'dark-mode': isDarkMode }">
        清除已完成
      </button>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
  overflow: hidden;
}

.content-container {
  flex: 1;
  overflow-y: scroll;
}

.todo-app.dark-mode {
  background-color: #1a1a2e;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

h1 {
  font-size: 2rem;
  margin: 0;
  color: #333;
  transition: color 0.3s ease;
}

.dark-mode h1 {
  color: #eee;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.dark-mode .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.todo-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  background-color: white;
  color: #333;
}

.todo-input:focus {
  border-color: #6366f1;
}

.todo-input.dark-mode {
  background-color: #16213e;
  border-color: #334155;
  color: #e2e8f0;
}

.todo-input.dark-mode:focus {
  border-color: #818cf8;
}

.add-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #4f46e5;
}

.add-button.dark-mode {
  background-color: #818cf8;
}

.add-button.dark-mode:hover {
  background-color: #6366f1;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

.filter-button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.filter-button:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.filter-button.active {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
}

.filter-button.dark-mode {
  background-color: #16213e;
  border-color: #334155;
  color: #cbd5e1;
}

.filter-button.dark-mode:hover {
  border-color: #818cf8;
  color: #818cf8;
}

.filter-button.dark-mode.active {
  background-color: #818cf8;
  color: white;
  border-color: #818cf8;
}

.count {
  font-weight: normal;
  opacity: 0.7;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: grab;
}

.todo-item:active {
  cursor: grabbing;
}

.todo-item.dark-mode {
  background-color: #16213e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.todo-item.dragging {
  opacity: 0.5;
  transform: scale(1.02);
}

.todo-item.drag-over {
  border: 2px dashed #6366f1;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-item.dark-mode.completed .todo-text {
  color: #64748b;
}

.todo-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #6366f1;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  color: #333;
  transition: color 0.3s ease;
}

.todo-item.dark-mode .todo-text {
  color: #e2e8f0;
}

.delete-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
}

.todo-item:hover .delete-button {
  opacity: 1;
}

.delete-button:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .empty-state {
  color: #94a3b8;
}

.footer {
  margin-top: 1rem;
  text-align: center;
  flex-shrink: 0;
  padding-top: 0.5rem;
}

.clear-button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: transparent;
  border: 2px solid #ef4444;
  color: #ef4444;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background-color: #ef4444;
  color: white;
}

.clear-button.dark-mode:hover {
  background-color: #ef4444;
  color: white;
}

@media (max-width: 640px) {
  .todo-app {
    padding: 1rem;
  }
  
  .input-container {
    flex-direction: column;
  }
  
  .add-button {
    width: 100%;
  }
  
  .filters {
    justify-content: center;
  }
}
</style>
